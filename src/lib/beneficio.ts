// Cupom impresso no pedido iFood da Caseirinhas da Tatá: benefício de 2ª
// compra, resgatado pelo WhatsApp. Sem imports "@/": o teste roda direto no
// Node.
export { vencimento } from './vencimento.mjs';

// Formato do código impresso no cupom: TATA- seguido de 4 dígitos.
export const REGEX_CODIGO = /^TATA-\d{4}$/;

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

export function mensagemResgate(codigo: string, beneficioId: string): string {
  const beneficio = BENEFICIOS.find((b) => b.id === beneficioId);
  const texto = `Quero resgatar meu cupom ${codigo} (${beneficio ? beneficio.titulo : beneficioId}).`;
  return `${WHATSAPP_RESGATE}?text=${encodeURIComponent(texto)}`;
}
