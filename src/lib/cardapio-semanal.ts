// Cardápio dinâmico por dia da semana, incluindo domingo (cardápio especial
// com 3 opções à escolha).

export type DiaSemanaKey = 'segunda' | 'terca' | 'quarta' | 'quinta' | 'sexta' | 'sabado' | 'domingo';

// Usada quando um dia tem mais de um prato à escolha (ex.: domingo).
export type OpcaoPrato = {
  id: string;
  tema: string;
  ingredientes: string[];
  imagem?: string;
  imagemAlt?: string;
  imagemLargura?: number;
  imagemAltura?: number;
  video?: string;
};

export type PratoDoDia = {
  tema: string;
  ingredientes: string[];
  palavrasChave: string[];
  imagem?: string;
  imagemAlt?: string;
  imagemLargura?: number;
  imagemAltura?: number;
  video?: string;
  // Quando presente, o dia oferece várias opções de prato (cada uma com seu
  // próprio seletor de tamanho) em vez de um único prato do dia.
  opcoes?: OpcaoPrato[];
};

export const diasSemana: { key: DiaSemanaKey; label: string; jsDay: number }[] = [
  { key: 'segunda', label: 'Segunda-feira', jsDay: 1 },
  { key: 'terca', label: 'Terça-feira', jsDay: 2 },
  { key: 'quarta', label: 'Quarta-feira', jsDay: 3 },
  { key: 'quinta', label: 'Quinta-feira', jsDay: 4 },
  { key: 'sexta', label: 'Sexta-feira', jsDay: 5 },
  { key: 'sabado', label: 'Sábado', jsDay: 6 },
  { key: 'domingo', label: 'Domingo', jsDay: 0 },
];

// Somente a segunda-feira foi definida até o momento. Os demais dias ficam
// como `null` (cardápio "em preparação") até serem confirmados.
export const cardapioSemanal: Record<DiaSemanaKey, PratoDoDia | null> = {
  segunda: {
    tema: 'Bife Acebolado com Sobrecoxa Assada',
    ingredientes: [
      'Arroz',
      'Feijão Carioca',
      'Farofa Temperada',
      'Batata Frita',
      'Bife Acebolado',
      'Sobrecoxa Assada',
      'Salada Sortida',
    ],
    palavrasChave: [
      'cardápio de segunda-feira',
      'bife acebolado delivery Londrina',
      'sobrecoxa assada marmita',
      'marmitex segunda-feira Londrina',
      'marmita caseira Zona Norte',
    ],
    imagem: '/cardapio/segunda-bife-acebolado-sobrecoxa.png',
    imagemAlt: 'Marmita de segunda-feira da Caseirinhas da Tatá com arroz, feijão carioca, farofa temperada, batata frita, bife acebolado e sobrecoxa assada',
    imagemLargura: 1200,
    imagemAltura: 896,
    video: '/cardapio/segunda-bife-acebolado-sobrecoxa.mp4',
  },
  terca: {
    tema: 'Filé de Frango Grelhado com Panqueca de Carne',
    ingredientes: [
      'Arroz',
      'Feijão',
      'Farofa Temperada',
      'Batatas à Dorê',
      'Filé de Frango Grelhado',
      'Panqueca de Carne',
      'Salada Sortida',
    ],
    palavrasChave: [
      'cardápio de terça-feira',
      'frango grelhado delivery Londrina',
      'panqueca de carne marmita',
      'marmitex terça-feira Londrina',
      'marmita caseira Zona Norte',
    ],
    imagem: '/cardapio/terca-frango-grelhado-panqueca.jpg',
    imagemAlt: 'Marmita de terça-feira da Caseirinhas da Tatá com arroz, feijão, farofa temperada, batatas à dorê, filé de frango grelhado, panqueca de carne e salada sortida',
    imagemLargura: 1024,
    imagemAltura: 1024,
    video: '/cardapio/terca-frango-grelhado-panqueca.mp4',
  },
  quarta: {
    tema: 'Ragu de Ossobuco com Filé de Frango à Milanesa',
    ingredientes: [
      'Arroz',
      'Feijão Carioca',
      'Macarrão à Alho e Óleo',
      'Farofa Temperada',
      'Ragu de Ossobuco',
      'Filé de Frango à Milanesa',
      'Salada Sortida',
    ],
    palavrasChave: [
      'cardápio de quarta-feira',
      'ossobuco delivery Londrina',
      'frango à milanesa marmita',
      'marmitex quarta-feira Londrina',
      'marmita caseira Zona Norte',
    ],
    imagem: '/cardapio/quarta-ossobuco-file-milanesa.jpg',
    imagemAlt: 'Marmita de quarta-feira da Caseirinhas da Tatá com arroz, feijão carioca, macarrão à alho e óleo, farofa temperada, ragu de ossobuco, filé de frango à milanesa e salada sortida',
    imagemLargura: 1024,
    imagemAltura: 1024,
    video: '/cardapio/quarta-ossobuco-file-milanesa.mp4',
  },
  quinta: null,
  sexta: null,
  sabado: null,
  domingo: {
    tema: 'Cardápio de Domingo: 3 Opções Especiais',
    ingredientes: [],
    palavrasChave: [
      'cardápio de domingo Londrina',
      'feijoada delivery Londrina',
      'marmita tradicional de domingo',
      'salada caesar fit Londrina',
      'marmitex domingo Zona Norte',
    ],
    imagem: '/cardapio/domingo-feijoada.jpg',
    imagemAlt: 'Feijoada completa da Caseirinhas da Tatá em marmitex, com torresmo à moda da chefe, paleta premium assada, farofa temperada e couve refogada',
    imagemLargura: 1024,
    imagemAltura: 1024,
    video: '/cardapio/domingo-cardapio-especial.mp4',
    opcoes: [
      {
        id: 'salada-mounjaro',
        tema: 'Salada Mounjaro (Caesar Fit)',
        ingredientes: [
          'Alface Americana',
          'Alface Roxa',
          'Cenoura Ralada',
          'Cebola Roxa',
          'Frango em Cubos',
          'Crutons',
          'Molho de Parmesão Fit Low',
          'Queijo Colonial',
        ],
        video: '/cardapio/domingo-salada-mounjaro.mp4',
      },
      {
        id: 'tradicional-domingo',
        tema: 'Tradicional de Domingo',
        ingredientes: [
          'Arroz',
          'Feijão Carioca',
          'Farofa Temperada',
          'Couve Refogada',
          'Bife Grelhado',
          'Leitão no Tacho',
          'Mix de Salada',
        ],
        video: '/cardapio/domingo-tradicional.mp4',
      },
      {
        id: 'feijoada',
        tema: 'Feijoada (Fejuca)',
        ingredientes: [
          'Arroz',
          'Feijoada Completa',
          'Farofa Temperada',
          'Couve Refogada',
          'Torresmo à Moda da Chefe',
          'Paleta Premium Assada',
        ],
        imagem: '/cardapio/domingo-feijoada.jpg',
        imagemAlt: 'Feijoada completa da Caseirinhas da Tatá em marmitex, com torresmo à moda da chefe, paleta premium assada, farofa temperada e couve refogada',
        imagemLargura: 1024,
        imagemAltura: 1024,
        video: '/cardapio/domingo-feijoada.mp4',
      },
    ],
  },
};

export type Tamanho = {
  id: 'mini' | 'media' | 'grande';
  nome: string;
  preco: number;
};

export const tamanhos: Tamanho[] = [
  { id: 'mini', nome: 'Mini', preco: 20.0 },
  { id: 'media', nome: 'Média', preco: 25.0 },
  { id: 'grande', nome: 'Grande', preco: 28.0 },
];

export function formatarPreco(valor: number): string {
  return valor.toFixed(2).replace('.', ',');
}

/**
 * Dia da semana "de hoje" no fuso de Londrina/PR (America/Sao_Paulo),
 * independente do fuso do servidor onde a página é renderizada.
 */
export function getDiaSemanaAtual(): DiaSemanaKey {
  const hojeStr = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo',
    weekday: 'short',
  }).format(new Date());

  const mapa: Record<string, DiaSemanaKey> = {
    Sun: 'domingo',
    Mon: 'segunda',
    Tue: 'terca',
    Wed: 'quarta',
    Thu: 'quinta',
    Fri: 'sexta',
    Sat: 'sabado',
  };

  return mapa[hojeStr] ?? 'segunda';
}
