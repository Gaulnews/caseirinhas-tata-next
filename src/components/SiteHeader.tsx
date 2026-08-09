'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const navItems = [
  { label: 'Início', href: '/' },
  { label: 'Cardápio do Dia', href: '/cardapio' },
  { label: 'Nossos Serviços', href: '/servicos' },
  { label: 'Contatos', href: '/contatos' },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
      <div className="px-5 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-full bg-black ring-1 ring-[#ffc107]/40">
              <Image
                src="/emblema-caseirinhas-da-tata.png"
                alt="Emblema da logomarca Caseirinhas da Tatá: casa dourada com garfos cruzados"
                width={50}
                height={50}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <span className="text-[22px] font-bold text-white">Caseirinhas da Tatá</span>
          </div>

          <nav className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-medium text-white transition-colors hover:text-[#ffc107]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex flex-col gap-[5px] md:hidden"
          >
            <span className="h-[3px] w-[30px] bg-white transition-transform" />
            <span className="h-[3px] w-[30px] bg-white transition-opacity" />
            <span className="h-[3px] w-[30px] bg-white transition-transform" />
          </button>
        </div>

        {open && (
          <nav className="mt-6 flex flex-col gap-5 border-t border-zinc-800 pt-6 md:hidden">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-medium text-white transition-colors hover:text-[#ffc107]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
