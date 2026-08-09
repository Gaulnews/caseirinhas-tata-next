import { Metadata } from 'next';
import Link from 'next/link';
import { categorias } from '@/lib/site-data';

// SEO Avançado injetado no Head da página
export const metadata: Metadata = {
  title: 'Categorias de Refeições | Caseirinhas da Tatá',
  description: 'Explore nossas categorias: Pratos do Dia, Pacotes Corporativos (B2B), Opções Fit e Sobremesas. Comida caseira com entrega rápida.',
  keywords: ['marmitex', 'almoço corporativo', 'comida caseira', 'delivery', 'cardápio do dia'],
  alternates: { canonical: 'https://caseirinhasdatata.shop/categorias' },
};

export default function CategoriasPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-gray-100 p-8 max-w-5xl mx-auto font-sans">
      <header className="mb-10 border-b border-zinc-800 pb-6">
        <h1 className="text-4xl font-bold text-yellow-400 tracking-tight">Categorias</h1>
        <p className="text-zinc-400 mt-2 text-lg">Navegue por todas as nossas opções de refeições e serviços.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categorias.map((cat) => (
          <Link href={`/categorias/${cat.slug}`} key={cat.slug} className="block group">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 h-full transition-all duration-300 hover:border-yellow-400 hover:bg-zinc-800/50">
              <h2 className="text-xl font-bold text-zinc-100 group-hover:text-yellow-400 transition-colors">{cat.nome}</h2>
              <p className="text-zinc-400 mt-3">{cat.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
