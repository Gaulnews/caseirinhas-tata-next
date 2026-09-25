// Fonte única das promoções exclusivas do grupo de WhatsApp.
// Texto-fonte: promo-ct.md do dono (regras inalteradas; só as datas mudam).
// Datas alinhadas ao início dos anúncios Meta (28/09/2026), mantendo as
// durações originais (8, 3 e 4 dias, contíguas).
// Sem imports "@/": o teste roda direto no Node (scripts/test-promocoes-grupo.mjs).
export type PromocaoGrupo = {
  id: 'kit-facas' | 'kit-ferramentas' | 'kit-churrasqueiro';
  emoji: string;
  titulo: string;
  inicio: string; // YYYY-MM-DD, dia civil de Londrina, inclusivo
  fim: string; // YYYY-MM-DD, inclusivo
  texto: string;
};

export const promocoesGrupo: PromocaoGrupo[] = [
  {
    id: 'kit-facas',
    emoji: '🔪',
    titulo: 'KIT DE FACAS',
    inicio: '2026-09-28',
    fim: '2026-10-05',
    texto:
      'Peça *8 Marmitas Mini* OU *6 Marmitas Grandes* dentro desse período (pode ser em pedidos separados, vale o total) e garanta seu Jogo de Facas! As 5 primeiras pessoas a bater a meta levam. 🔪',
  },
  {
    id: 'kit-ferramentas',
    emoji: '🧰',
    titulo: 'KIT DE FERRAMENTAS 46 PEÇAS',
    inicio: '2026-10-06',
    fim: '2026-10-08',
    texto:
      'Peça *5 Marmitas Grandes* OU *7 Marmitas Mini* dentro desse período e concorra ao Kit de Ferramentas 46 peças — ótimo pra casa, moto, carro e muito mais! As 5 primeiras a bater a meta ganham. 🧰',
  },
  {
    id: 'kit-churrasqueiro',
    emoji: '🍖',
    titulo: 'KIT CHURRASQUEIRO',
    inicio: '2026-10-09',
    fim: '2026-10-12',
    texto:
      'Peça *7 Marmitas Mini* OU *6 Marmitas Médias* dentro desse período e leve o Kit Churrasqueiro pra casa — pronto pro seu próximo churrasco! As 5 primeiras a bater a meta levam. 🍖',
  },
];

export const RETIRADA_A_PARTIR_DE = '2026-10-13';

// Formata sem Date: evita deslocar o dia por fuso (UTC x America/Sao_Paulo).
export function dataCurta(iso: string): string {
  const [, mes, dia] = iso.split('-');
  return `${dia}/${mes}`;
}

export type StatusPromocao = 'futura' | 'vigente' | 'encerrada';

// Comparação lexicográfica funciona para YYYY-MM-DD.
export function statusPromocao(p: PromocaoGrupo, hojeIso: string): StatusPromocao {
  if (hojeIso < p.inicio) return 'futura';
  if (hojeIso > p.fim) return 'encerrada';
  return 'vigente';
}

export function promocoesEncerradas(hojeIso: string): boolean {
  return hojeIso > promocoesGrupo[promocoesGrupo.length - 1].fim;
}

const SEPARADOR = '━━━━━━━━━━━━━━━';

export function mensagemGrupo(): string {
  const blocos = promocoesGrupo.map(
    (p, i) =>
      `${p.emoji} *PROMOÇÃO ${i + 1} — ${p.titulo}*\n📅 De *${dataCurta(p.inicio)}* a *${dataCurta(p.fim)}*\n\n${p.texto}`,
  );
  return [
    // O promo-ct.md abre sem o "*" inicial; o negrito do WhatsApp exige o par.
    '*PROMOÇÕES EXCLUSIVAS DO GRUPO — CASEIRINHAS DA TATÁ* 🎁',
    'Chegou a vez de quem tá aqui dentro ganhar de verdade! 🍱',
    '📌 *Como funciona:*\nAs *5 primeiras pessoas* do grupo que baterem a meta de marmitas dentro do período de cada promoção *levam o prêmio na hora, sem sorteio* — vale a ordem de quem fez o pedido primeiro. Cada compra conta pra *uma promoção só*, sempre a que estiver rolando naquele dia.',
    `Todos os prêmios são retirados a partir de *${dataCurta(RETIRADA_A_PARTIR_DE)}*.`,
    SEPARADOR,
    blocos.join(`\n\n${SEPARADOR}\n\n`),
    SEPARADOR,
    '⚠️ *Fica de olho:*\n✅ Cada promoção vale só na sua própria data — não acumula com as outras.\n✅ Quem bate a meta primeiro (pelo horário do pedido) é quem ganha, então não deixa pra última hora!\n✅ Pra contar pra promoção, é só pedir no nosso WhatsApp de sempre: *(43) 99674-9607* 😉',
    'Bora aproveitar? Só quem tá no grupo participa! 💛',
  ].join('\n\n');
}
