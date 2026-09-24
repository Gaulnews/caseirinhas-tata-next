// Fonte única de verdade para as listas usadas em /categorias, /tags, /entregas
// e no sitemap.ts — evita divergência entre as páginas de listagem, as rotas
// dinâmicas de detalhe e o sitemap.xml.

export type Categoria = {
  nome: string;
  slug: string;
  desc: string;
};

export const categorias: Categoria[] = [
  { nome: 'Pratos do Dia', slug: 'pratos-do-dia', desc: 'Refeições frescas, como nosso famoso Bife à Parmegiana.' },
  { nome: 'Pacotes B2B (Empresas)', slug: 'pacotes-b2b', desc: 'Soluções mensais para alimentar sua equipe com qualidade.' },
  { nome: 'Opções Fit', slug: 'opcoes-fit', desc: 'Alimentação balanceada para manter a dieta em dia.' },
  { nome: 'Sobremesas', slug: 'sobremesas', desc: 'O toque doce perfeito após o almoço.' },
];

export const tags: string[] = [
  '#ZonaNorte', '#CincoConjuntos', '#AlmoçoRápido', '#ComidaCaseira',
  '#MarmitaLondrina', '#Coliseu', '#Alpes', '#Parigot', '#B2B',
];

export function tagSlug(tag: string): string {
  return tag.replace('#', '').toLowerCase();
}

// Contatos e links oficiais — fonte única usada por /bio, /contatos e pelo
// schema.org, pra nunca haver dois números/links diferentes em páginas
// diferentes.
export const WHATSAPP_PEDIDOS = 'https://wa.me/5543996749607';
export const WHATSAPP_PEDIDOS_NUMERO = '(43) 99674-9607';
export const WHATSAPP_B2B = 'https://wa.me/5543999821401';
export const WHATSAPP_B2B_NUMERO = '(43) 99982-1401';
export const INSTAGRAM = 'https://instagram.com/caseirinhasdatata';
export const IFOOD =
  'https://www.ifood.com.br/delivery/londrina-pr/caseirinhas-da-tata-conjunto-semiramis-barros-braga/b9d8f184-2b32-4383-acbb-964cdc14505a';
// Grupo oficial de WhatsApp (definido pelo dono em 24/09/2026). Único link de
// grupo do site: home, /bio, /contatos e carrossel usam esta constante.
export const GRUPO_SORTEIOS = 'https://chat.whatsapp.com/DRbxArNS4ObKih8QZBs4ON';
export const AVALIAR_GOOGLE = 'https://g.page/r/CWNr7bcB5USREBM/review';
export const ENDERECO_COMPLETO = 'Rua Maria Sinopoli Francovig, 1142 - Conj. Semíramis Barros Braga, Londrina - PR, 86088-080';

// Dicionário de Bairros (Alinhamento Absoluto com o Google Business Profile)
// Ordem = prioridade por proximidade de carro a partir da cozinha (Rua Maria
// Sinopoli Francovig, 1142), informada pelo dono em 24/09/2026. A ordem define
// a lista da home, os links cruzados e o menu de bairros do bot.
export const bairros: Record<string, string> = {
  'novo-amparo': 'Novo Amparo', // 1,6 km
  'cinco-conjuntos': 'Cinco Conjuntos', // 2,2 km
  'heimtal': 'Heimtal', // 4,0 km
  'vivi-xavier': 'Vivi Xavier', // 4,6 km
  'carnascialli': 'Carnascialli', // 4,9 km
  'conjunto-parigot-de-souza-1': 'Conj. Parigot de Souza 1', // ~6,4 km
  'parigot-de-souza-2': 'Parigot de Souza 2', // ~6,4 km
  'conjunto-parigot-de-souza-3': 'Conj. Parigot de Souza 3', // ~6,4 km
  'ouro-verde': 'Ouro Verde', // 6,8 km
  'maria-celina': 'Maria Celina', // 7,7 km
  // Complexo Norte adjacente: entre 4 e 9 km (sem distância exata).
  'conjunto-habitacional-joao-paz': 'Conj. Hab. João Paz',
  'vista-bela': 'Vista Bela',
  'perobinha': 'Perobinha',
  'coliseu': 'Coliseu',
  'alpes': 'Alpes',
  'jardim-dos-alpes-1': 'Jardim dos Alpes I',
  'jardim-dos-alpes-2': 'Jardim dos Alpes II',
  'conjunto-alexandre-urbanas': 'Conjunto Alexandre Urbanas', // 10,1 km
  'milton-gavetti': 'Milton Gavetti', // 11,3 km
  'centro': 'Centro', // distância não informada
  'gleba-palhano': 'Gleba Palhano', // 13,1 km (zona sul)
};
