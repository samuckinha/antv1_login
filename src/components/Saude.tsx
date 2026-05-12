const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public')); // caso queira adicionar assets depois

// ==================== TODO O CÓDIGO HTML + CSS + JS ====================
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ANT - O cérebro do seu negócio</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
    body { font-family: 'Inter', sans-serif; }
    .hero-bg { background: linear-gradient(135deg, #7C25E9 0%, #00B488 100%); }
  </style>
</head>
<body class="font-sans">

  <!-- LANDING PAGE -->
  <div id="landing" class="min-h-screen bg-white text-slate-600">

    <!-- Header -->
    <nav class="hero-bg flex items-center justify-between px-6 py-4 border-b border-white/10">
      <div class="max-w-6xl mx-auto w-full flex items-center justify-between">
        <span class="text-white font-black text-3xl tracking-tighter">ANT</span>
        
        <div class="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-white/80">
          <a href="#funcionalidades" class="hover:text-white transition-colors">Funcionalidades</a>
          <a href="#planos" class="hover:text-white transition-colors">Planos</a>
          <a href="#" class="hover:text-white transition-colors">Sobre</a>
        </div>

        <button onclick="showLogin()" 
          class="bg-white text-[#00B488] px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">
          Login
        </button>
      </div>
    </nav>

    <!-- Hero -->
    <section class="px-6 py-24 max-w-6xl mx-auto text-center">
      <div class="inline-flex items-center gap-2 bg-white/20 text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8 backdrop-blur-md">
        ⚡ Automate aNd Transform
      </div>
      <h1 class="text-5xl md:text-7xl font-black text-slate-900 leading-tight mb-8 tracking-tighter">
        O cérebro do seu <span class="text-[#00B488]">negócio</span><br>impulsionado por IA.
      </h1>
      <p class="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
        Automatize estoque, finanças e receba inteligência estratégica em tempo real.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button onclick="showLogin()" 
          class="bg-[#00B488] text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-xl shadow-emerald-500/30">
          Começar Agora <i class="fas fa-arrow-right"></i>
        </button>
        <button class="border border-slate-300 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all">
          Teste grátis por 30 dias
        </button>
      </div>
    </section>

    <!-- Features -->
    <section id="funcionalidades" class="bg-slate-50 py-20 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-black text-slate-900">Tudo em um só lugar</h2>
          <p class="text-slate-500 mt-3">Construído para máxima eficiência</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all">
            <div class="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-3xl mb-6">📈</div>
            <h3 class="text-2xl font-black mb-3">Finanças</h3>
            <p class="text-slate-600">DRE automática, fluxo de caixa inteligente e previsões.</p>
          </div>

          <div class="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all">
            <div class="w-14 h-14 bg-purple-500 rounded-2xl flex items-center justify-center text-white text-3xl mb-6">📦</div>
            <h3 class="text-2xl font-black mb-3">Estoque</h3>
            <p class="text-slate-600">Previsão de demanda com IA e alertas automáticos.</p>
          </div>

          <div class="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all">
            <div class="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center text-white text-3xl mb-6">🧠</div>
            <h3 class="text-2xl font-black mb-3">IA Estratégica</h3>
            <p class="text-slate-600">Assistente que analisa seus dados e sugere as melhores decisões.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section id="planos" class="py-24 px-6 bg-white">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-black text-slate-900">Escolha seu plano</h2>
        </div>

        <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <!-- Plano Base -->
          <div class="bg-[#1a1c2e] p-10 rounded-3xl text-white flex flex-col">
            <h3 class="text-2xl font-black">Plano Base</h3>
            <p class="text-slate-400 text-sm">Para quem está começando</p>
            <div class="text-5xl font-black my-8">R$ 97 <span class="text-lg font-normal text-slate-400">/mês</span></div>
            <ul class="space-y-4 mb-12 flex-1">
              <li class="flex items-center gap-3"><i class="fas fa-check text-emerald-400"></i> Controle de Estoque</li>
              <li class="flex items-center gap-3"><i class="fas fa-check text-emerald-400"></i> DRE Simplificada</li>
              <li class="flex items-center gap-3"><i class="fas fa-check text-emerald-400"></i> Suporte por email</li>
            </ul>
            <button onclick="showLogin()" class="w-full bg-[#00B488] py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-emerald-600 transition-all">
              Escolher Plano Base
            </button>
          </div>

          <!-- Plano PRO -->
          <div class="bg-[#1a1c2e] p-10 rounded-3xl text-white flex flex-col relative border-2 border-[#7C25E9]">
            <div class="absolute -top-4 right-6 bg-[#7C25E9] text-xs font-black px-6 py-1 rounded-full">RECOMENDADO</div>
            <h3 class="text-2xl font-black">Plano PRO</h3>
            <p class="text-purple-300 text-sm">Inteligência Total</p>
            <div class="text-5xl font-black my-8">R$ 247 <span class="text-lg font-normal text-purple-300">/mês</span></div>
            <ul class="space-y-4 mb-12 flex-1">
              <li class="flex items-center gap-3"><i class="fas fa-check text-emerald-400"></i> Tudo do Plano Base</li>
              <li class="flex items-center gap-3"><i class="fas fa-check text-emerald-400"></i> Radar de Tendências IA</li>
              <li class="flex items-center gap-3"><i class="fas fa-check text-emerald-400"></i> Assistente de Marketing</li>
              <li class="flex items-center gap-3"><i class="fas fa-check text-emerald-400"></i> Suporte 24/7 Prioritário</li>
            </ul>
            <button onclick="showLogin()" class="w-full bg-[#00B488] py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-emerald-600 transition-all">
              Escolher Plano PRO
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-[#0f1120] text-slate-400 py-12 px-6 text-center md:text-left">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <span class="text-white font-black text-2xl">ANT</span>
        <p class="text-xs">© 2026 ANT System • Automate aNd Transform</p>
        <div class="flex gap-6 text-sm">
          <a href="#" class="hover:text-white">Privacidade</a>
          <a href="#" class="hover:text-white">Termos</a>
          <a href="#" class="hover:text-white">Contato</a>
        </div>
      </div>
    </footer>
  </div>

  <!-- LOGIN PAGE -->
  <div id="login" class="min-h-screen bg-slate-50 hidden flex-col">
    <nav class="bg-[#00B488] px-6 py-4">
      <span onclick="showLanding()" class="text-white font-black text-3xl tracking-tighter cursor-pointer">ANT</span>
    </nav>

    <div class="flex-1 flex items-center justify-center p-6">
      <div class="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
        <div class="text-center mb-8">
          <span class="text-5xl font-black bg-gradient-to-r from-[#7C25E9] to-[#00B488] bg-clip-text text-transparent">ANT</span>
          <h2 class="text-2xl font-black mt-4">Bem-vindo de volta</h2>
          <p class="text-slate-500 text-sm">Entre para gerenciar seu negócio</p>
        </div>

        <form onsubmit="handleLogin(event)" class="space-y-6">
          <div>
            <label class="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">E-mail</label>
            <input type="email" value="empreendedor@ant.com" 
              class="w-full px-5 py-4 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#00B488] text-sm">
          </div>
          <div>
            <label class="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Senha</label>
            <input type="password" value="123456" 
              class="w-full px-5 py-4 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#00B488] text-sm">
          </div>
          <button type="submit"
            class="w-full bg-[#00B488] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-[#00a078] transition-all">
            Entrar
          </button>
        </form>

        <div class="text-center mt-8 text-sm">
          <button onclick="alert('Recuperação de senha em desenvolvimento')" class="text-slate-400 hover:text-[#00B488]">
            Esqueceu a senha?
          </button>
          <p class="mt-4 text-slate-500">
            Não tem conta? 
            <button onclick="showLanding()" class="text-[#00B488] font-bold hover:underline">Assine agora</button>
          </p>
        </div>
      </div>
    </div>
  </div>

  <script>
    function showLogin() {
      document.getElementById('landing').classList.add('hidden');
      document.getElementById('login').classList.remove('hidden');
      document.getElementById('login').classList.add('flex');
    }

    function showLanding() {
      document.getElementById('login').classList.add('hidden');
      document.getElementById('landing').classList.remove('hidden');
    }

    function handleLogin(e) {
      e.preventDefault();
      alert('✅ Login realizado com sucesso! (Simulação)');
      // window.location.href = "/dashboard"; // futuro
    }

    // Tailwind Script (executa após carregar)
    tailwind.config = {
      content: [],
      theme: { extend: {} }
    }
  </script>
</body>
</html>
  `);
});

app.listen(PORT, () => {
  console.log(`\n🚀 Servidor ANT rodando em: http://localhost:${PORT}`);
  console.log(`   Pressione Ctrl + C para parar\n`);
});