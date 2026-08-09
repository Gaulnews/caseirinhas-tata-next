// Cardápio dinâmico por dia da semana. A Caseirinhas da Tatá não abre aos
// domingos (ver horário de funcionamento no Google Business Profile), então
// não existe entrada para domingo.

export type DiaSemanaKey = 'segunda' | 'terca' | 'quarta' | 'quinta' | 'sexta' | 'sabado';

export type PratoDoDia = {
  tema: string;
  ingredientes: string[];
  palavrasChave: string[];
  imagem?: string;
  imagemAlt?: string;
  video?: string;
};

export const diasSemana: { key: DiaSemanaKey; label: string; jsDay: number }[] = [
  { key: 'segunda', label: 'Segunda-feira', jsDay: 1 },
  { key: 'terca', label: 'Terça-feira', jsDay: 2 },
  { key: 'quarta', label: 'Quarta-feira', jsDay: 3 },
  { key: 'quinta', label: 'Quinta-feira', jsDay: 4 },
  { key: 'sexta', label: 'Sexta-feira', jsDay: 5 },
  { key: 'sabado', label: 'Sábado', jsDay: 6 },
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
    video: '/cardapio/segunda-bife-acebolado-sobrecoxa.mp4',
  },
  terca: null,
  quarta: null,
  quinta: null,
  sexta: null,
  sabado: null,
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
export function getDiaSemanaAtual(): DiaSemanaKey | 'domingo' {
  const hojeStr = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo',
    weekday: 'short',
  }).format(new Date());

  const mapa: Record<string, DiaSemanaKey | 'domingo'> = {
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
