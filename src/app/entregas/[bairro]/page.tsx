import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { bairros as bairrosAtendidos } from "@/lib/site-data";
import {
  tamanhos,
  formatarPreco,
  cardapioSemanal,
  diasSemana,
  getDiaSemanaAtual,
} from "@/lib/cardapio-semanal";

const SITE_URL = "https://caseirinhasdatata.shop";

type Props = {
  params: Promise<{ bairro: string }>;
};

// 2. Geração Estática de Rotas (Build Validation - Core Web Vitals)
export async function generateStaticParams() {
  return Object.keys(bairrosAtendidos).map((bairro) => ({
    bairro: bairro,
  }));
}

// Revalida a cada hora: a prévia do "Cardápio de Hoje" muda todo dia, mas a
// página continua estática/em cache entre revalidações — mesmo padrão da
// home e do /cardapio.
export const revalidate = 3600;

// 3. SEO Dinâmico (Metadados exclusivos para cada área de cobertura)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { bairro } = await params;
  const nomeBairro = bairrosAtendidos[bairro as keyof typeof bairrosAtendidos] || "Londrina";
  const diaAtual = getDiaSemanaAtual();
  const prato = cardapioSemanal[diaAtual];
  const diaLabel = diasSemana.find((d) => d.key === diaAtual)?.label ?? "";

  const descricao = `Bateu a fome no ${nomeBairro}? Peça sua marmita caseira quentinha com entrega rápida. Cardápio rotativo diário, opções a partir de R$ ${formatarPreco(tamanhos[0].preco)}. Faça seu pedido pelo WhatsApp!`;

  return {
    title: `Marmita Caseira Delivery no ${nomeBairro}: Entrega Rápida`,
    description: descricao,
    keywords: [
      `marmita ${nomeBairro} Londrina`,
      `delivery de comida ${nomeBairro}`,
      `marmitex ${nomeBairro} Londrina`,
      `entrega de marmita ${nomeBairro}`,
      "marmita caseira Zona Norte Londrina",
      "cardápio do dia Londrina",
      ...(prato ? [`cardápio de ${diaLabel.toLowerCase()} Londrina`] : []),
    ],
    alternates: { canonical: `${SITE_URL}/entregas/${bairro}` },
    openGraph: {
      title: `Marmita Caseira Delivery no ${nomeBairro} - Caseirinhas da Tatá`,
      description: descricao,
      url: `${SITE_URL}/entregas/${bairro}`,
      images: [
        prato?.imagem
          ? {
              url: `${SITE_URL}${prato.imagem}`,
              width: prato.imagemLargura ?? 1024,
              height: prato.imagemAltura ?? 1024,
              alt: `${prato.imagemAlt ?? prato.tema} — entrega no ${nomeBairro}`,
            }
          : {
              url: `${SITE_URL}/logo-caseirinhas-da-tata.jpg`,
              width: 1024,
              height: 1024,
              alt: "Logomarca Caseirinhas da Tatá",
            },
      ],
    },
  };
}

// 4. O Server Component da Página
export default async function LocationPage({ params }: Props) {
  const { bairro } = await params;
  const nomeBairro = bairrosAtendidos[bairro as keyof typeof bairrosAtendidos];

  // Se a pessoa digitar um bairro que não existe na URL, mostramos uma mensagem padrão
  if (!nomeBairro) {
    return (
      <main className="min-h-screen flex items-center justify-center text-center px-4">
        <h1 className="text-2xl text-amber-500 font-bold">Área de cobertura não encontrada em nossa rota específica.</h1>
      </main>
    );
  }

  const diaAtual = getDiaSemanaAtual();
  const diaAtualLabel = diasSemana.find((d) => d.key === diaAtual)?.label ?? diaAtual;
  const pratoHoje = cardapioSemanal[diaAtual];

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "name": `Caseirinhas da Tatá - Delivery no ${nomeBairro}`,
    "image": `${SITE_URL}/logo-caseirinhas-da-tata.jpg`,
    "telephone": "+5543996749607",
    "url": `${SITE_URL}/entregas/${bairro}`,
    "priceRange": "$$",
    "servesCuisine": "Brasileira",
    "hasMenu": `${SITE_URL}/cardapio`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rua Maria Sinopoli Francovig, 1142 - Conj. Semíramis Barros Braga",
      "addressLocality": "Londrina",
      "addressRegion": "PR",
      "postalCode": "86088-080",
      "addressCountry": "BR",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-23.26801",
      "longitude": "-51.14480",
    },
    "areaServed": {
      "@type": "Place",
      "name": nomeBairro,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Londrina",
        "addressRegion": "PR",
        "addressCountry": "BR",
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Início", "item": SITE_URL },
      { "@type": "ListItem", "position": 2, "name": "Áreas Atendidas", "item": `${SITE_URL}/#areas-atendidas` },
      { "@type": "ListItem", "position": 3, "name": nomeBairro, "item": `${SITE_URL}/entregas/${bairro}` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Vocês entregam marmita no ${nomeBairro}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Sim! A Caseirinhas da Tatá entrega marmitas caseiras quentinhas no ${nomeBairro} e em toda a Zona Norte de Londrina.`,
        },
      },
      {
        "@type": "Question",
        "name": `Qual o valor da marmita entregue no ${nomeBairro}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${tamanhos.map((t) => `${t.nome} por R$ ${formatarPreco(t.preco)}`).join(", ")}. A taxa de entrega é calculada à parte, na finalização do pedido, de acordo com a distância até o ${nomeBairro}.`,
        },
      },
      {
        "@type": "Question",
        "name": `Como faço para pedir uma marmita no ${nomeBairro}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "É só chamar no WhatsApp (43) 99674-9607, informar seu endereço e escolher o tamanho da marmita.",
        },
      },
      {
        "@type": "Question",
        "name": "O cardápio muda todos os dias?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Sim, temos cardápio rotativo diário, de segunda a domingo. Confira o prato de hoje em ${SITE_URL}/cardapio.`,
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="flex min-h-screen flex-col bg-zinc-950">
        <SiteHeader />

        <main className="flex-1 px-4 py-12 md:py-16">
          <div className="mx-auto max-w-2xl">
            <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-zinc-500">
              <Link href="/" className="transition-colors hover:text-amber-500">Início</Link>
              <span>/</span>
              <Link href="/#areas-atendidas" className="transition-colors hover:text-amber-500">Áreas Atendidas</Link>
              <span>/</span>
              <span className="text-zinc-300">{nomeBairro}</span>
            </nav>

            <div className="text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-black ring-1 ring-amber-500/40 mb-6 shadow-lg shadow-amber-500/20">
                <Image
                  src="/emblema-caseirinhas-da-tata.png"
                  alt="Emblema da logomarca Caseirinhas da Tatá: casa dourada com garfos cruzados"
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
                Delivery de Marmita Caseira no <span className="text-amber-500">{nomeBairro}</span>
              </h1>

              <p className="text-lg text-zinc-400 mb-8 font-medium">
                Trabalha ou mora no <strong className="text-zinc-300">{nomeBairro}</strong>? A Caseirinhas da Tatá leva até você o melhor almoço da região. Comida caseira de verdade, tempero de mãe e entrega rápida!
              </p>
            </div>

            {pratoHoje && (
              <div className="mb-10 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 text-left">
                <span className="mb-3 inline-block rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 font-mono text-xs text-amber-500">
                  CARDÁPIO DE {diaAtualLabel.toUpperCase()}
                </span>
                <h2 className="text-xl font-bold text-zinc-100 mb-3">
                  {pratoHoje.opcoes ? "Hoje tem 3 Opções Especiais" : pratoHoje.tema}
                </h2>
                {pratoHoje.imagem && (
                  <div className="mb-4 overflow-hidden rounded-xl border border-zinc-800">
                    <Image
                      src={pratoHoje.imagem}
                      alt={`${pratoHoje.imagemAlt ?? pratoHoje.tema} — entrega no ${nomeBairro}`}
                      width={pratoHoje.imagemLargura ?? 1024}
                      height={pratoHoje.imagemAltura ?? 1024}
                      className="h-auto w-full object-cover"
                    />
                  </div>
                )}
                <p className="mb-4 text-zinc-400">
                  {pratoHoje.opcoes
                    ? pratoHoje.opcoes.map((o) => o.tema).join(" · ")
                    : pratoHoje.ingredientes.join(", ")}
                </p>
                <Link href="/cardapio" className="font-bold text-amber-500 underline underline-offset-4 hover:text-amber-400">
                  Ver cardápio completo e pedir para o {nomeBairro} →
                </Link>
              </div>
            )}

            <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl mb-10 text-left">
              <h2 className="text-2xl font-bold text-zinc-100 mb-4">Por que pedir com a gente?</h2>
              <ul className="space-y-3 text-zinc-400 mb-8">
                <li>✅ <strong className="text-zinc-300">Praticidade:</strong> Chega rapidinho aí no {nomeBairro}.</li>
                <li>✅ <strong className="text-zinc-300">Economia:</strong> Marmitas super bem servidas a partir de R$ {formatarPreco(tamanhos[0].preco)}.</li>
                <li>✅ <strong className="text-zinc-300">Qualidade:</strong> Ingredientes frescos e preparo diário.</li>
              </ul>

              <div className="flex justify-center">
                <BotaoWhatsApp
                  texto="VER CARDÁPIO E PEDIR AGORA"
                  url={`https://wa.me/5543996749607?text=Olá,%20estou%20no%20${nomeBairro}%20e%20gostaria%20de%20ver%20o%20cardápio!`}
                />
              </div>
            </div>

            <div className="mb-10 border-t border-zinc-800 pt-10">
              <h2 className="mb-4 text-center text-lg font-bold text-zinc-100">Também Atendemos Estas Áreas em Londrina</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {Object.entries(bairrosAtendidos)
                  .filter(([slug]) => slug !== bairro)
                  .map(([slug, nome]) => (
                    <Link
                      key={slug}
                      href={`/entregas/${slug}`}
                      className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-amber-500 hover:text-amber-500"
                    >
                      {nome}
                    </Link>
                  ))}
              </div>
            </div>

            <div className="text-center">
              <Link href="/" className="text-amber-500 hover:text-amber-400 text-sm font-bold underline underline-offset-4">
                ← Voltar para a página inicial
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
