'use client';

import { useSyncExternalStore } from 'react';
import { GRUPO_SORTEIOS } from '@/lib/site-data';
import { reloginhos, dataCurta, hojeEmLondrina, avisoReloginho } from '@/lib/promocoes-grupo';

// Relógio de 1 s. O snapshot é arredondado ao segundo para ficar estável
// entre leituras; no servidor é null e a agenda mostra só as janelas.
const assinarRelogio = (avisar: () => void) => {
  const id = setInterval(avisar, 1000);
  return () => clearInterval(id);
};
const segundoAtual = () => Math.floor(Date.now() / 1000) * 1000;

// Agenda real dos Reloginhos. O relógio conta até a revelação ou até o fim
// da janela usando instantes com -03:00, então funciona em qualquer fuso.
// Nada de preço aqui: a oferta é revelada no grupo 30 minutos antes.
export function AgendaReloginhos() {
  const agora = useSyncExternalStore(assinarRelogio, segundoAtual, () => null);

  const hoje = agora ? hojeEmLondrina(new Date(agora)) : null;

  return (
    <ol className="grid gap-4 md:grid-cols-4">
      {reloginhos.map((r) => {
        const ehHoje = r.data === hoje;
        const passou = hoje !== null && r.data < hoje;
        const aviso = ehHoje && agora ? avisoReloginho(r, agora) : (r.janela ?? 'Janela anunciada no grupo');
        return (
          <li key={r.codigo}
            className={`rounded-2xl border p-5 ${ehHoje ? 'border-[#ffc107] bg-zinc-900' : 'border-zinc-800 bg-zinc-900'} ${passou ? 'opacity-50' : ''}`}>
            <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">{dataCurta(r.data)}{ehHoje ? ' · hoje' : ''}</p>
            <h3 className="mb-1 font-bold text-zinc-100"><span aria-hidden>⏰</span> {r.titulo}</h3>
            <p className="mb-3 text-sm text-zinc-400">{r.resumo}</p>
            <p className={`text-sm font-bold ${ehHoje ? 'text-[#ffc107]' : 'text-zinc-300'}`} aria-live={ehHoje ? 'polite' : undefined}>
              {passou ? 'Encerrado' : aviso}
            </p>
          </li>
        );
      })}
      <li className="md:col-span-4">
        <a href={GRUPO_SORTEIOS} target="_blank" rel="noopener noreferrer"
          className="inline-block w-full rounded-lg bg-[#ffc107] py-3 text-center font-bold text-zinc-950 hover:bg-[#ffca28]">
          Entre no grupo para ver a oferta antes de todo mundo
        </a>
      </li>
    </ol>
  );
}
