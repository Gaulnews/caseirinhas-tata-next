'use client';

import { useEffect, useState } from 'react';
import { ScrollVideo } from '@/components/ScrollVideo';

// Vitrine das ofertas reais em vídeo (mesmo padrão do CardapioDestaqueTabs):
// só promoções que existem de verdade, com o mesmo vídeo publicado no
// Google Meu Negócio. Gamificação honesta e local — marca "já conferi"
// quando o vídeo entra na tela (sem enviar nada, sem inventar contador de
// participantes ou prazo que não exista).
type Promocao = {
  id: 'refri-gratis' | 'salada-caesar';
  video: string;
  titulo: string;
  descricao: string;
  ctaHref: string;
  ctaLabel: string;
};

const promocoes: Promocao[] = [
  {
    id: 'refri-gratis',
    video: '/contatos/promo-refri-gratis.mp4',
    titulo: '1 Refri Grátis nas Marmitas Caseiras',
    descricao:
      'Peça 2 marmitas caseiras da Caseirinhas da Tatá e ganhe 1 refrigerante grátis! Comida caseira feita com carinho e dedicação, entregue quentinha na sua porta com rapidez na Zona Norte de Londrina.',
    ctaHref: '/cardapio',
    ctaLabel: 'Ver cardápio e pedir',
  },
  {
    id: 'salada-caesar',
    video: '/contatos/promo-salada-caesar-primeiro-pedido.mp4',
    titulo: 'Salada Caesar Mounjaro Fit Grátis no 1º Pedido',
    descricao:
      'Novo por aqui? Ganhe uma Salada Caesar (Mounjaro Fit) grátis no seu primeiro pedido — marmita caseira e delivery de comida na Zona Norte de Londrina, disponível todos os dias.',
    ctaHref: '/cardapio#salada-caesar-heading',
    ctaLabel: 'Conhecer a Salada Caesar',
  },
];

export function PromocoesAtivas() {
  const [conferidas, setConferidas] = useState<Set<Promocao['id']>>(new Set());

  useEffect(() => {
    try {
      const salvas = localStorage.getItem('promocoes-conferidas');
      if (salvas) setConferidas(new Set(JSON.parse(salvas)));
    } catch {
      // localStorage indisponível (modo privado, etc.) — segue sem persistir.
    }
  }, []);

  const marcarConferida = (id: Promocao['id']) => {
    setConferidas((prev) => {
      if (prev.has(id)) return prev;
      const proximo = new Set(prev).add(id);
      try {
        localStorage.setItem('promocoes-conferidas', JSON.stringify([...proximo]));
      } catch {
        // idem — falha silenciosa, é só uma conveniência visual.
      }
      return proximo;
    });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {promocoes.map((promo) => (
        <div key={promo.id} className="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="relative mb-4">
            <ScrollVideo
              src={promo.video}
              className="w-full rounded-xl border border-zinc-800"
              onEmTela={() => marcarConferida(promo.id)}
            >
              Seu navegador não suporta vídeo. Confira a promoção {promo.titulo} no WhatsApp.
            </ScrollVideo>
            {conferidas.has(promo.id) && (
              <span className="absolute right-3 top-3 rounded-full bg-zinc-950/80 px-3 py-1 text-xs font-bold text-[#ffc107] backdrop-blur">
                ✓ Já conferi
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-zinc-100 mb-2">🎁 {promo.titulo}</h3>
          <p className="text-zinc-400 text-sm mb-6 flex-1">{promo.descricao}</p>
          <a
            href={promo.ctaHref}
            className="inline-block w-full py-3 bg-[#ffc107] text-zinc-950 text-center font-bold rounded-lg hover:bg-[#ffca28]"
          >
            {promo.ctaLabel}
          </a>
        </div>
      ))}
    </div>
  );
}
