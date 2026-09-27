'use client';

import { useState } from 'react';
import { BENEFICIOS, mensagemResgate } from '@/lib/beneficio';

const REGEX_CODIGO = /^TATA-\d{4}$/;

export function CupomForm({ codigoInicial }: { codigoInicial: string }) {
  const [codigo, setCodigo] = useState(codigoInicial);
  const [beneficioId, setBeneficioId] = useState<(typeof BENEFICIOS)[number]['id']>(BENEFICIOS[0].id);

  const codigoValido = REGEX_CODIGO.test(codigo);
  const link = codigoValido ? mensagemResgate(codigo, beneficioId) : null;

  return (
    <div className="rounded-2xl border border-[#ffc107]/20 bg-zinc-900 p-6">
      <label htmlFor="codigo-cupom" className="block text-sm font-semibold text-gray-200 mb-2">
        Código do cupom (impresso no pedido)
      </label>
      <input
        id="codigo-cupom"
        type="text"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value.toUpperCase())}
        placeholder="TATA-0001"
        className="w-full rounded-lg bg-zinc-950 border border-zinc-700 px-4 py-3 text-gray-100 font-mono tracking-wide mb-4"
      />

      <fieldset className="mb-4">
        <legend className="block text-sm font-semibold text-gray-200 mb-2">Escolha 1 benefício</legend>
        <div className="flex flex-col gap-2">
          {BENEFICIOS.map((b) => (
            <label key={b.id} className="flex items-start gap-2 text-sm text-gray-300">
              <input
                type="radio"
                name="beneficio"
                value={b.id}
                checked={beneficioId === b.id}
                onChange={() => setBeneficioId(b.id)}
                className="mt-1"
              />
              <span>
                <span className="font-semibold text-gray-100">{b.titulo}</span>
                {' — '}
                {b.condicao}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {!codigoValido && codigo.length > 0 && (
        <p className="text-sm text-red-400 mb-4">Código inválido. Use o formato TATA-0001, impresso no seu cupom.</p>
      )}

      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full text-center rounded-lg bg-[#25D366] text-zinc-950 font-bold py-3 px-4"
        >
          Resgatar pelo WhatsApp
        </a>
      ) : (
        <button
          type="button"
          disabled
          className="w-full text-center rounded-lg bg-zinc-700 text-zinc-400 font-bold py-3 px-4 cursor-not-allowed"
        >
          Informe o código para resgatar
        </button>
      )}
    </div>
  );
}
