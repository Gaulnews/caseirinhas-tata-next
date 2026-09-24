import { NextResponse } from 'next/server';
import { createHash, timingSafeEqual } from 'crypto';
import { ApifyClient } from 'apify-client';

// Força a execução no lado do servidor para evitar problemas de CORS e Cache
export const dynamic = 'force-dynamic';
export const maxDuration = 60; // Estende o tempo de limite da Vercel para aguardar o Apify

// Comparação em tempo constante: hashes de tamanho fixo evitam vazar o
// comprimento e o conteúdo do segredo pelo tempo de resposta.
function segredoConfere(recebido: string, esperado: string): boolean {
  const a = createHash('sha256').update(recebido).digest();
  const b = createHash('sha256').update(esperado).digest();
  return timingSafeEqual(a, b);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const segredoEsperado = process.env.SEO_AUDIT_SECRET;

  // Trava de segurança para não consumirem sua API key do Apify — segredo
  // vem de variável de ambiente (nunca commitado), configurada na Vercel.
  // Verificação adicional em tempo constante, antes da comparação original.
  if (!segredoEsperado || !secret || !segredoConfere(secret, segredoEsperado)) {
    return NextResponse.json({ success: false, error: 'Acesso não autorizado.' }, { status: 401 });
  }

  if (!segredoEsperado || secret !== segredoEsperado) {
    return NextResponse.json({ success: false, error: 'Acesso não autorizado.' }, { status: 401 });
  }

  try {
    const apifyToken = process.env.APIFY_API_TOKEN;
    if (!apifyToken) {
      return NextResponse.json({ success: false, error: 'APIFY_API_TOKEN não configurado.' }, { status: 500 });
    }

    const client = new ApifyClient({
      token: apifyToken,
    });

    const input = {
      "searchType": "website_authority",
      "urls": ["caseirinhasdatata.shop"],
      "mode": "subdomains",
      "keyword": "marmitex delivery", // Palavra-chave adaptada para o seu negócio
      "country": "br", // Alterado para Brasil para maior precisão
      "searchEngine": "Google",
      "topWebsitesMode": "ranking",
      "topWebsitesCountry": "worldwide",
      "topWebsitesCategory": "all",
      "topWebsitesLimit": 10,
      "includeDetails": true,
      "maxRetries": 3
    };

    console.log('Iniciando auditoria SEO no Apify...');

    // Chama o ator do Ahrefs
    const run = await client.actor("pC8gsptNv2RwJm0QE").call(input);
    
    // Captura os resultados
    const { items } = await client.dataset(run.defaultDatasetId).listItems();

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      run_id: run.id,
      auditoria: items,
    });

  } catch (error: any) {
    console.error('Erro ao executar o Apify:', error);
    return NextResponse.json({
      success: false,
      error: 'Falha na comunicação com o Apify.',
      details: error.message
    }, { status: 500 });
  }
}
