import { Metadata } from 'next';
import { GRUPO_SORTEIOS, WHATSAPP_PEDIDOS, WHATSAPP_PEDIDOS_NUMERO } from '@/lib/site-data';
import {
  promocoesGrupo, RETIRADA_A_PARTIR_DE, dataCurta, promocoesEncerradas,
} from '@/lib/promocoes-grupo';

// Revalida a cada hora: depois de 12/10 a página passa a dizer que o
// período terminou, sem precisar de novo deploy.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Promoções do Grupo',
  description:
    'Promoções exclusivas do grupo de WhatsApp da Caseirinhas da Tatá: Kit de Facas, Kit de Ferramentas 46 peças e Kit Churrasqueiro para as 5 primeiras pessoas que baterem a meta de marmitas.',
  alternates: { canonical: 'https://caseirinhasdatata.shop/promocoes' },
  openGraph: {
    title: 'Promoções exclusivas do grupo — Caseirinhas da Tatá',
    description: 'As 5 primeiras pessoas que baterem a meta levam o prêmio na hora, sem sorteio.',
    url: 'https://caseirinhasdatata.shop/promocoes',
  },
};

function hojeEmLondrina(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date());
}

export default function PromocoesPage() {
  const encerradas = promocoesEncerradas(hojeEmLondrina());

  return (
    <main className="min-h-screen bg-zinc-950 px-5 py-16 text-gray-100">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-center text-3xl font-bold text-white">
          Promoções exclusivas do grupo 🎁
        </h1>

        {encerradas ? (
          <p className="mb-8 text-center text-zinc-400">
            O período destas promoções terminou em {dataCurta(promocoesGrupo[promocoesGrupo.length - 1].fim)}.
            Entre no grupo para saber das próximas.
          </p>
        ) : (
          <p className="mb-8 text-center text-zinc-400">
            As <strong>5 primeiras pessoas</strong> do grupo que baterem a meta de marmitas dentro do período de
            cada promoção <strong>levam o prêmio na hora, sem sorteio</strong> — vale a ordem de quem fez o pedido
            primeiro. Cada compra conta para <strong>uma promoção só</strong>, sempre a que estiver rolando naquele
            dia. Todos os prêmios são retirados a partir de <strong>{dataCurta(RETIRADA_A_PARTIR_DE)}</strong>.
          </p>
        )}

        {!encerradas && (
          <div className="mb-10 grid gap-5">
            {promocoesGrupo.map((p, i) => (
              <section key={p.id} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                <h2 className="mb-1 text-xl font-bold text-[#ffc107]">
                  {p.emoji} Promoção {i + 1} — {p.titulo}
                </h2>
                <p className="mb-3 text-sm text-zinc-400">
                  📅 De {dataCurta(p.inicio)} a {dataCurta(p.fim)}
                </p>
                <p className="text-zinc-200">{p.texto.replace(/\*/g, '')}</p>
              </section>
            ))}
          </div>
        )}

        <div className="rounded-2xl bg-[#ffc107] p-8 text-center text-black">
          <p className="mb-5 font-bold">Só quem está no grupo participa! 💛</p>
          <a
            href={GRUPO_SORTEIOS}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-black px-6 py-3 font-bold text-white hover:bg-zinc-800"
          >
            Entrar no grupo
          </a>
          <p className="mt-5 text-sm">
            Para contar para a promoção, peça no nosso WhatsApp de sempre:{' '}
            <a href={WHATSAPP_PEDIDOS} className="font-bold underline">
              {WHATSAPP_PEDIDOS_NUMERO}
            </a>
            . Em 12/10 (feriado), confirme o funcionamento pelo WhatsApp.
          </p>
        </div>
      </div>
    </main>
  );
}
