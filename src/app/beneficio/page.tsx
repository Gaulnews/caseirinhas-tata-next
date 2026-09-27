import { Metadata } from 'next';
import { SiteHeader } from '@/components/SiteHeader';
import { BENEFICIOS, REGRAS_GERAIS } from '@/lib/beneficio';
import { GRUPO_SORTEIOS } from '@/lib/site-data';
import { CupomForm } from './CupomForm';

const REGEX_CODIGO = /^TATA-\d{4}$/;

export const metadata: Metadata = {
  title: 'Seu presente da Tatá',
  description: 'Resgate o benefício do seu cupom de 2ª compra.',
  robots: { index: false, follow: false },
};

export default async function BeneficioPage({
  searchParams,
}: {
  searchParams: Promise<{ c?: string }>;
}) {
  const params = await searchParams;
  const codigoInicial = params.c && REGEX_CODIGO.test(params.c) ? params.c : '';

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-zinc-950 text-gray-100 p-6 md:p-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold text-yellow-400 mb-6">
            <span aria-hidden>🎁</span> Seu presente da Tatá
          </h1>

          <p className="text-gray-300 mb-6">
            Escolha 1 benefício e resgate pelo WhatsApp informando o código do seu cupom.
          </p>

          <ul className="mb-6 space-y-3">
            {BENEFICIOS.map((b) => (
              <li key={b.id} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
                <p className="font-semibold text-gray-100">{b.titulo}</p>
                <p className="text-sm text-gray-400">{b.condicao}</p>
              </li>
            ))}
          </ul>

          <CupomForm codigoInicial={codigoInicial} />

          <section className="mt-8">
            <h2 className="text-lg font-semibold text-gray-200 mb-3">Regras</h2>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
              {REGRAS_GERAIS.map((regra) => (
                <li key={regra}>{regra}</li>
              ))}
            </ul>
          </section>

          <a
            href={GRUPO_SORTEIOS}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block w-full text-center rounded-lg border border-[#ffc107]/40 text-[#ffc107] font-bold py-3 px-4"
          >
            Entrar no grupo
          </a>
        </div>
      </main>
    </>
  );
}
