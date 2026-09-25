import { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { WHATSAPP_PEDIDOS, WHATSAPP_PEDIDOS_NUMERO } from '@/lib/site-data';
import {
  SEMANA, trilhasKits, reloginhos, RELOGINHO_DIARIO, REGRAS_GERAIS, dataCurta,
} from '@/lib/promocoes-grupo';

// Regulamento público das promoções do grupo. Tudo vem de
// src/lib/promocoes-grupo.ts, a mesma fonte da página e do texto do grupo.
export const metadata: Metadata = {
  title: 'Regulamento das Promoções do Grupo',
  description: `Regras da Semana dos Kits (${dataCurta(SEMANA.inicio)} a ${dataCurta(SEMANA.fim)}) e dos Reloginhos da Caseirinhas da Tatá.`,
  alternates: { canonical: 'https://caseirinhasdatata.shop/promocoes/regulamento' },
};

export default function RegulamentoPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-zinc-950 text-gray-100 p-6 md:p-12">
        <div className="max-w-3xl mx-auto">
          <nav className="mb-10 text-sm border-b border-zinc-800 pb-4">
            <Link href="/promocoes" className="text-zinc-400 hover:text-yellow-400 transition-colors">&larr; Voltar para Promoções</Link>
          </nav>

          <h1 className="text-3xl font-extrabold text-yellow-400 mb-6">Regulamento das promoções do grupo</h1>

          <section aria-labelledby="regras-heading" className="mb-10">
            <h2 id="regras-heading" className="text-xl font-bold text-zinc-100 mb-3 border-l-4 border-yellow-400 pl-3">Regras gerais</h2>
            <ul className="list-disc space-y-2 pl-6 text-zinc-300">
              {REGRAS_GERAIS.map((r) => <li key={r}>{r}</li>)}
            </ul>
          </section>

          <section aria-labelledby="kits-heading" className="mb-10">
            <h2 id="kits-heading" className="text-xl font-bold text-zinc-100 mb-3 border-l-4 border-yellow-400 pl-3">
              Semana dos Kits — {dataCurta(SEMANA.inicio)} a {dataCurta(SEMANA.fim)}
            </h2>
            <table className="w-full text-left text-sm text-zinc-300">
              <thead className="text-zinc-500">
                <tr><th className="py-2">Kit</th><th className="py-2">Meta no período</th><th className="py-2">Contemplados</th></tr>
              </thead>
              <tbody>
                {trilhasKits.map((t) => (
                  <tr key={t.id} className="border-t border-zinc-800">
                    <td className="py-2">{t.titulo}</td>
                    <td className="py-2">{t.meta}</td>
                    <td className="py-2">Até {t.vagas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section aria-labelledby="reloginhos-heading" className="mb-10">
            <h2 id="reloginhos-heading" className="text-xl font-bold text-zinc-100 mb-3 border-l-4 border-yellow-400 pl-3">Reloginhos</h2>
            <table className="mb-4 w-full text-left text-sm text-zinc-300">
              <thead className="text-zinc-500">
                <tr><th className="py-2">Data</th><th className="py-2">Reloginho</th><th className="py-2">Janela</th></tr>
              </thead>
              <tbody>
                {reloginhos.map((r) => (
                  <tr key={r.codigo} className="border-t border-zinc-800">
                    <td className="py-2">{dataCurta(r.data)}</td>
                    <td className="py-2">{r.titulo}</td>
                    <td className="py-2">{r.janela ?? 'Anunciada no grupo'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-zinc-400">{RELOGINHO_DIARIO.texto}</p>
          </section>

          <p className="text-zinc-400">
            Dúvidas: WhatsApp{' '}
            <a href={WHATSAPP_PEDIDOS} className="font-bold text-yellow-400 underline">{WHATSAPP_PEDIDOS_NUMERO}</a>.
          </p>
        </div>
      </main>
    </>
  );
}
