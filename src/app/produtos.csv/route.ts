import { cardapioSemanal, diasSemana, tamanhos } from '@/lib/cardapio-semanal';

// Feed de produtos no formato CSV aceito pelo Gerenciador de Comércio da Meta
// (Catálogo do WhatsApp Business, Facebook Shops e Instagram Shopping).
// Referência: https://www.facebook.com/business/help/120325381656392
//
// Espelha integralmente o cardápio semanal do site (/cardapio): um produto
// por combinação de prato ou opção do dia × tamanho, com
// foto real, ingredientes e link direto para o dia correspondente. Produtos
// do mesmo prato são agrupados por item_group_id, com o tamanho como
// variante — mesmo padrão de catálogo com variantes recomendado pela Meta.
export const revalidate = 3600;

const SITE_URL = 'https://caseirinhasdatata.shop';
const CATEGORIA = 'Food, Beverages & Tobacco > Food Items > Prepared Foods';

// Mesmas coordenadas usadas no schema.org da home/entregas (endereço real
// da loja). Raio de entrega informado pelo negócio: 10km a partir da loja.
// availability_circle_radius precisa ser só numérico (sem unidade) — o
// Gerenciador de Comércio da Meta rejeita "10km" com o diagnóstico
// "property_value_non_numeric" (confirmado via ads_catalog_get_diagnostics).
const ORIGEM_ENTREGA = '-23.26801,-51.14480';
const RAIO_ENTREGA = '10';

function csvField(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

type LinhaProduto = {
  id: string;
  itemGroupId: string;
  title: string;
  description: string;
  price: number;
  link: string;
  imageLink: string;
  size: string;
  customLabel0: string;
};

export async function GET() {
  const header = [
    'id',
    'item_group_id',
    'title',
    'description',
    'availability',
    'condition',
    'price',
    'link',
    'image_link',
    'brand',
    'google_product_category',
    'size',
    'custom_label_0',
    'availability_circle_origin',
    'availability_circle_radius',
  ];

  const produtos: LinhaProduto[] = [];

  for (const dia of diasSemana) {
    const prato = cardapioSemanal[dia.key];
    if (!prato) continue;

    const linkDia = `${SITE_URL}/cardapio#${dia.key}`;

    if (prato.opcoes) {
      for (const opcao of prato.opcoes) {
        const imagem = opcao.imagem ?? prato.imagem ?? `${SITE_URL}/logo-caseirinhas-da-tata.jpg`;
        for (const t of tamanhos) {
          produtos.push({
            id: `cardapio-${dia.key}-${opcao.id}-${t.id}`,
            itemGroupId: `cardapio-${dia.key}-${opcao.id}`,
            title: `${opcao.tema} (${dia.label}) - ${t.nome} - Caseirinhas da Tatá`,
            description: `${opcao.ingredientes.join(', ')}. Uma das ${prato.opcoes.length} opções especiais de ${dia.label.toLowerCase()} da Caseirinhas da Tatá. Marmita caseira feita na hora, entrega rápida na Zona Norte de Londrina.`,
            price: t.preco,
            link: linkDia,
            imageLink: imagem.startsWith('http') ? imagem : `${SITE_URL}${imagem}`,
            size: t.nome,
            customLabel0: dia.label,
          });
        }
      }
    } else {
      const imagem = prato.imagem ?? `${SITE_URL}/logo-caseirinhas-da-tata.jpg`;
      for (const t of tamanhos) {
        produtos.push({
          id: `cardapio-${dia.key}-${t.id}`,
          itemGroupId: `cardapio-${dia.key}`,
          title: `${prato.tema} (${dia.label}) - ${t.nome} - Caseirinhas da Tatá`,
          description: `${prato.ingredientes.join(', ')}. Disponível toda ${dia.label} no cardápio rotativo da Caseirinhas da Tatá. Marmita caseira feita na hora, entrega rápida na Zona Norte de Londrina.`,
          price: t.preco,
          link: linkDia,
          imageLink: imagem.startsWith('http') ? imagem : `${SITE_URL}${imagem}`,
          size: t.nome,
          customLabel0: dia.label,
        });
      }
    }
  }

  const linhas = produtos.map((p) =>
    [
      p.id,
      p.itemGroupId,
      p.title,
      p.description,
      'in stock',
      'new',
      `${p.price.toFixed(2)} BRL`,
      p.link,
      p.imageLink,
      'Caseirinhas da Tatá',
      CATEGORIA,
      p.size,
      p.customLabel0,
      ORIGEM_ENTREGA,
      RAIO_ENTREGA,
    ]
      .map(csvField)
      .join(','),
  );

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
