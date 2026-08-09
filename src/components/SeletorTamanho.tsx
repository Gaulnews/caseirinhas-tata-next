'use client';

import { useState } from 'react';
import { tamanhos, formatarPreco, type Tamanho } from '@/lib/cardapio-semanal';

export function SeletorTamanho({ pratoNome }: { pratoNome: string }) {
  const [selecionado, setSelecionado] = useState<Tamanho>(tamanhos[1]);

  const mensagem = `Olá! Gostaria de pedir a marmita "${pratoNome}" - Tamanho ${selecionado.nome} (R$ ${formatarPreco(selecionado.preco)})`;
  const whatsappUrl = `https://wa.me/5543996749607?text=${encodeURIComponent(mensagem)}`;

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 mb-3">
        {tamanhos.map((tamanho) => {
          const ativo = tamanho.id === selecionado.id;
          return (
            <button
              key={tamanho.id}
              type="button"
              onClick={() => setSelecionado(tamanho)}
              aria-pressed={ativo}
              className={`rounded-xl border-2 px-3 py-4 text-center transition-all ${
                ativo
                  ? 'border-[#ffc107] bg-[#ffc107]/10 shadow-[0_0_0_1px_rgba(255,193,7,0.4)]'
                  : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'
              }`}
            >
              <span className={`block text-sm font-bold ${ativo ? 'text-[#ffc107]' : 'text-zinc-300'}`}>
                {tamanho.nome}
              </span>
              <span className="block text-lg font-extrabold text-white mt-1">
                R$ {formatarPreco(tamanho.preco)}
              </span>
            </button>
          );
        })}
      </div>

      <p className="text-xs text-zinc-500 mb-4">
        *Taxa de entrega não incluída — calculada na finalização do pedido, de acordo com a sua região.
      </p>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full rounded-xl bg-[#ffc107] py-3 text-center font-bold text-black transition-colors hover:bg-[#ffca28]"
      >
        Pedir tamanho {selecionado.nome} no WhatsApp
      </a>
    </div>
  );
}
