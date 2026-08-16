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
  'gleba-palhano': 'Gleba Palhano',
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

// Clusters geográficos usados tanto na segmentação de anúncios quanto nos
// grupos de promoção do WhatsApp — cada bairro pertence a um único cluster.
export type ClusterPromocional =
  | 'cinco-conjuntos-zona-norte'
  | 'centro-gleba-palhano'
  | 'alpes'
  | 'leste';

export const bairroParaCluster: Record<string, ClusterPromocional> = {
  'cinco-conjuntos': 'cinco-conjuntos-zona-norte',
  'milton-gavetti': 'cinco-conjuntos-zona-norte',
  'vivi-xavier': 'cinco-conjuntos-zona-norte',
  'carnascialli': 'cinco-conjuntos-zona-norte',
  'heimtal': 'cinco-conjuntos-zona-norte',
  'conjunto-habitacional-joao-paz': 'cinco-conjuntos-zona-norte',
  'conjunto-parigot-de-souza-1': 'cinco-conjuntos-zona-norte',
  'parigot-de-souza-2': 'cinco-conjuntos-zona-norte',
  'conjunto-parigot-de-souza-3': 'cinco-conjuntos-zona-norte',
  'maria-celina': 'cinco-conjuntos-zona-norte',
  'novo-amparo': 'cinco-conjuntos-zona-norte',
  'ouro-verde': 'cinco-conjuntos-zona-norte',
  'perobinha': 'cinco-conjuntos-zona-norte',
  'vista-bela': 'cinco-conjuntos-zona-norte',
  'coliseu': 'cinco-conjuntos-zona-norte',
  'centro': 'centro-gleba-palhano',
  'gleba-palhano': 'centro-gleba-palhano',
  'alpes': 'alpes',
  'jardim-dos-alpes-1': 'alpes',
  'jardim-dos-alpes-2': 'alpes',
  'conjunto-alexandre-urbanas': 'leste',
};

// Links dos grupos de promoção do WhatsApp por cluster. Só entram aqui
// depois de o grupo ser criado de fato — clusters sem grupo ainda não
// aparecem neste objeto, e a página de bairro simplesmente não mostra
// o botão de "entrar no grupo" nesse caso.
export const linkGrupoPromocionalPorCluster: Partial<Record<ClusterPromocional, string>> = {
  'cinco-conjuntos-zona-norte': 'https://chat.whatsapp.com/FpdiveKJ4Mx8bxXk0bipxQ?s=cl&p=a&ilr=0',
};
