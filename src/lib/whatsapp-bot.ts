import { bairros } from '@/lib/site-data';
import {
  cardapioSemanal,
  diasSemana,
  tamanhos,
  formatarPreco,
  getDiaSemanaAtual,
  type DiaSemanaKey,
} from '@/lib/cardapio-semanal';

// Lógica de conversa do bot de pedidos do WhatsApp — 100% sem estado: cada
// passo é decidido só pelo texto/id da mensagem recebida, e o id de cada
// botão/opção já carrega tudo que o próximo passo precisa saber (dia,
// opção de domingo e tamanho). Não depende de banco de dados nem de sessão.
//
// Fica em src/lib para poder ser testado isoladamente do webhook do
// WhatsApp (src/app/api/whatsapp/webhook/route.ts), que só converte estas
// ações em chamadas da Graph API da Meta.

export type BotAction =
  | { kind: 'text'; text: string }
  | { kind: 'buttons'; text: string; buttons: { id: string; title: string }[] }
  | {
      kind: 'list';
      text: string;
      buttonLabel: string;
      sections: { title?: string; rows: { id: string; title: string; description?: string }[] }[];
    };

const NOME_LOJA = 'Caseirinhas da Tatá';
const SITE_URL = 'https://caseirinhasdatata.shop';

// Rótulos curtos para caber no limite de 24 caracteres do título de linha
// de lista do WhatsApp (o tema completo de algumas opções de domingo é
// longo demais para esse limite).
const ROTULO_CURTO_OPCAO: Record<string, string> = {
  'salada-mounjaro': 'Salada Mounjaro',
  'tradicional-domingo': 'Tradicional de Domingo',
  feijoada: 'Feijoada (Fejuca)',
  'bife-pernil-sabado': 'Bife com Pernil',
  'feijoada-sabado': 'Feijoada Completa',
};

function diaLabel(dia: DiaSemanaKey): string {
  return diasSemana.find((d) => d.key === dia)?.label ?? dia;
}

/** Passo 1: mensagem de boas-vindas com o cardápio de hoje. */
export function construirMenuDoDia(): BotAction[] {
  const dia = getDiaSemanaAtual();
  const prato = cardapioSemanal[dia];
  const label = diaLabel(dia);

  if (!prato) {
    return [
      {
        kind: 'text',
        text: `Olá! Aqui é a ${NOME_LOJA} 💛\nO cardápio de ${label.toLowerCase()} ainda não foi publicado. Dá um WhatsApp direto pra gente que te ajudamos a escolher! Confira também ${SITE_URL}/cardapio`,
      },
    ];
  }

  if (prato.opcoes) {
    const saudacao: BotAction = {
      kind: 'text',
      text: `Olá! Aqui é a ${NOME_LOJA} 💛\nHoje é ${label} e temos ${prato.opcoes.length} opções especiais no cardápio. Escolha uma para ver os tamanhos e preços:`,
    };
    const lista: BotAction = {
      kind: 'list',
      text: `Cardápio de ${label.toLowerCase()} — escolha sua opção:`,
      buttonLabel: 'Ver opções',
      sections: [
        {
          rows: prato.opcoes.map((opcao) => ({
            id: `escolha_opcao|${dia}|${opcao.id}`,
            title: ROTULO_CURTO_OPCAO[opcao.id] ?? opcao.tema.slice(0, 24),
            description: opcao.ingredientes.join(', ').slice(0, 72),
          })),
        },
      ],
    };
    return [saudacao, lista];
  }

  const saudacao: BotAction = {
    kind: 'text',
    text: `Olá! Aqui é a ${NOME_LOJA} 💛\nCardápio de ${label}: ${prato.tema}\n${prato.ingredientes.join(', ')}\n\nEscolha o tamanho da sua marmita:`,
  };
  const botoesTamanho: BotAction = construirBotoesTamanho(dia, null);
  return [saudacao, botoesTamanho];
}

function construirBotoesTamanho(dia: DiaSemanaKey, opcaoId: string | null): BotAction {
  return {
    kind: 'buttons',
    text: 'Toque no tamanho desejado:',
    buttons: tamanhos.map((t) => ({
      id: `tamanho|${dia}|${opcaoId ?? '-'}|${t.id}`,
      title: `${t.nome} · R$ ${formatarPreco(t.preco)}`,
    })),
  };
}

// Título de linha de lista do WhatsApp tem limite de 24 caracteres. Alguns
// nomes de bairro (ex.: "Conjunto Alexandre Urbanas", 26 chars) estouram
// esse limite — abrevia "Conjunto" para "Conj." antes de truncar, em vez
// de cortar a palavra no meio.
function rotuloBairroCurto(nome: string): string {
  if (nome.length <= 24) return nome;
  const abreviado = nome.replace(/^Conjunto /, 'Conj. ');
  return abreviado.length <= 24 ? abreviado : abreviado.slice(0, 24);
}

function construirListasBairro(dia: DiaSemanaKey, opcaoId: string | null, tamanhoId: string): BotAction[] {
  const entradas = Object.entries(bairros);
  const metade = Math.ceil(entradas.length / 2);
  const grupos = [entradas.slice(0, metade), entradas.slice(metade)];

  return grupos.map((grupo, indice) => ({
    kind: 'list',
    text:
      indice === 0
        ? 'Perfeito! Em qual bairro é a entrega?'
        : 'Não achou seu bairro na primeira lista? Veja esta:',
    buttonLabel: `Bairros (${indice + 1}/2)`,
    sections: [
      {
        rows: grupo.map(([slug, nome]) => ({
          id: `bairro|${dia}|${opcaoId ?? '-'}|${tamanhoId}|${slug}`,
          title: rotuloBairroCurto(nome),
        })),
      },
    ],
  }));
}

function construirConfirmacaoFinal(dia: DiaSemanaKey, opcaoId: string | null, tamanhoId: string, bairroSlug: string): BotAction[] {
  const prato = cardapioSemanal[dia];
  const tamanho = tamanhos.find((t) => t.id === tamanhoId);
  const nomeBairro = bairros[bairroSlug as keyof typeof bairros];

  if (!prato || !tamanho || !nomeBairro) {
    return construirMenuDoDia();
  }

  const opcao = opcaoId ? prato.opcoes?.find((o) => o.id === opcaoId) : null;
  const nomePrato = opcao ? opcao.tema : prato.tema;

  return [
    {
      kind: 'text',
      text:
        `🧾 Pedido registrado!\n\n` +
        `${nomePrato}\n` +
        `Tamanho ${tamanho.nome} — R$ ${formatarPreco(tamanho.preco)}\n` +
        `Entrega: ${nomeBairro}\n\n` +
        `A taxa de entrega para o seu bairro é calculada e confirmada aqui mesmo pela nossa equipe. Obrigada por pedir na ${NOME_LOJA}! 💛`,
    },
  ];
}

/** Passo seguinte a partir do id de um botão/linha de lista tocado pelo cliente. */
export function construirRespostaInterativa(replyId: string): BotAction[] {
  const [tipo, ...resto] = replyId.split('|');

  if (tipo === 'escolha_opcao') {
    // A lista de opções só é enviada quando o prato do dia tem `opcoes`
    // O dia segue no id para não trocar o cardápio caso o cliente toque
    // na opção depois da virada da meia-noite.
    const [dia, opcaoId] = resto;
    return [construirBotoesTamanho(dia as DiaSemanaKey, opcaoId)];
  }

  if (tipo === 'tamanho') {
    const [dia, opcaoOuTraco, tamanhoId] = resto;
    const opcaoId = opcaoOuTraco === '-' ? null : opcaoOuTraco;
    return construirListasBairro(dia as DiaSemanaKey, opcaoId, tamanhoId);
  }

  if (tipo === 'bairro') {
    const [dia, opcaoOuTraco, tamanhoId, bairroSlug] = resto;
    const opcaoId = opcaoOuTraco === '-' ? null : opcaoOuTraco;
    return construirConfirmacaoFinal(dia as DiaSemanaKey, opcaoId, tamanhoId, bairroSlug);
  }

  return construirMenuDoDia();
}
