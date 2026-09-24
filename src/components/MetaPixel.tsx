'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { destinoContato, pixelIdValido } from '@/lib/meta-pixel';

type Fbq = (...args: unknown[]) => void;

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '';
const PIXEL_VALIDO = pixelIdValido(PIXEL_ID);

function obterFbq(): Fbq | undefined {
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  return typeof fbq === 'function' ? fbq : undefined;
}

export function MetaPixel() {
  const pathname = usePathname();
  const primeiraRota = useRef(true);

  // PageView nas navegações internas (o script inline cobre só o 1º carregamento).
  useEffect(() => {
    if (!PIXEL_VALIDO) return;
    if (primeiraRota.current) {
      primeiraRota.current = false;
      return;
    }
    obterFbq()?.('track', 'PageView');
  }, [pathname]);

  // Contact ao clicar em WhatsApp/iFood; EntrouGrupo para convites de grupo.
  useEffect(() => {
    if (!PIXEL_VALIDO) return;
    const aoClicar = (evento: MouseEvent) => {
      if (evento.type === 'auxclick' && evento.button !== 1) return;
      const link = (evento.target as Element | null)?.closest?.('a[href]');
      if (!link) return;
      const destino = destinoContato(link.getAttribute('href') ?? '', window.location.href);
      if (destino === 'grupo') obterFbq()?.('trackCustom', 'EntrouGrupo');
      else if (destino) obterFbq()?.('track', 'Contact', { destino });
    };
    document.addEventListener('click', aoClicar, { capture: true });
    document.addEventListener('auxclick', aoClicar, { capture: true });
    return () => {
      document.removeEventListener('click', aoClicar, { capture: true });
      document.removeEventListener('auxclick', aoClicar, { capture: true });
    };
  }, []);

  if (!PIXEL_VALIDO) return null;

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('set','autoConfig',false,'${PIXEL_ID}');
fbq('init','${PIXEL_ID}');
fbq('track','PageView');`}
    </Script>
  );
}
