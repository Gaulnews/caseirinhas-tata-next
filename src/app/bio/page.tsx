import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

// Página "link na bio", pensada pra ser o destino do link único no perfil do
// Instagram (@caseirinhasdatata) — reúne num só lugar tudo que hoje está
// espalhado entre /cardapio, /servicos e os dois números de WhatsApp.
// Segue a identidade já estabelecida no resto do site (fundo escuro,
// dourado #ffc107, logo real), não um template genérico.
export const metadata: Metadata = {
  title: 'Todos os Links',
  description: 'Cardápio da semana, pedidos pelo WhatsApp e todos os serviços da Caseirinhas da Tatá — marmitas caseiras entregues na Zona Norte de Londrina.',
  keywords: ['link na bio caseirinhas da tata', 'pedido whatsapp marmita londrina', 'cardápio caseirinhas da tata'],
  alternates: { canonical: 'https://caseirinhasdatata.shop/bio' },
  openGraph: {
    title: 'Caseirinhas da Tatá — Todos os Links',
    description: 'Cardápio, pedidos e serviços — tudo num só lugar.',
    url: 'https://caseirinhasdatata.shop/bio',
  },
};

const WHATSAPP_PEDIDOS = 'https://wa.me/5543996749607';
const WHATSAPP_B2B = 'https://wa.me/5543999821401';
const INSTAGRAM = 'https://instagram.com/caseirinhasdatata';
const IFOOD = 'https://www.ifood.com.br/delivery/londrina-pr/caseirinhas-da-tata-conjunto-semiramis-barros-braga/b9d8f184-2b32-4383-acbb-964cdc14505a';
const GRUPO_SORTEIOS = 'https://chat.whatsapp.com/FpdiveKJ4Mx8bxXk0bipxQ?s=sh&p=a&mlu=4';

type LinkItem = {
  href: string;
  label: string;
  desc: string;
  external?: boolean;
};

const links: LinkItem[] = [
  {
    href: WHATSAPP_PEDIDOS,
    label: 'Pedir pelo WhatsApp',
    desc: 'Atendimento direto, resposta rápida',
    external: true,
  },
  {
    href: IFOOD,
    label: 'Peça pelo iFood',
    desc: 'Nossa loja no aplicativo',
    external: true,
  },
  {
    href: '/cardapio',
    label: 'Cardápio da Semana',
    desc: 'Veja o prato e os tamanhos de hoje',
  },
  {
    href: '/servicos',
    label: 'Nossos Serviços',
    desc: 'MarmiFlix, Company e Single',
  },
  {
    href: GRUPO_SORTEIOS,
    label: 'Grupo de Sorteios',
    desc: 'Entre no grupo e concorra a prêmios',
    external: true,
  },
  {
    href: WHATSAPP_B2B,
    label: 'Parcerias B2B / Empresas',
    desc: 'Pacotes mensais para sua equipe',
    external: true,
  },
  {
    href: INSTAGRAM,
    label: 'Instagram',
    desc: '@caseirinhasdatata',
    external: true,
  },
];

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 32 32" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.386.7 4.61 1.905 6.482L4 29l7.72-1.865A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm6.984 17.14c-.294.828-1.46 1.516-2.395 1.716-.637.135-1.469.243-4.27-.918-3.581-1.482-5.885-5.09-6.066-5.328-.174-.238-1.454-1.93-1.454-3.684 0-1.754.917-2.615 1.243-2.974.294-.324.65-.406.867-.406.217 0 .434.002.624.011.2.01.469-.076.734.56.294.706.998 2.46 1.086 2.64.087.18.144.39.028.628-.115.238-.174.386-.347.594-.174.208-.365.463-.522.622-.174.176-.355.367-.153.72.202.353.9 1.483 1.933 2.402 1.328 1.184 2.448 1.55 2.802 1.726.354.176.56.15.767-.09.208-.24.881-1.026 1.117-1.378.235-.353.47-.294.79-.176.322.118 2.043.964 2.393 1.14.35.176.583.264.669.412.086.148.086.858-.208 1.686Z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.97.24 2.43.4a4.9 4.9 0 0 1 1.77 1.15 4.9 4.9 0 0 1 1.15 1.77c.16.46.35 1.26.4 2.43.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.97-.4 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.46.16-1.26.35-2.43.4-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.97-.24-2.43-.4a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.16-.46-.35-1.26-.4-2.43C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.24-1.97.4-2.43a4.9 4.9 0 0 1 1.15-1.77A4.9 4.9 0 0 1 5.59 1.8c.46-.16 1.26-.35 2.43-.4C9.29 1.34 9.67 1.33 12 1.33Zm0 1.98c-3.15 0-3.5.01-4.74.07-.96.04-1.48.2-1.83.34-.46.18-.79.39-1.13.73-.34.34-.55.67-.73 1.13-.14.35-.3.87-.34 1.83-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.04.96.2 1.48.34 1.83.18.46.39.79.73 1.13.34.34.67.55 1.13.73.35.14.87.3 1.83.34 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c.96-.04 1.48-.2 1.83-.34.46-.18.79-.39 1.13-.73.34-.34.55-.67.73-1.13.14-.35.3-.87.34-1.83.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.04-.96-.2-1.48-.34-1.83a3.02 3.02 0 0 0-.73-1.13 3.02 3.02 0 0 0-1.13-.73c-.35-.14-.87-.3-1.83-.34-1.24-.06-1.59-.07-4.74-.07Zm0 3.37a5.45 5.45 0 1 1 0 10.9 5.45 5.45 0 0 1 0-10.9Zm0 1.98a3.47 3.47 0 1 0 0 6.94 3.47 3.47 0 0 0 0-6.94Zm5.66-2.2a1.27 1.27 0 1 1-2.55 0 1.27 1.27 0 0 1 2.55 0Z" />
    </svg>
  );
}

export default function BioPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 px-5 py-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#ffc107]/20 blur-[110px]"
      />

      <div className="relative mx-auto flex w-full max-w-sm flex-col items-center">
        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-black ring-2 ring-[#ffc107]/60 shadow-[0_0_40px_rgba(255,193,7,0.15)]">
          <Image
            src="/emblema-caseirinhas-da-tata.png"
            alt="Emblema da logomarca Caseirinhas da Tatá: casa dourada com garfos cruzados"
            width={96}
            height={96}
            className="h-full w-full object-cover"
            priority
          />
        </div>

        <h1 className="mt-5 text-2xl font-extrabold text-white">Caseirinhas da Tatá</h1>
        <p className="mt-1 text-center text-sm text-zinc-400">
          Marmitas caseiras · Zona Norte de Londrina
        </p>

        <div className="mt-5 flex items-center gap-3">
          <a
            href={WHATSAPP_PEDIDOS}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-zinc-300 ring-1 ring-zinc-800 transition-colors hover:text-[#ffc107] hover:ring-[#ffc107]/50"
          >
            <IconWhatsApp />
          </a>
          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-zinc-300 ring-1 ring-zinc-800 transition-colors hover:text-[#ffc107] hover:ring-[#ffc107]/50"
          >
            <IconInstagram />
          </a>
        </div>

        <nav className="mt-9 flex w-full flex-col gap-3">
          {links.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full flex-col rounded-2xl border border-zinc-800 bg-zinc-900/80 px-5 py-4 text-left transition-colors hover:border-[#ffc107]/60 hover:bg-zinc-900"
              >
                <span className="font-semibold text-white transition-colors group-hover:text-[#ffc107]">{item.label}</span>
                <span className="text-sm text-zinc-500">{item.desc}</span>
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="group flex w-full flex-col rounded-2xl border border-zinc-800 bg-zinc-900/80 px-5 py-4 text-left transition-colors hover:border-[#ffc107]/60 hover:bg-zinc-900"
              >
                <span className="font-semibold text-white transition-colors group-hover:text-[#ffc107]">{item.label}</span>
                <span className="text-sm text-zinc-500">{item.desc}</span>
              </Link>
            ),
          )}
        </nav>

        <Link href="/" className="mt-10 text-sm text-zinc-600 transition-colors hover:text-zinc-400">
          caseirinhasdatata.shop
        </Link>
      </div>
    </main>
  );
}
