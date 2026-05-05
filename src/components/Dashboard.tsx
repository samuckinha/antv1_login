import { motion } from 'motion/react';
import { 
  Lightbulb, 
  Radar, 
  DollarSign, 
  ShoppingBag, 
  TrendingUp, 
  Zap,
  Sparkles,
  ChevronRight,
  Crown,
  HeartPulse
} from 'lucide-react';
import { Page, StockItem, BusinessHealth, RadarTrend } from '../App';
import { DREItem } from './DRE';

interface DashboardProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
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

export default function Dashboard({ currentPage, onNavigate, dreData, stockData, healthData, radarTrends, userInfo }: DashboardProps) {
  if (currentPage !== 'inicio') {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-500">
        <Sparkles size={48} className="mb-4 opacity-20" />
        <h2 className="text-xl font-bold">Módulo <span className="capitalize">{currentPage}</span></h2>
        <p className="text-sm">Em breve, esta tela exibirá seus dados detalhados de {currentPage}. Por enquanto, consulte o Anty!</p>
        <button onClick={() => onNavigate('inicio')} className="mt-4 px-5 py-2 bg-slate-800 text-slate-300 rounded-xl font-bold text-sm">Voltar ao Início</button>
      </div>
    );
  }

  const totalReceitas = dreData.filter(i => i.tipo === 'RECEITA').reduce((acc, c) => acc + c.valor, 0);
  const totalDespesas = dreData.filter(i => i.tipo === 'DESPESA').reduce((acc, c) => acc + c.valor, 0);
  const lucroLiquido = totalReceitas - totalDespesas;
  const criticalStockCount = stockData.filter(s => s.quantity < s.minQuantity).length;

  return (
    <div className="max-w-5xl mx-auto pb-8">
      {/* Header Area */}
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            Olá, {userInfo.name.split(' ')[0] || 'Empreendedor'}! 👋
          </h1>
          <p className="text-slate-400 italic font-medium text-xs">{userInfo.businessName} • {userInfo.niche}</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-amber-200 text-amber-600 px-4 py-2 rounded-xl shadow-sm hover:shadow-emerald-500/5 transition-all">
          <Crown size={16} className="fill-amber-400 text-amber-400" />
          <span className="font-bold text-[10px] uppercase tracking-widest">Acesso {userInfo.level} Ativo</span>
        </button>
      </header>

      {/* Top Banner & Radar PRO */}
      <div className="grid lg:grid-cols-3 gap-5 mb-6">
        <div className="lg:col-span-2 bg-emerald-50 border border-emerald-100 rounded-2xl p-5 flex items-start gap-5 relative overflow-hidden group">
          <div className="bg-[#00B488] p-2.5 rounded-xl text-white shadow-lg shadow-emerald-500/10">
            <Lightbulb size={20} />
          </div>
          <div className="flex-1">
            <p className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-1">Dica ANT do Dia</p>
            <p className="text-slate-600 font-bold leading-relaxed text-base">
              {healthData.recommendation} – <span className="text-[#00B488]">Anty</span>
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#7C25E9] to-[#5A1AB3] rounded-2xl p-5 text-white relative overflow-hidden shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-amber-400 text-[#7C25E9] p-1 rounded-lg">
              <Crown size={14} />
            </div>
            <p className="text-[9px] font-black uppercase tracking-[0.2em]">Radar Pro</p>
          </div>
          <h3 className="text-xl font-black mb-1">{radarTrends[0].topic}</h3>
          <p className="text-purple-100 text-[11px] opacity-70 font-medium tracking-tight">Tendência alta em seu nicho!</p>
          <div className="absolute -bottom-4 -right-4 opacity-10 rotate-12">
            <Radar size={120} />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={DollarSign} label="Receita Total" value={`R$ ${totalReceitas.toLocaleString('pt-BR')}`} trend="+12%" color="emerald" />
        <StatCard icon={ShoppingBag} label="Produtos em Estoque" value={`${stockData.reduce((acc, c) => acc + c.quantity, 0)} un.`} trend={`${criticalStockCount} críticos`} color="purple" trendDown={criticalStockCount > 0} />
        <StatCard icon={TrendingUp} label="Lucro Líquido" value={`R$ ${lucroLiquido.toLocaleString('pt-BR')}`} trend="+18%" color="emerald" />
        <StatCard icon={HeartPulse} label="Saúde Negócio" value={`${healthData.score}%`} trend={healthData.status} color="purple" trendDown={healthData.status === 'Crítico'} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* DRE Area */}
        <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-black text-slate-400 uppercase tracking-widest text-[11px]">DRE Simplificada</h2>
            <button 
              onClick={() => onNavigate('dre')}
              className="text-[#7C25E9] flex items-center gap-1 font-bold text-xs group"
            >
              Ver Completa 
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="font-bold text-slate-500 text-sm">Faturamento Bruto</span>
              <span className="font-medium text-slate-900 text-base tracking-tight">R$ {totalReceitas.toLocaleString('pt-BR')}</span>
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="flex items-center justify-between p-6 bg-emerald-500 text-white rounded-2xl shadow-lg shadow-emerald-500/10 border border-emerald-400/20"
            >
              <span className="font-black text-[10px] uppercase tracking-widest">Lucro Operacional</span>
              <span className="font-medium text-2xl tracking-tighter">R$ {lucroLiquido.toLocaleString('pt-BR')}</span>
            </motion.div>
          </div>
        </section>

        {/* Marketing Area */}
        <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-xl font-black text-slate-900 mb-3">Seu Marketing Inteligente</h2>
            <p className="text-slate-400 font-medium text-xs mb-8 max-w-[280px]">
              Crie roteiros para Reels e fotos profissionais baseadas nas tendências da sua rua.
            </p>
            
            <button 
              onClick={() => onNavigate('ia')}
              className="w-full bg-[#7C25E9] text-white py-4 rounded-2xl font-black text-base shadow-lg shadow-purple-500/20 hover:translate-y-[-1px] transition-all flex items-center justify-center gap-2"
            >
              <Sparkles size={18} />
              Gerar Conteúdo com IA
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  trend, 
  color, 
  trendDown = false 
}: { 
  icon: any, 
  label: string, 
  value: string, 
  trend: string, 
  color: 'emerald' | 'purple',
  trendDown?: boolean
}) {
  const colorClass = color === 'emerald' ? 'bg-[#00B488]' : 'bg-[#7C25E9]';
  const trendColor = trendDown ? 'text-rose-400' : 'text-[#00B488]';

  return (
    <motion.div 
      whileHover={{ y: -3 }}
      className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 group transition-all hover:shadow-md"
    >
      <div className="flex items-center justify-between mb-6">
        <div className={`${colorClass} p-2.5 rounded-xl text-white shadow-lg`}>
          <Icon size={20} />
        </div>
        <div className={`${trendColor} text-[10px] font-black uppercase tracking-widest`}>
          {trend}
        </div>
      </div>
      <div>
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">{label}</p>
        <p className="text-base font-medium text-slate-900 tracking-tight transition-colors group-hover:text-[#00B488]">{value}</p>
      </div>
    </motion.div>
  );
}
