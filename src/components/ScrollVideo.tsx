'use client';

import { useEffect, useRef } from 'react';

type ScrollVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  children?: React.ReactNode;
  /** Chamado uma vez, na primeira vez que o vídeo entra na área visível. */
  onEmTela?: () => void;
};

// Vídeo que inicia automaticamente quando entra parcialmente na tela (scroll)
// e pausa assim que sai da área visível — evita reprodução desnecessária em
// background (melhor para performance/dados do usuário) e melhora o
// engajamento ao já mostrar o prato em movimento.
export function ScrollVideo({ src, poster, className, children, onEmTela }: ScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
          onEmTela?.();
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [onEmTela]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      className={className}
      controls
      muted
      loop
      playsInline
      preload="metadata"
    >
      {children}
    </video>
  );
}
