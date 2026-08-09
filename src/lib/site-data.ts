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
