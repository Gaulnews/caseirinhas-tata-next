import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { categorias } from '@/lib/site-data';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return categorias.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categoria = categorias.find((cat) => cat.slug === slug);

  if (!categoria) {
    return { title: 'Categoria não encontrada' };
  }

  return {
    title: categoria.nome,
    description: `${categoria.desc} Peça agora pelo WhatsApp e receba comida caseira com entrega rápida em Londrina.`,
    alternates: { canonical: `https://caseirinhasdatata.shop/categorias/${categoria.slug}` },
  };
}

export default async function CategoriaDetalhePage({ params }: Props) {
  const { slug } = await params;
  const categoria = categorias.find((cat) => cat.slug === slug);

  if (!categoria) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-gray-100 p-8 max-w-4xl mx-auto font-sans">
      <nav className="mb-10 flex gap-4 text-sm border-b border-zinc-800 pb-4">
        <Link href="/" className="text-zinc-400 hover:text-yellow-400 transition-colors">&larr; Voltar para Home</Link>
        <Link href="/categorias" className="text-zinc-400 hover:text-yellow-400 transition-colors">Todas as Categorias</Link>
        <Link href="/cardapio" className="text-zinc-400 hover:text-yellow-400 transition-colors">Cardápio</Link>
      </nav>

      <header className="mb-10 border-b border-zinc-800 pb-6">
        <span className="text-xs bg-yellow-400/10 text-yellow-400 px-3 py-1 rounded-full border border-yellow-400/20 font-mono">
          CATEGORIA
        </span>
        <h1 className="text-4xl font-bold text-yellow-400 tracking-tight mt-4">{categoria.nome}</h1>
        <p className="text-zinc-400 mt-2 text-lg">{categoria.desc}</p>
      </header>

      <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold text-zinc-100 mb-3">Como pedir</h2>
        <p className="text-zinc-400">
          Fale diretamente com a gente pelo WhatsApp e consulte as opções do dia dentro da categoria{' '}
          <strong className="text-zinc-300">{categoria.nome}</strong>.
        </p>
      </section>

      <div className="flex flex-wrap gap-4">
        <a
          href={`https://wa.me/5543996749607?text=Olá!%20Gostaria%20de%20ver%20as%20opções%20de%20${encodeURIComponent(categoria.nome)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-yellow-400 text-zinc-950 font-bold px-6 py-3 rounded-lg hover:bg-yellow-300 transition-colors"
        >
          Pedir no WhatsApp
        </a>
        <Link
          href="/categorias"
          className="bg-zinc-800 text-zinc-300 px-6 py-3 rounded-lg hover:bg-zinc-700 transition-colors"
        >
          Ver Outras Categorias
        </Link>
      </div>
    </main>
  );
}
