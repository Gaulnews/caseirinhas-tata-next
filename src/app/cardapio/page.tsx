import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SeletorTamanho } from '@/components/SeletorTamanho';
import {
  cardapioSemanal,
  diasSemana,
  tamanhos,
  formatarPreco,
  getDiaSemanaAtual,
} from '@/lib/cardapio-semanal';

// Revalida a cada hora: o cardápio muda todo dia, mas a página continua
// estática/em cache entre revalidações (melhor para performance e CWV do
// que renderizar a cada requisição).
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const diaAtual = getDiaSemanaAtual();
  const prato = diaAtual !== 'domingo' ? cardapioSemanal[diaAtual] : null;
  const diaLabel = diasSemana.find((d) => d.key === diaAtual)?.label;

  if (prato) {
    return {
      title: `Cardápio de ${diaLabel}: ${prato.tema}`,
      description: `${prato.ingredientes.join(', ')}. Marmitas Mini, Média e Grande a partir de R$ ${formatarPreco(tamanhos[0].preco)}. Peça agora com entrega rápida na Zona Norte de Londrina!`,
      keywords: prato.palavrasChave,
      alternates: { canonical: 'https://caseirinhasdatata.shop/cardapio' },
    };
  }

  return {
    title: 'Cardápio do Dia e Marmitas Caseiras',
    description: 'Cardápio rotativo diário com marmitas caseiras em 3 tamanhos: Mini, Média e Grande. Entrega rápida na Zona Norte de Londrina.',
    keywords: ['cardapio marmita londrina', 'marmita caseira delivery', 'almoço caseiro zona norte londrina'],
    alternates: { canonical: 'https://caseirinhasdatata.shop/cardapio' },
  };
}

export default function CardapioPage() {
  const diaAtual = getDiaSemanaAtual();
  const fechado = diaAtual === 'domingo';
  const pratoHoje = !fechado ? cardapioSemanal[diaAtual] : null;
  const diaAtualLabel = diasSemana.find((d) => d.key === diaAtual)?.label ?? 'Domingo';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: 'Cardápio Oficial - Caseirinhas da Tatá',
    url: 'https://caseirinhasdatata.shop/cardapio',
    ...(pratoHoje
      ? {
          hasMenuSection: {
            '@type': 'MenuSection',
            name: `Cardápio de ${diaAtualLabel}`,
            description: pratoHoje.tema,
            hasMenuItem: tamanhos.map((t) => ({
              '@type': 'MenuItem',
              name: `${pratoHoje.tema} - Tamanho ${t.nome}`,
              description: pratoHoje.ingredientes.join(', '),
              offers: { '@type': 'Offer', priceCurrency: 'BRL', price: t.preco.toFixed(2) },
            })),
          },
        }
      : {}),
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-gray-100 p-6 md:p-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-5xl mx-auto">
        <nav className="mb-10 flex gap-4 text-sm border-b border-zinc-800 pb-4">
          <Link href="/" className="text-zinc-400 hover:text-yellow-400 transition-colors">&larr; Voltar para Home</Link>
          <Link href="/servicos" className="text-zinc-400 hover:text-yellow-400 transition-colors">Serviços</Link>
          <Link href="/contatos" className="text-zinc-400 hover:text-yellow-400 transition-colors">Contatos</Link>
        </nav>

        <header className="mb-10">
          <span className="inline-block text-xs bg-[#ffc107]/10 text-[#ffc107] px-3 py-1 rounded-full border border-[#ffc107]/20 font-mono mb-4">
            {fechado ? 'FECHADO HOJE' : `CARDÁPIO DE ${diaAtualLabel.toUpperCase()}`}
          </span>
          <h1 className="text-4xl font-extrabold text-yellow-400 mb-4">Cardápio do Dia</h1>
          <p className="text-zinc-300 text-lg">
            Prato quentinho, feito na hora, todos os dias — em três tamanhos: Mini, Média e Grande.
          </p>
        </header>

        {fechado ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center mb-14">
            <h2 className="text-2xl font-bold text-zinc-100 mb-2">Não abrimos aos domingos</h2>
            <p className="text-zinc-400">Volte amanhã para conferir o cardápio de segunda-feira, ou fale com a gente para encomendas especiais.</p>
            <a
              href="https://wa.me/5543996749607"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-xl bg-[#ffc107] px-6 py-3 font-bold text-black hover:bg-[#ffca28] transition-colors"
            >
              Chamar no WhatsApp
            </a>
          </div>
        ) : pratoHoje ? (
          <section className="mb-14 grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <div className="overflow-hidden rounded-2xl border border-zinc-800">
                <Image
                  src={pratoHoje.imagem!}
                  alt={pratoHoje.imagemAlt!}
                  width={1200}
                  height={896}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
              {pratoHoje.video && (
                <video
                  src={pratoHoje.video}
                  poster={pratoHoje.imagem}
                  className="w-full rounded-2xl border border-zinc-800"
                  controls
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  Seu navegador não suporta vídeo. Confira a marmita de {diaAtualLabel.toLowerCase()} no WhatsApp.
                </video>
              )}
            </div>

            <div>
              <h2 className="text-3xl font-bold text-zinc-100 mb-4">{pratoHoje.tema}</h2>
              <ul className="mb-6 flex flex-wrap gap-2">
                {pratoHoje.ingredientes.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <SeletorTamanho pratoNome={pratoHoje.tema} />
            </div>
          </section>
        ) : (
          <section className="mb-14 rounded-2xl border border-zinc-800 bg-zinc-900 p-8 md:p-10">
            <h2 className="text-2xl font-bold text-zinc-100 mb-2">Cardápio de {diaAtualLabel} em preparação</h2>
            <p className="text-zinc-400 mb-6">
              A opção de hoje ainda está sendo publicada. Fale com a gente no WhatsApp pra saber o prato do dia — os tamanhos e preços abaixo já valem para o pedido.
            </p>
            <SeletorTamanho pratoNome={`Prato do dia - ${diaAtualLabel}`} />
          </section>
        )}

        <section aria-label="Cardápio da semana">
          <h2 className="text-xl font-bold text-zinc-100 mb-4">Cardápio da Semana</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {diasSemana.map((dia) => {
              const prato = cardapioSemanal[dia.key];
              const ehHoje = dia.key === diaAtual;
              return (
                <div
                  key={dia.key}
                  className={`rounded-xl border p-4 text-center ${
                    ehHoje ? 'border-[#ffc107] bg-[#ffc107]/5' : 'border-zinc-800 bg-zinc-900'
                  }`}
                >
                  <p className={`text-xs font-bold mb-1 ${ehHoje ? 'text-[#ffc107]' : 'text-zinc-500'}`}>
                    {dia.label}
                  </p>
                  <p className="text-sm text-zinc-300">{prato ? prato.tema : 'Em breve'}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
