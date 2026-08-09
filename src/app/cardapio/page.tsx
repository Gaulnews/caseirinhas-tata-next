import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SeletorTamanho } from '@/components/SeletorTamanho';
import { ScrollVideo } from '@/components/ScrollVideo';
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

const SITE_URL = 'https://caseirinhasdatata.shop';

export async function generateMetadata(): Promise<Metadata> {
  const diaAtual = getDiaSemanaAtual();
  const prato = cardapioSemanal[diaAtual];
  const diaLabel = diasSemana.find((d) => d.key === diaAtual)?.label;

  if (prato) {
    const descricao = prato.opcoes
      ? `Domingo tem 3 opções especiais: ${prato.opcoes.map((o) => o.tema).join(', ')}. Marmitas Mini, Média e Grande a partir de R$ ${formatarPreco(tamanhos[0].preco)}. Peça agora com entrega rápida na Zona Norte de Londrina!`
      : `${prato.ingredientes.join(', ')}. Marmitas Mini, Média e Grande a partir de R$ ${formatarPreco(tamanhos[0].preco)}. Peça agora com entrega rápida na Zona Norte de Londrina!`;

    return {
      title: prato.opcoes ? `Cardápio de ${diaLabel}: 3 Opções Especiais` : `Cardápio de ${diaLabel}: ${prato.tema}`,
      description: descricao,
      keywords: prato.palavrasChave,
      alternates: { canonical: `${SITE_URL}/cardapio` },
      openGraph: prato.imagem
        ? {
            title: `Cardápio de ${diaLabel} - Caseirinhas da Tatá`,
            description: descricao,
            url: `${SITE_URL}/cardapio`,
            images: [
              {
                url: `${SITE_URL}${prato.imagem}`,
                width: prato.imagemLargura ?? 1200,
                height: prato.imagemAltura ?? 896,
                alt: prato.imagemAlt ?? prato.tema,
              },
            ],
          }
        : undefined,
    };
  }

  return {
    title: 'Cardápio do Dia e Marmitas Caseiras',
    description: 'Cardápio rotativo diário com marmitas caseiras em 3 tamanhos: Mini, Média e Grande. Entrega rápida na Zona Norte de Londrina.',
    keywords: ['cardapio marmita londrina', 'marmita caseira delivery', 'almoço caseiro zona norte londrina'],
    alternates: { canonical: `${SITE_URL}/cardapio` },
  };
}

export default function CardapioPage() {
  const diaAtual = getDiaSemanaAtual();
  const pratoHoje = cardapioSemanal[diaAtual];
  const diaAtualLabel = diasSemana.find((d) => d.key === diaAtual)?.label ?? diaAtual;

  const videoObjects: Record<string, unknown>[] = [];
  if (pratoHoje?.video) {
    videoObjects.push({
      '@type': 'VideoObject',
      name: `${pratoHoje.tema} - Caseirinhas da Tatá`,
      description: pratoHoje.opcoes
        ? `Cardápio de ${diaAtualLabel} da Caseirinhas da Tatá: ${pratoHoje.opcoes.map((o) => o.tema).join(', ')}`
        : `Cardápio de ${diaAtualLabel} da Caseirinhas da Tatá: ${pratoHoje.ingredientes.join(', ')}`,
      thumbnailUrl: pratoHoje.imagem ? [`${SITE_URL}${pratoHoje.imagem}`] : undefined,
      uploadDate: '2026-08-09',
      contentUrl: `${SITE_URL}${pratoHoje.video}`,
    });
  }
  pratoHoje?.opcoes?.forEach((opcao) => {
    if (opcao.video) {
      videoObjects.push({
        '@type': 'VideoObject',
        name: `${opcao.tema} - Caseirinhas da Tatá`,
        description: opcao.ingredientes.join(', '),
        thumbnailUrl: opcao.imagem
          ? [`${SITE_URL}${opcao.imagem}`]
          : pratoHoje?.imagem
            ? [`${SITE_URL}${pratoHoje.imagem}`]
            : undefined,
        uploadDate: '2026-08-09',
        contentUrl: `${SITE_URL}${opcao.video}`,
      });
    }
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: 'Cardápio Oficial - Caseirinhas da Tatá',
    url: `${SITE_URL}/cardapio`,
    ...(pratoHoje
      ? {
          hasMenuSection: pratoHoje.opcoes
            ? pratoHoje.opcoes.map((opcao) => ({
                '@type': 'MenuSection',
                name: `Cardápio de ${diaAtualLabel} - ${opcao.tema}`,
                description: opcao.ingredientes.join(', '),
                hasMenuItem: tamanhos.map((t) => ({
                  '@type': 'MenuItem',
                  name: `${opcao.tema} - Tamanho ${t.nome}`,
                  description: opcao.ingredientes.join(', '),
                  offers: { '@type': 'Offer', priceCurrency: 'BRL', price: t.preco.toFixed(2) },
                })),
              }))
            : {
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
      {videoObjects.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': videoObjects }) }}
        />
      )}
      <div className="max-w-5xl mx-auto">
        <nav className="mb-10 flex gap-4 text-sm border-b border-zinc-800 pb-4">
          <Link href="/" className="text-zinc-400 hover:text-yellow-400 transition-colors">&larr; Voltar para Home</Link>
          <Link href="/servicos" className="text-zinc-400 hover:text-yellow-400 transition-colors">Serviços</Link>
          <Link href="/contatos" className="text-zinc-400 hover:text-yellow-400 transition-colors">Contatos</Link>
        </nav>

        <header className="mb-10">
          <span className="inline-block text-xs bg-[#ffc107]/10 text-[#ffc107] px-3 py-1 rounded-full border border-[#ffc107]/20 font-mono mb-4">
            CARDÁPIO DE {diaAtualLabel.toUpperCase()}
          </span>
          <h1 className="text-4xl font-extrabold text-yellow-400 mb-4">Cardápio do Dia</h1>
          <p className="text-zinc-300 text-lg">
            Prato quentinho, feito na hora, todos os dias — em três tamanhos: Mini, Média e Grande.
          </p>
        </header>

        {pratoHoje?.opcoes ? (
          <section className="mb-14">
            <div className="mb-8 grid gap-8 md:grid-cols-2 items-center">
              <div className="space-y-4">
                {pratoHoje.imagem && (
                  <div className="overflow-hidden rounded-2xl border border-zinc-800">
                    <Image
                      src={pratoHoje.imagem}
                      alt={pratoHoje.imagemAlt ?? pratoHoje.tema}
                      width={pratoHoje.imagemLargura ?? 1024}
                      height={pratoHoje.imagemAltura ?? 1024}
                      className="h-auto w-full object-cover"
                      priority
                    />
                  </div>
                )}
                {pratoHoje.video && (
                  <ScrollVideo
                    src={pratoHoje.video}
                    poster={pratoHoje.imagem}
                    className="w-full rounded-2xl border border-zinc-800"
                  >
                    Seu navegador não suporta vídeo. Confira o cardápio de {diaAtualLabel.toLowerCase()} no WhatsApp.
                  </ScrollVideo>
                )}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-zinc-100 mb-4">{pratoHoje.tema}</h2>
                <p className="text-zinc-400">
                  Escolha uma das 3 opções especiais de domingo abaixo e o tamanho da sua marmita.
                </p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {pratoHoje.opcoes.map((opcao) => (
                <div key={opcao.id} className="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                  {opcao.imagem && (
                    <div className="mb-4 overflow-hidden rounded-xl border border-zinc-800">
                      <Image
                        src={opcao.imagem}
                        alt={opcao.imagemAlt ?? opcao.tema}
                        width={opcao.imagemLargura ?? 1024}
                        height={opcao.imagemAltura ?? 1024}
                        className="h-auto w-full object-cover"
                      />
                    </div>
                  )}
                  {opcao.video && (
                    <ScrollVideo
                      src={opcao.video}
                      poster={opcao.imagem}
                      className="mb-4 w-full rounded-xl border border-zinc-800"
                    >
                      Seu navegador não suporta vídeo. Confira a {opcao.tema} no WhatsApp.
                    </ScrollVideo>
                  )}
                  <h3 className="text-xl font-bold text-zinc-100 mb-2">{opcao.tema}</h3>
                  <ul className="mb-6 flex flex-wrap gap-2">
                    {opcao.ingredientes.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1 text-xs text-zinc-300"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <SeletorTamanho pratoNome={opcao.tema} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : pratoHoje ? (
          <section className="mb-14 grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <div className="overflow-hidden rounded-2xl border border-zinc-800">
                <Image
                  src={pratoHoje.imagem!}
                  alt={pratoHoje.imagemAlt!}
                  width={pratoHoje.imagemLargura ?? 1200}
                  height={pratoHoje.imagemAltura ?? 896}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
              {pratoHoje.video && (
                <ScrollVideo
                  src={pratoHoje.video}
                  poster={pratoHoje.imagem}
                  className="w-full rounded-2xl border border-zinc-800"
                >
                  Seu navegador não suporta vídeo. Confira a marmita de {diaAtualLabel.toLowerCase()} no WhatsApp.
                </ScrollVideo>
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
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-7">
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
                  <p className="text-sm text-zinc-300">
                    {prato ? (prato.opcoes ? '3 opções especiais' : prato.tema) : 'Em breve'}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
