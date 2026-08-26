import type { BotAction } from '@/lib/whatsapp-bot';

// Conversão entre o formato genérico de ação do bot (BotAction, já usado
// pelo webhook oficial da Meta Cloud API) e o formato de requisição da
// Evolution API v2 (conexão não-oficial via Baileys). Isolado num módulo
// próprio porque os dois formatos de payload são bem diferentes, mas a
// lógica de conversa (o que dizer em cada passo) é a mesma — reaproveitada
// de src/lib/whatsapp-bot.ts.
//
// Atenção: os nomes de campo abaixo seguem a convenção documentada da
// Evolution API v2 (endpoints /message/sendText, /message/sendList,
// /message/sendButtons). Como não há acesso a uma instância real rodando
// para testar de ponta a ponta, confirme esses nomes contra a versão exata
// do seu servidor assim que a URL estiver disponível — se algum campo
// mudou entre versões, é só ajustar aqui, o resto do bot não muda.

export type MensagemRecebidaEvolution = {
  /** Número do cliente no formato da Evolution (ex.: "554399998888@s.whatsapp.net"). */
  remoteJid: string;
  /** Nome de exibição do WhatsApp do cliente, quando disponível. */
  pushName?: string;
  /** Texto puro da mensagem, se for uma mensagem de texto comum. */
  texto?: string;
  /** id da linha/botão escolhido, se o cliente respondeu a uma lista/botão. */
  replyId?: string;
  /** true quando o próprio bot enviou a mensagem (eco) — deve ser ignorada. */
  fromMe: boolean;
  /** true quando a mensagem vem de um grupo, não de uma conversa individual. */
  ehGrupo: boolean;
};

/**
 * Extrai os dados relevantes do payload cru que a Evolution API envia no
 * webhook (evento MESSAGES_UPSERT). Retorna null para eventos que não são
 * mensagens novas de um contato individual (ex.: confirmação de entrega,
 * atualização de conexão, mensagens de grupo, eco do próprio bot).
 */
export function extrairMensagemRecebida(body: unknown): MensagemRecebidaEvolution | null {
  const evento = body as {
    event?: string;
    data?: {
      key?: { remoteJid?: string; fromMe?: boolean };
      pushName?: string;
      message?: {
        conversation?: string;
        extendedTextMessage?: { text?: string };
        listResponseMessage?: { singleSelectReply?: { selectedRowId?: string } };
        buttonsResponseMessage?: { selectedButtonId?: string };
      };
    };
  };

  if (evento.event !== 'messages.upsert') return null;

  const dado = evento.data;
  const remoteJid = dado?.key?.remoteJid;
  if (!remoteJid) return null;

  const fromMe = dado?.key?.fromMe === true;
  const ehGrupo = remoteJid.endsWith('@g.us');
  if (fromMe || ehGrupo) {
    return { remoteJid, fromMe, ehGrupo, pushName: dado?.pushName };
  }

  const msg = dado?.message;
  const replyId = msg?.listResponseMessage?.singleSelectReply?.selectedRowId ?? msg?.buttonsResponseMessage?.selectedButtonId;
  const texto = msg?.conversation ?? msg?.extendedTextMessage?.text;

  return { remoteJid, fromMe, ehGrupo, pushName: dado?.pushName, texto, replyId };
}

export type RequisicaoEvolution = { caminho: string; corpo: Record<string, unknown> };

/** Converte uma BotAction em uma requisição pronta para a Evolution API. */
export function paraRequisicaoEvolution(instancia: string, numero: string, acao: BotAction): RequisicaoEvolution {
  if (acao.kind === 'text') {
    return {
      caminho: `/message/sendText/${instancia}`,
      corpo: { number: numero, text: acao.text },
    };
  }

  if (acao.kind === 'buttons') {
    return {
      caminho: `/message/sendButtons/${instancia}`,
      corpo: {
        number: numero,
        title: acao.text,
        buttons: acao.buttons.map((b) => ({ type: 'reply', displayText: b.title, id: b.id })),
      },
    };
  }

  return {
    caminho: `/message/sendList/${instancia}`,
    corpo: {
      number: numero,
      title: acao.text,
      buttonText: acao.buttonLabel,
      sections: acao.sections.map((s) => ({
        title: s.title,
        rows: s.rows.map((r) => ({ title: r.title, description: r.description, rowId: r.id })),
      })),
    },
  };
}

/** Requisição de envio de áudio (mensagem de voz / PTT) da Evolution API. */
export function paraRequisicaoAudioEvolution(instancia: string, numero: string, audioBase64: string): RequisicaoEvolution {
  return {
    caminho: `/message/sendWhatsAppAudio/${instancia}`,
    corpo: { number: numero, audio: audioBase64, ptt: true },
  };
}
