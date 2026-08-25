import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CarrosselRedesSociais } from '@/components/CarrosselRedesSociais';
import { CardapioDestaqueTabs } from '@/components/CardapioDestaqueTabs';
import {
  WHATSAPP_PEDIDOS,
  WHATSAPP_PEDIDOS_NUMERO,
  WHATSAPP_B2B,
  WHATSAPP_B2B_NUMERO,
  INSTAGRAM,
  IFOOD,
  GRUPO_SORTEIOS,
  AVALIAR_GOOGLE,
  ENDERECO_COMPLETO,
} from '@/lib/site-data';

const SITE_URL = 'https://caseirinhasdatata.shop';
const MAPS_QUERY = encodeURIComponent(ENDERECO_COMPLETO);

export const metadata: Metadata = {
  title: 'Contatos, Retirada e Avaliações',
  description:
    'Fale com a Caseirinhas da Tatá pelo WhatsApp para pedidos imediatos ou agendados, parcerias B2B, retirada no local com mapa interativo, e veja nossa nota no Google. Marmitas caseiras na Zona Norte de Londrina.',
  keywords: [
    'whatsapp caseirinhas da tata',
    'telefone marmitaria londrina',
    'contato delivery zona norte',
    'retirada marmita londrina',
    'agendar pedido marmita londrina',
    'avaliações caseirinhas da tata google',
  ],
  alternates: { canonical: `${SITE_URL}/contatos` },
  openGraph: {
    title: 'Contatos — Caseirinhas da Tatá',
    description: 'WhatsApp, retirada com mapa, parcerias e avaliações — tudo num só lugar.',
    url: `${SITE_URL}/contatos`,
  },
};

export default function ContatosPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-gray-100 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <nav className="mb-10 flex flex-wrap gap-4 text-sm border-b border-zinc-800 pb-4">
          <Link href="/" className="text-zinc-400 hover:text-yellow-400 transition-colors">&larr; Voltar para Home</Link>
          <Link href="/cardapio" className="text-zinc-400 hover:text-yellow-400 transition-colors">Cardápio</Link>
          <Link href="/servicos" className="text-zinc-400 hover:text-yellow-400 transition-colors">Serviços</Link>
          <Link href="/bio" className="text-zinc-400 hover:text-yellow-400 transition-colors">Todos os Links</Link>
        </nav>

        <header className="mb-10">
          <span className="inline-block text-xs bg-[#ffc107]/10 text-[#ffc107] px-3 py-1 rounded-full border border-[#ffc107]/20 font-mono mb-4">
            CONTATO · RETIRADA · AVALIAÇÕES
          </span>
          <h1 className="text-4xl font-extrabold text-yellow-400 mb-4">Fale com a Caseirinhas da Tatá</h1>
          <p className="text-zinc-300 text-lg max-w-3xl">
            Marmitas caseiras feitas com carinho, entregues na Zona Norte de Londrina — ou retiradas direto com a gente.
            Escolha abaixo o canal certo pro seu pedido: entrega imediata, agendamento para outro dia, ou parceria comercial.
          </p>
        </header>

        {/* Canais de WhatsApp */}
        <section aria-labelledby="whatsapp-heading" className="mb-14">
          <h2 id="whatsapp-heading" className="text-2xl font-bold text-zinc-100 mb-1 border-l-4 border-yellow-400 pl-3">
            Peça pelo WhatsApp
          </h2>
          <p className="text-zinc-500 text-sm mb-6 pl-4">Mesmo número, três formas de atender você.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl flex flex-col">
              <h3 className="text-xl font-bold text-zinc-100 mb-1">Peça Agora</h3>
              <p className="text-zinc-400 text-sm mb-4 flex-1">
                Duas formas de pedir: direto pela loja (WhatsApp) ou pelo aplicativo do iFood — escolha a que for mais fácil pra você.
              </p>
              <p className="text-2xl font-bold text-green-400 mb-4">{WHATSAPP_PEDIDOS_NUMERO}</p>
              <div className="flex flex-col gap-2">
                <a
                  href={WHATSAPP_PEDIDOS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 bg-green-500 text-zinc-950 text-center font-bold rounded-lg hover:bg-green-400"
                >
                  Pedir pela loja
                </a>
                <a
                  href={IFOOD}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 bg-zinc-800 text-white text-center font-bold rounded-lg hover:bg-zinc-700 ring-1 ring-[#ffc107]/40"
                >
                  Pedir pelo iFood
                </a>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl flex flex-col">
              <h3 className="text-xl font-bold text-zinc-100 mb-1">Agende seu Pedido</h3>
              <p className="text-zinc-400 text-sm mb-4 flex-1">
                Precisa marcar pra um dia e horário específico da semana? Fala com a gente pelo mesmo WhatsApp e organizamos a entrega no momento certo pra você.
              </p>
              <p className="text-2xl font-bold text-green-400 mb-4">{WHATSAPP_PEDIDOS_NUMERO}</p>
              <a
                href={`${WHATSAPP_PEDIDOS}?text=${encodeURIComponent('Oi! Quero agendar um pedido para outro dia/horário da semana.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 bg-green-500 text-zinc-950 text-center font-bold rounded-lg hover:bg-green-400"
              >
                Agendar pedido
              </a>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl flex flex-col">
              <h3 className="text-xl font-bold text-zinc-100 mb-1">Parcerias e Assinaturas</h3>
              <p className="text-zinc-400 text-sm mb-4 flex-1">
                MarmiFlix, Company ou Single para sua empresa: atendimento direto com o setor comercial para fechar contratos e planos de assinatura.
              </p>
              <div className="mb-4 flex items-center gap-3">
                <Image
                  src="/contatos/tania-garbini-representante-comercial.jpg"
                  alt="Tânia Garbini, Representante Comercial da Caseirinhas da Tatá"
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-full border-2 border-yellow-400 object-cover"
                />
                <div>
                  <p className="text-sm font-bold text-zinc-100">Tânia Garbini</p>
                  <p className="text-xs text-zinc-500">Representante Comercial</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-yellow-400 mb-4">{WHATSAPP_B2B_NUMERO}</p>
              <a
                href={WHATSAPP_B2B}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 bg-yellow-400 text-zinc-950 text-center font-bold rounded-lg hover:bg-yellow-300"
              >
                Falar com o comercial
              </a>
            </div>
          </div>
        </section>

        {/* Cardápio em destaque (vídeos reais) */}
        <section aria-labelledby="destaque-heading" className="mb-14">
          <h2 id="destaque-heading" className="text-2xl font-bold text-zinc-100 mb-1 border-l-4 border-yellow-400 pl-3">
            Cardápio em Destaque
          </h2>
          <p className="text-zinc-500 text-sm mb-6 pl-4">
            Dá o play e veja o prato de cada dia antes de pedir — clique nas abas pra explorar a semana.
          </p>
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
            <CardapioDestaqueTabs />
          </div>
        </section>

        {/* Retirada com mapa */}
        <section aria-labelledby="mapa-heading" className="mb-14">
          <h2 id="mapa-heading" className="text-2xl font-bold text-zinc-100 mb-1 border-l-4 border-yellow-400 pl-3">
            Retire seu Pedido
          </h2>
          <p className="text-zinc-500 text-sm mb-6 pl-4">Prefere buscar direto com a gente? Estamos aqui.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <div className="rounded-xl overflow-hidden border border-zinc-800 min-h-[280px]">
              <iframe
                title="Mapa — localização da Caseirinhas da Tatá para retirada de pedidos"
                src={`https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 280 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl flex flex-col justify-center">
              <h3 className="text-xl font-bold text-zinc-100 mb-2">Zona Norte de Londrina - PR</h3>
              <p className="text-zinc-400 mb-6">{ENDERECO_COMPLETO}</p>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full py-3 bg-yellow-400 text-zinc-950 text-center font-bold rounded-lg hover:bg-yellow-300"
              >
                Traçar rota até aqui
              </a>
            </div>
          </div>
        </section>

        {/* Promoções ativas */}
        <section aria-labelledby="promo-heading" className="mb-14">
          <h2 id="promo-heading" className="text-2xl font-bold text-zinc-100 mb-1 border-l-4 border-yellow-400 pl-3">
            Promoções Ativas
          </h2>
          <p className="text-zinc-500 text-sm mb-6 pl-4">Entre no grupo oficial e não perca nenhuma novidade.</p>

          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl md:flex md:items-center md:justify-between gap-6">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-zinc-100 mb-1">🎁 Grupo de Sorteios da Caseirinhas da Tatá</h3>
              <p className="text-zinc-400 max-w-2xl">
                Participe do nosso grupo do WhatsApp para acompanhar promoções e sorteios em primeira mão — direto da loja, sem intermediários.
              </p>
            </div>
            <a
              href={GRUPO_SORTEIOS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block whitespace-nowrap py-3 px-6 bg-green-500 text-zinc-950 text-center font-bold rounded-lg hover:bg-green-400"
            >
              Entrar no grupo
            </a>
          </div>
        </section>

        {/* Avaliações reais no Google */}
        <section aria-labelledby="avaliacoes-heading" className="mb-14">
          <h2 id="avaliacoes-heading" className="text-2xl font-bold text-zinc-100 mb-1 border-l-4 border-yellow-400 pl-3">
            Nossa Nota no Google
          </h2>
          <p className="text-zinc-500 text-sm mb-6 pl-4">Avaliação real do nosso Perfil da Empresa.</p>

          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl text-center">
            <p className="text-5xl font-extrabold text-yellow-400">5,0 <span className="text-2xl align-top">★★★★★</span></p>
            <p className="text-zinc-400 mt-2 mb-6">Nota média no Google Perfil da Empresa</p>
            <a
              href={AVALIAR_GOOGLE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-3 px-6 bg-yellow-400 text-zinc-950 text-center font-bold rounded-lg hover:bg-yellow-300"
            >
              Ver ou deixar uma avaliação
            </a>
          </div>
        </section>

        {/* Redes sociais */}
        <section aria-labelledby="redes-heading">
          <h2 id="redes-heading" className="text-2xl font-bold text-zinc-100 mb-1 border-l-4 border-yellow-400 pl-3">
            Nossas Redes Sociais
          </h2>
          <p className="text-zinc-500 text-sm mb-6 pl-4">Bastidores, cardápio em vídeo e promoções — tudo no Instagram.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <CarrosselRedesSociais />
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl flex flex-col justify-center h-full">
              <h3 className="text-xl font-bold text-zinc-100 mb-2">@caseirinhasdatata</h3>
              <p className="text-zinc-400 mb-6">
                Siga a Caseirinhas da Tatá no Instagram e acompanhe de perto o dia a dia da marmitaria mais gostosa da Zona Norte de Londrina.
              </p>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full py-3 bg-zinc-800 text-white text-center font-bold rounded-lg hover:bg-zinc-700 ring-1 ring-[#ffc107]/40"
              >
                Seguir no Instagram
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
