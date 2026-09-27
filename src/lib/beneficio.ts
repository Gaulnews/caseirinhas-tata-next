// Cupom impresso no pedido iFood da Caseirinhas da Tatá: benefício de 2ª
// compra, resgatado pelo WhatsApp. Sem imports "@/": o teste roda direto no
// Node.
export type Beneficio = {
  id: 'coca2l' | 'salada' | 'mini';
  titulo: string;
  condicao: string;
};

export const BENEFICIOS: Beneficio[] = [
  {
    id: 'coca2l',
    titulo: 'Coca-Cola 2 L grátis',
    condicao: 'Pedido direto a partir de R$ 40.',
  },
  {
    id: 'salada',
    titulo: 'Salada Caesar grátis',
    condicao: 'Pedido direto a partir de R$ 40.',
  },
  {
    id: 'mini',
    titulo: 'Na compra de uma marmita de qualquer tamanho, leve uma mini',
    condicao: 'Só retirada, pedido a partir de R$ 25, 1 por cliente.',
  },
];

export const REGRAS_GERAIS: string[] = [
  'Escolha 1 benefício.',
  'Cupom numerado, 1 por cliente, uso único.',
  'Vence às 23h59 do dia seguinte ao pedido, conforme impresso no cupom.',
  'Resgate pelo WhatsApp informando o código.',
  'Não acumula com outras promoções.',
  'É preciso estar no grupo de promoções.',
];

const WHATSAPP_RESGATE = 'https://wa.me/5543996749607';

// 23:59:59 do dia seguinte ao pedido, no fuso America/Sao_Paulo (-03:00).
// Ex.: pedido 28/09 12:30 -03:00 → vencimento 29/09 23:59:59 -03:00.
export function vencimento(dataPedido: Date): Date {
  const hojeIso = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(dataPedido);
  const [ano, mes, dia] = hojeIso.split('-').map(Number);
  const proximoDia = new Date(Date.UTC(ano, mes - 1, dia + 1));
  const y = proximoDia.getUTCFullYear();
  const m = String(proximoDia.getUTCMonth() + 1).padStart(2, '0');
  const d = String(proximoDia.getUTCDate()).padStart(2, '0');
  return new Date(`${y}-${m}-${d}T23:59:59-03:00`);
}

export function mensagemResgate(codigo: string, beneficioId: string): string {
  const beneficio = BENEFICIOS.find((b) => b.id === beneficioId);
  const texto = `Quero resgatar meu cupom ${codigo} (${beneficio ? beneficio.titulo : beneficioId}).`;
  return `${WHATSAPP_RESGATE}?text=${encodeURIComponent(texto)}`;
}
