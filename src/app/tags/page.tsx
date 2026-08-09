import { Metadata } from 'next';
import Link from 'next/link';
import { tags, tagSlug } from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'Tags e Regiões de Entrega | Caseirinhas da Tatá',
  description: 'Descubra nossos pratos filtrados por regiões de entrega rápida, incluindo Zona Norte, Cinco Conjuntos e mais.',
  keywords: ['Zona Norte', 'Cinco Conjuntos', 'entrega grátis', 'marmita rápida', 'almoço barato'],
  alternates: { canonical: 'https://caseirinhasdatata.shop/tags' },
};

export default function TagsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-gray-100 p-8 max-w-5xl mx-auto font-sans">
      <header className="mb-10 border-b border-zinc-800 pb-6">
        <h1 className="text-4xl font-bold text-yellow-400 tracking-tight">Explorar por Tags</h1>
        <p className="text-zinc-400 mt-2 text-lg">Encontre rapidamente o que você procura através das nossas marcações de rotina e regiões de entrega.</p>
      </header>

      <div className="flex flex-wrap gap-4">
        {tags.map((tag) => (
          <Link href={`/tags/${tagSlug(tag)}`} key={tag}>
            <span className="inline-block bg-zinc-900 border border-zinc-700 text-zinc-300 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:bg-yellow-400 hover:text-zinc-950 hover:border-yellow-400 cursor-pointer shadow-sm">
              {tag}
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
