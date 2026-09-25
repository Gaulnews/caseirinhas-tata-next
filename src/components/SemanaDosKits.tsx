'use client';

import { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { GRUPO_SORTEIOS } from '@/lib/site-data';
import { SEMANA, trilhasKits, dataCurta, hojeEmLondrina, statusSemana, type TrilhaKit } from '@/lib/promocoes-grupo';

// Sem assinatura: a data de hoje e a trilha salva só são lidas no navegador.
// No servidor (e sem JavaScript) o snapshot é null e a página mostra o texto
// estático "De 28/09 a 04/10".
const semAssinatura = () => () => {};
const lerTrilhaSalva = (): TrilhaKit['id'] | null => {
  try {
    return localStorage.getItem('trilha-kit') as TrilhaKit['id'] | null;
  } catch {
    return null; // localStorage indisponível — segue sem lembrar a escolha.
  }
};

// Gamificação honesta: a pessoa marca, só no próprio navegador, a trilha que
// pretende escolher no grupo. Não envia nada e não mostra contador de
// participantes — o número real de contemplados é apurado pela loja.
export function SemanaDosKits() {
  const hoje = useSyncExternalStore(semAssinatura, () => hojeEmLondrina(), () => null);
  // Encerra no fechamento de 04/10 (15h), não à meia-noite.
  const passouEncerramento = useSyncExternalStore(
    semAssinatura,
    () => Date.now() >= Date.parse(SEMANA.encerramento),
    () => false,
  );
  const salva = useSyncExternalStore(semAssinatura, lerTrilhaSalva, () => null);
  const [escolhida, setEscolhida] = useState<TrilhaKit['id'] | null>(null);
  const trilha = escolhida ?? salva;

  const escolher = (id: TrilhaKit['id']) => {
    setEscolhida(id);
    try {
      localStorage.setItem('trilha-kit', id);
    } catch {
      // idem.
    }
  };

  const status = passouEncerramento ? 'encerrada' : hoje ? statusSemana(hoje) : 'durante';
  const diasRestantes = hoje && status !== 'encerrada'
    ? Math.round((Date.parse(`${SEMANA.fim}T12:00:00-03:00`) - Date.parse(`${hoje}T12:00:00-03:00`)) / 86400000)
    : null;

  if (status === 'encerrada') {
    return (
      <p className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-zinc-300">
        A Semana dos Kits terminou em {dataCurta(SEMANA.fim)}. Entre no grupo para não perder a próxima.
      </p>
    );
  }

  return (
    <div>
      <p className="mb-5 text-zinc-300">
        {hoje === null
          ? <>De <strong className="text-[#ffc107]">{dataCurta(SEMANA.inicio)}</strong> a <strong className="text-[#ffc107]">{dataCurta(SEMANA.fim)}</strong>. Só 5 por kit.</>
          : status === 'antes'
          ? <>Começa em <strong className="text-[#ffc107]">{dataCurta(SEMANA.inicio)}</strong>. Quem já está no grupo sai na frente.</>
          : <>{diasRestantes === 0 ? <strong className="text-[#ffc107]">Último dia! Encerra hoje às 15h.</strong> : <>Faltam <strong className="text-[#ffc107]">{diasRestantes} dia{diasRestantes === 1 ? '' : 's'}</strong>.</>} Só 5 por kit.</>}
      </p>
      <div className="grid gap-5 md:grid-cols-3">
        {trilhasKits.map((t) => {
          const minha = trilha === t.id;
          return (
            <div key={t.id} className={`flex flex-col rounded-2xl border p-6 ${minha ? 'border-[#ffc107] bg-zinc-900' : 'border-zinc-800 bg-zinc-900'}`}>
              <p className="mb-2 inline-block w-fit rounded-full bg-[#ffc107] px-3 py-1 text-xs font-bold text-black">Só {t.vagas} por kit</p>
              <h3 className="mb-1 text-lg font-bold text-zinc-100"><span aria-hidden>{t.emoji}</span> {t.titulo}</h3>
              <p className="mb-4 flex-1 text-sm text-zinc-400">Meta até {dataCurta(SEMANA.fim)}: <strong className="text-zinc-200">{t.meta}</strong></p>
              <button
                type="button"
                onClick={() => escolher(t.id)}
                aria-pressed={minha}
                className={`mb-3 w-full rounded-lg border py-2 text-sm font-bold ${minha ? 'border-[#ffc107] text-[#ffc107]' : 'border-zinc-700 text-zinc-300 hover:border-zinc-500'}`}
              >
                {minha ? '✓ Minha trilha' : 'Quero esta trilha'}
              </button>
              <a href={GRUPO_SORTEIOS} target="_blank" rel="noopener noreferrer"
                className="inline-block w-full rounded-lg bg-[#ffc107] py-3 text-center font-bold text-zinc-950 hover:bg-[#ffca28]">
                Entre e garanta o seu
              </a>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-sm text-zinc-500">
        Só as 5 primeiras de cada kit levam, pela ordem apurada no regulamento. <Link href="/promocoes/regulamento" className="underline">Consulte as regras</Link>.
      </p>
    </div>
  );
}
