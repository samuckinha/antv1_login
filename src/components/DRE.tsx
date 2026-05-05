import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Plus, X, Trash2 } from 'lucide-react';

import { Page } from '../App';

interface DREProps {
  onNavigate: (page: Page) => void;
  data: DREItem[];
  setData: (data: DREItem[]) => void;
}

export interface DREItem {
  id: number;
  desc: string;
  tipo: 'RECEITA' | 'DESPESA';
  valor: number;
}

export default function DRE({ onNavigate, data, setData }: DREProps) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'RECEITA' | 'DESPESA'>('RECEITA');
  const [newDesc, setNewDesc] = useState('');
  const [newValor, setNewValor] = useState('');

  const totalReceitas = data
    .filter(i => i.tipo === 'RECEITA')
    .reduce((acc, curr) => acc + curr.valor, 0);
  
  const totalDespesas = data
    .filter(i => i.tipo === 'DESPESA')
    .reduce((acc, curr) => acc + curr.valor, 0);
  
  const lucroLiquido = totalReceitas - totalDespesas;

  const handleAddEntry = () => {
    if (!newDesc || !newValor) return;
    const newItem: DREItem = {
      id: Date.now(),
      desc: newDesc,
      tipo: modalType,
      valor: parseFloat(newValor) || 0
    };
    setData([...data, newItem]);
    setIsModalOpen(false);
    setNewDesc('');
    setNewValor('');
  };

  const handleDelete = (id: number) => {
    setData(data.filter(item => item.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <header className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Minha DRE</h1>
          <p className="text-slate-400 font-medium text-xs">Controle financeiro simples e direto.</p>
        </div>
        <button 
          onClick={() => onNavigate('ia')}
          className="flex items-center gap-2 bg-[#00B488] text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-[0.15em] shadow-lg shadow-emerald-500/10 hover:bg-[#00A078] transition-all"
        >
          <Sparkles size={14} />
          Analisar com IA
        </button>
      </header>

      <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/30">
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Descrição</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Tipo</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Valor (R$)</th>
                <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-10 py-6 text-sm font-bold text-slate-600">{item.desc}</td>
                  <td className="px-10 py-6 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-black tracking-widest ${
                      item.tipo === 'RECEITA' 
                      ? 'bg-emerald-50 text-emerald-600' 
                      : 'bg-rose-50 text-rose-500'
                    }`}>
                      {item.tipo}
                    </span>
                  </td>
                  <td className={`px-10 py-6 text-right text-base font-medium tracking-tight ${
                    item.tipo === 'RECEITA' ? 'text-emerald-600' : 'text-slate-500'
                  }`}>
                    {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-6 text-center">
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="text-rose-400 hover:text-rose-600 transition-colors p-2 rounded-lg hover:bg-rose-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-emerald-50/30 border-t border-slate-100 p-10 flex items-center justify-between">
          <span className="text-emerald-600 font-black text-[11px] uppercase tracking-[0.2em]">Lucro Líquido</span>
          <span className={`font-medium text-2xl tracking-tighter ${lucroLiquido >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            R$ {lucroLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-8">
        <button 
          onClick={() => { setModalType('RECEITA'); setIsModalOpen(true); }}
          className="flex items-center justify-center gap-3 py-4 border border-emerald-200 bg-transparent rounded-2xl text-emerald-600 font-black text-[10px] uppercase tracking-[0.15em] hover:bg-emerald-50 transition-all"
        >
          <Plus size={18} />
          Adicionar Receita
        </button>
        <button 
          onClick={() => { setModalType('DESPESA'); setIsModalOpen(true); }}
          className="flex items-center justify-center gap-3 py-4 border border-purple-200 bg-transparent rounded-2xl text-purple-500 font-black text-[10px] uppercase tracking-[0.15em] hover:bg-purple-50 transition-all"
        >
          <Plus size={18} />
          Adicionar Despesa
        </button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl border border-slate-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm">
                  {modalType === 'RECEITA' ? 'Nova Receita' : 'Nova Despesa'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-2">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Descrição</label>
                  <input 
                    type="text" 
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Ex: Venda de Cookies"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B488] transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Valor (R$)</label>
                  <input 
                    type="number" 
                    value={newValor}
                    onChange={(e) => setNewValor(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B488] transition-all text-sm"
                  />
                </div>
                <button 
                  onClick={handleAddEntry}
                  className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest text-white shadow-lg transition-all mt-4 ${
                    modalType === 'RECEITA' ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20' : 'bg-[#7C25E9] hover:bg-purple-700 shadow-purple-500/20'
                  }`}
                >
                  Salvar {modalType === 'RECEITA' ? 'Receita' : 'Despesa'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
