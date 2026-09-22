import { NextResponse } from 'next/server';
import { chamarFerramentaComposio } from '@/lib/composio-mcp';

// Executa uma ferramenta (ação) do MCP server da Composio pelo nome. Ver
// src/lib/composio-mcp.ts e docs/composio-mcp.md.
export const dynamic = 'force-dynamic';
export const maxDuration = 60; // Algumas ações da Composio podem demorar mais que o padrão da Vercel.

function acessoAutorizado(request: Request): boolean {
  const segredoEsperado = process.env.COMPOSIO_PROXY_SECRET;
  if (!segredoEsperado) return false;
  return request.headers.get('x-composio-proxy-secret') === segredoEsperado;
}

export async function POST(request: Request) {
  // Trava de segurança — segredo vem de variável de ambiente (nunca
  // commitado), configurada na Vercel. Nunca expor este endpoint sem ela.
  if (!acessoAutorizado(request)) {
    return NextResponse.json({ success: false, error: 'Acesso não autorizado.' }, { status: 401 });
  }

  let body: { tool?: string; arguments?: Record<string, unknown> };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Corpo da requisição inválido.' }, { status: 400 });
  }

  if (!body.tool) {
    return NextResponse.json({ success: false, error: "Campo 'tool' é obrigatório." }, { status: 400 });
  }

  try {
    const result = await chamarFerramentaComposio(body.tool, body.arguments ?? {});
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error('Composio MCP: falha ao executar ferramenta.', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
