import React from 'react';
import { Radar as RadarIcon, Crown, TrendingUp, Users, Share2 } from 'lucide-react';
import { RadarTrend } from '../App';

interface RadarProps {
  trends: RadarTrend[];
}

export default function Radar({ trends }: RadarProps) {
  return (
    <div className="max-w-5xl mx-auto pb-8">
      <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <RadarIcon className="text-[#7C25E9]" />
            Radar PRO
          </h1>
          <p className="text-slate-400 font-medium text-xs uppercase tracking-widest mt-1">Tendências locais em tempo real</p>
        </div>
        <div className="bg-amber-100 text-amber-700 px-4 py-2 rounded-xl flex items-center gap-2 border border-amber-200">
          <Crown size={18} className="fill-amber-400" />
          <span className="font-black text-[10px] uppercase tracking-widest">Plano PRO Ativo</span>
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {trends.map((trend, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-6">
                <div className="bg-slate-50 p-3 rounded-2xl text-slate-400 group-hover:text-[#7C25E9] transition-colors">
                    <TrendingUp size={24} />
                </div>
                <div className="text-[#7C25E9] font-black text-xl">
                    {trend.relevance}%
                </div>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">{trend.topic}</h3>
            <p className="text-slate-400 text-xs font-medium leading-relaxed">
                Alta procura detectada por ferramentas de busca e redes sociais no seu bairro nos últimos 7 dias.
            </p>
            <div className="mt-6 flex gap-2">
                <button className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-600 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
                    <Users size={14} /> Influenciadores
                </button>
                <button className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-600 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
                    <Share2 size={14} /> Criar Post
                </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#7C25E9] p-8 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center gap-8 overflow-hidden relative">
        <RadarIcon size={200} className="absolute -right-20 opacity-10 rotate-12" />
        <div className="flex-1 relative z-10">
          <h2 className="text-2xl font-black mb-4 tracking-tight text-center md:text-left">Deseja um roteiro personalizado?</h2>
          <p className="text-purple-100 font-medium mb-6 text-center md:text-left max-w-md">
            O Anty pode criar scripts de Reels para cada uma destas tendências focando no seu público alvo local.
          </p>
          <div className="flex justify-center md:justify-start">
            <button className="bg-white text-[#7C25E9] px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-purple-900/20 hover:scale-105 transition-all">
                Abrir Assistente agora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
