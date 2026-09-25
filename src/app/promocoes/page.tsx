import { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { SemanaDosKits } from '@/components/SemanaDosKits';
import { AgendaReloginhos } from '@/components/AgendaReloginhos';
import { PromocoesAtivas } from '@/components/PromocoesAtivas';
import { GRUPO_SORTEIOS, WHATSAPP_PEDIDOS, WHATSAPP_PEDIDOS_NUMERO } from '@/lib/site-data';
import { SEMANA, RELOGINHO_DIARIO, dataCurta, semanaAtiva, chamadaGrupo } from '@/lib/promocoes-grupo';

// Revalida a cada hora: o topo troca para a chamada neutra depois de 04/10
// às 15h sem novo deploy. Contagens e relógio rodam no navegador.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Promoções do Grupo',
  description:
    'Semana dos Kits de 28/09 a 04/10 às 15h (só 5 por kit), Reloginho Todo o dia com ofertas relâmpago reveladas 30 minutos antes. Exclusivo do grupo oficial da Caseirinhas da Tatá.',
  alternates: { canonical: 'https://caseirinhasdatata.shop/promocoes' },
  openGraph: {
    title: 'Promoções do grupo — Caseirinhas da Tatá',
    description: 'Só 5 por kit até 04/10 e oferta relâmpago todo dia. Só para quem está no grupo.',
    url: 'https://caseirinhasdatata.shop/promocoes',
  },
};

export default function PromocoesPage() {
  const ativa = semanaAtiva();
  const chamada = chamadaGrupo();
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-zinc-950 text-gray-100 p-6 md:p-12">
        <div className="max-w-5xl mx-auto">
          <header className="mb-10">
            <span className="inline-block text-xs bg-[#ffc107]/10 text-[#ffc107] px-3 py-1 rounded-full border border-[#ffc107]/20 font-mono mb-4">
              SÓ PARA QUEM ESTÁ NO GRUPO{ativa ? ` · ${dataCurta(SEMANA.inicio)} A ${dataCurta(SEMANA.fim)}` : ''}
            </span>
            <h1 className="text-4xl font-extrabold text-yellow-400 mb-4">
              <span aria-hidden>⏰</span> {chamada.titulo}
            </h1>
            <p className="text-zinc-300 text-lg max-w-3xl mb-6">
              {chamada.texto}{ativa ? ' Quem piscar, perde.' : ''}
            </p>
            <a
              href={GRUPO_SORTEIOS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg bg-[#ffc107] px-6 py-3 font-bold text-zinc-950 hover:bg-[#ffca28]"
            >
              {chamada.cta}
            </a>
          </header>

          <section aria-labelledby="kits-heading" className="mb-14">
            <h2 id="kits-heading" className="text-2xl font-bold text-zinc-100 mb-1 border-l-4 border-yellow-400 pl-3">
              Semana dos Kits
            </h2>
            <p className="text-zinc-500 text-sm mb-6 pl-4">
              Escolha uma trilha, bata a meta em pedidos diretos e garanta o seu. Só 5 por kit.
            </p>
            <SemanaDosKits />
          </section>

          <section aria-labelledby="reloginho-heading" className="mb-14">
            <h2 id="reloginho-heading" className="text-2xl font-bold text-zinc-100 mb-1 border-l-4 border-yellow-400 pl-3">
              Reloginhos da semana
            </h2>
            <p className="text-zinc-500 text-sm mb-6 pl-4">
              Oferta relâmpago de 1 hora. A oferta é revelada no grupo 30 minutos antes — não fica no site.
            </p>
            <AgendaReloginhos />
          </section>

          <section aria-labelledby="diario-heading" className="mb-14">
            <h2 id="diario-heading" className="text-2xl font-bold text-zinc-100 mb-1 border-l-4 border-yellow-400 pl-3">
              {RELOGINHO_DIARIO.titulo}
            </h2>
            <div className="mt-6 bg-zinc-900 border border-zinc-800 p-6 rounded-xl md:flex md:items-center md:justify-between gap-6">
              <p className="text-zinc-400 max-w-2xl mb-4 md:mb-0">
                {RELOGINHO_DIARIO.texto} Ative as notificações do grupo para não perder.
              </p>
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

          <section aria-labelledby="sempre-heading" className="mb-14">
            <h2 id="sempre-heading" className="text-2xl font-bold text-zinc-100 mb-1 border-l-4 border-yellow-400 pl-3">
              Promoções de sempre
            </h2>
            <p className="text-zinc-500 text-sm mb-6 pl-4">Valem todos os dias, também para quem ainda não está no grupo.</p>
            <PromocoesAtivas />
          </section>

          <section aria-labelledby="regras-heading" className="rounded-2xl bg-[#ffc107] p-8 text-black">
            <h2 id="regras-heading" className="mb-3 text-xl font-bold">Consulte as condições</h2>
            <p className="mb-4">
              Cada pedido vale para uma promoção só. Contam pedidos diretos pelo WhatsApp{' '}
              <a href={WHATSAPP_PEDIDOS} className="font-bold underline">
                {WHATSAPP_PEDIDOS_NUMERO}
              </a>
              ; pedidos do iFood não contam.
            </p>
            <Link href="/promocoes/regulamento" className="inline-block rounded-lg bg-black px-6 py-3 font-bold text-white hover:bg-zinc-800">
              Ver regulamento completo
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
