import { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Zap, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
}

export default function LandingPage({ onLogin }: LandingPageProps) {
  const [view, setView] = useState<'landing' | 'login'>('landing');

  if (view === 'login') {
    return (
      <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
        <nav className="bg-[#00B488] flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="max-w-6xl mx-auto w-full">
            <span className="text-white font-black text-2xl tracking-tighter cursor-pointer" onClick={() => setView('landing')}>ANT</span>
          </div>
        </nav>
        
        <div className="flex items-center justify-center p-4 min-h-[calc(100vh-64px)]">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-xl w-full max-w-sm"
          >
            <div className="flex justify-center mb-6">
              <span className="bg-linear-to-r from-[#7C25E9] to-[#00B488] bg-clip-text text-transparent font-black text-4xl tracking-tighter">ANT</span>
            </div>
            <h2 className="text-xl font-black text-slate-900 text-center mb-1">Bem-vindo de volta!</h2>
            <p className="text-slate-500 text-center text-[11px] mb-6 font-medium">Entre para gerenciar seu negócio.</p>
            
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">E-mail</label>
                <input 
                  type="email" 
                  defaultValue="empreendedor@ant.com"
                  className="w-full bg-white border border-slate-200 text-slate-900 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B488] text-sm transition-all"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Senha</label>
                <input 
                  type="password" 
                  defaultValue="••••••••"
                  className="w-full bg-white border border-slate-200 text-slate-900 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B488] text-sm transition-all"
                  placeholder="Sua senha"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-[#00B488] text-white font-black py-4 rounded-xl hover:bg-[#00A078] transition-all shadow-lg shadow-emerald-500/10 text-xs mt-2 uppercase tracking-widest"
              >
                Entrar
              </button>
            </form>
            
            <div className="mt-8 flex flex-col items-center gap-3">
              <button className="text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-[#7C25E9]">Esqueceu a senha?</button>
              <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                Não tem conta? <button onClick={() => setView('landing')} className="text-[#00B488] hover:underline">Assine agora</button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-600 font-sans">
      {/* Header */}
      <nav className="bg-linear-to-r from-[#7C25E9] to-[#00B488] flex items-center justify-between px-6 py-4 max-w-full border-b border-white/10">
        <div className="flex items-center gap-2 max-w-6xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2">
            <span className="text-white font-black text-2xl tracking-tighter">ANT</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-white/80">
            <a href="#funcionalidades" className="hover:text-white transition-colors">Funcionalidades</a>
            <a href="#planos" className="hover:text-white transition-colors">Planos</a>
            <a href="#sobre" className="hover:text-white transition-colors">Sobre</a>
          </div>
          <button 
            onClick={() => setView('login')}
            className="bg-white text-[#00B488] px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-slate-50 transition-colors"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 max-w-6xl mx-auto text-center">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 bg-purple-50 text-[#7C25E9] px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-[0.2em] mb-8 border border-purple-100 shadow-sm shadow-[#7C25E9]/5">
            <Zap size={12} className="fill-[#7C25E9]" />
            Automate aNd Transform
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight">
            O cérebro do seu <span className="text-[#00B488]">negócio</span> <br className="hidden md:block" /> impulsionado por IA.
          </h1>
          <p className="text-base text-slate-500 mb-10 max-w-xl mx-auto font-medium leading-relaxed">
            Automatize seu estoque, finanças e receba dicas estratégicas em tempo real para escalar sua empresa com segurança.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => setView('login')}
              className="bg-[#00B488] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-emerald-500/10 hover:translate-y-[-2px] transition-all"
            >
              Começar Agora <ArrowRight size={18} />
            </button>
            <button className="bg-transparent border border-slate-200 text-slate-500 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-colors">
              teste grátis por 30 dias
            </button>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="funcionalidades" className="bg-slate-50 py-20 px-6 border-y border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Tudo em um só lugar</h2>
            <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest">Construído para eficiência máxima.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { color: 'bg-emerald-500', icon: TrendingUp, title: 'Finanças', desc: 'DRE simplificada e fluxos de caixa automáticos para você nunca mais perder um centavo.' },
              { color: 'bg-purple-500', icon: Zap, title: 'Estoque', desc: 'Previsão de demanda baseada em IA e alertas de reposição para evitar rupturas.' },
              { color: 'bg-blue-500', icon: Shield, title: 'IA Estratégica', desc: 'Seu assistente virtual analisa os dados e sugere melhores ações para seu bairro.' }
            ].map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm"
              >
                <div className={`${f.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-gray-200`}>
                  <f.icon size={28} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-4">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="planos" className="py-24 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Escolha o plano ideal</h2>
          <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest">Cresça sem limites com tecnologia.</p>
        </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto items-stretch">
            {/* Basic Plan */}
            <div className="bg-[#1a1c2e] p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden border border-white/5 group flex flex-col">
              <h3 className="text-xl font-black mb-1">Plano Base</h3>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-8">Para iniciantes</p>
              <div className="text-4xl font-black mb-8 tracking-tight">R$ 97<span className="text-sm font-normal text-slate-400 ml-1">/mês</span></div>
              <ul className="space-y-4 mb-10 text-slate-400 text-sm font-medium flex-1">
                <li className="flex items-center gap-2 transition-colors"><CheckCircle2 className="text-[#00B488]" size={18} /> Controle de Estoque</li>
                <li className="flex items-center gap-2 transition-colors"><CheckCircle2 className="text-[#00B488]" size={18} /> DRE Simplificada</li>
                <li className="flex items-center gap-2 transition-colors"><CheckCircle2 className="text-[#00B488]" size={18} /> Suporte via E-mail</li>
              </ul>
              <button 
                onClick={() => setView('login')} 
                className="w-full py-4 bg-[#00B488] text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#00A078] transition-all shadow-lg shadow-emerald-500/10"
              >
                Escolher Plano
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-[#1a1c2e] p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden border border-purple-500/20 group flex flex-col">
              <div className="absolute top-0 right-0 bg-[#7C25E9] px-6 py-2 text-[8px] font-black rounded-bl-xl uppercase tracking-[0.25em] text-white">RECOMENDADO</div>
              <h3 className="text-xl font-black mb-1">Plano PRO</h3>
              <p className="text-purple-300 text-[10px] font-black uppercase tracking-widest mb-8 opacity-70">Controle Total IA</p>
              <div className="text-4xl font-black mb-8 tracking-tight">R$ 247<span className="text-sm font-normal text-purple-400/50 ml-1">/mês</span></div>
              <ul className="space-y-4 mb-10 text-purple-100/70 text-sm font-medium flex-1">
                <li className="flex items-center gap-2"><CheckCircle2 className="text-[#00B488]" size={18} /> Tudo do Plano Base</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="text-[#00B488]" size={18} /> Radar PRO (Tendências)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="text-[#00B488]" size={18} /> Assistente de Marketing IA</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="text-[#00B488]" size={18} /> Suporte 24/7 Prioritário</li>
              </ul>
              <button 
                onClick={() => setView('login')} 
                className="w-full py-4 bg-[#00B488] text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-emerald-500/10 hover:bg-[#00A078] transition-all border border-[#00B488]/20"
              >
                Escolher Plano
              </button>
            </div>
          </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1c2e] text-slate-400 py-16 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-sm tracking-tighter">ANT</span>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">© 2026 anyt system • Automate aNd Transform</p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors text-slate-400">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors text-slate-400">Termos</a>
            <a href="#" className="hover:text-white transition-colors text-slate-400">Contato</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
