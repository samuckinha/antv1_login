import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Store, 
  Target, 
  Mail, 
  Briefcase, 
  Calendar, 
  Fingerprint, 
  ShieldCheck,
  RefreshCw,
  Phone,
  Instagram,
  MapPin,
  ChevronDown,
  CreditCard,
  Rocket,
  Camera,
  X,
  Check
} from 'lucide-react';

interface PerfilProps {
  userInfo: {
    name: string;
    email: string;
    phone: string;
    businessName: string;
    niche: string;
    foundationYear: string;
    cnpj: string;
    porte: string;
    instagram: string;
    address: string;
    salesChannel: string;
    taxRegime: string;
    level: string;
    profileImage: string | null;
  };
  setUserInfo: React.Dispatch<React.SetStateAction<any>>;
}

export default function Perfil({ userInfo, setUserInfo }: PerfilProps) {
  const [showPhotoChoice, setShowPhotoChoice] = React.useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleChange = (field: string, value: string) => {
    setUserInfo((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('profileImage', reader.result as string);
        setShowPhotoChoice(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    setShowPhotoChoice(false);
    fileInputRef.current?.click();
  };

  const openCamera = async () => {
    setShowPhotoChoice(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: 400, height: 400 },
        audio: false 
      });
      setCameraStream(stream);
      setIsCameraOpen(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Erro ao acessar a câmera:", err);
      alert("Não foi possível acessar a câmera. Verifique as permissões do navegador.");
    }
  };

  const closeCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
    }
    setCameraStream(null);
    setIsCameraOpen(false);
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageData = canvas.toDataURL('image/jpeg');
        handleChange('profileImage', imageData);
        closeCamera();
      }
    }
  };

  useEffect(() => {
    if (isCameraOpen && videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [isCameraOpen, cameraStream]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-sans">
      <header className="mb-10">
        <h1 className="text-3xl font-black text-slate-800 tracking-tighter uppercase mb-1">Seu Perfil</h1>
        <p className="text-slate-400 font-bold text-sm">Informações fundamentais para a Anty te conhecer melhor.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Forms */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* SOBRE VOCÊ & CONTATO */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-emerald-50 p-2 rounded-xl text-[#00B488]">
                <User size={20} />
              </div>
              <h2 className="font-black text-slate-800 uppercase tracking-widest text-xs">Sobre Você & Contato</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-300 uppercase tracking-widest block ml-4">Seu Nome Completo</label>
                <input 
                  type="text" 
                  value={userInfo.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full bg-slate-50 border-none h-14 rounded-2xl px-6 text-slate-600 font-bold focus:ring-4 focus:ring-[#00B488]/10 transition-all"
                  placeholder="Empreendedor"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-300 uppercase tracking-widest block ml-4">WhatsApp / Telefone</label>
                <div className="relative">
                  <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="text" 
                    value={userInfo.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full bg-slate-50 border-none h-14 rounded-2xl pl-14 pr-6 text-slate-600 font-bold focus:ring-4 focus:ring-[#00B488]/10 transition-all"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-300 uppercase tracking-widest block ml-4">E-mail de Contato</label>
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="email" 
                    value={userInfo.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full bg-slate-50 border-none h-14 rounded-2xl pl-14 pr-6 text-slate-600 font-bold focus:ring-4 focus:ring-[#00B488]/10 transition-all"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-300 uppercase tracking-widest block ml-4">Instagram do Negócio</label>
                <div className="relative">
                  <Instagram className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="text" 
                    value={userInfo.instagram}
                    onChange={(e) => handleChange('instagram', e.target.value)}
                    className="w-full bg-slate-50 border-none h-14 rounded-2xl pl-14 pr-6 text-slate-600 font-bold focus:ring-4 focus:ring-[#00B488]/10 transition-all"
                    placeholder="@seunegocio"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* SEU NEGÓCIO & LOCALIZAÇÃO */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-purple-50 p-2 rounded-xl text-[#7C25E9]">
                <Store size={20} />
              </div>
              <h2 className="font-black text-slate-800 uppercase tracking-widest text-xs">Seu Negócio & Localização</h2>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-300 uppercase tracking-widest block ml-4">Nome Fantasia</label>
                  <input 
                    type="text" 
                    value={userInfo.businessName}
                    onChange={(e) => handleChange('businessName', e.target.value)}
                    className="w-full bg-slate-50 border-none h-14 rounded-2xl px-6 text-slate-600 font-bold focus:ring-4 focus:ring-purple-500/10 transition-all"
                    placeholder="Meu Negócio ANT"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-300 uppercase tracking-widest block ml-4">Endereço / Bairro (Para Radar PRO)</label>
                  <div className="relative">
                    <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="text" 
                      value={userInfo.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      className="w-full bg-slate-50 border-none h-14 rounded-2xl pl-14 pr-6 text-slate-600 font-bold focus:ring-4 focus:ring-purple-500/10 transition-all"
                      placeholder="Cidade, Bairro"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-300 uppercase tracking-widest block ml-4">Setor de Atuação</label>
                  <div className="relative">
                    <Briefcase className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="text" 
                      value={userInfo.niche}
                      onChange={(e) => handleChange('niche', e.target.value)}
                      className="w-full bg-slate-50 border-none h-14 rounded-2xl pl-14 pr-6 text-slate-600 font-bold focus:ring-4 focus:ring-purple-500/10 transition-all"
                      placeholder="Calçados"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-300 uppercase tracking-widest block ml-4">Ano de Fundação</label>
                  <div className="relative">
                    <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="text" 
                      value={userInfo.foundationYear}
                      onChange={(e) => handleChange('foundationYear', e.target.value)}
                      className="w-full bg-slate-50 border-none h-14 rounded-2xl pl-14 pr-6 text-slate-600 font-bold focus:ring-4 focus:ring-purple-500/10 transition-all"
                      placeholder="Ex: 2021"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-300 uppercase tracking-widest block ml-4">CNPJ</label>
                  <input 
                    type="text" 
                    value={userInfo.cnpj}
                    onChange={(e) => handleChange('cnpj', e.target.value)}
                    className="w-full bg-slate-50 border-none h-14 rounded-2xl px-6 text-slate-600 font-bold focus:ring-4 focus:ring-purple-500/10 transition-all"
                    placeholder="00.000.000/0001-00"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-300 uppercase tracking-widest block ml-4">Porte</label>
                  <div className="relative">
                    <select 
                      value={userInfo.porte}
                      onChange={(e) => handleChange('porte', e.target.value)}
                      className="w-full bg-slate-50 border-none h-14 rounded-2xl px-6 text-slate-600 font-bold focus:ring-4 focus:ring-purple-500/10 transition-all appearance-none cursor-pointer"
                    >
                      <option value="MEI">MEI</option>
                      <option value="Microempresa">Microempresa</option>
                      <option value="EPP">EPP</option>
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* DETALHES OPERACIONAIS */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-amber-50 p-2 rounded-xl text-amber-500">
                <CreditCard size={20} />
              </div>
              <h2 className="font-black text-slate-800 uppercase tracking-widest text-xs">Detalhes Operacionais</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-300 uppercase tracking-widest block ml-4">Regime Tributário</label>
                <div className="relative">
                  <select 
                    value={userInfo.taxRegime}
                    onChange={(e) => handleChange('taxRegime', e.target.value)}
                    className="w-full bg-slate-50 border-none h-14 rounded-2xl px-6 text-slate-600 font-bold focus:ring-4 focus:ring-amber-500/10 transition-all appearance-none cursor-pointer"
                  >
                    <option value="Simples Nacional">Simples Nacional</option>
                    <option value="Lucro Presumido">Lucro Presumido</option>
                    <option value="Lucro Real">Lucro Real</option>
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-300 uppercase tracking-widest block ml-4">Principal Canal de Venda</label>
                <div className="relative">
                  <select 
                    value={userInfo.salesChannel}
                    onChange={(e) => handleChange('salesChannel', e.target.value)}
                    className="w-full bg-slate-50 border-none h-14 rounded-2xl px-6 text-slate-600 font-bold focus:ring-4 focus:ring-amber-500/10 transition-all appearance-none cursor-pointer"
                  >
                    <option value="Instagram">Instagram</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Loja Física">Loja Física</option>
                    <option value="Marketplace">Marketplace (Shopee/ML)</option>
                    <option value="Site Próprio">Site Próprio</option>
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column - Cards */}
        <div className="lg:col-span-4 space-y-6">
          {/* Summary Card */}
          <div className="bg-[#0F172A] p-8 rounded-[3rem] text-white text-center shadow-2xl shadow-slate-900/20 relative">
            <div className="relative group mx-auto mb-6 w-24 h-24">
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <button 
                onClick={() => setShowPhotoChoice(!showPhotoChoice)}
                className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 overflow-hidden relative transition-all active:scale-95"
              >
                {userInfo.profileImage ? (
                  <img src={userInfo.profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl font-black text-white">{userInfo.name[0] || 'E'}</span>
                )}
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity border-none cursor-pointer">
                  <Camera size={24} className="text-white" />
                </div>
              </button>

              <AnimatePresence>
                {showPhotoChoice && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 bg-white rounded-2xl shadow-2xl overflow-hidden z-20 border border-slate-100"
                  >
                    <button 
                      onClick={openCamera}
                      className="w-full px-6 py-4 text-left hover:bg-slate-50 flex items-center gap-3 transition-colors border-b border-slate-50"
                    >
                      <Camera size={16} className="text-emerald-500" />
                      <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Tirar foto</span>
                    </button>
                    <button 
                      onClick={triggerFileInput}
                      className="w-full px-6 py-4 text-left hover:bg-slate-50 flex items-center gap-3 transition-colors"
                    >
                      <Briefcase size={16} className="text-purple-500" />
                      <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Escolher da Galeria</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <h3 className="text-2xl font-black mb-1">{userInfo.name || 'Empreendedor'}</h3>
            <p className="text-slate-400 font-bold text-xs mb-6 uppercase tracking-widest">{userInfo.businessName}</p>
            
            <div className="flex items-center justify-center gap-4 mb-8">
                <span className="text-[10px] font-black uppercase tracking-widest bg-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#00B488] rounded-full" /> {userInfo.porte}
                </span>
                <div className="w-px h-4 bg-slate-700" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Matriz</span>
            </div>

            <button className="w-full bg-linear-to-r from-[#00B488] to-[#009A74] text-white py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all">
                <RefreshCw size={16} /> Atualizar Perfil
            </button>
          </div>

          {/* Secure Environment Card */}
          <div className="bg-[#7C25E9] p-8 rounded-[3rem] text-white text-center shadow-xl shadow-purple-200">
            <div className="bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Fingerprint size={28} />
            </div>
            <h4 className="font-black uppercase tracking-widest text-xs mb-2">Ambiente Seguro</h4>
            <p className="text-purple-100 text-[10px] font-bold leading-relaxed opacity-80">
                Seus dados são usados apenas para personalizar sua experiência com a Anty.
            </p>
          </div>
        </div>
      </div>

      {/* Camera Modal */}
      <AnimatePresence>
        {isCameraOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[2.5rem] overflow-hidden w-full max-w-md shadow-2xl"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Capturar Foto</span>
                <button onClick={closeCamera} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="aspect-square bg-slate-900 relative flex items-center justify-center overflow-hidden">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  className="w-full h-full object-cover scale-x-[-1]"
                />
                <canvas ref={canvasRef} className="hidden" />
              </div>

              <div className="p-8 flex justify-center gap-6">
                <button 
                  onClick={takePhoto}
                  className="w-20 h-20 bg-[#00B488] text-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-200 active:scale-90 transition-transform"
                >
                  <div className="w-16 h-16 border-4 border-white/30 rounded-full flex items-center justify-center">
                    <Camera size={32} />
                  </div>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
