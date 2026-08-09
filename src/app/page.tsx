import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { bairros } from "@/lib/site-data";
import {
  tamanhos,
  formatarPreco,
  cardapioSemanal,
  diasSemana,
  getDiaSemanaAtual,
} from "@/lib/cardapio-semanal";

const SITE_URL = "https://caseirinhasdatata.shop";

// Revalida a cada hora para que a prévia do "Cardápio de Hoje" na home
// acompanhe o dia da semana sem precisar de um novo deploy.
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: { canonical: SITE_URL },
    keywords: [
      "Caseirinhas da Tatá",
      "marmitas Londrina",
      "marmitex Zona Norte Londrina",
      "delivery de comida Londrina",
      "cardápio do dia Londrina",
      ...Object.values(bairros).map((nome) => `marmita delivery ${nome} Londrina`),
    ],
  };
}

export default function Home() {
  const diaAtual = getDiaSemanaAtual();
  const diaAtualLabel = diasSemana.find((d) => d.key === diaAtual)?.label ?? diaAtual;
  const pratoHoje = cardapioSemanal[diaAtual];

  // Código Estruturado para dominar o Google Maps e Buscas por IA em Londrina
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "name": "Caseirinhas da Tatá",
    "image": "https://caseirinhasdatata.shop/logo-caseirinhas-da-tata.jpg",
    "telephone": "+5543996749607",
    "url": "https://caseirinhasdatata.shop",
    "priceRange": "$$",
    "hasMenu": "https://caseirinhasdatata.shop/cardapio",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rua Maria Sinopoli Francovig, 1142 - Conj. Semíramis Barros Braga",
      "addressLocality": "Londrina",
      "addressRegion": "PR",
      "postalCode": "86088-080",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-23.26801",
      "longitude": "-51.14480"
    },
    "areaServed": Object.entries(bairros).map(([slug, nome]) => ({
      "@type": "Place",
      "name": nome,
      "url": `https://caseirinhasdatata.shop/entregas/${slug}`,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Londrina",
        "addressRegion": "PR",
        "addressCountry": "BR"
      }
    }))
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Como faço para pedir uma marmita da Caseirinhas da Tatá?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `É só chamar no WhatsApp (43) 99674-9607, escolher o tamanho da marmita e informar seu bairro em Londrina para calcular a entrega. Confira o cardápio do dia em ${SITE_URL}/cardapio antes de pedir.`
        }
      },
      {
        "@type": "Question",
        "name": "Quais tamanhos de marmita vocês oferecem e qual o preço?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": tamanhos
            .map((t) => `${t.nome} por R$ ${formatarPreco(t.preco)}`)
            .join(", ") + ". A taxa de entrega é calculada à parte, na finalização do pedido, de acordo com o bairro."
        }
      },
      {
        "@type": "Question",
        "name": "O cardápio muda todos os dias?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim! Temos um cardápio rotativo diário, de segunda a domingo, com pratos diferentes a cada dia — aos domingos, inclusive, com 3 opções especiais à escolha."
        }
      },
      {
        "@type": "Question",
        "name": "Quais bairros de Londrina a Caseirinhas da Tatá entrega?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Entregamos em toda a Zona Norte de Londrina, incluindo ${Object.values(bairros).join(", ")}.`
        }
      }
    ]
  };

  const cardapio = tamanhos.map((t) => ({
    id: t.id,
    nome: `🍱 Marmita ${t.nome}`,
    nomeSimples: `Marmita ${t.nome}`,
    preco: formatarPreco(t.preco),
    desc:
      t.id === "mini"
        ? "Perfeita para refeição leve"
        : t.id === "media"
          ? "A escolha mais popular"
          : "Para quem tem fome de verdade",
    destaque: t.id === "media",
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="flex min-h-screen flex-col bg-[#f5f5f5]">
        <SiteHeader />

        <main>
          {/* Hero / Início */}
          <section
            id="home"
            className="flex min-h-[70vh] items-center justify-center overflow-hidden px-5 py-10 text-center"
            style={{ background: "linear-gradient(135deg, #1a1a1a, #2a2a2a 50%, #1a1a1a)" }}
          >
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
                Caseirinhas da Tatá
              </h1>
              <p className="text-lg md:text-xl text-zinc-300 mb-10">
                Marmitas caseiras feitas com amor 💛
              </p>
              <a
                href="https://wa.me/5543996749607?text=Olá!%20Gostaria%20de%20fazer%20um%20pedido."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full px-14 py-5 text-lg font-bold uppercase tracking-wide text-black shadow-[0_10px_30px_rgba(255,193,7,0.4)] transition-transform hover:scale-105"
                style={{ background: "linear-gradient(135deg, #ffc107, #ff9800)" }}
              >
                Fazer Pedido Agora
              </a>
            </div>
          </section>

          {/* Cardápio de Hoje */}
          {pratoHoje && (
            <section className="bg-[#1a1a1a] px-5 py-16 text-center">
              <div className="mx-auto max-w-4xl">
                <span className="mb-4 inline-block rounded-full border border-[#ffc107]/20 bg-[#ffc107]/10 px-3 py-1 font-mono text-xs text-[#ffc107]">
                  CARDÁPIO DE {diaAtualLabel.toUpperCase()}
                </span>
                <h2 className="mb-4 text-3xl font-bold text-white">
                  {pratoHoje.opcoes ? "Hoje tem 3 Opções Especiais" : pratoHoje.tema}
                </h2>
                {pratoHoje.imagem && (
                  <div className="mx-auto mb-6 max-w-md overflow-hidden rounded-2xl border border-zinc-700">
                    <Image
                      src={pratoHoje.imagem}
                      alt={pratoHoje.imagemAlt ?? pratoHoje.tema}
                      width={pratoHoje.imagemLargura ?? 1024}
                      height={pratoHoje.imagemAltura ?? 1024}
                      className="h-auto w-full object-cover"
                    />
                  </div>
                )}
                <p className="mx-auto mb-8 max-w-2xl text-zinc-400">
                  {pratoHoje.opcoes
                    ? pratoHoje.opcoes.map((o) => o.tema).join(" · ")
                    : pratoHoje.ingredientes.join(", ")}
                </p>
                <Link
                  href="/cardapio"
                  className="inline-block rounded-full px-10 py-4 font-bold uppercase tracking-wide text-black shadow-[0_10px_30px_rgba(255,193,7,0.3)] transition-transform hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #ffc107, #ff9800)" }}
                >
                  Ver Cardápio de {diaAtualLabel} e Pedir
                </Link>
              </div>
            </section>
          )}

          {/* Cardápio */}
          <section
            id="cardapio"
            className="px-5 py-20 text-center"
            style={{ background: "linear-gradient(180deg, #2a2a2a, #1a1a1a)" }}
          >
            <h2 className="text-3xl font-bold text-white mb-14">Nosso Cardápio</h2>

            <div className="mx-auto mb-16 grid max-w-5xl gap-10" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
              {cardapio.map((item) => (
                <a
                  key={item.id}
                  href={`https://wa.me/5543996749607?text=${encodeURIComponent(`Olá! Gostaria de pedir a ${item.nomeSimples} (R$ ${item.preco})`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative select-none rounded-[20px] border-2 p-10 text-left transition-all duration-300 hover:-translate-y-1 ${
                    item.destaque ? "border-[#ffc107] shadow-[0_10px_30px_rgba(255,193,7,0.2)]" : "border-zinc-700"
                  }`}
                  style={{ background: "linear-gradient(145deg, #2a2a2a, #1f1f1f)" }}
                >
                  {item.destaque && (
                    <span
                      className="absolute -top-4 right-6 rounded-full px-5 py-2 text-sm font-bold uppercase tracking-wide text-black shadow-[0_4px_15px_rgba(255,193,7,0.4)]"
                      style={{ background: "linear-gradient(135deg, #ffc107, #ff9800)" }}
                    >
                      Mais Vendida
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-zinc-100 mb-2">{item.nome}</h3>
                  <p className="text-zinc-400 mb-4">{item.desc}</p>
                  <span className="block text-4xl font-extrabold text-[#4caf50]">R$ {item.preco}</span>
                </a>
              ))}
            </div>

            <p className="mx-auto max-w-3xl rounded-2xl border border-[#ffc1071a] bg-[#ffc1070d] px-6 py-8 text-lg leading-relaxed text-zinc-400">
              Todas as marmitas incluem: Arroz, Feijão, Batata, Couve, Cenoura e Farofa
            </p>
          </section>

          {/* Áreas Atendidas */}
          <section id="areas-atendidas" className="bg-black px-5 py-16 text-center">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-4 text-3xl font-bold text-white">Áreas Atendidas em Londrina</h2>
              <p className="mx-auto mb-8 max-w-2xl text-zinc-400">
                Entregamos marmitas caseiras quentinhas em toda a Zona Norte de Londrina:
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {Object.entries(bairros).map(([slug, nome]) => (
                  <Link
                    key={slug}
                    href={`/entregas/${slug}`}
                    className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-[#ffc107] hover:text-[#ffc107]"
                  >
                    {nome}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Contatos / Rodapé */}
          <footer id="contatos" className="bg-black px-5 pb-6 pt-16 text-white">
            <div className="mx-auto max-w-5xl">
              <div className="mb-10 grid gap-10" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-full bg-black ring-1 ring-[#ffc107]/40">
                      <Image
                        src="/emblema-caseirinhas-da-tata.png"
                        alt="Emblema da logomarca Caseirinhas da Tatá: casa dourada com garfos cruzados"
                        width={50}
                        height={50}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="text-[22px] font-bold text-white">Caseirinhas da Tatá</span>
                  </div>
                  <p className="leading-relaxed text-zinc-400">
                    Comida caseira feita com carinho e dedicação. Sabor de casa, entregue na sua porta.
                  </p>
                </div>

                <div>
                  <h4 className="mb-4 text-lg font-bold">Links Rápidos</h4>
                  <ul className="space-y-3">
                    <li><Link href="/" className="text-zinc-400 hover:text-[#ffc107] transition-colors">Início</Link></li>
                    <li><Link href="/cardapio" className="text-zinc-400 hover:text-[#ffc107] transition-colors">Cardápio do Dia</Link></li>
                    <li><Link href="/servicos" className="text-zinc-400 hover:text-[#ffc107] transition-colors">Nossos Serviços</Link></li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-4 text-lg font-bold">Nossos Contatos</h4>
                  <p className="mb-4 text-zinc-400">📞 (43) 99674-9607</p>
                  <a
                    href="https://wa.me/5543996749607"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-lg bg-[#25d366] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#20bd5a]"
                  >
                    💬 Chamar no WhatsApp
                  </a>
                </div>
              </div>

              <div className="mb-10 rounded-2xl bg-[#ffc107] p-10 text-center text-black">
                <h4 className="mb-2 text-xl font-bold">🎁 Concorra a Marmitas Grátis!</h4>
                <p className="mb-6">Entre no nosso grupo e participe do sorteio diário</p>
                <a
                  href="https://chat.whatsapp.com/Jb1zGlNNCR11iObZS6oNxk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-lg bg-black px-6 py-3 font-bold text-white transition-colors hover:bg-zinc-800"
                >
                  Entrar no Grupão
                </a>
              </div>

              <div className="border-t border-zinc-800 pt-5 text-center text-sm text-zinc-500">
                <p>© {new Date().getFullYear()} Caseirinhas da Tatá. Todos os direitos reservados.</p>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}
