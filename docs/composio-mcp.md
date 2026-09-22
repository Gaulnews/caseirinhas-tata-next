# Conexão com o MCP da Composio

Este projeto pode se conectar ao [servidor MCP hospedado da Composio](https://composio.dev)
para chamar, a partir do backend, ações de qualquer app que a Composio suporte
(Gmail, Google Calendar, Slack, GitHub, WhatsApp, etc.) — sem precisar
implementar a integração de cada app manualmente. O código não fixa nenhum
toolkit específico: ele lista e executa dinamicamente o que estiver
configurado no seu MCP server da Composio, então habilitar um novo app é só
configuração no painel deles, sem mudar código aqui.

## Como funciona

- `src/lib/composio-mcp.ts` — cliente MCP genérico (usa o SDK oficial
  `@modelcontextprotocol/sdk`) que conecta no servidor MCP da Composio via
  Streamable HTTP e expõe `listarFerramentasComposio()` e
  `chamarFerramentaComposio(nome, args)`.
- `GET /api/composio/tools` — lista as ferramentas disponíveis no seu servidor.
- `POST /api/composio/execute` — executa uma ferramenta: `{ "tool": "NOME_DA_ACAO", "arguments": { ... } }`.

Ambos os endpoints exigem o header `x-composio-proxy-secret` com o valor de
`COMPOSIO_PROXY_SECRET` — sem isso, eles nunca chegam a tocar na sua conta
Composio.

## Configuração (uma vez, no painel da Composio)

1. Crie uma conta em [composio.dev](https://composio.dev) e gere uma API key
   em **Settings → API Keys**.
2. Para cada app que você quer usar, crie um **Auth Config** em
   **Settings → Auth Configs** (ex.: Gmail, Slack) e conecte a conta que o
   bot vai usar.
3. Crie um **MCP Server** em **MCP Servers → New Server**, escolhendo os
   toolkits/auth configs que ele deve expor e, se quiser, restringindo quais
   ações (`allowed_tools`) ficam disponíveis. Copie o **Server ID** gerado.

## Variáveis de ambiente (configurar na Vercel, nunca no código)

| Variável | Descrição |
| --- | --- |
| `COMPOSIO_API_KEY` | API key da sua conta Composio. |
| `COMPOSIO_MCP_SERVER_ID` | ID do MCP server criado no passo 3 acima. |
| `COMPOSIO_MCP_USER_ID` | Identificador do "usuário" Composio a usar (opcional; padrão `caseirinhas-tata`). |
| `COMPOSIO_PROXY_SECRET` | Segredo escolhido por você para proteger `/api/composio/*` — gere com `openssl rand -hex 32`. |

## Testando

```bash
curl -H "x-composio-proxy-secret: SEU_SEGREDO" https://seu-dominio/api/composio/tools

curl -X POST https://seu-dominio/api/composio/execute \
  -H "x-composio-proxy-secret: SEU_SEGREDO" \
  -H "Content-Type: application/json" \
  -d '{"tool": "GMAIL_SEND_EMAIL", "arguments": { "recipient_email": "...", "subject": "...", "body": "..." }}'
```

O nome exato de cada ferramenta e seus argumentos aparecem na resposta de
`GET /api/composio/tools` (campo `inputSchema` de cada item).
