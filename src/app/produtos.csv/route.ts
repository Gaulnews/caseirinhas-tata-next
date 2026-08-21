import { tamanhos } from '@/lib/cardapio-semanal';

// Feed de produtos no formato CSV aceito pelo Gerenciador de Comércio da Meta
// (Catálogo do WhatsApp Business, Facebook Shops e Instagram Shopping).
// Referência: https://www.facebook.com/business/help/120325381656392
//
// Modela as 3 marmitas (Mini/Média/Grande) como produtos fixos e sempre
// disponíveis — o prato específico muda todo dia (ver /cardapio), então o
// link e a descrição de cada produto apontam para o cardápio do dia em vez
// de fixar uma foto/prato que ficaria desatualizado no catálogo.
export const revalidate = 3600;

const SITE_URL = 'https://caseirinhasdatata.shop';

// Mesmas coordenadas usadas no schema.org da home/entregas (endereço real
// da loja). Raio de entrega informado pelo negócio: 10km a partir da loja.
const ORIGEM_ENTREGA = '-23.26801,-51.14480';
const RAIO_ENTREGA = '10km';

function csvField(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

export async function GET() {
  const header = [
    'id',
    'title',
    'description',
    'availability',
    'condition',
    'price',
    'link',
    'image_link',
    'brand',
    'google_product_category',
    'availability_circle_origin',
    'availability_circle_radius',
  ];

  const linhas = tamanhos.map((t) => {
    const id = `marmita-${t.id}`;
    const title = `Marmita Caseira ${t.nome} - Caseirinhas da Tatá`;
    const description = `Marmita caseira tamanho ${t.nome}, feita na hora. Cardápio rotativo diário (segunda a domingo) com pratos diferentes todo dia — confira o prato de hoje em ${SITE_URL}/cardapio. Entrega rápida na Zona Norte de Londrina. Taxa de entrega calculada à parte, de acordo com o bairro.`;
    const price = `${t.preco.toFixed(2)} BRL`;

    return [
      id,
      title,
      description,
      'in stock',
      'new',
      price,
      `${SITE_URL}/cardapio`,
      `${SITE_URL}/logo-caseirinhas-da-tata.jpg`,
      'Caseirinhas da Tatá',
      'Food, Beverages & Tobacco > Food Items > Prepared Foods',
      ORIGEM_ENTREGA,
      RAIO_ENTREGA,
    ]
      .map(csvField)
      .join(',');
  });

  const csv = [header.join(','), ...linhas].join('\n') + '\n';

  // BOM (byte-order-mark) no início do arquivo: sem ele, o Excel (e outras
  // ferramentas que leem o CSV depois de salvo em disco, sem o header HTTP)
  // assume a codificação padrão do sistema em vez de UTF-8 e exibe os
  // acentos corrompidos (ex.: "Tatá" vira "TatÃ¡").
  const csvComBom = '\uFEFF' + csv;

  return new Response(csvComBom, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
