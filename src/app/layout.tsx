import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://caseirinhasdatata.shop'),
  title: {
    default: 'Caseirinhas da Tatá | Marmitas Caseiras na Zona Norte de Londrina',
    template: '%s | Caseirinhas da Tatá',
  },
  description: 'Comida caseira feita com carinho e dedicação. Sabor de casa, entregue na sua porta com rapidez na Zona Norte de Londrina.',
  keywords: [
    'Caseirinhas da Tatá',
    'Marmitas Londrina',
    'Marmitex Zona Norte Londrina',
    'Almoço caseiro Londrina',
    'Bife à Parmegiana Londrina',
    'Delivery de comida Londrina',
  ],
  authors: [{ name: 'Caseirinhas da Tatá' }],
  creator: 'Caseirinhas da Tatá',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://caseirinhasdatata.shop',
    title: 'Caseirinhas da Tatá | Marmitas Caseiras em Londrina',
    description: 'Sabor de casa entregue quentinho na sua porta. Confira nosso cardápio do dia.',
    siteName: 'Caseirinhas da Tatá',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="bg-zinc-950 text-gray-100 antialiased selection:bg-yellow-400 selection:text-zinc-950">
        {children}
      </body>
    </html>
  );
}
