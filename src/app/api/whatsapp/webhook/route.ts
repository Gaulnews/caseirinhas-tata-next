import { createHmac, timingSafeEqual } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { construirMenuDoDia, construirRespostaInterativa, type BotAction } from '@/lib/whatsapp-bot';

// Webhook do WhatsApp Cloud API (Meta) — atende qualquer número inscrito
// nesse app (hoje: "Caseirinhas Da Tatá" e "Tânia Garbini"), sempre
// respondendo pelo mesmo número que recebeu a mensagem (via
// value.metadata.phone_number_id do payload), nunca por um número fixo.
// Documentação: https://developers.facebook.com/docs/whatsapp/cloud-api/guides/set-up-webhooks
//
// Variáveis de ambiente necessárias (configurar no Vercel, nunca no código):
//   WHATSAPP_VERIFY_TOKEN — string escolhida por você, usada só na etapa
//                           de verificação do webhook no painel da Meta.
//   WHATSAPP_TOKEN        — token de acesso permanente (System User) com
//                           permissão whatsapp_business_messaging nas WABAs.
//   WHATSAPP_APP_SECRET   — segredo do app, usado para validar que as
//                           requisições recebidas realmente vêm da Meta.

const GRAPH_API = 'https://graph.facebook.com/v21.0';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge ?? '', { status: 200 });
  }

  return new NextResponse('Forbidden', { status: 403 });
}

function assinaturaValida(corpoBruto: string, assinatura: string | null): boolean {
  const segredo = process.env.WHATSAPP_APP_SECRET;
  if (!segredo || !assinatura) return false;

  const esperado = 'sha256=' + createHmac('sha256', segredo).update(corpoBruto).digest('hex');
  const bufferRecebido = Buffer.from(assinatura);
  const bufferEsperado = Buffer.from(esperado);
  if (bufferRecebido.length !== bufferEsperado.length) return false;

  return timingSafeEqual(bufferRecebido, bufferEsperado);
}

export async function POST(req: NextRequest) {
  const corpoBruto = await req.text();

  if (!assinaturaValida(corpoBruto, req.headers.get('x-hub-signature-256'))) {
    return new NextResponse('Assinatura inválida', { status: 401 });
  }

  const body = JSON.parse(corpoBruto);
  const valor = body?.entry?.[0]?.changes?.[0]?.value;
  const mensagem = valor?.messages?.[0];

  // Outros tipos de evento (confirmação de entrega/leitura, etc.) não geram resposta.
  if (!mensagem) {
    return NextResponse.json({ ok: true });
  }

  const de = mensagem.from as string;
  // ID do número que RECEBEU a mensagem — usado para responder pelo mesmo
  // número, já que o app pode estar inscrito em mais de uma WABA/número.
  const phoneNumberId = valor?.metadata?.phone_number_id as string | undefined;
  const idResposta = mensagem.interactive?.button_reply?.id ?? mensagem.interactive?.list_reply?.id;

  if (!phoneNumberId) {
    console.error('WhatsApp bot: payload sem metadata.phone_number_id.');
    return NextResponse.json({ ok: true });
  }

  const acoes = idResposta ? construirRespostaInterativa(idResposta) : construirMenuDoDia();

  for (const acao of acoes) {
    await enviarMensagemWhatsApp(de, acao, phoneNumberId);
  }

  return NextResponse.json({ ok: true });
}

async function enviarMensagemWhatsApp(para: string, acao: BotAction, phoneNumberId: string) {
  const token = process.env.WHATSAPP_TOKEN;

  if (!token) {
    console.error('WhatsApp bot: WHATSAPP_TOKEN não configurado.');
    return;
  }

  const payload = paraPayloadWhatsApp(para, acao);

  const resposta = await fetch(`${GRAPH_API}/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!resposta.ok) {
    console.error('WhatsApp bot: falha ao enviar mensagem', resposta.status, await resposta.text());
  }
}

function paraPayloadWhatsApp(para: string, acao: BotAction) {
  const base = { messaging_product: 'whatsapp', to: para };

  if (acao.kind === 'text') {
    return { ...base, type: 'text', text: { body: acao.text } };
  }

  if (acao.kind === 'buttons') {
    return {
      ...base,
      type: 'interactive',
      interactive: {
        type: 'button',
        body: { text: acao.text },
        action: {
          buttons: acao.buttons.map((b) => ({ type: 'reply', reply: { id: b.id, title: b.title } })),
        },
      },
    };
  }

  return {
    ...base,
    type: 'interactive',
    interactive: {
      type: 'list',
      body: { text: acao.text },
      action: { button: acao.buttonLabel, sections: acao.sections },
    },
  };
}
