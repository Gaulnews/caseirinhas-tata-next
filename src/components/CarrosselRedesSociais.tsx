'use client';

import { useEffect, useState } from 'react';

// Carrossel autoral, dinâmico (rotação automática + navegação por bolinhas),
// mas SEM inventar conteúdo: cada slide é uma chamada real pra um link real
// (Instagram, grupo de promoções, avaliações no Google). Não simula posts
// nem depoimentos que não existem — só varia a vitrine de chamadas.
type Slide = {
  emoji: string;
  titulo: string;
  desc: string;
  href: string;
  cta: string;
};

const slides: Slide[] = [
  {
    emoji: '📸',
    titulo: 'Bastidores da Cozinha',
    desc: 'Acompanhe o preparo das marmitas em tempo real, todos os dias, no nosso Instagram.',
    href: 'https://instagram.com/caseirinhasdatata',
    cta: 'Seguir no Instagram',
  },
  {
    emoji: '🍱',
    titulo: 'Cardápio da Semana em Vídeo',
    desc: 'Veja o prato de cada dia antes de pedir — publicamos o cardápio em vídeo direto no feed.',
    href: 'https://instagram.com/caseirinhasdatata',
    cta: 'Ver no Instagram',
  },
  {
    emoji: '🎁',
    titulo: 'Promoções e Sorteios',
    desc: 'Entre no grupo oficial de promoções da Caseirinhas da Tatá pelo WhatsApp e fique por dentro de cada sorteio.',
    href: 'https://chat.whatsapp.com/FpdiveKJ4Mx8bxXk0bipxQ?s=sh&p=a&mlu=4',
    cta: 'Entrar no grupo',
  },
  {
    emoji: '⭐',
    titulo: 'Avaliações no Google',
    desc: 'Nota 5,0 no Google — veja as avaliações reais de quem já pediu com a gente.',
    href: 'https://g.page/r/CWNr7bcB5USREBM/review',
    cta: 'Ver avaliações',
  },
];

export function CarrosselRedesSociais() {
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndice((i) => (i + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[indice];

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
      <a
        href={slide.href}
        target="_blank"
        rel="noopener noreferrer"
        key={slide.titulo}
        className="block transition-opacity duration-300"
      >
        <span className="text-3xl">{slide.emoji}</span>
        <h3 className="mt-3 text-lg font-bold text-white">{slide.titulo}</h3>
        <p className="mt-1 text-sm text-zinc-400">{slide.desc}</p>
        <span className="mt-4 inline-block font-semibold text-[#ffc107]">{slide.cta} →</span>
      </a>

      <div className="mt-5 flex justify-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.titulo}
            type="button"
            aria-label={`Mostrar: ${s.titulo}`}
            onClick={() => setIndice(i)}
            className={`h-2 w-2 rounded-full transition-colors ${i === indice ? 'bg-[#ffc107]' : 'bg-zinc-700'}`}
          />
        ))}
      </div>
    </div>
  );
}
