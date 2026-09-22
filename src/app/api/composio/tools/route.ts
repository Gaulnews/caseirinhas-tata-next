import { NextResponse } from 'next/server';
import { listarFerramentasComposio } from '@/lib/composio-mcp';

// Lista as ferramentas disponíveis no MCP server da Composio configurado
// via variáveis de ambiente. Ver src/lib/composio-mcp.ts e docs/composio-mcp.md.
export const dynamic = 'force-dynamic';

function acessoAutorizado(request: Request): boolean {
  const segredoEsperado = process.env.COMPOSIO_PROXY_SECRET;
  if (!segredoEsperado) return false;
  return request.headers.get('x-composio-proxy-secret') === segredoEsperado;
}

export async function GET(request: Request) {
  // Trava de segurança para ninguém enumerar/consumir sua conta Composio —
  // segredo vem de variável de ambiente (nunca commitado), configurada na Vercel.
  if (!acessoAutorizado(request)) {
    return NextResponse.json({ success: false, error: 'Acesso não autorizado.' }, { status: 401 });
  }

  try {
    const tools = await listarFerramentasComposio();
    return NextResponse.json({ success: true, tools });
  } catch (error: any) {
    console.error('Composio MCP: falha ao listar ferramentas.', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
