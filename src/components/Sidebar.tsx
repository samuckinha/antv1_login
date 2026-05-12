import { motion } from 'motion/react';
import { 
  Home, 
  BarChart3, 
  Box, 
  MessageSquare, 
  HeartPulse, 
  Radar, 
  User, 
  Settings, 
  Crown, 
  LogOut 
} from 'lucide-react';
import { Page } from '../App';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

export default function Sidebar({ currentPage, onNavigate, onLogout }: SidebarProps) {
  const menuItems = [
    { id: 'inicio', label: 'Início', icon: Home },
    { id: 'dre', label: 'Minha DRE', icon: BarChart3 },
    { id: 'estoque', label: 'Estoque', icon: Box },
    { id: 'ia', label: 'Assistente IA', icon: MessageSquare },
    { id: 'saude', label: 'Saúde Negócio', icon: HeartPulse },
    { id: 'radar', label: 'Radar PRO', icon: Radar, isPro: true },
    { id: 'perfil', label: 'Perfil', icon: User },
  ] as const;

  return (
    <aside className="w-60 bg-white h-full min-h-screen border-r border-slate-200 flex flex-col sticky top-0 font-sans">
      {/* Logo */}
      <div className="p-5 flex items-center gap-3">
        <div>
          <h1 className="text-xl font-black bg-gradient-to-r from-[#7C25E9] to-[#00B488] bg-clip-text text-transparent tracking-tighter uppercase">
            ANT
          </h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">
            Automate aNd Transform
          </p>
        </div>
      </div>

      {/* Menu Principal */}
      <nav className="flex-1 px-3 space-y-1 mt-4">
        {menuItems.map((item) => {
          const isActive = currentPage === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as Page)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all group ${
                isActive
                  ? 'bg-[#00B488] text-white shadow-md shadow-emerald-500/20'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-[#00B488]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={18}
                  className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-[#00B488]'}
                />
                <span className="font-bold text-sm tracking-tight">{item.label}</span>
              </div>

              {item.isPro && !isActive && (
                <Crown size={14} className="text-amber-500" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-slate-100 mt-auto">
        {/* Ajustes */}
        <button
          onClick={() => onNavigate('ajustes')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-1 ${
            currentPage === 'ajustes'
              ? 'bg-[#7C25E9] text-white shadow-md shadow-purple-500/20'
              : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          <div
            className={`p-1.5 rounded-lg transition-colors ${
              currentPage === 'ajustes'
                ? 'bg-white/20 text-white'
                : 'bg-[#7C25E9]/10 text-[#7C25E9]'
            }`}
          >
            <Settings size={18} />
          </div>
          <div className="text-left">
            <p className={`font-bold text-sm ${currentPage === 'ajustes' ? 'text-white' : 'text-slate-700'}`}>
              Ajustes
            </p>
            <p className={`text-[10px] uppercase font-bold ${currentPage === 'ajustes' ? 'text-white/70' : 'text-slate-400'}`}>
              Configurações
            </p>
          </div>
        </button>

        {/* Sair */}
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
        >
          <LogOut size={18} />
          <span className="font-bold text-sm">Sair</span>
        </button>
      </div>
    </aside>
  );
}