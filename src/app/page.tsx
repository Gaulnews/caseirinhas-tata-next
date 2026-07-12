import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";

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
    { id: 1, nome: "🍱 Marmita Mini", preco: "18,00", desc: "Perfeita para uma refeição leve e balanceada." },
    { id: 2, nome: "🍱 Marmita Média", preco: "24,00", desc: "A escolha tradicional e mais popular para o dia a dia." },
    { id: 3, nome: "🍱 Marmita Grande", preco: "28,00", desc: "Para quem tem fome de verdade e não abre mão de sabor." },
  ];

  return (
    <main className="max-w-2xl mx-auto px-4 py-16 text-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      
      <header className="mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500 text-zinc-950 font-black text-2xl mb-6 shadow-lg shadow-amber-500/20">
          CT
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
          Caseirinhas da Tatá
        </h1>
        <p className="text-lg text-zinc-400 mb-8 font-medium">
          Marmitas caseiras legítimas feitas com amor em Londrina 💛
        </p>
        <BotaoWhatsApp 
          texto="FAZER PEDIDO AGORA" 
          url="https://wa.me/5543996749607?text=Olá,%20gostaria%20de%20ver%20o%20cardápio%20de%20hoje!" 
        />
      </header>

      <section className="text-left mb-16">
        <h2 className="text-2xl font-bold text-amber-500 mb-6 text-center">Nosso Cardápio</h2>
        <div className="grid gap-5">
          {cardapio.map((item) => (
            <div key={item.id} className="border border-zinc-800 p-6 rounded-2xl bg-zinc-900/40 hover:border-zinc-700 transition-colors">
              <h3 className="text-xl font-bold text-zinc-100">{item.nome}</h3>
              <p className="text-zinc-400 text-sm my-2">{item.desc}</p>
              <p className="text-2xl font-black text-amber-400 mt-4">R$ {item.preco}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Bloco Semântico de SEO Local (Injeção de Palavras-Chave) */}
      <section className="max-w-xl mx-auto mt-12 mb-8 text-left border-t border-zinc-900 pt-8">
        <h2 className="text-xl font-bold text-zinc-200 mb-3">
          O Melhor Delivery de Marmita Caseira em Londrina
        </h2>
        <p className="text-zinc-400 text-sm leading-relaxed mb-4">
          Bateu a fome no horário de almoço? A Caseirinhas da Tatá oferece a solução perfeita para quem busca <strong className="text-zinc-300 font-semibold">comida caseira de verdade com entrega rápida na região central de Londrina</strong>. Nosso cardápio é preparado diariamente com ingredientes frescos, garantindo aquele sabor de comida de mãe.
        </p>
        <p className="text-zinc-400 text-sm leading-relaxed">
          Seja para o trabalho ou para casa, nosso <strong className="text-zinc-300 font-semibold">delivery de marmitex</strong> possui opções econômicas a partir de R$ 18,00. Atendemos pedidos focados em qualidade, tempero na medida certa e agilidade. Experimente hoje mesmo a marmita mais pedida da cidade!
        </p>
      </section>
      
      <footer className="border-t border-zinc-900 pt-10 pb-8 text-sm text-zinc-500">
        <div className="bg-zinc-900/50 rounded-2xl p-6 mb-8 text-center border border-zinc-800/60">
          <h3 className="font-bold text-zinc-200 mb-2">🎁 Concorra a Marmitas Grátis!</h3>
          <p className="mb-4 text-zinc-400 text-xs">Participe dos sorteios no nosso grupo de clientes.</p>
          <BotaoWhatsApp texto="Entrar no Grupão" url="https://wa.me/5543996749607" />
        </div>

        <div className="text-center space-y-1">
          <p className="font-bold text-zinc-300">📍 Nossos Contatos & Localização (NAP):</p>
          <p className="text-zinc-400">Caseirinhas da Tatá</p>
          <p className="text-amber-500 font-semibold">📞 (43) 99674-9607</p>
          <p>🏠 Área Central de Entregas, Londrina - PR, 86000-000</p>
        </div>
      </footer>
    </main>
  );
}
