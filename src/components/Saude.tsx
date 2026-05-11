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
                  stroke="