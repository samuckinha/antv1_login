import React from 'react';
import { HeartPulse, Target, TrendingUp, AlertCircle } from 'lucide-react';
import { BusinessHealth } from '../App';

interface SaudeProps {
  health: BusinessHealth;
}

export default function Saude({ health }: SaudeProps) {
  // Cálculos do círculo de progresso
  const score = Math.max(0, Math.min(100, health.score ?? 0));
  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference * (1 - score / 100);

  // Cor dinâmica do status
  const statusColor =
    health.status === 'Bom'
      ? 'text-[#00B488]'
      : health.status === 'Alerta'
      ? 'text-amber-500'
      : 'text-rose-500';

  return (
    <div className="max-w-5xl mx-auto pb-8">
      <header className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center justify-center sm:justify-start gap-3">
          <HeartPulse className="text-[#7C25E9]" size={36} />
          Saúde do seu Negócio
        </h1>
        <p className="text-slate-500 font-medium text-sm uppercase tracking-widest mt-2">
          Análise automatizada baseada em seus dados
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Coluna Principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Score Vital */}
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
            <div className="relative w-52 h-52 mb-8">
              <svg
                className="w-full h-full -rotate-90"
                viewBox="0 0 192 192"
              >
                {/* Círculo de fundo */}
                <circle
                  cx="96"
                  cy="96"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="14"
                  fill="transparent"
                  className="text-slate-100"
                />
                {/* Círculo de progresso */}
                <circle
                  cx="96"
                  cy="96"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="14"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={progressOffset}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#00B488] transition-all duration-1000 ease-out"
                />
              </svg>

              {/* Valor central */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-7xl font-black text-slate-900">{score}</span>
                <span className="text-xs font-black text-slate-400 uppercase tracking-[2px] mt-1">
                  SCORE VITAL
                </span>
              </div>
            </div>

            <h2 className={`text-2xl font-black ${statusColor}`}>
              Status: {health.status}
            </h2>
          </div>

          {/* Recomendação Anty */}
          <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-[2rem] flex gap-6">
            <div className="bg-[#00B488] p-4 rounded-2xl text-white shrink-0">
              <Target size={28} />
            </div>
            <div>
              <h3 className="font-black text-emerald-700 text-sm uppercase tracking-widest mb-3">
                Recomendação Anty
              </h3>
              <p className="text-slate-700 leading-relaxed text-[15px]">
                {health.recommendation}
              </p>
            </div>
          </div>
        </div>

        {/* Coluna Lateral */}
        <div className="space-y-6">
          {/* Metas do Mês */}
          <div className="bg-white p-7 rounded-[2rem] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <TrendingUp className="text-slate-400" size={22} />
              <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm">
                Metas do Mês
              </h3>
            </div>
            <div className="space-y-4">
              <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#00B488] rounded-full transition-all duration-700"
                  style={{ width: '75%' }}
                />
              </div>
              <p className="text-sm font-semibold text-slate-600">
                Vendas: <span className="text-emerald-600 font-bold">75%</span> da meta atingida
              </p>
            </div>
          </div>

          {/* Lembrete */}
          <div className="bg-slate-900 p-7 rounded-[2rem] text-white relative overflow-hidden">
            <AlertCircle 
              className="absolute -bottom-6 -right-6 text-white/10" 
              size={110} 
            />
            <h3 className="font-bold text-lg mb-3">Lembrete</h3>
            <p className="text-slate-300 leading-relaxed">
              Não esqueça de pagar o <strong className ="text-white">DAS-MEI</strong> até o dia 20 
              para manter seus benefícios previdenciários em dia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}