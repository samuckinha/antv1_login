import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, 
  Palette, 
  Bell, 
  Eye, 
  Type, 
  Sparkles,
  Sun,
  Moon,
  Check
} from 'lucide-react';

interface AjustesProps {
  fontScale: 1 | 2 | 3;
  setFontScale: (scale: 1 | 2 | 3) => void;
}

export default function Ajustes({ fontScale, setFontScale }: AjustesProps) {
  const [theme, setTheme] = useState<'claro' | 'escuro'>('claro');
  const [visualFeedback, setVisualFeedback] = useState(true);
  const [colorFilter, setColorFilter] = useState<'padrao' | 'protanopia' | 'deuteranopia' | 'tritanopia'>('padrao');
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const filters = [
    { id: 'padrao', name: 'CORES PADRÃO', desc: 'Interface original do ANT', color: 'bg-[#7C25E9]' },
    { id: 'protanopia', name: 'PROTANOPIA', desc: 'Dificuldade com tons de vermelho', color: 'bg-slate-100' },
    { id: 'deuteranopia', name: 'DEUTERANOPIA', desc: 'Dificuldade com tons de verde', color: 'bg-slate-100' },
    { id: 'tritanopia', name: 'TRITANOPIA', desc: 'Dificuldade com tons de azul', color: 'bg-slate-100' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-sans">
      <header className="mb-10 flex items-center gap-4">
        <div className="bg-[#7C25E9] p-3 rounded-2xl text-white shadow-lg shadow-purple-200">
          <Settings size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-[#1E293B] tracking-tighter uppercase mb-1">Ajustes & Sistema</h1>
          <p className="text-slate-400 font-bold text-sm italic">Configure o ANT para o seu melhor conforto.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Aparência */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-8">
            <Palette className="text-[#7C25E9]" size={20} />
            <h2 className="font-black text-slate-800 uppercase tracking-widest text-xs">Aparência</h2>
          </div>

          <div className="bg-slate-50 p-2 rounded-2xl flex items-center">
            <button 
              onClick={() => setTheme('claro')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs transition-all ${
                theme === 'claro' 
                ? 'bg-white text-[#7C25E9] shadow-md shadow-slate-200/50' 
                : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Sun size={14} /> Claro
            </button>
            <button 
              onClick={() => setTheme('escuro')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs transition-all ${
                theme === 'escuro' 
                ? 'bg-[#1E293B] text-white shadow-md shadow-slate-900/20' 
                : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Moon size={14} /> Escuro
            </button>
          </div>
        </motion.section>

        {/* Feedback Visual */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="bg-emerald-50 text-emerald-500 p-4 rounded-2xl">
              <Bell size={24} />
            </div>
            <div>
              <h2 className="font-black text-slate-800 uppercase tracking-widest text-xs">Feedback Visual</h2>
              <p className="text-slate-400 text-[10px] font-bold">Brilha ao agir (Ideal para Surdos)</p>
            </div>
          </div>

          <button 
            onClick={() => setVisualFeedback(!visualFeedback)}
            className={`w-14 h-8 rounded-full relative transition-colors ${visualFeedback ? 'bg-[#00B488]' : 'bg-slate-200'}`}
          >
            <motion.div 
              animate={{ x: visualFeedback ? 24 : 4 }}
              className="absolute top-1 left-0 w-6 h-6 bg-white rounded-full shadow-sm"
            />
          </button>
        </motion.section>
      </div>

      {/* Filtros de Daltonismo */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm mb-8"
      >
        <div className="flex items-center gap-3 mb-8">
          <Eye className="text-amber-500" size={20} />
          <h2 className="font-black text-slate-800 uppercase tracking-widest text-xs">Filtros de Daltonismo</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setColorFilter(f.id as any)}
              className={`p-6 rounded-[2rem] text-left transition-all relative group ${
                colorFilter === f.id 
                ? `${f.id === 'padrao' ? 'bg-[#7C25E9] text-white' : 'bg-slate-900 text-white'} shadow-xl scale-[1.02]` 
                : 'bg-slate-50 hover:bg-slate-100'
              }`}
            >
              <h3 className={`font-black text-[10px] tracking-widest mb-1 ${colorFilter === f.id ? 'text-white' : 'text-slate-800'}`}>
                {f.name}
              </h3>
              <p className={`text-[9px] font-bold leading-tight ${colorFilter === f.id ? 'text-white/70' : 'text-slate-400'}`}>
                {f.desc}
              </p>
              
              {colorFilter === f.id && (
                <div className="absolute top-4 right-4 bg-white/20 p-1 rounded-full">
                  <Check size={12} />
                </div>
              )}
            </button>
          ))}
        </div>
      </motion.section>

      {/* Acessibilidade Adicional */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Tamanho da Fonte */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-8">
            <Type className="text-blue-500" size={20} />
            <h2 className="font-black text-slate-800 uppercase tracking-widest text-xs">Tamanho da Fonte</h2>
          </div>

          <div className="flex items-center gap-2">
            {[
              { id: 'normal', scale: 1 as 1 }, 
              { id: 'grande', scale: 2 as 2 }, 
              { id: 'extra', scale: 3 as 3 }
            ].map((size) => (
              <button
                key={size.id}
                onClick={() => setFontScale(size.scale)}
                className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                  fontScale === size.scale 
                  ? 'bg-blue-500 text-white shadow-md shadow-blue-200' 
                  : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                }`}
              >
                {size.id}
              </button>
            ))}
          </div>
        </motion.section>

        {/* Alto Contraste */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="bg-slate-900 text-white p-4 rounded-2xl">
              <Eye size={24} />
            </div>
            <div>
              <h2 className="font-black text-slate-800 uppercase tracking-widest text-xs">Alto Contraste</h2>
              <p className="text-slate-400 text-[10px] font-bold">Mais nitidez em textos e ícones</p>
            </div>
          </div>

          <button 
            onClick={() => setHighContrast(!highContrast)}
            className={`w-14 h-8 rounded-full relative transition-colors ${highContrast ? 'bg-slate-900' : 'bg-slate-200'}`}
          >
            <motion.div 
              animate={{ x: highContrast ? 24 : 4 }}
              className="absolute top-1 left-0 w-6 h-6 bg-white rounded-full shadow-sm"
            />
          </button>
        </motion.section>

        {/* Redução de Movimento */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="bg-amber-50 text-amber-600 p-4 rounded-2xl">
              <Sparkles size={24} />
            </div>
            <div>
              <h2 className="font-black text-slate-800 uppercase tracking-widest text-xs">Reduzir Movimento</h2>
              <p className="text-slate-400 text-[10px] font-bold">Ideal para evitar tonturas ou distrações</p>
            </div>
          </div>

          <button 
            onClick={() => setReduceMotion(!reduceMotion)}
            className={`w-14 h-8 rounded-full relative transition-colors ${reduceMotion ? 'bg-amber-500' : 'bg-slate-200'}`}
          >
            <motion.div 
              animate={{ x: reduceMotion ? 24 : 4 }}
              className="absolute top-1 left-0 w-6 h-6 bg-white rounded-full shadow-sm"
            />
          </button>
        </motion.section>
      </div>

      {/* Banner de Rodapé */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-emerald-50 border-2 border-[#00B488] p-6 rounded-[2rem] flex items-center gap-6"
      >
        <div className="bg-white p-4 rounded-2xl shadow-sm text-[#00B488]">
          <Sparkles size={24} />
        </div>
        <div>
          <h3 className="font-black text-[#1E293B] uppercase tracking-wider text-sm mb-1">Conforto é Produtividade</h3>
          <p className="text-slate-500 text-xs font-medium">As configurações acima facilitam o seu dia a dia. Escolha o que faz você se sentir melhor no comando do seu negócio.</p>
        </div>
      </motion.div>
    </div>
  );
}
