import React from 'react';
import { HeartPulse, Target, TrendingUp, AlertCircle } from 'lucide-react';
import { BusinessHealth } from '../App';

interface SaudeProps {
  health: BusinessHealth;
}

export default function Saude({ health }: SaudeProps) {
  return (
    <div className="max-w-5xl mx-auto pb-8">
      <header className="mb-8 text-center sm:text-left">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center sm:justify-start gap-3">
          <HeartPulse className="text-[#7C25E9]" />
          Saúde do seu Negócio
        </h1>
        <p className="text-slate-400 font-medium text-xs uppercase tracking-widest mt-1">Análise automatizada baseada em seus dados</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
            <div className="relative w-48 h-48 mb-6">
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="transparent"
                        className="text-slate-100"
                    />
                    <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 88}
                        strokeDashoffset={2 * Math.PI * 88 * (1 - health.score / 100)}
                        className="text-[#00B488] transition-all duration-1000"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-black text-slate-900">{health.score}</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Score Vital</span>
                </div>
            </div>
            
            <h2 className={`text-xl font-black mb-2 ${health.status === 'Bom' ? 'text-[#00B488]' : health.status === 'Alerta' ? 'text-amber-500' : 'text-rose-500'}`}>
                Status: {health.status}
            </h2>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-[2rem] flex items-start gap-5">
            <div className="bg-[#00B488] p-3 rounded-2xl text-white shadow-lg shadow-emerald-500/10 shrink-0">
                <Target size={24} />
            </div>
            <div>
                <h3 className="font-black text-emerald-600 text-[10px] uppercase tracking-widest mb-2">Recomendação Anty</h3>
                <p className="text-slate-700 font-bold leading-relaxed">{health.recommendation}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="text-slate-400" size={18} />
                    <h3 className="font-black text-slate-900 text-[10px] uppercase tracking-widest">Metas do Mês</h3>
                </div>
                <div className="space-y-3">
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#00B488] w-[75%] rounded-full" />
                    </div>
                    <p className="text-[10px] font-bold text-slate-500">Vendas: 75% da meta atingida</p>
                </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-[2rem] text-white overflow-hidden relative">
                <AlertCircle className="absolute -bottom-2 -right-2 text-white opacity-10" size={80} />
                <h3 className="font-bold text-xs mb-2">Lembrete</h3>
                <p className="text-[11px] opacity-70 leading-relaxed font-medium">Não esqueça de pagar o DAS-MEI até o dia 20 para manter seus benefícios previdenciários.</p>
            </div>
        </div>
      </div>
    </div>
  );
}
