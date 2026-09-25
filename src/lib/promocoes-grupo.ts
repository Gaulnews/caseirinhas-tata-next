// Fonte única da Semana Promocional 28/09–04/10/2026 do grupo oficial.
// Fontes: manual_promocoes_caseirinhas_28set_04out_2026.pdf (estrutura,
// Reloginhos, regras) e promo-ct.md (metas dos kits). Preço de Reloginho
// não aparece aqui até o dono aprovar: a oferta é revelada no grupo.
// Sem imports "@/": o teste roda direto no Node.
export type TrilhaKit = {
  id: 'kit-facas' | 'kit-ferramentas' | 'kit-churrasqueiro';
  emoji: string;
  titulo: string;
  meta: string;
  vagas: 5;
};

export type Reloginho = {
  codigo: 'RL-GR' | 'RL-BOAS' | 'RL-ECO' | 'RL-DUPLA';
  data: string; // YYYY-MM-DD, dia de Londrina
  titulo: string;
  janela: string | null; // texto exibido; null = a confirmar
  inicio: string | null; // ISO com -03:00
  fim: string | null;
  revelacao: string | null;
  resumo: string; // sem preço
};

// D6 (dono, 25/09): domingo 04/10 a loja abre das 10:40 às 15:00; os kits
// encerram no fechamento.
export const SEMANA = {
  inicio: '2026-09-28',
  fim: '2026-10-04',
  encerramento: '2026-10-04T15:00:00-03:00',
} as const;

export const trilhasKits: TrilhaKit[] = [
  { id: 'kit-facas', emoji: '🔪', titulo: 'Kit de Facas', meta: '8 Minis OU 6 Grandes', vagas: 5 },
  { id: 'kit-ferramentas', emoji: '🧰', titulo: 'Kit de Ferramentas 46 peças', meta: '7 Minis OU 5 Grandes', vagas: 5 },
  { id: 'kit-churrasqueiro', emoji: '🍖', titulo: 'Kit Churrasqueiro', meta: '7 Minis OU 6 Médias', vagas: 5 },
];

export const reloginhos: Reloginho[] = [
  {
    codigo: 'RL-GR', data: '2026-09-28', titulo: 'Reloginho Grandão',
    janela: 'Primeira hora após a abertura', inicio: null, fim: null, revelacao: null,
    resumo: 'Para quem pede Grandes para retirada. Oferta revelada no grupo antes de começar.',
  },
  {
    codigo: 'RL-BOAS', data: '2026-09-29', titulo: 'Reloginho de Boas-vindas',
    // D5 (dono, 25/09): 1 hora a partir do aviso de início.
    janela: '1 hora a partir do aviso de início no grupo', inicio: null, fim: null, revelacao: null,
    resumo: 'Para o primeiro pedido direto de quem é do grupo. Janela anunciada no grupo.',
  },
  {
    codigo: 'RL-ECO', data: '2026-09-30', titulo: 'Reloginho Econômico',
    janela: '13h às 14h', inicio: '2026-09-30T13:00:00-03:00', fim: '2026-09-30T14:00:00-03:00',
    revelacao: '2026-09-30T12:30:00-03:00',
    resumo: 'A oferta mais em conta da semana, na Mini para retirada.',
  },
  {
    codigo: 'RL-DUPLA', data: '2026-10-01', titulo: 'Reloginho Dupla',
    janela: '13h às 14h', inicio: '2026-10-01T13:00:00-03:00', fim: '2026-10-01T14:00:00-03:00',
    revelacao: '2026-10-01T12:30:00-03:00',
    resumo: 'Para quem pede duas Médias juntas para retirada.',
  },
];

// D7 (dono, 25/09): o "sorteio diário" é o Reloginho aplicado todo dia.
// Não há sorteio; por isso o site não usa a palavra "sorteio" para ele.
export const RELOGINHO_DIARIO = {
  titulo: 'Reloginho Todo o dia',
  texto: 'Além dos destaques da semana, todo dia tem Reloginho no grupo, em horário estratégico. A oferta é revelada no grupo 30 minutos antes.',
};

export const REGRAS_GERAIS: string[] = [
  'Válido para quem já está no grupo oficial antes de fazer o pedido.',
  'Contam apenas pedidos diretos pelo WhatsApp (43) 99674-9607, aceitos, pagos e não cancelados. Pedidos do iFood não contam.',
  'Cada pedido entra em uma única promoção: kit, Reloginho, refri grátis ou Caesar do 1º pedido.',
  'Kits: escolha uma trilha antes do primeiro pedido; não é possível trocar de trilha nem somar tamanhos diferentes.',
  `Kits: valem pedidos de ${dataCurta(SEMANA.inicio)} até ${dataCurta(SEMANA.fim)} às ${horaCurta(SEMANA.encerramento)}.`,
  // Critério do manual (§4): o pedido que completa a meta define a ordem.
  'Kits: até 5 contemplados por kit. A ordem é definida pelo horário do pedido que completa a meta, segundo o registro da loja; cumprir a meta depois das 5 vagas não garante premiação.',
  'Kits: data e forma de retirada do prêmio são informadas no grupo ao fim da apuração.',
  'Reloginhos: a oferta é revelada no grupo antes de começar, com a janela informada no aviso; vale para todos que pedirem dentro da janela.',
];

export function dataCurta(iso: string): string {
  const [, mes, dia] = iso.slice(0, 10).split('-');
  return `${dia}/${mes}`;
}

// '2026-10-04T15:00:00-03:00' → '15h'; '...T10:40...' → '10h40'. Lê a hora
// local do próprio texto ISO, sem Date, para não mudar com o fuso.
export function horaCurta(iso: string): string {
  const [h, m] = iso.slice(11, 16).split(':');
  return m === '00' ? `${Number(h)}h` : `${Number(h)}h${m}`;
}

export function semanaAtiva(agoraMs: number = Date.now()): boolean {
  return agoraMs < Date.parse(SEMANA.encerramento);
}

// Chamada do grupo usada na home, bio, contatos, carrossel e /promocoes.
// Depois do encerramento dos kits vira uma chamada neutra, sem prazo vencido.
export function chamadaGrupo(agoraMs: number = Date.now()): { titulo: string; texto: string; cta: string } {
  if (semanaAtiva(agoraMs)) {
    return {
      titulo: `${RELOGINHO_DIARIO.titulo} + Semana dos Kits: só 5 por kit!`,
      texto: `De ${dataCurta(SEMANA.inicio)} a ${dataCurta(SEMANA.fim)} às ${horaCurta(SEMANA.encerramento)}. Ofertas relâmpago reveladas 30 min antes, só para quem está no grupo.`,
      cta: 'Entre e garanta o seu',
    };
  }
  return {
    titulo: `${RELOGINHO_DIARIO.titulo} no grupo oficial`,
    texto: 'Ofertas relâmpago reveladas no grupo antes de começar. Quem está no grupo vê primeiro.',
    cta: 'Entrar no grupo',
  };
}

export function hojeEmLondrina(agora: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(agora);
}

export function statusSemana(hojeIso: string): 'antes' | 'durante' | 'encerrada' {
  if (hojeIso < SEMANA.inicio) return 'antes';
  if (hojeIso > SEMANA.fim) return 'encerrada';
  return 'durante';
}

export function reloginhoDoDia(hojeIso: string): Reloginho | undefined {
  return reloginhos.find((r) => r.data === hojeIso);
}

export function formatarRestante(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return h > 0 ? `${h}h ${String(m).padStart(2, '0')}min` : `${m}min ${String(s).padStart(2, '0')}s`;
}

// Instantes com -03:00: o resultado não depende do fuso do aparelho.
export function avisoReloginho(r: Reloginho, agoraMs: number): string {
  if (!r.revelacao || !r.inicio || !r.fim) return r.janela ?? 'Janela anunciada no grupo';
  const rev = Date.parse(r.revelacao);
  const ini = Date.parse(r.inicio);
  const fim = Date.parse(r.fim);
  if (agoraMs < rev) return `Revelação em ${formatarRestante(rev - agoraMs)}`;
  if (agoraMs < ini) return `Revelado no grupo! Começa em ${formatarRestante(ini - agoraMs)}`;
  if (agoraMs < fim) return `Valendo agora! Termina em ${formatarRestante(fim - agoraMs)}`;
  return 'Encerrado';
}

const SEPARADOR = '━━━━━━━━━━━━━━━';

export function mensagemGrupo(): string {
  const kits = trilhasKits
    .map((t) => `${t.emoji} *${t.titulo.toUpperCase()}* — meta: *${t.meta}* · só *${t.vagas}* por kit`)
    .join('\n');
  const agenda = reloginhos
    .map((r) => `⏰ *${dataCurta(r.data)}* — ${r.titulo}${r.janela ? ` (${r.janela})` : ''}`)
    .join('\n');
  return [
    '*SEMANA PROMOCIONAL DO GRUPO — CASEIRINHAS DA TATÁ* 🎁',
    `📅 De *${dataCurta(SEMANA.inicio)}* a *${dataCurta(SEMANA.fim)}*. É só pra quem está aqui dentro!`,
    SEPARADOR,
    '🏆 *SEMANA DOS KITS*\nEscolha *uma* trilha antes do primeiro pedido e bata a meta até *' + dataCurta(SEMANA.fim) + ' às ' + horaCurta(SEMANA.encerramento) + '*. As 5 primeiras pessoas de cada kit *garantem o prêmio*, sem sorteio. Entre e garanta o seu!\n' + kits,
    '⚠️ Bater a meta depois que as 5 vagas do kit acabarem não dá prêmio: vale a ordem apurada pelo regulamento. *Consulte as regras* no site: caseirinhasdatata.shop/promocoes/regulamento',
    SEPARADOR,
    '⏰ *RELOGINHOS DA TATÁ*\nOferta relâmpago de 1 hora, revelada no grupo 30 minutos antes. Quem piscar, perde!\n' + agenda,
    SEPARADOR,
    '🔔 *' + RELOGINHO_DIARIO.titulo + '*\n' + RELOGINHO_DIARIO.texto + ' Ative as notificações do grupo!',
    SEPARADOR,
    '✅ Cada pedido vale para *uma promoção só*.\n✅ Pedidos pelo WhatsApp de sempre: *(43) 99674-9607* 😉\n✅ Pedidos do iFood não contam.',
    'Fica de olho no grupo e não deixa pra última hora! 💛',
  ].join('\n\n');
}
