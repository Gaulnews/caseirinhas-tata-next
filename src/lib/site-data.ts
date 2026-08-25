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
export const GRUPO_SORTEIOS = 'https://chat.whatsapp.com/FpdiveKJ4Mx8bxXk0bipxQ?s=sh&p=a&mlu=4';
export const AVALIAR_GOOGLE = 'https://g.page/r/CWNr7bcB5USREBM/review';
export const ENDERECO_COMPLETO = 'Rua Maria Sinopoli Francovig, 1142 - Conj. Semíramis Barros Braga, Londrina - PR, 86088-080';

// Dicionário de Bairros (Alinhamento Absoluto com o Google Business Profile)
export const bairros: Record<string, string> = {
  'centro': 'Centro',
  'coliseu': 'Coliseu',
  'perobinha': 'Perobinha',
  'ouro-verde': 'Ouro Verde',
  'vista-bela': 'Vista Bela',
  'maria-celina': 'Maria Celina',
  'alpes': 'Alpes',
  'heimtal': 'Heimtal',
  'parigot-de-souza-2': 'Parigot de Souza 2',
  'novo-amparo': 'Novo Amparo',
  'vivi-xavier': 'Vivi Xavier',
  'carnascialli': 'Carnascialli',
  'conjunto-parigot-de-souza-3': 'Conj. Parigot de Souza 3',
  'milton-gavetti': 'Milton Gavetti',
  'cinco-conjuntos': 'Cinco Conjuntos',
  'conjunto-alexandre-urbanas': 'Conjunto Alexandre Urbanas',
  'jardim-dos-alpes-1': 'Jardim dos Alpes I',
  'conjunto-habitacional-joao-paz': 'Conj. Hab. João Paz',
  'jardim-dos-alpes-2': 'Jardim dos Alpes II',
  'conjunto-parigot-de-souza-1': 'Conj. Parigot de Souza 1',
};
