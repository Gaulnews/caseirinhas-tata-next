// Módulo de áudio personalizado (texto-para-voz) para o bot de pedidos.
// Guardado inteiramente por variável de ambiente: se ELEVENLABS_API_KEY não
// estiver configurada, sintetizarAudio() retorna null e o bot segue
// normalmente só em texto — nunca quebra o fluxo de pedido por falta de
// áudio.
//
// Aviso de licença (real, não é só formalidade): o plano gratuito do
// ElevenLabs é para uso NÃO-comercial com atribuição. Enviar esses áudios
// em nome de um negócio real exige o plano pago (Starter, ~US$5/mês). Use
// o free tier só para validar a experiência antes de decidir.
//
// Variáveis de ambiente necessárias (configurar no Vercel, nunca no código):
//   ELEVENLABS_API_KEY  — chave da conta (elevenlabs.io → Profile → API Keys).
//   ELEVENLABS_VOICE_ID — id da voz a usar (Voice Library da conta).

const ELEVENLABS_API = 'https://api.elevenlabs.io/v1';

/**
 * Gera um áudio a partir de um texto e devolve o MP3 já em base64, pronto
 * para o endpoint /message/sendWhatsAppAudio da Evolution API. Retorna null
 * (nunca lança erro) quando o áudio não está configurado ou a geração falha
 * — o chamador deve sempre ter um caminho de fallback em texto.
 */
export async function sintetizarAudio(texto: string): Promise<string | null> {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID;

  if (!apiKey || !voiceId) return null;

  // Limite de 2500 caracteres por geração no free tier — corta com folga
  // em vez de deixar a chamada falhar por excesso de tamanho.
  const textoLimitado = texto.length > 2400 ? texto.slice(0, 2400) : texto;

  try {
    const resposta = await fetch(`${ELEVENLABS_API}/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'audio/mpeg',
      },
      body: JSON.stringify({
        text: textoLimitado,
        model_id: 'eleven_multilingual_v2',
        output_format: 'mp3_44100_128',
      }),
    });

    if (!resposta.ok) {
      console.error('audio-agent: ElevenLabs retornou erro', resposta.status, await resposta.text());
      return null;
    }

    const bytes = Buffer.from(await resposta.arrayBuffer());
    return bytes.toString('base64');
  } catch (erro) {
    console.error('audio-agent: falha ao chamar ElevenLabs', erro);
    return null;
  }
}

// Roteiro (script) dos pontos do funil que justificam gastar cota de áudio
// — só os momentos de maior valor percebido pelo cliente, para render o
// free tier (10 mil caracteres/mês) durar o máximo possível.

export function roteiroBoasVindas(nomeCliente: string | undefined, temaDoDia: string): string {
  const saudacao = nomeCliente ? `Oi, ${nomeCliente}!` : 'Oi, tudo bem?';
  return `${saudacao} Aqui é da Caseirinhas da Tatá. Hoje o prato do dia é ${temaDoDia}. Dá uma olhada no cardápio que eu te mandei e escolhe o tamanho da sua marmita.`;
}

export function roteiroConfirmacaoPedido(params: {
  nomeCliente?: string;
  nomePrato: string;
  tamanho: string;
  precoFormatado: string;
  bairro: string;
}): string {
  const { nomeCliente, nomePrato, tamanho, precoFormatado, bairro } = params;
  const saudacao = nomeCliente ? `Oi, ${nomeCliente}!` : 'Oi!';
  return `${saudacao} Seu pedido foi registrado: ${nomePrato}, tamanho ${tamanho}, por R$ ${precoFormatado}, com entrega em ${bairro}. Muito obrigada por pedir com a gente!`;
}
