'use client';

import { useState } from 'react';
import { ScrollVideo } from '@/components/ScrollVideo';
import { cardapioSemanal } from '@/lib/cardapio-semanal';
import { WHATSAPP_PEDIDOS, IFOOD } from '@/lib/site-data';

// Vitrine interativa em abas dos vídeos reais do cardápio, com um toque de
// gamificação honesto: acompanha localmente (só no navegador do visitante,
// sem enviar nada pra lugar nenhum) quantos dias da semana a pessoa já
// explorou, e comemora quando ela vê todos — sem inventar prêmio, contador
// de participantes ou qualquer dado que não exista de verdade.
type Dia = {
  key: 'segunda' | 'terca' | 'quinta' | 'sexta';
  label: string;
  videos: string[];
};

const dias: Dia[] = [
  { key: 'segunda', label: 'Segunda', videos: ['/contatos/destaque-segunda-1.mp4', '/contatos/destaque-segunda-2.mp4'] },
  { key: 'terca', label: 'Terça', videos: ['/contatos/destaque-terca.mp4'] },
  { key: 'quinta', label: 'Quinta', videos: ['/contatos/destaque-quinta.mp4'] },
  { key: 'sexta', label: 'Sexta', videos: ['/contatos/destaque-sexta.mp4'] },
];

export function CardapioDestaqueTabs() {
  const [ativo, setAtivo] = useState<Dia['key']>('segunda');
  const [vistos, setVistos] = useState<Set<Dia['key']>>(new Set(['segunda']));

  const selecionar = (key: Dia['key']) => {
    setAtivo(key);
    setVistos((prev) => new Set(prev).add(key));
  };

  const diaAtivo = dias.find((d) => d.key === ativo)!;
  const prato = cardapioSemanal[ativo];
  const completou = vistos.size === dias.length;

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {dias.map((dia) => (
          <button
            key={dia.key}
            type="button"
            onClick={() => selecionar(dia.key)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              ativo === dia.key
                ? 'border-[#ffc107] bg-[#ffc107]/10 text-[#ffc107]'
                : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {vistos.has(dia.key) && <span className="mr-1.5">✓</span>}
            {dia.label}
          </button>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2 items-start">
        <div className={`grid gap-4 ${diaAtivo.videos.length > 1 ? 'sm:grid-cols-2' : ''}`}>
          {diaAtivo.videos.map((src) => (
            <ScrollVideo key={src} src={src} className="w-full rounded-2xl border border-zinc-800">
              Seu navegador não suporta vídeo. Confira o cardápio de {diaAtivo.label.toLowerCase()}-feira no WhatsApp.
            </ScrollVideo>
          ))}
        </div>

        <div>
          {prato && (
            <>
              <h3 className="text-2xl font-bold text-zinc-100 mb-2">{prato.tema}</h3>
              <ul className="mb-6 flex flex-wrap gap-2">
                {prato.ingredientes.map((item) => (
                  <li key={item} className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs text-zinc-300">
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
          <div className="flex flex-wrap gap-3">
            <a
              href={WHATSAPP_PEDIDOS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-3 px-6 bg-green-500 text-zinc-950 text-center font-bold rounded-lg hover:bg-green-400"
            >
              Pedir pela loja
            </a>
            <a
              href={IFOOD}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-3 px-6 bg-zinc-800 text-white text-center font-bold rounded-lg hover:bg-zinc-700 ring-1 ring-[#ffc107]/40"
            >
              Pedir pelo iFood
            </a>
          </div>

          <p className="mt-4 text-sm text-zinc-500">
            {completou
              ? '🎉 Você já viu o cardápio de destaque da semana inteira!'
              : `${vistos.size} de ${dias.length} dias explorados — clique nas outras abas pra ver mais.`}
          </p>
        </div>
      </div>
    </div>
  );
}
