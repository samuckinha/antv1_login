import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, X, Minimize2, Maximize2, Plus, MessageSquare, History, Trash2, Menu, Video, Rocket, Instagram, Image as ImageIcon } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Page, StockItem, BusinessHealth, RadarTrend } from '../App';
import { DREItem } from './DRE';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  timestamp: number;
}

interface AIAssistantProps {
  dreData: DREItem[];
  stockData: StockItem[];
  healthData: BusinessHealth;
  radarTrends: RadarTrend[];
  userInfo: {
    name: string;
    businessName: string;
    niche: string;
    level: string;
  };
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const INITIAL_MESSAGE: Message = {
  role: 'model',
  text: 'Olá! Sou o Anty, seu assistente inteligente. Como posso ajudar seu negócio hoje?'
};

export default function AIAssistant({ dreData, stockData, healthData, radarTrends, userInfo }: AIAssistantProps) {
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    const saved = localStorage.getItem('anty_chats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [activeSessionId, setActiveSessionId] = useState<string | null>(() => {
    const saved = localStorage.getItem('anty_active_session');
    return saved || null;
  });

  const [isHistoryOpen, setIsHistoryOpen] = useState(true);

  // Initialize first session if none exists
  useEffect(() => {
    if (sessions.length === 0) {
      const newId = Date.now().toString();
      const newSession: ChatSession = {
        id: newId,
        title: 'Nova Conversa',
        messages: [INITIAL_MESSAGE],
        timestamp: Date.now()
      };
      setSessions([newSession]);
      setActiveSessionId(newId);
    }
  }, [sessions.length]);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('anty_chats', JSON.stringify(sessions));
    if (activeSessionId) {
      localStorage.setItem('anty_active_session', activeSessionId);
    }
  }, [sessions, activeSessionId]);

  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0];
  const messages = activeSession?.messages || [INITIAL_MESSAGE];

  const setMessages = (updateFn: (prev: Message[]) => Message[]) => {
    setSessions(prev => prev.map(s => {
      if (s.id === activeSessionId) {
        const newMessages = updateFn(s.messages);
        let newTitle = s.title;
        if (s.title === 'Nova Conversa' && newMessages.length > 1) {
          const firstUserMsg = newMessages.find(m => m.role === 'user');
          if (firstUserMsg) {
            newTitle = firstUserMsg.text.slice(0, 30) + (firstUserMsg.text.length > 30 ? '...' : '');
          }
        }
        return { ...s, messages: newMessages, title: newTitle };
      }
      return s;
    }));
  };

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const handleSend = async (overrideInput?: string) => {
    const textToSend = overrideInput || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage = textToSend.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    if (!overrideInput) setInput('');
    setIsLoading(true);

    try {
      const history = messages.slice(1).map(m => ({
        role: m.role as "user" | "model",
        parts: [{ text: m.text }]
      }));

      const totalReceitas = dreData
        .filter(i => i.tipo === 'RECEITA')
        .reduce((acc, curr) => acc + curr.valor, 0);
      
      const totalDespesas = dreData
        .filter(i => i.tipo === 'DESPESA')
        .reduce((acc, curr) => acc + curr.valor, 0);
      
      const lucroLiquido = totalReceitas - totalDespesas;
      const dreSummary = dreData.map(item => `${item.desc}: R$ ${item.valor} (${item.tipo})`).join('\n');

      const stockSummary = stockData.map(item => `- ${item.name}: ${item.quantity}un (Mín: ${item.minQuantity}) - Preço: R$ ${item.unitPrice}`).join('\n');
      const lowStock = stockData.filter(item => item.quantity < item.minQuantity).map(item => item.name).join(', ');

      const radarSummary = radarTrends.map(t => `- ${t.topic} (Relevância: ${t.relevance}%)`).join('\n');

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...history,
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: `Você é Anty, o assistente inteligente da plataforma ANT (Automate aNd Transform). 
Seu objetivo é ajudar microempreendedores de forma EXTREMAMENTE OBJETIVA e DIRETA. 
Responda com clareza, evite introduções longas e use poucas palavras. Seja o mais sucinto possível sem perder a utilidade.

VOCÊ TEM ACESSO A TODO O CONTEXTO DA PLATAFORMA:

1. PERFIL DO USUÁRIO:
Nome: ${userInfo.name} | Empresa: ${userInfo.businessName} | Nicho: ${userInfo.niche} | Plano: ${userInfo.level}

2. DADOS FINANCEIROS (DRE):
Receitas: R$ ${totalReceitas} | Despesas: R$ ${totalDespesas} | Lucro: R$ ${lucroLiquido}
Detalhes DRE:
${dreSummary}

3. DADOS DE ESTOQUE:
Recumo: ${stockSummary}
${lowStock ? `ALERTA DE ESTOQUE BAIXO: ${lowStock}` : 'Estoque em níveis normais.'}

4. SAÚDE & RADAR:
Score de Saúde: ${healthData.score}/100 | Status: ${healthData.status}
Recomendação atual: ${healthData.recommendation}
Tendências do Radar PRO:
${radarSummary}

Use esses dados reais para responder. Seja o mentor que conhece os números. Se perguntarem "como estou?", sintetize Lucro, Saúde e Alertas de Estoque.`,
        }
      });

      if (response && response.text) {
        const cleanedText = response.text.replace(/\*/g, '');
        setMessages(prev => [
          ...prev,
          { role: 'model', text: cleanedText }
        ]);
      } else {
        throw new Error('Resposta inválida do servidor');
      }

    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'model',
          text: '⚠️ Erro ao conectar com a IA. Verifique o servidor ou tente novamente.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const createNewChat = () => {
    const newId = Date.now().toString();
    const newSession: ChatSession = {
      id: newId,
      title: 'Nova Conversa',
      messages: [INITIAL_MESSAGE],
      timestamp: Date.now()
    };
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newId);
  };

  const deleteSession = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newSessions = sessions.filter(s => s.id !== id);
    setSessions(newSessions);
    if (activeSessionId === id && newSessions.length > 0) {
      setActiveSessionId(newSessions[0].id);
    } else if (newSessions.length === 0) {
      const fallbackId = Date.now().toString();
      setSessions([{ id: fallbackId, title: 'Nova Conversa', messages: [INITIAL_MESSAGE], timestamp: Date.now() }]);
      setActiveSessionId(fallbackId);
    }
  };

  return (
    <div className={`flex ${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'h-[calc(100vh-160px)] rounded-[2.5rem]'} bg-white overflow-hidden border border-slate-100 shadow-sm transition-all duration-300`}>
      
      {/* HISTORY SIDEBAR */}
      <AnimatePresence mode="wait">
        {isHistoryOpen && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="border-r border-slate-100 bg-slate-50/30 flex flex-col h-full overflow-hidden shrink-0"
          >
            <div className="p-5 border-b border-slate-100">
              <button 
                onClick={createNewChat}
                className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:border-[#00B488] hover:text-[#00B488] transition-all shadow-sm hover:shadow-emerald-500/5"
              >
                <Plus size={16} />
                Nova Conversa
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              <h4 className="px-3 py-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">Suas Conversas</h4>
              {sessions.map(session => (
                <div 
                  key={session.id}
                  onClick={() => setActiveSessionId(session.id)}
                  className={`group flex items-center gap-3 px-4 py-4 rounded-2xl cursor-pointer transition-all ${
                    activeSessionId === session.id 
                    ? 'bg-emerald-50 text-[#00B488] shadow-sm shadow-emerald-500/5' 
                    : 'hover:bg-white text-slate-500 hover:text-slate-900 border border-transparent hover:border-slate-100'
                  }`}
                >
                  <MessageSquare size={16} className={activeSessionId === session.id ? 'text-[#00B488]' : 'text-slate-300'} />
                  <span className="flex-1 text-xs font-bold truncate leading-tight">{session.title}</span>
                  <button 
                    onClick={(e) => deleteSession(e, session.id)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 hover:text-rose-500 transition-all rounded-lg hover:bg-rose-50"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-slate-100">
              <div className="flex items-center gap-3 px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <History size={14} />
                Histórico Seguro
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CHAT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* HEADER */}
        <div className="bg-slate-50/50 p-5 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsHistoryOpen(!isHistoryOpen)}
              className={`p-2.5 rounded-xl transition-all ${isHistoryOpen ? 'text-[#00B488] bg-emerald-50' : 'text-slate-400 hover:bg-slate-100'}`}
            >
              <Menu size={20} />
            </button>
            <div className="bg-purple-100 p-2 rounded-xl text-[#7C25E9]">
              <Sparkles size={18} />
            </div>
            <div>
              <h3 className="text-slate-900 font-black text-xs uppercase tracking-widest">
                Assistente Anty
              </h3>
              <p className="text-emerald-500 text-[9px] font-black uppercase tracking-[0.2em] animate-pulse">
                Online • Cérebro ANT
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="text-slate-400 hover:text-[#7C25E9] p-1.5 transition-colors"
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>

            <button className="text-slate-400 hover:text-rose-500 p-1.5 transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* CHAT */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide"
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${
                m.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[70%] p-5 rounded-2xl text-[13px] font-medium leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-[#00B488] text-white rounded-tr-none shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-50 text-slate-600 rounded-tl-none border border-slate-100'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex gap-1.5">
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* QUICK ACTIONS & INPUT */}
        <div className="p-6 bg-white border-t border-slate-50">
          <div className="flex flex-wrap gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
            <button 
              onClick={() => handleSend("Me dê um roteiro criativo para um Reels sobre meu negócio.")}
              className="px-4 py-2 bg-white border border-rose-100 rounded-full flex items-center gap-2 hover:bg-rose-50 transition-all shadow-sm group shrink-0"
            >
              <Video size={14} className="text-rose-500" />
              <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Roteiro Reels</span>
            </button>
            <button 
              onClick={() => handleSend("Quais as melhores formas de impulsionar meu perfil hoje?")}
              className="px-4 py-2 bg-white border border-emerald-100 rounded-full flex items-center gap-2 hover:bg-emerald-50 transition-all shadow-sm group shrink-0"
            >
              <Rocket size={14} className="text-emerald-500" />
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Como Impulsionar?</span>
            </button>
            <button 
              onClick={() => handleSend("Me dê uma dica rápida de Story para engajar meus clientes.")}
              className="px-4 py-2 bg-white border border-amber-100 rounded-full flex items-center gap-2 hover:bg-amber-50 transition-all shadow-sm group shrink-0"
            >
              <Instagram size={14} className="text-amber-500" />
              <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Dica Story</span>
            </button>
            <button 
              onClick={() => handleSend("Crie uma ideia de arte visual para uma postagem de promoção.")}
              className="px-4 py-2 bg-white border border-purple-100 rounded-full flex items-center gap-2 hover:bg-purple-50 transition-all shadow-sm group shrink-0"
            >
              <Sparkles size={14} className="text-purple-500" />
              <span className="text-[10px] font-black text-purple-500 uppercase tracking-widest">Gerar Arte</span>
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Pergunta pra Anty..."
              className="w-full bg-white text-slate-800 pl-8 pr-16 py-6 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 focus:outline-none focus:ring-4 focus:ring-[#00B488]/10 text-base font-bold transition-all placeholder:text-slate-400"
            />

            <button
              onClick={() => handleSend()}
              disabled={isLoading}
              className="absolute right-3 top-3 h-14 w-14 bg-linear-to-br from-[#00B488] to-[#009A74] text-white rounded-full flex items-center justify-center hover:scale-105 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-30"
            >
              <Send size={24} className="rotate-45 -translate-y-0.5 -translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
