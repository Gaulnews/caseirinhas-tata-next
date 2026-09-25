# Promoções do Grupo + Anúncios Meta — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar as 3 promoções do grupo (texto de `promo-ct.md`) com datas alinhadas ao início dos anúncios, dar a elas uma página medível no site, corrigir o post quebrado e preparar a campanha Meta pausada.

**Architecture:** Uma fonte única de dados (`src/lib/promocoes-grupo.ts`) guarda regras e datas. A página `/promocoes` e o texto do grupo são gerados dessa fonte, então data errada só pode existir em um lugar. A campanha Meta é criada **PAUSED**, com destino `/promocoes` (o pixel já mede `PageView` e `EntrouGrupo`).

**Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind 4, Node 26 (`node --test`, type stripping), Meta Ads MCP, Meta Business Suite (Chrome).

**Spec:** pedido do dono em 24/09/2026 + `C:\Users\acer\Documents\CASEIRINHAS\promo-ct.md` (texto-fonte das promoções).

## Global Constraints

- Regras, metas, prêmios, telefone e tom de `promo-ct.md` são copiados **sem alteração**; só as datas mudam.
- Durações originais: Promo 1 = 8 dias, Promo 2 = 3 dias, Promo 3 = 4 dias, contíguas; retirada no dia seguinte ao fim da Promo 3.
- Início da Promo 1 = início da veiculação dos anúncios = **segunda-feira 28/09/2026** (mesmo dia da semana do original, 17/08/2026). Datas resultantes: P1 28/09–05/10, P2 06/10–08/10, P3 09/10–12/10, retirada a partir de 13/10.
- Link oficial do grupo: `https://chat.whatsapp.com/DRbxArNS4ObKih8QZBs4ON` (constante `GRUPO_SORTEIOS`).
- WhatsApp de pedidos: `(43) 99674-9607`.
- Não criar contas novas na Meta. Não digitar senhas. Não gastar dinheiro: campanha fica PAUSED até o dono aprovar.
- Transferir a conta de anúncios "Bentt Gau" (264087404423426) para o portfólio é irreversível: só com "sim" explícito do dono.
- Orçamento proposto: R$ 15/dia, 28/09 a 12/10 (15 dias) = R$ 225.
- Público: alfinete em Rua Maria Sinopoli Francovig, 1142, Londrina; raio 5 km (prioridade) e 8 km; Gleba Palhano fora do teste.

## Review Focus

1. Data de fim inclusiva: a Promo 1 vai até 05/10 **inclusive** — o texto e a página precisam mostrar 05/10, não 04/10.
2. Fuso: datas são dias civis de Londrina; nenhum `new Date()` em UTC pode deslocar um dia.
3. Feriado de 12/10 (segunda): o texto não pode prometer atendimento no feriado sem o dono confirmar — a página mostra a data e o aviso "confirme o funcionamento no feriado pelo WhatsApp".
4. Texto do grupo com WhatsApp: formatação `*negrito*` precisa sobreviver ao gerador (sem escapar asteriscos).
5. Página indexada depois do fim das promoções: após 13/10 a página precisa dizer que o período terminou, em vez de oferecer promoção vencida.

## Ordem de execução

Tasks 1, 2, 3 e 6 executam direto. Task 4 para e pergunta ao dono (irreversível). Task 5 só depois da Task 4 e continua PAUSED.

## Registro da revisão do plano (receiving-code-review, 24/09/2026)

| # | Apontamento | Decisão | Motivo |
|---|---|---|---|
| 1 | Título do `promo-ct.md` tem `*` sem par; no WhatsApp aparece o asterisco literal | Aceito | Gerador abre o negrito; teste checa pares de `*` por linha |
| 2 | Step 3 da Task 2 grava em `docs/promocoes/`, que não existe | Aceito | `mkdir -p` antes |
| 3 | Objetivo "Mensagens" (plano anterior) x "Tráfego" | Tráfego mantido | Mensagens exige WhatsApp ligado à Página (não verificado); Tráfego para `/promocoes` é medido pelo pixel (`PageView`, `EntrouGrupo`) |
| 4 | Task 5 depende de decisão irreversível | Aceito | Seção "Ordem de execução" |
| 5 | Página estática congelaria "encerradas" no build | Rejeitado | `revalidate = 3600` recalcula a cada hora |

---

### Task 1: Fonte única das promoções

**Files:**
- Create: `src/lib/promocoes-grupo.ts`
- Test: `scripts/test-promocoes-grupo.mjs`

**Interfaces:**
- Produces:
  - `type PromocaoGrupo = { id: 'kit-facas' | 'kit-ferramentas' | 'kit-churrasqueiro'; emoji: string; titulo: string; inicio: string; fim: string; texto: string }` (datas `YYYY-MM-DD`)
  - `const promocoesGrupo: PromocaoGrupo[]`
  - `const RETIRADA_A_PARTIR_DE: string` (`YYYY-MM-DD`)
  - `function dataCurta(iso: string): string` → `"28/09"`
  - `function promocoesEncerradas(hojeIso: string): boolean`
  - `function mensagemGrupo(): string` (texto completo para o WhatsApp)

- [ ] **Step 1: Write the failing test** — `scripts/test-promocoes-grupo.mjs`

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  promocoesGrupo, RETIRADA_A_PARTIR_DE, dataCurta, promocoesEncerradas, mensagemGrupo,
} from '../src/lib/promocoes-grupo.ts';

const dias = (a, b) => (Date.UTC(...b.split('-').map((n, i) => (i === 1 ? n - 1 : +n))) -
  Date.UTC(...a.split('-').map((n, i) => (i === 1 ? n - 1 : +n)))) / 86400000;

test('datas: 28/09 a 12/10, durações 8/3/4, contíguas', () => {
  assert.deepEqual(promocoesGrupo.map((p) => [p.inicio, p.fim]), [
    ['2026-09-28', '2026-10-05'], ['2026-10-06', '2026-10-08'], ['2026-10-09', '2026-10-12'],
  ]);
  assert.deepEqual(promocoesGrupo.map((p) => dias(p.inicio, p.fim) + 1), [8, 3, 4]);
  for (let i = 1; i < promocoesGrupo.length; i++) {
    assert.equal(dias(promocoesGrupo[i - 1].fim, promocoesGrupo[i].inicio), 1);
  }
  assert.equal(RETIRADA_A_PARTIR_DE, '2026-10-13');
});

test('dataCurta não desloca o dia por fuso', () => {
  assert.equal(dataCurta('2026-10-05'), '05/10');
  assert.equal(dataCurta('2026-09-28'), '28/09');
});

test('promocoesEncerradas: só depois de 12/10', () => {
  assert.equal(promocoesEncerradas('2026-10-12'), false);
  assert.equal(promocoesEncerradas('2026-10-13'), true);
});

test('mensagem do grupo preserva regras do promo-ct.md e usa datas novas', () => {
  const m = mensagemGrupo();
  for (const trecho of [
    'As *5 primeiras pessoas* do grupo que baterem a meta de marmitas',
    'Peça *8 Marmitas Mini* OU *6 Marmitas Grandes*',
    'Peça *5 Marmitas Grandes* OU *7 Marmitas Mini*',
    'Peça *7 Marmitas Mini* OU *6 Marmitas Médias*',
    '📅 De *28/09* a *05/10*', '📅 De *06/10* a *08/10*', '📅 De *09/10* a *12/10*',
    'Todos os prêmios são retirados a partir de *13/10*.',
    '*(43) 99674-9607*',
    '*PROMOÇÕES EXCLUSIVAS DO GRUPO — CASEIRINHAS DA TATÁ* 🎁',
  ]) assert.ok(m.includes(trecho), `faltou: ${trecho}`);
  for (const linha of m.split('\n')) {
    assert.equal((linha.match(/\*/g) ?? []).length % 2, 0, `negrito sem par: ${linha}`);
  }
  for (const antigo of ['17/08', '24/08', '25/08', '27/08', '28/08', '31/08', '01/09']) {
    assert.ok(!m.includes(antigo), `data antiga: ${antigo}`);
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/test-promocoes-grupo.mjs`
Expected: FAIL with `Cannot find module '.../src/lib/promocoes-grupo.ts'`

- [ ] **Step 3: Write minimal implementation** — `src/lib/promocoes-grupo.ts` (sem imports `@/`, para rodar no Node)

```ts
// Fonte única das promoções exclusivas do grupo de WhatsApp.
// Texto-fonte: promo-ct.md do dono (regras inalteradas; só as datas mudam).
// Datas alinhadas ao início dos anúncios Meta (28/09/2026), mantendo as
// durações originais (8, 3 e 4 dias, contíguas).
export type PromocaoGrupo = {
  id: 'kit-facas' | 'kit-ferramentas' | 'kit-churrasqueiro';
  emoji: string;
  titulo: string;
  inicio: string; // YYYY-MM-DD, dia civil de Londrina, inclusivo
  fim: string; // YYYY-MM-DD, inclusivo
  texto: string;
};

export const promocoesGrupo: PromocaoGrupo[] = [
  {
    id: 'kit-facas',
    emoji: '🔪',
    titulo: 'KIT DE FACAS',
    inicio: '2026-09-28',
    fim: '2026-10-05',
    texto:
      'Peça *8 Marmitas Mini* OU *6 Marmitas Grandes* dentro desse período (pode ser em pedidos separados, vale o total) e garanta seu Jogo de Facas! As 5 primeiras pessoas a bater a meta levam. 🔪',
  },
  {
    id: 'kit-ferramentas',
    emoji: '🧰',
    titulo: 'KIT DE FERRAMENTAS 46 PEÇAS',
    inicio: '2026-10-06',
    fim: '2026-10-08',
    texto:
      'Peça *5 Marmitas Grandes* OU *7 Marmitas Mini* dentro desse período e concorra ao Kit de Ferramentas 46 peças — ótimo pra casa, moto, carro e muito mais! As 5 primeiras a bater a meta ganham. 🧰',
  },
  {
    id: 'kit-churrasqueiro',
    emoji: '🍖',
    titulo: 'KIT CHURRASQUEIRO',
    inicio: '2026-10-09',
    fim: '2026-10-12',
    texto:
      'Peça *7 Marmitas Mini* OU *6 Marmitas Médias* dentro desse período e leve o Kit Churrasqueiro pra casa — pronto pro seu próximo churrasco! As 5 primeiras a bater a meta levam. 🍖',
  },
];

export const RETIRADA_A_PARTIR_DE = '2026-10-13';

// Formata sem Date: evita deslocar o dia por fuso (UTC x America/Sao_Paulo).
export function dataCurta(iso: string): string {
  const [, mes, dia] = iso.split('-');
  return `${dia}/${mes}`;
}

// Comparação lexicográfica funciona para YYYY-MM-DD.
export function promocoesEncerradas(hojeIso: string): boolean {
  return hojeIso > promocoesGrupo[promocoesGrupo.length - 1].fim;
}

const SEPARADOR = '━━━━━━━━━━━━━━━';

export function mensagemGrupo(): string {
  const blocos = promocoesGrupo.map(
    (p, i) =>
      `${p.emoji} *PROMOÇÃO ${i + 1} — ${p.titulo}*\n📅 De *${dataCurta(p.inicio)}* a *${dataCurta(p.fim)}*\n\n${p.texto}`,
  );
  return [
    // O promo-ct.md abre sem o "*" inicial; o negrito do WhatsApp exige o par.
    '*PROMOÇÕES EXCLUSIVAS DO GRUPO — CASEIRINHAS DA TATÁ* 🎁',
    'Chegou a vez de quem tá aqui dentro ganhar de verdade! 🍱',
    '📌 *Como funciona:*\nAs *5 primeiras pessoas* do grupo que baterem a meta de marmitas dentro do período de cada promoção *levam o prêmio na hora, sem sorteio* — vale a ordem de quem fez o pedido primeiro. Cada compra conta pra *uma promoção só*, sempre a que estiver rolando naquele dia.',
    `Todos os prêmios são retirados a partir de *${dataCurta(RETIRADA_A_PARTIR_DE)}*.`,
    SEPARADOR,
    blocos.join(`\n\n${SEPARADOR}\n\n`),
    SEPARADOR,
    '⚠️ *Fica de olho:*\n✅ Cada promoção vale só na sua própria data — não acumula com as outras.\n✅ Quem bate a meta primeiro (pelo horário do pedido) é quem ganha, então não deixa pra última hora!\n✅ Pra contar pra promoção, é só pedir no nosso WhatsApp de sempre: *(43) 99674-9607* 😉',
    'Bora aproveitar? Só quem tá no grupo participa! 💛',
  ].join('\n\n');
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test scripts/test-promocoes-grupo.mjs` → Expected: 4 pass, 0 fail. Then `npx tsc --noEmit` → exit 0.

- [ ] **Step 5: Commit**

```bash
git add src/lib/promocoes-grupo.ts scripts/test-promocoes-grupo.mjs
git commit -m "feat(promocoes): single source for group promotions aligned to ad start"
```

### Task 2: Página `/promocoes` + sitemap + texto do grupo

**Files:**
- Create: `src/app/promocoes/page.tsx`
- Modify: `src/app/sitemap.ts` (lista `paginasFixas`)
- Create: `docs/promocoes/mensagem-grupo-2026-09-28.md` (gerado por `mensagemGrupo()`)

**Interfaces:**
- Consumes: `promocoesGrupo`, `RETIRADA_A_PARTIR_DE`, `dataCurta`, `promocoesEncerradas` (Task 1); `GRUPO_SORTEIOS`, `WHATSAPP_PEDIDOS`, `WHATSAPP_PEDIDOS_NUMERO` de `@/lib/site-data`.
- Produces: rota `/promocoes` (destino dos anúncios, com `?utm_source=meta&utm_campaign=promocoes-grupo-2026-09`).

- [ ] **Step 1: Write the page** — `src/app/promocoes/page.tsx`

```tsx
import { Metadata } from 'next';
import { GRUPO_SORTEIOS, WHATSAPP_PEDIDOS, WHATSAPP_PEDIDOS_NUMERO } from '@/lib/site-data';
import {
  promocoesGrupo, RETIRADA_A_PARTIR_DE, dataCurta, promocoesEncerradas,
} from '@/lib/promocoes-grupo';

// Revalida a cada hora: depois de 12/10 a página passa a dizer que o
// período terminou, sem precisar de novo deploy.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Promoções do Grupo',
  description:
    'Promoções exclusivas do grupo de WhatsApp da Caseirinhas da Tatá: Kit de Facas, Kit de Ferramentas 46 peças e Kit Churrasqueiro para as 5 primeiras pessoas que baterem a meta de marmitas.',
  alternates: { canonical: 'https://caseirinhasdatata.shop/promocoes' },
  openGraph: {
    title: 'Promoções exclusivas do grupo — Caseirinhas da Tatá',
    description: 'As 5 primeiras pessoas que baterem a meta levam o prêmio na hora, sem sorteio.',
    url: 'https://caseirinhasdatata.shop/promocoes',
  },
};

function hojeEmLondrina(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date());
}

export default function PromocoesPage() {
  const encerradas = promocoesEncerradas(hojeEmLondrina());

  return (
    <main className="min-h-screen bg-zinc-950 px-5 py-16 text-gray-100">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-center text-3xl font-bold text-white">
          Promoções exclusivas do grupo 🎁
        </h1>

        {encerradas ? (
          <p className="mb-8 text-center text-zinc-400">
            O período destas promoções terminou em {dataCurta(promocoesGrupo[promocoesGrupo.length - 1].fim)}.
            Entre no grupo para saber das próximas.
          </p>
        ) : (
          <p className="mb-8 text-center text-zinc-400">
            As <strong>5 primeiras pessoas</strong> do grupo que baterem a meta de marmitas dentro do período de
            cada promoção <strong>levam o prêmio na hora, sem sorteio</strong> — vale a ordem de quem fez o pedido
            primeiro. Cada compra conta para <strong>uma promoção só</strong>, sempre a que estiver rolando naquele
            dia. Todos os prêmios são retirados a partir de <strong>{dataCurta(RETIRADA_A_PARTIR_DE)}</strong>.
          </p>
        )}

        {!encerradas && (
          <div className="mb-10 grid gap-5">
            {promocoesGrupo.map((p, i) => (
              <section key={p.id} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                <h2 className="mb-1 text-xl font-bold text-[#ffc107]">
                  {p.emoji} Promoção {i + 1} — {p.titulo}
                </h2>
                <p className="mb-3 text-sm text-zinc-400">
                  📅 De {dataCurta(p.inicio)} a {dataCurta(p.fim)}
                </p>
                <p className="text-zinc-200">{p.texto.replace(/\*/g, '')}</p>
              </section>
            ))}
          </div>
        )}

        <div className="rounded-2xl bg-[#ffc107] p-8 text-center text-black">
          <p className="mb-5 font-bold">Só quem está no grupo participa! 💛</p>
          <a
            href={GRUPO_SORTEIOS}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-black px-6 py-3 font-bold text-white hover:bg-zinc-800"
          >
            Entrar no grupo
          </a>
          <p className="mt-5 text-sm">
            Para contar para a promoção, peça no nosso WhatsApp de sempre:{' '}
            <a href={WHATSAPP_PEDIDOS} className="font-bold underline">
              {WHATSAPP_PEDIDOS_NUMERO}
            </a>
            . Em 12/10 (feriado), confirme o funcionamento pelo WhatsApp.
          </p>
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Add to sitemap** — em `paginasFixas`, depois de `/contatos`:

```ts
    { url: `${baseUrl}/promocoes`, lastModified, changeFrequency: 'daily', priority: 0.8 },
```

- [ ] **Step 3: Generate the group message file**

Run (bash):
```bash
mkdir -p docs/promocoes
node -e "import('./src/lib/promocoes-grupo.ts').then(m=>process.stdout.write(m.mensagemGrupo()+'\n'))" > docs/promocoes/mensagem-grupo-2026-09-28.md
```
Expected: arquivo com as datas 28/09, 05/10, 06/10, 08/10, 09/10, 12/10, 13/10 e nenhuma data de agosto.

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit` (exit 0); `npx eslint src/app/promocoes/page.tsx src/app/sitemap.ts` (exit 0); `node --test scripts/test-promocoes-grupo.mjs` (4 pass); `npx next build` (exit 0, rota `/promocoes` listada).
Then check HTML: `grep -c "28/09" .next/server/app/promocoes.html` ≥ 1 and `grep -c "DRbxArNS4ObKih8QZBs4ON" .next/server/app/promocoes.html` ≥ 1.

- [ ] **Step 5: Commit, PR, merge after checks**

```bash
git add src/app/promocoes/page.tsx src/app/sitemap.ts docs/promocoes/mensagem-grupo-2026-09-28.md
git commit -m "feat(promocoes): /promocoes landing page and group message"
```
Push to branch `feat/promocoes-grupo`, open PR, wait for Vercel checks, merge (squash). Verify `https://caseirinhasdatata.shop/promocoes` returns 200 and contains `28/09`.

### Task 3: Corrigir o post de 01/08 com link quebrado

**Files:** nenhum (Meta Business Suite, Página 870439819492677).

- [ ] **Step 1:** Abrir Business Suite > Conteúdo > Posts e reels, localizar o post de 01/08/2026 09:21 ("O Sábado Oficial da Tradição Chegou!").
- [ ] **Step 2:** Editar o texto trocando **somente** `caseirinhasdatata.caseirinhasdatata.shop` por `https://caseirinhasdatata.shop`. Nenhuma outra alteração.
- [ ] **Step 3:** Salvar e reler o post publicado. Expected: o texto contém `https://caseirinhasdatata.shop` e não contém `caseirinhasdatata.caseirinhasdatata`.

### Task 4: Portão da conta de anúncios (decisão do dono)

**Files:** nenhum.

Fatos verificados em 24/09/2026:
- "Bentt Gau" (264087404423426) é pessoal, ativa, com pagamento, e pode usar a Página Caseirinhas da Tatá.
- `ads_get_ig_accounts` retorna `[]`: sem Instagram vinculado → anúncios não saem como @caseirinhasdatata no Instagram.
- O pixel 1760424271666079 pertence ao portfólio; conta fora do portfólio não recebe atribuição do pixel pelo portfólio.

- [ ] **Step 1:** Apresentar ao dono: manter a conta pessoal **atrapalha** Instagram e pixel (condição que ele pôs). Opção que resolve: transferir 264087404423426 para o portfólio 566690120345061 ("Adicionar uma conta de anúncio existente") — irreversível.
- [ ] **Step 2:** Só executar com "sim" explícito. Depois: atribuir a conta ao Instagram, ao pixel e ao catálogo, e gsamuyenga com acesso total. Verificar com `ads_get_ig_accounts` (deve listar @caseirinhasdatata) e `ads_get_datasets(ad_account_id)` (deve listar 1760424271666079).

### Task 5: Campanha Meta PAUSADA

**Depends on:** Task 2 no ar; Task 4 decidida.

- [ ] **Step 1:** Criar campanha (objetivo Tráfego) "Promoções do Grupo — 28/09 a 12/10", status **PAUSED**.
- [ ] **Step 2:** Conjunto: alfinete Rua Maria Sinopoli Francovig, 1142, Londrina, raio 5 km; R$ 15/dia; 28/09/2026 00:00 a 12/10/2026 23:59 (America/Sao_Paulo); idade 18+; posicionamentos automáticos.
- [ ] **Step 3:** Anúncio: imagem da marca já publicada; texto com as 3 promoções e datas de `mensagemGrupo()`; link `https://caseirinhasdatata.shop/promocoes?utm_source=meta&utm_medium=paid&utm_campaign=promocoes-grupo-2026-09`; CTA "Saiba mais".
- [ ] **Step 4:** Verificar com `ads_get_ad_entities` (status PAUSED, orçamento 1500 centavos, datas corretas) e `ads_get_ad_preview`. **Não ativar** sem aprovação do dono.

### Task 6: Guia de continuidade para outros agentes

**Files:** Create `docs/GUIA-CONTINUIDADE-META-PROMOCOES-2026-09-24.md` (via skill anthropic-skills:doc-coauthoring).

- [ ] **Step 1:** Documentar: IDs dos ativos, decisões do dono (não criar contas, grupo oficial, prioridade por proximidade, datas), o que está feito, o que depende de aprovação, como verificar cada item, e as proibições (senhas, gasto sem aprovação, contas novas).
- [ ] **Step 2:** Commit junto com a Task 2 ou em PR próprio.
