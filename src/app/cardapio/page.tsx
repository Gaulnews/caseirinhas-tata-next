import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cardápio do Dia e Marmitas Caseiras | Caseirinhas da Tatá',
  description: 'Conheça nosso cardápio de refeições caseiras. Bife à Parmegiana, pratos executivos e opções diárias com ingredientes frescos na Zona Norte de Londrina.',
  keywords: ['cardapio marmita londrina', 'bife a parmegiana delivery', 'almoço caseiro', 'marmitex zona norte londrina'],
  alternates: { canonical: 'https://caseirinhasdatata.shop/cardapio' },
};

export default function CardapioPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    'name': 'Cardápio Oficial - Caseirinhas da Tatá',
    'url': 'https://caseirinhasdatata.shop/cardapio',
    'offers': { '@type': 'Offer', 'priceCurrency': 'BRL', 'price': '18.00' }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-gray-100 p-6 md:p-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-4xl mx-auto">
        <nav className="mb-10 flex gap-4 text-sm border-b border-zinc-800 pb-4">
          <Link href="/" className="text-zinc-400 hover:text-yellow-400 transition-colors">&larr; Voltar para Home</Link>
          <Link href="/servicos" className="text-zinc-400 hover:text-yellow-400 transition-colors">Serviços</Link>
          <Link href="/contatos" className="text-zinc-400 hover:text-yellow-400 transition-colors">Contatos</Link>
        </nav>
        <h1 className="text-4xl font-extrabold text-yellow-400 mb-4">Cardápio do Dia</h1>
        <p className="text-zinc-300 text-lg mb-8">Refeições preparadas diariamente com sabor de casa. Todas as marmitas acompanham: Arroz, Feijão, Batata, Couve, Cenoura e Farofa.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-zinc-100 mb-2">Bife à Parmegiana</h2>
            <p className="text-zinc-400 mb-4">Nossa especialidade coberta com muito queijo e molho artesanal.</p>
            <p className="text-yellow-400 font-bold text-xl mb-6">R$ 22,00</p>
            <a href="https://wa.me/5543996749607?text=Quero%20pedir%20o%20Parmegiana" target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-yellow-400 text-zinc-950 text-center font-bold rounded-lg hover:bg-yellow-300">Pedir no WhatsApp</a>
          </div>
          
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-zinc-100 mb-2">Prato Executivo</h2>
            <p className="text-zinc-400 mb-4">A escolha balanceada do dia com a proteína principal da casa.</p>
            <p className="text-yellow-400 font-bold text-xl mb-6">R$ 18,00</p>
            <a href="https://wa.me/5543996749607?text=Qual%20o%20prato%20de%20hoje?" target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-yellow-400 text-zinc-950 text-center font-bold rounded-lg hover:bg-yellow-300">Consultar Opção do Dia</a>
          </div>
        </div>
      </div>
    </main>
  );
}
