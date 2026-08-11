import { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';

const SITE_URL = 'https://caseirinhasdatata.shop';
const WHATSAPP = '5543996749607';

type Servico = {
  id: string;
  emoji: string;
  badge: string;
  nome: string;
  titulo: string;
  descricao: string;
  bullets: string[];
  ctaTexto: string;
  ctaMensagem: string;
  serviceType: string;
};

const servicos: Servico[] = [
  {
    id: 'marmiflix',
    emoji: '🎬',
    badge: 'PARA PESSOA FÍSICA E PESSOA JURÍDICA',
    nome: 'MarmiFlix',
    titulo: 'Assinatura de Almoço: Semanal, Quinzenal ou Mensal',
    descricao:
      'Chega de perder tempo e energia decidindo o que comer, cozinhando correndo entre uma tarefa e outra ou se aborrecendo com aquela marmita fria trazida de casa. No MarmiFlix você assina o plano de almoço da Caseirinhas da Tatá — semanal, quinzenal ou mensal — e recebe sua marmita caseira quentinha certinha no horário, todos os dias do seu plano. Preços e condições exclusivas e imperdíveis para assinantes, disponível para Pessoa Física e Pessoa Jurídica.',
    bullets: [
      'Entrega garantida em todos os dias do seu plano',
      'Planos semanal, quinzenal e mensal',
      'Preços e condições exclusivas para assinantes',
      'Disponível para Pessoa Física (PF) e Pessoa Jurídica (PJ)',
    ],
    ctaTexto: 'Quero Assinar o MarmiFlix',
    ctaMensagem: 'Olá! Quero saber mais sobre os planos de assinatura MarmiFlix (semanal, quinzenal ou mensal).',
    serviceType: 'Assinatura de almoço (marmita caseira por assinatura)',
  },
  {
    id: 'company',
    emoji: '🏢',
    badge: 'EXCLUSIVO PARA EMPRESAS',
    nome: 'Company',
    titulo: 'Gestão de Nutrição e Alimentação Corporativa',
    descricao:
      'Levamos a estrutura do nosso restaurante até a sua empresa. O Company é o serviço de gestão de nutrição e alimentação corporativa da Caseirinhas da Tatá: implementamos toda a operação de refeições diretamente no local da sua empresa ou no local do seu evento corporativo, seja para o dia a dia da equipe, seja para ocasiões e eventos específicos.',
    bullets: [
      'Estrutura de restaurante montada no local da empresa ou do evento',
      'Refeições diárias para toda a equipe',
      'Atendimento para eventos corporativos específicos',
      'Gestão completa de nutrição e alimentação corporativa',
    ],
    ctaTexto: 'Solicitar Proposta Company',
    ctaMensagem: 'Olá! Minha empresa tem interesse no serviço Company (gestão de alimentação corporativa no local).',
    serviceType: 'Gestão de nutrição e alimentação corporativa no local',
  },
  {
    id: 'single',
    emoji: '🥗',
    badge: 'SOB MEDIDA PARA VOCÊ',
    nome: 'Single',
    titulo: 'Refeições Dietéticas Sob Medida',
    descricao:
      'Cada pessoa tem uma necessidade nutricional diferente. O Single é o serviço de fornecimento de refeições dietéticas e sob medida da Caseirinhas da Tatá, desenvolvido para atender às especificações nutricionais de cada pessoa, individualmente — a marmita certa, preparada do jeito certo, para o seu objetivo.',
    bullets: [
      'Refeições dietéticas 100% personalizadas',
      'Atendimento às especificações nutricionais individuais',
      'Ideal para dietas, restrições alimentares e objetivos específicos',
      'Acompanhamento próximo do seu plano alimentar',
    ],
    ctaTexto: 'Quero um Plano Single',
    ctaMensagem: 'Olá! Tenho interesse no serviço Single de refeições dietéticas sob medida.',
    serviceType: 'Refeições dietéticas personalizadas (nutrição individual)',
  },
];

export const metadata: Metadata = {
  title: 'Serviços: MarmiFlix, Company e Single',
  description:
    'Conheça o MarmiFlix (assinatura de almoço semanal, quinzenal ou mensal para PF e PJ), o Company (alimentação corporativa no local da sua empresa) e o Single (refeições dietéticas sob medida) da Caseirinhas da Tatá em Londrina.',
  keywords: [
    'marmita por assinatura Londrina',
    'assinatura de almoço Londrina',
    'MarmiFlix Caseirinhas da Tatá',
    'alimentação corporativa Londrina',
    'restaurante corporativo no local Londrina',
    'refeição para eventos corporativos Londrina',
    'marmita dietética sob medida',
    'refeição personalizada Londrina',
    'marmita caseira Zona Norte Londrina',
    'delivery de comida Londrina',
  ],
  alternates: { canonical: `${SITE_URL}/servicos` },
  openGraph: {
    title: 'Serviços: MarmiFlix, Company e Single - Caseirinhas da Tatá',
    description:
      'Assinatura de almoço (MarmiFlix), alimentação corporativa no local (Company) e refeições dietéticas sob medida (Single). Conheça os serviços da Caseirinhas da Tatá em Londrina.',
    url: `${SITE_URL}/servicos`,
    images: [
      {
        url: `${SITE_URL}/logo-caseirinhas-da-tata.jpg`,
        width: 1024,
        height: 1024,
        alt: 'Logomarca Caseirinhas da Tatá',
      },
    ],
  },
};

export default function ServicosPage() {
  const servicesSchema = {
    '@context': 'https://schema.org',
    '@graph': servicos.map((s) => ({
      '@type': 'Service',
      name: s.nome,
      serviceType: s.serviceType,
      description: s.descricao,
      provider: { '@type': 'FoodEstablishment', name: 'Caseirinhas da Tatá', url: SITE_URL },
      areaServed: { '@type': 'City', name: 'Londrina' },
      url: `${SITE_URL}/servicos#${s.id}`,
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Serviços', item: `${SITE_URL}/servicos` },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'O que é o MarmiFlix?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'É o clube de assinatura de almoço da Caseirinhas da Tatá, com planos semanal, quinzenal ou mensal, entrega garantida e condições exclusivas para assinantes.',
        },
      },
      {
        '@type': 'Question',
        name: 'O MarmiFlix é só para pessoa física?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Não! O MarmiFlix está disponível tanto para Pessoa Física (PF) quanto para Pessoa Jurídica (PJ).',
        },
      },
      {
        '@type': 'Question',
        name: 'Como funciona o serviço Company?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'O Company é exclusivo para empresas: montamos a estrutura do nosso restaurante no local da sua empresa ou do seu evento corporativo, para refeições diárias da equipe ou ocasiões específicas.',
        },
      },
      {
        '@type': 'Question',
        name: 'O que é o serviço Single?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'É o fornecimento de refeições dietéticas e sob medida, atendendo às especificações nutricionais de cada pessoa individualmente.',
        },
      },
      {
        '@type': 'Question',
        name: 'Como contrato um desses serviços?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'É só chamar no WhatsApp (43) 99674-9607 e contar qual serviço tem interesse: MarmiFlix, Company ou Single.',
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="flex min-h-screen flex-col bg-zinc-950">
        <SiteHeader />

        <main className="flex-1 px-4 py-12 md:py-16">
          <div className="mx-auto max-w-5xl">
            <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-zinc-500">
              <Link href="/" className="transition-colors hover:text-[#ffc107]">Início</Link>
              <span>/</span>
              <span className="text-zinc-300">Serviços</span>
            </nav>

            <header className="mb-14 text-center">
              <span className="mb-4 inline-block rounded-full border border-[#ffc107]/20 bg-[#ffc107]/10 px-3 py-1 font-mono text-xs text-[#ffc107]">
                SOLUÇÕES CASEIRINHAS DA TATÁ
              </span>
              <h1 className="mb-4 text-4xl font-extrabold text-yellow-400 md:text-5xl">Nossos Serviços</h1>
              <p className="mx-auto max-w-2xl text-lg text-zinc-300">
                Três formas de resolver o seu almoço em Londrina: assinatura para o dia a dia, estrutura completa
                dentro da sua empresa ou refeições sob medida para as suas necessidades nutricionais.
              </p>
            </header>

            <div className="grid gap-8 md:grid-cols-3">
              {servicos.map((s) => (
                <div key={s.id} id={s.id} className="flex scroll-mt-24 flex-col rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#ffc107]/10 text-3xl">
                    {s.emoji}
                  </div>
                  <span className="mb-3 inline-block w-fit rounded-full border border-[#ffc107]/20 bg-[#ffc107]/10 px-3 py-1 font-mono text-[11px] text-[#ffc107]">
                    {s.badge}
                  </span>
                  <h2 className="mb-1 text-2xl font-bold text-zinc-100">{s.nome}</h2>
                  <p className="mb-4 text-sm font-semibold text-zinc-400">{s.titulo}</p>
                  <p className="mb-6 text-sm leading-relaxed text-zinc-400">{s.descricao}</p>
                  <ul className="mb-6 space-y-2 text-sm text-zinc-400">
                    {s.bullets.map((b) => (
                      <li key={b}>✅ <span className="text-zinc-300">{b}</span></li>
                    ))}
                  </ul>
                  <a
                    href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(s.ctaMensagem)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto block rounded-xl bg-[#ffc107] py-3 text-center font-bold text-black transition-colors hover:bg-[#ffca28]"
                  >
                    {s.ctaTexto}
                  </a>
                </div>
              ))}
            </div>

            <section aria-label="Perguntas frequentes sobre os serviços" className="mt-16 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8">
              <h2 className="mb-6 text-2xl font-bold text-zinc-100">Perguntas Frequentes</h2>
              <div className="space-y-6">
                {faqSchema.mainEntity.map((faq) => (
                  <div key={faq.name}>
                    <h3 className="mb-1 font-bold text-zinc-100">{faq.name}</h3>
                    <p className="text-sm text-zinc-400">{faq.acceptedAnswer.text}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="mt-14 flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/cardapio" className="text-[#ffc107] hover:text-[#ffca28] font-bold underline underline-offset-4">
                Ver Cardápio do Dia
              </Link>
              <Link href="/contatos" className="text-[#ffc107] hover:text-[#ffca28] font-bold underline underline-offset-4">
                Falar com a Gente
              </Link>
              <Link href="/" className="text-zinc-500 hover:text-[#ffc107] font-bold underline underline-offset-4">
                ← Voltar para a página inicial
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
