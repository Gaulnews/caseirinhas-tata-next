import { Metadata } from 'next';
import Link from 'next/link';
import { Utensils, CheckCircle2, ShoppingBag, Clock, PhoneCall } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cardápio de Marmitas Caseiras em Londrina | Caseirinhas da Tatá',
  description: 'Confira nosso cardápio completo de refeições caseiras diárias. Bife à Parmegiana, pratos executivos e opções fit com entrega rápida na Zona Norte de Londrina.',
  keywords: ['cardapio marmita londrina', 'marmitex zona norte londrina', 'almoço caseiro', 'parmegiana delivery'],
  alternates: { canonical: 'https://caseirinhasdatata.shop/cardapio' },
};

export default function CardapioPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    'name': 'Cardápio Caseirinhas da Tatá',
    'mainEntityOfPage': 'https://caseirinhasdatata.shop/cardapio',
    'inLanguage': 'pt-BR',
    'offers': {
      '@type': 'AggregateOffer',
      'priceCurrency': 'BRL',
      'price': '18.00',
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-gray-100 p-6 md:p-12 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-5xl mx-auto">
        <nav className="mb-8 flex items-center justify-between border-b border-zinc-800 pb-4">
          <Link href="/" className="text-yellow-400 font-bold text-xl flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-yellow-400 text-zinc-950 flex items-center justify-center text-sm font-extrabold">CT</span>
            Caseirinhas da Tatá
          </Link>
          <div className="flex gap-4 text-sm font-medium">
            <Link href="/" className="text-zinc-400 hover:text-yellow-400 transition-colors">Início</Link>
            <Link href="/servicos" className="text-zinc-400 hover:text-yellow-400 transition-colors">Serviços</Link>
            <Link href="/contatos" className="text-zinc-400 hover:text-yellow-400 transition-colors">Contatos</Link>
          </div>
        </nav>
        <header className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400/10 text-yellow-400 rounded-full text-xs font-semibold border border-yellow-400/20 mb-3">
            <Utensils className="w-3.5 h-3.5" /> Entrega Rápida em Londrina
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-100 tracking-tight">Nosso Cardápio</h1>
          <p className="text-zinc-400 mt-3 text-lg max-w-2xl mx-auto">Todas as nossas refeições são preparadas diariamente com ingredientes selecionados e sabor caseiro de verdade.</p>
        </header>
        <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 mb-10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800/80 hover:border-yellow-400/50 transition-all">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-zinc-100">Bife à Parmegiana</h3>
                <span className="text-yellow-400 font-extrabold text-lg">R$ 22,00</span>
              </div>
              <p className="text-zinc-400 text-sm mb-4">Suculento bife empanado, coberto com molho artesanal de tomate e queijo derretido quentinho.</p>
              <a href="https://wa.me/5543996749607?text=Olá!%20Gostaria%20de%20pedir%20o%20Bife%20à%20Parmegiana." className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-yellow-400 text-zinc-950 font-bold rounded-lg hover:bg-yellow-300 transition-colors text-sm">
                <ShoppingBag className="w-4 h-4" /> Pedir no WhatsApp
              </a>
            </div>
            <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800/80 hover:border-yellow-400/50 transition-all">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-zinc-100">Prato do Dia Executivo</h3>
                <span className="text-yellow-400 font-extrabold text-lg">R$ 18,00</span>
              </div>
              <p className="text-zinc-400 text-sm mb-4">Proteína especial do dia acompanhada da nossa base tradicional completa.</p>
              <a href="https://wa.me/5543996749607?text=Olá!%20Qual%20é%20o%20Prato%20do%20Dia%20de%20hoje?" className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-yellow-400 text-zinc-950 font-bold rounded-lg hover:bg-yellow-300 transition-colors text-sm">
                <ShoppingBag className="w-4 h-4" /> Consultar Opção do Dia
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
