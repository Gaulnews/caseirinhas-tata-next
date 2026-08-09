import { SiteHeader } from "@/components/SiteHeader";

export default function Home() {
  // Código Estruturado para dominar o Google Maps e Buscas por IA em Londrina
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "name": "Caseirinhas da Tatá",
    "telephone": "+5543996749607",
    "url": "https://caseirinhasdatata.shop",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Região Central de Entregas",
      "addressLocality": "Londrina",
      "addressRegion": "PR",
      "postalCode": "86000-000",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-23.3102",
      "longitude": "-51.1628"
    }
  };

  const cardapio = [
    { id: 1, nome: "🍱 Marmita Mini", nomeSimples: "Marmita Mini", preco: "18,00", desc: "Perfeita para refeição leve", destaque: false },
    { id: 2, nome: "🍱 Marmita Média", nomeSimples: "Marmita Média", preco: "24,00", desc: "A escolha mais popular", destaque: true },
    { id: 3, nome: "🍱 Marmita Grande", nomeSimples: "Marmita Grande", preco: "28,00", desc: "Para quem tem fome de verdade", destaque: false },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
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

          {/* Contatos / Rodapé */}
          <footer id="contatos" className="bg-black px-5 pb-6 pt-16 text-white">
            <div className="mx-auto max-w-5xl">
              <div className="mb-10 grid gap-10" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#ffc107]">
                      <span className="text-xl font-bold text-black">CT</span>
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
                    <li><a href="#home" className="text-zinc-400 hover:text-[#ffc107] transition-colors">Início</a></li>
                    <li><a href="#cardapio" className="text-zinc-400 hover:text-[#ffc107] transition-colors">Cardápio do Dia</a></li>
                    <li><a href="/servicos" className="text-zinc-400 hover:text-[#ffc107] transition-colors">Nossos Serviços</a></li>
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
