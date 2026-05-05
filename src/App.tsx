import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import AIAssistant from './components/AIAssistant';
import DRE, { DREItem } from './components/DRE';
import Estoque from './components/Estoque';
import Saude from './components/Saude';
import Radar from './components/Radar';
import Perfil from './components/Perfil';
import Ajustes from './components/Ajustes';

export type Page = 'inicio' | 'dre' | 'estoque' | 'ia' | 'saude' | 'radar' | 'capacitacao' | 'perfil' | 'ajustes';

export interface StockItem {
  id: number;
  name: string;
  quantity: number;
  minQuantity: number;
  unitPrice: number;
}

export interface BusinessHealth {
  score: number; // 0-100
  status: 'Bom' | 'Alerta' | 'Crítico';
  recommendation: string;
}

export interface RadarTrend {
  topic: string;
  relevance: number; // 0-100
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('inicio');
  const [fontScale, setFontScale] = useState<1 | 2 | 3>(1);

  // Lifted state for platform data
  const [dreData, setDreData] = useState<DREItem[]>([
    { id: 1, desc: 'Venda de Produtos', tipo: 'RECEITA', valor: 5000 },
    { id: 2, desc: 'Prestação de Serviços', tipo: 'RECEITA', valor: 3500 },
    { id: 3, desc: 'Impostos sobre Venda', tipo: 'DESPESA', valor: 450 },
    { id: 4, desc: 'Custos de Mercadoria (CPV)', tipo: 'DESPESA', valor: 1200 },
    { id: 5, desc: 'Aluguel / MEI (DAS)', tipo: 'DESPESA', valor: 300 },
    { id: 6, desc: 'Internet e Energia', tipo: 'DESPESA', valor: 150 },
  ]);

  const [stockData, setStockData] = useState<StockItem[]>([
    { id: 1, name: 'Camisa Algodão P', quantity: 45, minQuantity: 10, unitPrice: 32.90 },
    { id: 2, name: 'Camisa Algodão M', quantity: 12, minQuantity: 15, unitPrice: 32.90 },
    { id: 3, name: 'Calça Jeans 42', quantity: 8, minQuantity: 5, unitPrice: 89.90 },
    { id: 4, name: 'Vestido Florido', quantity: 2, minQuantity: 10, unitPrice: 120.00 },
    { id: 5, name: 'Meia Branca', quantity: 120, minQuantity: 50, unitPrice: 9.90 },
  ]);

  const [healthData] = useState<BusinessHealth>({
    score: 82,
    status: 'Bom',
    recommendation: 'Sua margem está saudável, mas o estoque de Camisas M está baixo.'
  });

  const [radarTrends] = useState<RadarTrend[]>([
    { topic: 'Cores Pastéis', relevance: 85 },
    { topic: 'Moda Sustentável', relevance: 70 },
    { topic: 'Entrega em 24h', relevance: 95 },
  ]);

  useEffect(() => {
    // Only apply scaling when authenticated (inside the platform)
    if (isAuthenticated) {
      const sizes = {
        1: '16px',
        2: '32px',
        3: '48px'
      };
      document.documentElement.style.fontSize = sizes[fontScale];
    } else {
      // Reset for landing/login
      document.documentElement.style.fontSize = '16px';
    }

    // Reset when component unmounts
    return () => {
      document.documentElement.style.fontSize = '16px';
    };
  }, [fontScale, isAuthenticated]);

  const [userInfo, setUserInfo] = useState({
    name: 'Empreendedor',
    email: 'seu@email.com',
    phone: '(00) 00000-0000',
    businessName: 'Meu Negócio ANT',
    niche: 'Calçados',
    foundationYear: '2021',
    cnpj: '00.000.000/0001-00',
    porte: 'MEI',
    instagram: '@meunegocio',
    address: 'Seu Bairro, Sua Cidade',
    salesChannel: 'Instagram',
    taxRegime: 'Simples Nacional',
    profileImage: null as string | null,
    level: 'PRO'
  });

  if (!isAuthenticated) {
    return <LandingPage onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} onLogout={() => setIsAuthenticated(false)} />
      
      <main className="flex-1 p-8 overflow-y-auto">
        {currentPage === 'ia' ? <AIAssistant 
          dreData={dreData} 
          stockData={stockData} 
          healthData={healthData}
          radarTrends={radarTrends}
          userInfo={userInfo}
        /> : 
         currentPage === 'dre' ? <DRE onNavigate={setCurrentPage} data={dreData} setData={setDreData} /> :
         currentPage === 'estoque' ? <Estoque data={stockData} setData={setStockData} /> :
         currentPage === 'saude' ? <Saude health={healthData} /> :
         currentPage === 'radar' ? <Radar trends={radarTrends} /> :
         currentPage === 'perfil' ? <Perfil userInfo={userInfo} setUserInfo={setUserInfo} /> :
         currentPage === 'ajustes' ? <Ajustes fontScale={fontScale} setFontScale={setFontScale} /> :
         <Dashboard 
          currentPage={currentPage} 
          onNavigate={setCurrentPage} 
          dreData={dreData} 
          stockData={stockData}
          healthData={healthData}
          radarTrends={radarTrends}
          userInfo={userInfo}
         />}
      </main>
    </div>
  );
}
