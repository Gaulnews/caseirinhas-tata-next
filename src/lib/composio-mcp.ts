import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

// Cliente MCP para o servidor hospedado da Composio (https://composio.dev) —
// expõe, via protocolo MCP padrão, qualquer toolkit/ação que você configurar
// no painel da Composio para este servidor (Gmail, Slack, Calendar, GitHub
// etc.). Este arquivo não fixa nenhuma ferramenta específica: lista e chama
// dinamicamente o que o servidor MCP disponibilizar, então adicionar um novo
// toolkit é só configuração no painel da Composio, sem precisar mexer aqui.
//
// Passo a passo de configuração: docs/composio-mcp.md
//
// Variáveis de ambiente necessárias (configurar na Vercel, nunca no código):
//   COMPOSIO_API_KEY       — API key da sua conta Composio.
//   COMPOSIO_MCP_SERVER_ID — ID do MCP server criado no painel da Composio
//                            (Settings → MCP Servers), já vinculado aos
//                            toolkits/auth configs desejados.
//   COMPOSIO_MCP_USER_ID   — identificador do "usuário" Composio a usar
//                            (opcional; padrão "caseirinhas-tata").

function montarUrlMcp(): URL {
  const serverId = process.env.COMPOSIO_MCP_SERVER_ID;
  if (!serverId) {
    throw new Error('COMPOSIO_MCP_SERVER_ID não configurado.');
  }

  const userId = process.env.COMPOSIO_MCP_USER_ID || 'caseirinhas-tata';
  return new URL(`https://backend.composio.dev/v3/mcp/${serverId}?user_id=${encodeURIComponent(userId)}`);
}

// Cada chamada abre e fecha sua própria conexão — API routes da Vercel são
// serverless (sem estado entre invocações), então não há como manter um
// cliente MCP vivo em memória de forma confiável entre requisições.
async function comClienteComposio<T>(fn: (client: Client) => Promise<T>): Promise<T> {
  const apiKey = process.env.COMPOSIO_API_KEY;
  if (!apiKey) {
    throw new Error('COMPOSIO_API_KEY não configurado.');
  }

  const transport = new StreamableHTTPClientTransport(montarUrlMcp(), {
    requestInit: { headers: { 'x-api-key': apiKey } },
  });

  const client = new Client({ name: 'caseirinhas-tata-next', version: '1.0.0' });

  await client.connect(transport);
  try {
    return await fn(client);
  } finally {
    await client.close();
  }
}

/** Lista todas as ferramentas (ações) que o MCP server da Composio expõe hoje. */
export async function listarFerramentasComposio() {
  return comClienteComposio(async (client) => {
    const { tools } = await client.listTools();
    return tools;
  });
}

/** Executa uma ferramenta da Composio pelo nome, com os argumentos recebidos. */
export async function chamarFerramentaComposio(nome: string, args: Record<string, unknown>) {
  return comClienteComposio(async (client) => {
    return client.callTool({ name: nome, arguments: args });
  });
}
