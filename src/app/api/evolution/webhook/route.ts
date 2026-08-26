import { NextRequest, NextResponse } from 'next/server';
import { construirMenuDoDia, construirRespostaInterativa, type BotAction } from '@/lib/whatsapp-bot';
import { extrairMensagemRecebida, paraRequisicaoEvolution, paraRequisicaoAudioEvolution } from '@/lib/evolution-payload';
import { sintetizarAudio, roteiroConfirmacaoPedido } from '@/lib/audio-agent';
import { cardapioSemanal, tamanhos } from '@/lib/cardapio-semanal';
import { bairros } from '@/lib/site-data';

// Webhook da Evolution API (conexão não-oficial via Baileys) — atende o
// número comercial (Tânia Garbini), SEPARADO do bot oficial da Meta Cloud
// API em /api/whatsapp/webhook (que continua exclusivo do número da loja,
// Caseirinhas Da Tatá — os dois protocolos não coexistem no mesmo número).
//
// Reaproveita a mesma lógica de conversa do bot oficial
// (src/lib/whatsapp-bot.ts: construirMenuDoDia / construirRespostaInterativa)
// — o "cérebro" do bot é idêntico, só muda o formato de envio/recebimento.
//
// Diferença importante em relação ao bot oficial: a Evolution/Baileys não
// garante que listas e botões cheguem como elementos clicáveis em todo
// aparelho — quando o cliente responde com texto solto em vez de tocar
// numa opção, não há como saber em que passo ele estava (o bot é
// stateless, sem sessão), então a resposta é reenviar o cardápio do dia
// em vez de travar ou adivinhar.
//
// AINDA NÃO TESTADO contra uma instância real — os nomes de campo do
// payload seguem a documentação pública da Evolution API v2. Confirme
// contra a versão do seu servidor no primeiro teste real.
//
// Variáveis de ambiente necessárias (configurar no Vercel, nunca no código):
//   EVOLUTION_API_URL      — URL base do servidor (ex.: https://sua-evolution.exemplo.com).
//   EVOLUTION_API_KEY      — Global API Key da instância, enviada no header "apikey".
//   EVOLUTION_INSTANCE     — nome da instância conectada ao número da Tânia.
//   EVOLUTION_WEBHOOK_TOKEN — segredo escolhido por você, configurado como header
//                             customizado no webhook do painel Evolution, para
//                             confirmar que a requisição realmente vem de lá.

export async function POST(req: NextRequest) {
  const tokenRecebido = req.headers.get('apikey') ?? req.headers.get('x-webhook-token');
  const tokenEsperado = process.env.EVOLUTION_WEBHOOK_TOKEN;

  if (!tokenEsperado || tokenRecebido !== tokenEsperado) {
    return new NextResponse('Não autorizado', { status: 401 });
  }

  const body = await req.json();
  const mensagem = extrairMensagemRecebida(body);

  if (!mensagem || mensagem.fromMe || mensagem.ehGrupo) {
    return NextResponse.json({ ok: true });
  }

  const numero = mensagem.remoteJid.replace('@s.whatsapp.net', '');
  const acoes = mensagem.replyId ? construirRespostaInterativa(mensagem.replyId) : construirMenuDoDia();

  for (const acao of acoes) {
    await enviarMensagemEvolution(numero, acao);
  }

  if (mensagem.replyId?.startsWith('bairro|')) {
    await enviarAudioConfirmacao(numero, mensagem.pushName, mensagem.replyId);
  }

  return NextResponse.json({ ok: true });
}

async function enviarMensagemEvolution(numero: string, acao: BotAction) {
  const instancia = process.env.EVOLUTION_INSTANCE;
  const { caminho, corpo } = paraRequisicaoEvolution(instancia ?? '', numero, acao);
  await chamarEvolution(caminho, corpo);
}

async function enviarAudioConfirmacao(numero: string, pushName: string | undefined, replyId: string) {
  const [, dia, opcaoOuTraco, tamanhoId, bairroSlug] = replyId.split('|');
  const prato = cardapioSemanal[dia as keyof typeof cardapioSemanal];
  const opcao = opcaoOuTraco !== '-' ? prato?.opcoes?.find((o) => o.id === opcaoOuTraco) : null;
  const tamanho = tamanhos.find((t) => t.id === tamanhoId);
  const nomeBairro = bairros[bairroSlug as keyof typeof bairros];

  if (!prato || !tamanho || !nomeBairro) return;

  const texto = roteiroConfirmacaoPedido({
    nomeCliente: pushName,
    nomePrato: opcao ? opcao.tema : prato.tema,
    tamanho: tamanho.nome,
    precoFormatado: tamanho.preco.toFixed(2).replace('.', ','),
    bairro: nomeBairro,
  });

  const audioBase64 = await sintetizarAudio(texto);
  if (!audioBase64) return; // sem áudio configurado — a confirmação em texto já foi enviada.

  const instancia = process.env.EVOLUTION_INSTANCE;
  const { caminho, corpo } = paraRequisicaoAudioEvolution(instancia ?? '', numero, audioBase64);
  await chamarEvolution(caminho, corpo);
}

async function chamarEvolution(caminho: string, corpo: Record<string, unknown>) {
  const baseUrl = process.env.EVOLUTION_API_URL;
  const apiKey = process.env.EVOLUTION_API_KEY;

  if (!baseUrl || !apiKey) {
    console.error('evolution-webhook: EVOLUTION_API_URL/EVOLUTION_API_KEY não configurados.');
    return;
  }

  const resposta = await fetch(`${baseUrl}${caminho}`, {
    method: 'POST',
    headers: { apikey: apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify(corpo),
  });

  if (!resposta.ok) {
    console.error('evolution-webhook: falha ao enviar mensagem', resposta.status, await resposta.text());
  }
}
