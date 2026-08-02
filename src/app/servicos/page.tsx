import { Metadata } from 'next';
import Link from 'next/link';
import { Truck, Building2, Gift, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Serviços de Delivery e Pacotes B2B | Caseirinhas da Tatá',
  description: 'Soluções em refeições corporativas B2B, fornecimento semanal para empresas e delivery rápido em Londrina. Alimente sua equipe com sabor caseiro.',
  keywords: ['marmita corporativa londrina', 'almoço empresa londrina', 'pacotes b2b alimentacao', 'delivery zona norte londrina'],
  alternates: { canonical: 'https://caseirinhasdatata.shop/servicos' },
};

export default function ServicosPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-gray-100 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        <nav className="mb-8 flex items-center justify-between border-b border-zinc-800 pb-4">
          <Link href="/" className="text-yellow-400 font-bold text-xl flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-yellow-400 text-zinc-950 flex items-center justify-center text-sm font-extrabold">CT</span>
            Caseirinhas da Tatá
          </Link>
          <div className="flex gap-4 text-sm font-medium">
            <Link href="/" className="text-zinc-400 hover:text-yellow-400 transition-colors">Início</Link>
            <Link href="/cardapio" className="text-zinc-400 hover:text-yellow-400 transition-colors">Cardápio</Link>
            <Link href="/contatos" className="text-zinc-400 hover:text-yellow-400 transition-colors">Contatos</Link>
          </div>
        </nav>
        <header className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400/10 text-yellow-400 rounded-full text-xs font-semibold border border-yellow-400/20 mb-3">
            <Building2 className="w-3.5 h-3.5" /> Soluções B2C e B2B
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-100 tracking-tight">Nossos Serviços</h1>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <Truck className="w-8 h-8 text-yellow-400 mb-4" />
              <h2 className="text-xl font-bold text-zinc-100 mb-2">Delivery Residencial</h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">Entrega rápida de marmitas bem servidas e quentinhas na porta da sua casa, principalmente na Zona Norte.</p>
            </div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <Building2 className="w-8 h-8 text-yellow-400 mb-4" />
              <h2 className="text-xl font-bold text-zinc-100 mb-2">Pacotes Corporativos B2B</h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">Convênios mensais e semanais com empresas. Garantimos refeições saborosas e entregas pontuais.</p>
            </div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <Gift className="w-8 h-8 text-yellow-400 mb-4" />
              <h2 className="text-xl font-bold text-zinc-100 mb-2">Degustação sem Custo</h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">Agendamos uma visita comercial para levar marmitas de degustação gratuitamente para a gerência da sua empresa.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
