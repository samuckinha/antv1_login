import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Box, 
  Search, 
  Plus, 
  Minus, 
  Scan, 
  AlertCircle,
  Upload,
  Triangle
} from 'lucide-react';
import { StockItem } from '../App';

interface EstoqueProps {
  data: StockItem[];
  setData: React.Dispatch<React.SetStateAction<StockItem[]>>;
}

export default function Estoque({ data, setData }: EstoqueProps) {
  const [search, setSearch] = useState('');
  
  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalStock = data.reduce((acc, curr) => acc + curr.quantity, 0);
  const lowStockCount = data.filter(item => item.quantity < item.minQuantity).length;

  const handleUpdateQuantity = (id: number, delta: number) => {
    setData(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
    ));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex items-start gap-4">
          <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
            <Box className="text-[#00B488] w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tighter uppercase leading-none mb-1">Meu Estoque</h1>
            <p className="text-slate-400 font-bold text-xs italic">Gestão ágil para quem não tem tempo a perder.</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button className="bg-[#7C25E9] text-white flex items-center justify-center px-8 py-4 rounded-[1.5rem] shadow-lg shadow-purple-100 hover:scale-105 transition-all group">
            <span className="font-black text-xs uppercase tracking-widest text-center">Fazer Upload</span>
          </button>
          
          <button 
            onClick={() => window.open('https://drive.google.com', '_blank')}
            className="bg-[#7C25E9] text-white flex items-center justify-center px-8 py-4 rounded-[1.5rem] shadow-lg shadow-purple-100 hover:scale-105 transition-all group"
          >
            <span className="font-black text-xs uppercase tracking-widest text-center">Drive</span>
          </button>

          <button className="bg-[#7C25E9] text-white flex items-center justify-center px-8 py-4 rounded-[1.5rem] shadow-lg shadow-purple-100 hover:scale-105 transition-all group">
            <span className="font-black text-xs uppercase tracking-widest text-center">Escanear Nota (NF)</span>
          </button>
        </div>
      </div>

      {/* Middle Controls & Total Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10 items-end">
        <div className="lg:col-span-9 relative">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400">
            <Search size={22} />
          </div>
          <input 
            type="text"
            placeholder="Buscar produto ou categoria..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-100 h-[80px] rounded-[2.5rem] pl-16 pr-8 text-slate-600 font-medium shadow-sm focus:outline-none focus:ring-4 focus:ring-[#00B488]/10 transition-all placeholder:text-slate-300"
          />
        </div>

        <div className="lg:col-span-3">
          <div className="bg-linear-to-br from-[#00B488] to-[#009A74] p-8 rounded-[2.5rem] text-white shadow-xl shadow-emerald-200 relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] mb-4 opacity-80">Total em estoque</p>
              <div className="text-5xl font-black tracking-tighter">{totalStock}</div>
            </div>
            <Box size={80} className="absolute -bottom-4 -right-4 opacity-10 rotate-12 group-hover:scale-110 transition-transform" />
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden mb-10">
        <div className="overflow-x-auto text-[10px] sm:text-xs">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="px-10 py-10 text-left font-black text-slate-300 uppercase tracking-widest">Produto</th>
                <th className="px-10 py-10 text-left font-black text-slate-300 uppercase tracking-widest text-center">Categoria</th>
                <th className="px-10 py-10 text-left font-black text-slate-300 uppercase tracking-widest text-center">Quantidade</th>
                <th className="px-10 py-10 text-right font-black text-slate-300 uppercase tracking-widest">Preço Un.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-10 py-8 font-black text-slate-700 text-lg tracking-tight">
                    {item.name}
                  </td>
                  <td className="px-10 py-8 text-center">
                    <span className="bg-purple-50 text-[#7C25E9] px-4 py-1.5 rounded-lg font-black text-[9px] uppercase tracking-widest">
                       {item.name.includes('Camisa') || item.id === 1 || item.id === 3 ? 'CALÇADOS' : 'ACESSÓRIOS'}
                    </span>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center justify-center gap-4">
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, -1)}
                        className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-[#00B488] hover:text-[#00B488] transition-all"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-black text-slate-800 text-xl w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, 1)}
                        className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-[#00B488] hover:text-[#00B488] transition-all"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <span className="font-black text-[#00B488] text-xl tracking-tighter">
                        R$ {item.unitPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alert Banner */}
      {lowStockCount > 0 && (
        <div className="bg-rose-50 border border-rose-100 rounded-[2.5rem] p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="flex items-center gap-6">
            <div className="bg-[#EF4444] p-5 rounded-2xl text-white shadow-lg shadow-rose-200 relative z-10">
              <AlertCircle size={32} />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-black text-rose-600 uppercase tracking-tight mb-1">Produtos Acabando!</h3>
              <p className="text-rose-500 font-bold text-sm">Alguns itens estão no nível crítico. Reponha logo para não perder vendas.</p>
            </div>
          </div>
          
          <div className="absolute -right-8 -bottom-8 text-rose-200 opacity-20">
            <AlertCircle size={180} />
          </div>
        </div>
      )}
    </div>
  );
}
