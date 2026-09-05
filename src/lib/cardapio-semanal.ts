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
  quinta: {
    tema: 'Carne Assada com Bistequinha de Porco Grelhada',
    ingredientes: [
      'Arroz',
      'Feijão Carioca',
      'Farofa de Ovo',
      'Macarrão à Bolonhesa',
      'Carne Assada',
      'Bistequinha de Porco Grelhada',
      'Salada Sortida',
    ],
    palavrasChave: [
      'cardápio de quinta-feira',
      'carne assada delivery Londrina',
      'bistequinha de porco grelhada marmita',
      'marmitex quinta-feira Londrina',
      'marmita caseira Zona Norte',
    ],
    imagem: '/cardapio/quinta-carne-assada-bisteca.jpg',
    imagemAlt: 'Marmita de quinta-feira da Caseirinhas da Tatá com arroz, feijão carioca, farofa de ovo, macarrão à bolonhesa, carne assada, bistequinha de porco grelhada e salada sortida',
    imagemLargura: 1024,
    imagemAltura: 1024,
    video: '/cardapio/quinta-carne-assada-bisteca.mp4',
  },
  sexta: {
    tema: 'Dia de Churrasco: Bisteca de Boi na Brasa',
    ingredientes: [
      'Arroz',
      'Feijão Carioca',
      'Farofa Crocante',
      'Macarronese',
      'Proteínas na Brasa',
      'Bisteca de Boi',
      'Coxinha de Frango',
      'Linguiça Toscana',
      'Salada Vinagrete',
    ],
    palavrasChave: [
      'cardápio de sexta-feira',
      'churrasco delivery Londrina',
      'bisteca de boi na brasa marmita',
      'marmitex sexta-feira Londrina',
      'marmita caseira Zona Norte',
    ],
    imagem: '/cardapio/sexta-churrasco.jpg',
    imagemAlt: 'Marmita de sexta-feira (dia de churrasco) da Caseirinhas da Tatá com arroz, feijão carioca, farofa crocante, macarronese, bisteca de boi, coxinha de frango, linguiça toscana e salada vinagrete',
    imagemLargura: 1024,
    imagemAltura: 1024,
    video: '/cardapio/sexta-churrasco.mp4',
  },
  sabado: {
    tema: 'Cardápio de Sábado: 2 Opções Especiais',
    ingredientes: [],
    palavrasChave: [
      'cardápio de sábado',
      'bife acebolado delivery Londrina',
      'pernil assado marmita',
      'feijoada sábado Londrina',
      'marmitex sábado Londrina',
      'marmita caseira Zona Norte',
    ],
    imagem: '/cardapio/sabado-feijoada-cardapio.jpg',
    imagemAlt: 'Cardápio de sábado da Caseirinhas da Tatá com Feijoada Completa, arroz branco, couve, farofa e torresmo',
    imagemLargura: 1024,
    imagemAltura: 1024,
    video: '/cardapio/sabado-feijoada.mp4',
    opcoes: [
      {
        id: 'bife-pernil-sabado',
        tema: 'Bife Acebolado com Pernil Suculento Assado',
        ingredientes: [
          'Arroz Soltinho',
          'Feijão Carioca Bem Temperado',
          'Tiras de Bife Acebolado',
          'Pernil Suculento Assado',
          'Couve ao Alho',
          'Farofa com Bacon Crocante',
          'Vinagrete',
        ],
        imagem: '/cardapio/sabado-bife-acebolado-pernil.png',
        imagemAlt: 'Marmita de sábado com arroz, feijão, bife acebolado, pernil assado, couve, farofa com bacon e vinagrete',
        imagemLargura: 1048,
        imagemAltura: 851,
        video: '/cardapio/sabado-bife-acebolado-pernil.mp4',
      },
      {
        id: 'feijoada-sabado',
        tema: 'Feijoada Completa',
        ingredientes: ['Arroz Branco', 'Feijoada Completa', 'Couve Refogada', 'Farofa', 'Torresmo'],
        imagem: '/cardapio/sabado-feijoada.jpg',
        imagemAlt: 'Feijoada completa de sábado com arroz branco, couve refogada, farofa e torresmo',
        imagemLargura: 1080,
        imagemAltura: 887,
        video: '/cardapio/sabado-feijoada.mp4',
      },
    ],
  },
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

// Opção fixa, disponível em qualquer dia da semana (inclusive nos dias com
// prato único), além do prato do dia — não substitui o cardápio rotativo.
export const saladaCaesarDiaria: OpcaoPrato = {
  id: 'salada-caesar-diaria',
  tema: 'Salada Caesar (Mounjaro Fit)',
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
