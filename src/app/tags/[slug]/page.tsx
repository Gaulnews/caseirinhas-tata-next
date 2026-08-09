import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { tags, tagSlug } from '@/lib/site-data';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return tags.map((tag) => ({ slug: tagSlug(tag) }));
}

function findTag(slug: string): string | undefined {
  return tags.find((tag) => tagSlug(tag) === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = findTag(slug);

  if (!tag) {
    return { title: 'Tag não encontrada | Caseirinhas da Tatá' };
  }

  const nomeFormatado = tag.replace('#', '');

  return {
    title: `${nomeFormatado} | Caseirinhas da Tatá`,
    description: `Entrega rápida de marmitas caseiras filtradas por ${nomeFormatado} em Londrina. Comida quentinha e tempero caseiro. Peça pelo WhatsApp!`,
    alternates: { canonical: `https://caseirinhasdatata.shop/tags/${slug}` },
  };
}

export default async function TagDetalhePage({ params }: Props) {
  const { slug } = await params;
  const tag = findTag(slug);

  if (!tag) {
    notFound();
  }

  const nomeFormatado = tag.replace('#', '');

  return (
    <main className="min-h-screen bg-zinc-950 text-gray-100 p-8 max-w-4xl mx-auto font-sans">
      <nav className="mb-10 flex gap-4 text-sm border-b border-zinc-800 pb-4">
        <Link href="/" className="text-zinc-400 hover:text-yellow-400 transition-colors">&larr; Voltar para Home</Link>
        <Link href="/tags" className="text-zinc-400 hover:text-yellow-400 transition-colors">Todas as Tags</Link>
        <Link href="/cardapio" className="text-zinc-400 hover:text-yellow-400 transition-colors">Cardápio</Link>
      </nav>

      <header className="mb-10 border-b border-zinc-800 pb-6">
        <span className="text-xs bg-yellow-400/10 text-yellow-400 px-3 py-1 rounded-full border border-yellow-400/20 font-mono">
          TAG
        </span>
        <h1 className="text-4xl font-bold text-yellow-400 tracking-tight mt-4">#{nomeFormatado}</h1>
        <p className="text-zinc-400 mt-2 text-lg">
          Pratos e pedidos relacionados a <strong className="text-zinc-300">{nomeFormatado}</strong>.
        </p>
      </header>

      <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold text-zinc-100 mb-3">Vantagens</h2>
        <ul className="list-disc list-inside text-zinc-300 space-y-2">
          <li>Entrega rápida no horário do almoço (11h às 14h30).</li>
          <li>Embalagem térmica que mantém o alimento na temperatura ideal.</li>
          <li>Descontos especiais para pacotes de refeições semanais e mensais para empresas (B2B).</li>
        </ul>
      </section>

      <div className="flex flex-wrap gap-4">
        <a
          href={`https://wa.me/5543996749607?text=Olá!%20Vim%20pela%20tag%20${encodeURIComponent(nomeFormatado)}%20e%20gostaria%20de%20ver%20o%20cardápio%20do%20dia`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-yellow-400 text-zinc-950 font-bold px-6 py-3 rounded-lg hover:bg-yellow-300 transition-colors"
        >
          Fazer Pedido no WhatsApp
        </a>
        <Link
          href="/tags"
          className="bg-zinc-800 text-zinc-300 px-6 py-3 rounded-lg hover:bg-zinc-700 transition-colors"
        >
          Ver Outras Tags
        </Link>
      </div>
    </main>
  );
}
