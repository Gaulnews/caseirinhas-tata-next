# Semana Promocional 28/09–04/10 (kits, Reloginhos e sorteio diário) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar no site a semana promocional do manual (3 trilhas de kits, 5 Reloginhos e sorteio diário) com textos de escassez e urgência verdadeiros, regulamento consultável e o mesmo design gamificado das outras páginas, para aumentar entradas no grupo oficial.

**Architecture:** `src/lib/promocoes-grupo.ts` continua sendo a fonte única e passa a guardar a semana dos kits, a agenda dos Reloginhos e o sorteio diário. Dois componentes cliente (`SemanaDosKits`, `AgendaReloginhos`) seguem o padrão de `PromocoesAtivas` e `CardapioDestaqueTabs`: contagem regressiva real, dia de hoje em destaque e marcação local "Já conferi" em `localStorage`. As superfícies (home, `/promocoes`, `/promocoes/regulamento`, `/bio`, `/contatos`, carrossel) leem essa fonte; nenhuma copia texto à mão.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind 4, Node 26 (`node --test`).

**Spec:**
- `C:\Users\acer\Downloads\manual_promocoes_caseirinhas_28set_04out_2026.pdf` (manual de execução, 7 páginas)
- `C:\Users\acer\Documents\CASEIRINHAS\promo-ct.md` (metas originais dos kits)
- Respostas do dono em 25/09/2026: D1 = sorteio diário existe e continua; D2 = implementar kits e demais promoções preservando estrutura, design, Next.js/React, gamificação e dinamismo; D3 = aceitar "garanta seu Kit", "Entre e garanta o seu", "garantem o prêmio" + "Consulte as regras/condições", oferecer opções com todas as promoções e usar escassez e urgência; D4 = anúncios seguem direto para o convite do grupo.
- Substitui a Task 3 de `docs/superpowers/plans/2026-09-25-correcoes-revisao-independente.md`. As Tasks 1, 4 e 5 daquele plano continuam válidas e entram aqui como Tasks 7–9.

## Global Constraints

- Período dos kits: **28/09/2026 a 04/10/2026**, três trilhas simultâneas; a pessoa escolhe **uma** trilha antes do primeiro pedido contado.
- Metas (de `promo-ct.md`): Kit de Facas = 8 Minis OU 6 Grandes; Kit Ferramentas 46 peças = 7 Minis OU 5 Grandes; Kit Churrasqueiro = 7 Minis OU 6 Médias. Até 5 contemplados por kit.
- Frase obrigatória do manual: "cumprir a meta não garante premiação"; a classificação segue o regulamento e a auditoria.
- Reloginhos (manual §5): RL-GR seg 28/09 primeira hora após a abertura; RL-BOAS ter 29/09 janela a confirmar; RL-ECO qua 30/09 13h–14h, revelação 12h30; RL-DUPLA qui 01/10 13h–14h, revelação 12h30; RL-SAL reserva 14h–15h.
- Oferta do Reloginho é **revelada no grupo 30 min antes**. O site mostra data, janela e "revelada no grupo", **nunca o preço**, até o dono confirmar o preço (D5).
- Um pedido entra em uma única promoção (kit OU Reloginho OU refri grátis OU Caesar do 1º pedido).
- Pedidos iFood não contam.
- Preços de cardápio: Mini R$ 20, Média R$ 25, Grande R$ 28 (`src/lib/cardapio-semanal.ts:303-305`).
- Horário publicado: seg–sex 11:00–14:35, sáb 11:30–15:00, domingo fechado (`src/app/page.tsx`, JSON-LD).
- Link do grupo: somente `GRUPO_SORTEIOS` (`src/lib/site-data.ts`).
- Anúncios: destino continua o convite direto (D4). Nada muda na Meta neste plano além das Tasks 8–9.
- Escassez e urgência só com fatos verdadeiros: 5 por kit, prazo 04/10, janela de 1 hora, revelação 30 min antes, exclusivo do grupo. Proibido: contador falso de pessoas, "últimas vagas" sem dado, preço não aprovado.
- Adicionar arquivos por caminho; nunca `git add -A` (`node_modules` está versionado).

## Registro de revisão do plano (receiving-code-review, 25/09/2026)

| # | Ponto | Decisão | Justificativa |
|---|---|---|---|
| 1 | O manual diz para não publicar "5 primeiras ganham" sem certificado (Plano B) | **Implementar, conforme D2, com regulamento e aviso** | O dono decidiu implementar. O plano cumpre o que o manual exige do texto (regulamento, "não garante premiação", sem ranking público). O risco jurídico continua com o dono e é registrado na resposta final e no guia, não escondido. |
| 2 | Preços R$ 18 (RL-ECO) e R$ 46 (RL-DUPLA) são "hipótese de teste" no manual | **Não publicar preço no site** | Revelação no grupo 30 min antes é regra do próprio manual e ainda serve de gatilho de urgência. Preço entra só com D5. |
| 3 | RL-SAL 14h–15h passa do horário de dias úteis (fecha 14:35) | **RL-SAL fica fora do site** | É reserva no manual e a janela conflita com o horário publicado. |
| 4 | Encerramento dos kits em domingo 04/10, mas domingo consta como fechado no JSON-LD e existe cardápio de domingo | **Pergunta D6** | Sem a hora de fechamento de 04/10 não dá para exibir relógio de encerramento. Até a resposta, o site diz "até 04/10" e conta dias, não horas. |
| 5 | Datas anteriores (8/3/4 dias sequenciais até 12/10) | **Substituídas** | D1/D2 mandam seguir o manual: três trilhas simultâneas numa semana. `/promocoes` e o texto do grupo mudam juntos para não haver duas versões. |
| 6 | Sorteio diário existe (D1) mas regras não estão em nenhum anexo | **Pergunta D7; site mostra só "sorteio diário no grupo — regras no grupo"** | Não inventar prêmio, horário ou mecânica. |
| 7 | Gamificação pedida (D2) | **Aceito com os padrões existentes** | Contagem regressiva real, destaque do dia, "Já conferi" local; mesmo padrão honesto de `PromocoesAtivas` ("sem inventar contador de participantes"). |
| 8 | Evento `EntrouGrupo` mede clique | **Mantido e documentado** | Renomear quebra histórico; anúncios vão direto ao convite (D4), então o pixel nem participa desse caminho. |
| 9 | Autorrevisão: teste procurava `'sorteio diário'` minúsculo, mas o título é "Sorteio diário" | **Corrigido** | Teste passa a procurar `'Sorteio diário'`. |
| 10 | Autorrevisão: teste e texto divergiam ("revelado" x "revelada") | **Corrigido** | Os dois usam "revelada no grupo 30 minutos antes". |
| 11 | Autorrevisão: `SemanaDosKits` renderizava "Faltam  dias" no HTML do servidor (antes do `useEffect`) e sem JavaScript | **Corrigido** | Sem data calculada, mostra "De 28/09 a 04/10. Só 5 por kit." (Review Focus 5). |
| 13 | Prévia do texto: "garantem o prêmio" seguido de "cumprir a meta não garante premiação" parece contradição | **Corrigido** | O aviso passa a explicar a condição (vagas acabam, vale a ordem apurada). A frase literal do manual continua em `REGRAS_GERAIS` e no regulamento. |
| 12 | Autorrevisão: relógio dos Reloginhos (Review Focus 1) ficava sem teste, dentro do componente | **Corrigido** | Lógica movida para `avisoReloginho(r, agoraMs)` em `promocoes-grupo.ts`, com teste para 30/09 12:10, 12:40, 13:30 e 14:10. |

## Respostas do dono (25/09/2026) — prevalecem sobre o restante do plano

- **D5:** sem resposta. Preços não publicados; janela do RL-BOAS fica "anunciada no grupo".
- **D6:** "Sim. 10:40am". A loja abre em 04/10; a hora é ambígua (abertura ou fechamento). O site diz "até 04/10" e conta dias, sem relógio de horas, até confirmação.
- **D7:** o "sorteio diário" é o Reloginho aplicado todo dia. Não há sorteio. Onde o plano diz `SORTEIO_DIARIO`/"Sorteio diário", usar `RELOGINHO_DIARIO` = { titulo: 'Reloginho todo dia', texto: 'Além dos destaques da semana, todo dia tem Reloginho no grupo, em horário estratégico. A oferta é revelada no grupo 30 minutos antes.' }. A palavra "sorteio" só aparece em "sem sorteio" (kits). Testes: exigir 'Reloginho todo dia'; proibir 'sorteio diário'.
- **D8:** mistura otimizada das 3 opções. Aplicar esta tabela na Task 4 (substitui as 3 colunas):

| Superfície | Texto |
|---|---|
| Home (h4 / p / botão) | "⏰ Reloginho todo dia + Semana dos Kits: só 5 por kit!" / "De 28/09 a 04/10. Ofertas relâmpago reveladas 30 min antes, só para quem está no grupo." / "Entre e garanta o seu" |
| Bio (label / desc) | "Grupo oficial: Reloginho e Kits" / "Oferta relâmpago todo dia + só 5 por kit até 04/10" |
| Contatos (h3 / p) | "⏰ Grupo oficial: Reloginho todo dia e Semana dos Kits" / "Ofertas relâmpago de 1 hora, reveladas 30 min antes e só no grupo. Kits até 04/10, só 5 por kit." + link "Ver promoções e regras" |
| Carrossel (titulo / desc) | "Reloginho e Semana dos Kits" / "Oferta relâmpago todo dia e só 5 por kit até 04/10. Exclusivo do grupo oficial." |

## Decisões originais (histórico)

- **D5:** Preços aprovados dos Reloginhos (RL-ECO R$ 18? RL-DUPLA R$ 46?) e janela do RL-BOAS.
- **D6:** Horário de fechamento de domingo 04/10 (a loja abre no domingo?).
- **D7:** Sorteio diário: prêmio, horário e como se participa.
- **D8:** Escolha da opção de texto (tabela da Task 4). Padrão se não houver resposta: opção 1.

## Review Focus

1. Visitante em 30/09 às 12:10 vê "Reloginho revelado às 12h30" com contagem regressiva correta no fuso de Londrina, mesmo com o celular em outro fuso.
2. Depois de 04/10 a página não oferece kits vencidos: mostra "Semana encerrada, entre no grupo para a próxima".
3. Nenhuma superfície publica preço de Reloginho sem D5.
4. Nenhuma superfície diz "levam na hora", "concorra" junto de "sem sorteio", ou "garantido" sem "consulte as regras".
5. Com JavaScript desativado, a página ainda mostra datas, metas e o link do grupo (conteúdo server-side, relógio só como melhoria).

---

### Task 1: Fonte única da semana promocional

**Files:**
- Modify: `src/lib/promocoes-grupo.ts` (substituir o conteúdo)
- Modify: `scripts/test-promocoes-grupo.mjs` (substituir os testes)

**Interfaces — Produces:**
```ts
export type TrilhaKit = { id: 'kit-facas' | 'kit-ferramentas' | 'kit-churrasqueiro'; emoji: string; titulo: string; meta: string; vagas: 5 };
export type Reloginho = { codigo: 'RL-GR' | 'RL-BOAS' | 'RL-ECO' | 'RL-DUPLA'; data: string; titulo: string; janela: string | null; inicio: string | null; fim: string | null; revelacao: string | null; resumo: string };
export const SEMANA: { inicio: '2026-09-28'; fim: '2026-10-04' };
export const trilhasKits: TrilhaKit[];
export const reloginhos: Reloginho[];
export const SORTEIO_DIARIO: { titulo: string; texto: string };
export const REGRAS_GERAIS: string[];
export function dataCurta(iso: string): string;            // '2026-09-30' → '30/09'
export function hojeEmLondrina(agora?: Date): string;       // 'YYYY-MM-DD' no fuso America/Sao_Paulo
export function statusSemana(hojeIso: string): 'antes' | 'durante' | 'encerrada';
export function reloginhoDoDia(hojeIso: string): Reloginho | undefined;
export function mensagemGrupo(): string;                     // texto WhatsApp com *negrito* em pares
export function formatarRestante(ms: number): string;       // 1_200_000 → '20min 00s'; 3_900_000 → '1h 05min'
export function avisoReloginho(r: Reloginho, agoraMs: number): string; // texto do relógio do dia
```
`inicio`/`fim`/`revelacao` são instantes ISO com offset `-03:00` (ex.: `'2026-09-30T13:00:00-03:00'`) ou `null` quando não confirmados.

- [ ] **Step 1: Write the failing test** — substituir `scripts/test-promocoes-grupo.mjs` por:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  SEMANA, trilhasKits, reloginhos, REGRAS_GERAIS, dataCurta, hojeEmLondrina,
  statusSemana, reloginhoDoDia, mensagemGrupo, avisoReloginho,
} from '../src/lib/promocoes-grupo.ts';

test('relógio do Reloginho no fuso de Londrina', () => {
  const eco = reloginhos.find((r) => r.codigo === 'RL-ECO');
  const t = (hhmm) => Date.parse(`2026-09-30T${hhmm}:00-03:00`);
  assert.equal(avisoReloginho(eco, t('12:10')), 'Revelação em 20min 00s');
  assert.equal(avisoReloginho(eco, t('12:40')), 'Revelado no grupo! Começa em 20min 00s');
  assert.equal(avisoReloginho(eco, t('13:30')), 'Valendo agora! Termina em 30min 00s');
  assert.equal(avisoReloginho(eco, t('14:10')), 'Encerrado');
  const gr = reloginhos.find((r) => r.codigo === 'RL-GR');
  assert.equal(avisoReloginho(gr, t('12:10')), 'Primeira hora após a abertura');
});

test('semana e metas conforme manual e promo-ct.md', () => {
  assert.deepEqual(SEMANA, { inicio: '2026-09-28', fim: '2026-10-04' });
  assert.deepEqual(trilhasKits.map((t) => [t.id, t.meta, t.vagas]), [
    ['kit-facas', '8 Minis OU 6 Grandes', 5],
    ['kit-ferramentas', '7 Minis OU 5 Grandes', 5],
    ['kit-churrasqueiro', '7 Minis OU 6 Médias', 5],
  ]);
});

test('Reloginhos nas datas do manual; RL-SAL fora do site', () => {
  assert.deepEqual(reloginhos.map((r) => [r.codigo, r.data]), [
    ['RL-GR', '2026-09-28'], ['RL-BOAS', '2026-09-29'], ['RL-ECO', '2026-09-30'], ['RL-DUPLA', '2026-10-01'],
  ]);
  const eco = reloginhos.find((r) => r.codigo === 'RL-ECO');
  assert.equal(eco.inicio, '2026-09-30T13:00:00-03:00');
  assert.equal(eco.revelacao, '2026-09-30T12:30:00-03:00');
});

test('nenhum preço de Reloginho publicado sem aprovação', () => {
  const tudo = JSON.stringify(reloginhos) + mensagemGrupo();
  assert.ok(!/R\$\s?(18|46)\b/.test(tudo), 'preço de teste do manual publicado');
});

test('hojeEmLondrina usa o fuso de Londrina', () => {
  assert.equal(hojeEmLondrina(new Date('2026-09-30T02:30:00Z')), '2026-09-29');
  assert.equal(hojeEmLondrina(new Date('2026-09-30T03:30:00Z')), '2026-09-30');
});

test('statusSemana e reloginhoDoDia', () => {
  assert.equal(statusSemana('2026-09-27'), 'antes');
  assert.equal(statusSemana('2026-09-28'), 'durante');
  assert.equal(statusSemana('2026-10-04'), 'durante');
  assert.equal(statusSemana('2026-10-05'), 'encerrada');
  assert.equal(reloginhoDoDia('2026-09-30')?.codigo, 'RL-ECO');
  assert.equal(reloginhoDoDia('2026-10-02'), undefined);
  assert.equal(dataCurta('2026-10-04'), '04/10');
});

test('texto do grupo: redação aprovada, regras e sem frases proibidas', () => {
  const m = mensagemGrupo();
  for (const trecho of [
    'Entre e garanta o seu', 'garantem o prêmio', 'Consulte as regras',
    'depois que as 5 vagas do kit acabarem não dá prêmio', '*28/09* a *04/10*',
    'revelada no grupo 30 minutos antes', 'Sorteio diário', '*(43) 99674-9607*',
  ]) assert.ok(m.includes(trecho), `faltou: ${trecho}`);
  for (const proibido of ['levam o prêmio na hora', 'concorra', 'últimas vagas', '17/08', '12/10', '13/10']) {
    assert.ok(!m.toLowerCase().includes(proibido.toLowerCase()), `frase proibida: ${proibido}`);
  }
  for (const linha of m.split('\n')) {
    assert.equal((linha.match(/\*/g) ?? []).length % 2, 0, `negrito sem par: ${linha}`);
  }
  assert.ok(REGRAS_GERAIS.some((r) => r.includes('uma única promoção')));
});
```

- [ ] **Step 2:** Run `node --test scripts/test-promocoes-grupo.mjs` → Expected: FAIL (`does not provide an export named 'SEMANA'`).

- [ ] **Step 3: Write the implementation** — substituir `src/lib/promocoes-grupo.ts` por:

```ts
// Fonte única da Semana Promocional 28/09–04/10/2026 do grupo oficial.
// Fontes: manual_promocoes_caseirinhas_28set_04out_2026.pdf (estrutura,
// Reloginhos, regras) e promo-ct.md (metas dos kits). Preço de Reloginho
// não aparece aqui até o dono aprovar: a oferta é revelada no grupo.
// Sem imports "@/": o teste roda direto no Node.
export type TrilhaKit = {
  id: 'kit-facas' | 'kit-ferramentas' | 'kit-churrasqueiro';
  emoji: string;
  titulo: string;
  meta: string;
  vagas: 5;
};

export type Reloginho = {
  codigo: 'RL-GR' | 'RL-BOAS' | 'RL-ECO' | 'RL-DUPLA';
  data: string; // YYYY-MM-DD, dia de Londrina
  titulo: string;
  janela: string | null; // texto exibido; null = a confirmar
  inicio: string | null; // ISO com -03:00
  fim: string | null;
  revelacao: string | null;
  resumo: string; // sem preço
};

export const SEMANA = { inicio: '2026-09-28', fim: '2026-10-04' } as const;

export const trilhasKits: TrilhaKit[] = [
  { id: 'kit-facas', emoji: '🔪', titulo: 'Kit de Facas', meta: '8 Minis OU 6 Grandes', vagas: 5 },
  { id: 'kit-ferramentas', emoji: '🧰', titulo: 'Kit de Ferramentas 46 peças', meta: '7 Minis OU 5 Grandes', vagas: 5 },
  { id: 'kit-churrasqueiro', emoji: '🍖', titulo: 'Kit Churrasqueiro', meta: '7 Minis OU 6 Médias', vagas: 5 },
];

export const reloginhos: Reloginho[] = [
  {
    codigo: 'RL-GR', data: '2026-09-28', titulo: 'Reloginho Grandão',
    janela: 'Primeira hora após a abertura', inicio: null, fim: null, revelacao: null,
    resumo: 'Para quem pede Grandes para retirada. Oferta revelada no grupo antes de começar.',
  },
  {
    codigo: 'RL-BOAS', data: '2026-09-29', titulo: 'Reloginho de Boas-vindas',
    janela: null, inicio: null, fim: null, revelacao: null,
    resumo: 'Para o primeiro pedido direto de quem é do grupo. Janela anunciada no grupo.',
  },
  {
    codigo: 'RL-ECO', data: '2026-09-30', titulo: 'Reloginho Econômico',
    janela: '13h às 14h', inicio: '2026-09-30T13:00:00-03:00', fim: '2026-09-30T14:00:00-03:00',
    revelacao: '2026-09-30T12:30:00-03:00',
    resumo: 'A oferta mais em conta da semana, na Mini para retirada.',
  },
  {
    codigo: 'RL-DUPLA', data: '2026-10-01', titulo: 'Reloginho Dupla',
    janela: '13h às 14h', inicio: '2026-10-01T13:00:00-03:00', fim: '2026-10-01T14:00:00-03:00',
    revelacao: '2026-10-01T12:30:00-03:00',
    resumo: 'Para quem pede duas Médias juntas para retirada.',
  },
];

export const SORTEIO_DIARIO = {
  titulo: 'Sorteio diário no grupo',
  texto: 'Todo dia tem sorteio no grupo oficial. Regras e resultado são publicados no grupo.',
};

export const REGRAS_GERAIS: string[] = [
  'Válido para quem já está no grupo oficial antes de fazer o pedido.',
  'Contam apenas pedidos diretos pelo WhatsApp (43) 99674-9607, aceitos, pagos e não cancelados. Pedidos do iFood não contam.',
  'Cada pedido entra em uma única promoção: kit, Reloginho, refri grátis ou Caesar do 1º pedido.',
  'Kits: escolha uma trilha antes do primeiro pedido; não é possível trocar de trilha nem somar tamanhos diferentes.',
  'Kits: até 5 contemplados por kit, segundo a apuração do regulamento; cumprir a meta não garante premiação.',
  'Reloginhos: a oferta é revelada no grupo 30 minutos antes; vale para todos que pedirem dentro da janela.',
];

export function dataCurta(iso: string): string {
  const [, mes, dia] = iso.slice(0, 10).split('-');
  return `${dia}/${mes}`;
}

export function hojeEmLondrina(agora: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(agora);
}

export function statusSemana(hojeIso: string): 'antes' | 'durante' | 'encerrada' {
  if (hojeIso < SEMANA.inicio) return 'antes';
  if (hojeIso > SEMANA.fim) return 'encerrada';
  return 'durante';
}

export function reloginhoDoDia(hojeIso: string): Reloginho | undefined {
  return reloginhos.find((r) => r.data === hojeIso);
}

export function formatarRestante(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return h > 0 ? `${h}h ${String(m).padStart(2, '0')}min` : `${m}min ${String(s).padStart(2, '0')}s`;
}

// Instantes com -03:00: o resultado não depende do fuso do aparelho.
export function avisoReloginho(r: Reloginho, agoraMs: number): string {
  if (!r.revelacao || !r.inicio || !r.fim) return r.janela ?? 'Janela anunciada no grupo';
  const rev = Date.parse(r.revelacao);
  const ini = Date.parse(r.inicio);
  const fim = Date.parse(r.fim);
  if (agoraMs < rev) return `Revelação em ${formatarRestante(rev - agoraMs)}`;
  if (agoraMs < ini) return `Revelado no grupo! Começa em ${formatarRestante(ini - agoraMs)}`;
  if (agoraMs < fim) return `Valendo agora! Termina em ${formatarRestante(fim - agoraMs)}`;
  return 'Encerrado';
}

const SEPARADOR = '━━━━━━━━━━━━━━━';

export function mensagemGrupo(): string {
  const kits = trilhasKits
    .map((t) => `${t.emoji} *${t.titulo.toUpperCase()}* — meta: *${t.meta}* · só *${t.vagas}* por kit`)
    .join('\n');
  const agenda = reloginhos
    .map((r) => `⏰ *${dataCurta(r.data)}* — ${r.titulo}${r.janela ? ` (${r.janela})` : ''}`)
    .join('\n');
  return [
    '*SEMANA PROMOCIONAL DO GRUPO — CASEIRINHAS DA TATÁ* 🎁',
    `📅 De *${dataCurta(SEMANA.inicio)}* a *${dataCurta(SEMANA.fim)}*. É só pra quem está aqui dentro!`,
    SEPARADOR,
    '🏆 *SEMANA DOS KITS*\nEscolha *uma* trilha antes do primeiro pedido e bata a meta até *04/10*. As 5 primeiras pessoas de cada kit *garantem o prêmio*, sem sorteio. Entre e garanta o seu!\n' + kits,
    '⚠️ Bater a meta depois que as 5 vagas do kit acabarem não dá prêmio: vale a ordem apurada pelo regulamento. *Consulte as regras* no site: caseirinhasdatata.shop/promocoes/regulamento',
    SEPARADOR,
    '⏰ *RELOGINHOS DA TATÁ*\nOferta relâmpago de 1 hora, revelada no grupo 30 minutos antes. Quem piscar, perde!\n' + agenda,
    SEPARADOR,
    '🎲 *' + SORTEIO_DIARIO.titulo + '*\n' + SORTEIO_DIARIO.texto,
    SEPARADOR,
    '✅ Cada pedido vale para *uma promoção só*.\n✅ Pedidos pelo WhatsApp de sempre: *(43) 99674-9607* 😉\n✅ Pedidos do iFood não contam.',
    'Fica de olho no grupo e não deixa pra última hora! 💛',
  ].join('\n\n');
}
```

- [ ] **Step 4:** Run `node --test scripts/test-promocoes-grupo.mjs` → Expected: 7 pass. Run `npx tsc --noEmit` → Expected: erros em `src/app/promocoes/page.tsx` (usa exports antigos) — corrigidos na Task 3. Registrar.

- [ ] **Step 5:** Não commitar isoladamente (a página quebraria o build); commit junto com a Task 3.

### Task 2: Componentes gamificados

**Files:**
- Create: `src/components/SemanaDosKits.tsx`
- Create: `src/components/AgendaReloginhos.tsx`

**Interfaces:**
- Consumes (Task 1): `SEMANA`, `trilhasKits`, `reloginhos`, `dataCurta`, `hojeEmLondrina`, `statusSemana`, `reloginhoDoDia`.
- Produces: `export function SemanaDosKits(): JSX.Element`, `export function AgendaReloginhos(): JSX.Element` (ambos `'use client'`, sem props).

Padrão obrigatório (de `PromocoesAtivas.tsx` e `CardapioDestaqueTabs.tsx`): cartões `rounded-2xl border border-zinc-800 bg-zinc-900 p-6`, destaque `#ffc107`, CTA `bg-[#ffc107] text-zinc-950 font-bold rounded-lg`, `localStorage` em `try/catch`, comentário "gamificação honesta", nenhum contador inventado.

- [ ] **Step 1: `SemanaDosKits.tsx`**

```tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { GRUPO_SORTEIOS } from '@/lib/site-data';
import { SEMANA, trilhasKits, dataCurta, hojeEmLondrina, statusSemana, type TrilhaKit } from '@/lib/promocoes-grupo';

// Gamificação honesta: a pessoa marca, só no próprio navegador, a trilha que
// pretende escolher no grupo. Não envia nada e não mostra contador de
// participantes — o número real de contemplados é apurado pela loja.
export function SemanaDosKits() {
  const [hoje, setHoje] = useState<string | null>(null);
  const [trilha, setTrilha] = useState<TrilhaKit['id'] | null>(null);

  useEffect(() => {
    setHoje(hojeEmLondrina());
    try {
      const salva = localStorage.getItem('trilha-kit') as TrilhaKit['id'] | null;
      if (salva) setTrilha(salva);
    } catch {
      // localStorage indisponível — segue sem lembrar a escolha.
    }
  }, []);

  const escolher = (id: TrilhaKit['id']) => {
    setTrilha(id);
    try {
      localStorage.setItem('trilha-kit', id);
    } catch {
      // idem.
    }
  };

  const status = hoje ? statusSemana(hoje) : 'durante';
  const diasRestantes = hoje && status !== 'encerrada'
    ? Math.round((Date.parse(`${SEMANA.fim}T12:00:00-03:00`) - Date.parse(`${hoje}T12:00:00-03:00`)) / 86400000)
    : null;

  if (status === 'encerrada') {
    return (
      <p className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-zinc-300">
        A Semana dos Kits terminou em {dataCurta(SEMANA.fim)}. Entre no grupo para não perder a próxima.
      </p>
    );
  }

  return (
    <div>
      <p className="mb-5 text-zinc-300">
        {hoje === null
          ? <>De <strong className="text-[#ffc107]">{dataCurta(SEMANA.inicio)}</strong> a <strong className="text-[#ffc107]">{dataCurta(SEMANA.fim)}</strong>. Só 5 por kit.</>
          : status === 'antes'
          ? <>Começa em <strong className="text-[#ffc107]">{dataCurta(SEMANA.inicio)}</strong>. Quem já está no grupo sai na frente.</>
          : <>{diasRestantes === 0 ? <strong className="text-[#ffc107]">Último dia!</strong> : <>Faltam <strong className="text-[#ffc107]">{diasRestantes} dia{diasRestantes === 1 ? '' : 's'}</strong>.</>} Só 5 por kit.</>}
      </p>
      <div className="grid gap-5 md:grid-cols-3">
        {trilhasKits.map((t) => {
          const minha = trilha === t.id;
          return (
            <div key={t.id} className={`flex flex-col rounded-2xl border p-6 ${minha ? 'border-[#ffc107] bg-zinc-900' : 'border-zinc-800 bg-zinc-900'}`}>
              <p className="mb-2 inline-block w-fit rounded-full bg-[#ffc107] px-3 py-1 text-xs font-bold text-black">Só {t.vagas} por kit</p>
              <h3 className="mb-1 text-lg font-bold text-zinc-100"><span aria-hidden>{t.emoji}</span> {t.titulo}</h3>
              <p className="mb-4 flex-1 text-sm text-zinc-400">Meta até {dataCurta(SEMANA.fim)}: <strong className="text-zinc-200">{t.meta}</strong></p>
              <button
                type="button"
                onClick={() => escolher(t.id)}
                aria-pressed={minha}
                className={`mb-3 w-full rounded-lg border py-2 text-sm font-bold ${minha ? 'border-[#ffc107] text-[#ffc107]' : 'border-zinc-700 text-zinc-300 hover:border-zinc-500'}`}
              >
                {minha ? '✓ Minha trilha' : 'Quero esta trilha'}
              </button>
              <a href={GRUPO_SORTEIOS} target="_blank" rel="noopener noreferrer"
                className="inline-block w-full rounded-lg bg-[#ffc107] py-3 text-center font-bold text-zinc-950 hover:bg-[#ffca28]">
                Entre e garanta o seu
              </a>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-sm text-zinc-500">
        Só as 5 primeiras de cada kit levam, pela ordem apurada no regulamento. <Link href="/promocoes/regulamento" className="underline">Consulte as regras</Link>.
      </p>
    </div>
  );
}
```

- [ ] **Step 2: `AgendaReloginhos.tsx`**

```tsx
'use client';

import { useEffect, useState } from 'react';
import { GRUPO_SORTEIOS } from '@/lib/site-data';
import { reloginhos, dataCurta, hojeEmLondrina, avisoReloginho } from '@/lib/promocoes-grupo';

// Agenda real dos Reloginhos. O relógio conta até a revelação ou até o fim
// da janela usando instantes com -03:00, então funciona em qualquer fuso.
// Nada de preço aqui: a oferta é revelada no grupo 30 minutos antes.
export function AgendaReloginhos() {
  const [agora, setAgora] = useState<number | null>(null);

  useEffect(() => {
    setAgora(Date.now());
    const id = setInterval(() => setAgora(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const hoje = agora ? hojeEmLondrina(new Date(agora)) : null;

  return (
    <ol className="grid gap-4 md:grid-cols-4">
      {reloginhos.map((r) => {
        const ehHoje = r.data === hoje;
        const passou = hoje !== null && r.data < hoje;
        const aviso = ehHoje && agora ? avisoReloginho(r, agora) : (r.janela ?? 'Janela anunciada no grupo');
        return (
          <li key={r.codigo}
            className={`rounded-2xl border p-5 ${ehHoje ? 'border-[#ffc107] bg-zinc-900' : 'border-zinc-800 bg-zinc-900'} ${passou ? 'opacity-50' : ''}`}>
            <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">{dataCurta(r.data)}{ehHoje ? ' · hoje' : ''}</p>
            <h3 className="mb-1 font-bold text-zinc-100"><span aria-hidden>⏰</span> {r.titulo}</h3>
            <p className="mb-3 text-sm text-zinc-400">{r.resumo}</p>
            <p className={`text-sm font-bold ${ehHoje ? 'text-[#ffc107]' : 'text-zinc-300'}`} aria-live={ehHoje ? 'polite' : undefined}>
              {passou ? 'Encerrado' : aviso}
            </p>
          </li>
        );
      })}
      <li className="md:col-span-4">
        <a href={GRUPO_SORTEIOS} target="_blank" rel="noopener noreferrer"
          className="inline-block w-full rounded-lg bg-[#ffc107] py-3 text-center font-bold text-zinc-950 hover:bg-[#ffca28]">
          Entre no grupo para ver a oferta antes de todo mundo
        </a>
      </li>
    </ol>
  );
}
```

- [ ] **Step 3:** `npx eslint src/components/SemanaDosKits.tsx src/components/AgendaReloginhos.tsx` → Expected: 0 erros.

### Task 3: Página `/promocoes` e `/promocoes/regulamento`

**Files:**
- Modify: `src/app/promocoes/page.tsx` (substituir)
- Create: `src/app/promocoes/regulamento/page.tsx`
- Modify: `src/app/sitemap.ts` (acrescentar `/promocoes/regulamento`)
- Modify: `docs/promocoes/` (gerar `mensagem-grupo-2026-09-28.md` de novo)

- [ ] **Step 1: `/promocoes`** — manter `SiteHeader`, `revalidate = 3600`, seções no padrão de `/contatos` (`<section aria-labelledby>` + `h2` com `border-l-4 border-yellow-400 pl-3`). Ordem: hero com a promessa do grupo e CTA; "Semana dos Kits" (`<SemanaDosKits />`); "Reloginhos da Tatá" (`<AgendaReloginhos />`); "Sorteio diário" (`SORTEIO_DIARIO`); "Promoções de sempre" (`<PromocoesAtivas />`, as ofertas reais já existentes); rodapé com regras resumidas e link para o regulamento. Metadata: title "Promoções do Grupo", description com a semana 28/09–04/10.
- [ ] **Step 2: `/promocoes/regulamento`** — página server-side, `SiteHeader`, lista `REGRAS_GERAIS`, tabela das 3 trilhas (meta, vagas), tabela dos Reloginhos (data, janela ou "a confirmar"), texto do sorteio diário, contato. Frase final: "Dúvidas: WhatsApp (43) 99674-9607."
- [ ] **Step 3:** Sitemap: `{ url: \`${baseUrl}/promocoes/regulamento\`, lastModified, changeFrequency: 'weekly', priority: 0.5 }`.
- [ ] **Step 4:** Gerar texto do grupo (Git Bash): `node -e "import('./src/lib/promocoes-grupo.ts').then(m=>process.stdout.write(m.mensagemGrupo()+'\n'))" > docs/promocoes/mensagem-grupo-2026-09-28.md`.
- [ ] **Step 5:** `node --test scripts/test-promocoes-grupo.mjs` (7 pass), `npx tsc --noEmit` (0), `npx eslint src/app/promocoes src/components/SemanaDosKits.tsx src/components/AgendaReloginhos.tsx src/lib/promocoes-grupo.ts` (0), `npx next build` (0; rotas `/promocoes` e `/promocoes/regulamento`).
- [ ] **Step 6: Commit (Tasks 1–3)**

```bash
git add src/lib/promocoes-grupo.ts scripts/test-promocoes-grupo.mjs src/components/SemanaDosKits.tsx src/components/AgendaReloginhos.tsx src/app/promocoes/page.tsx src/app/promocoes/regulamento/page.tsx src/app/sitemap.ts docs/promocoes/mensagem-grupo-2026-09-28.md
git commit -m "feat(promocoes): promo week 28/09-04/10 with kits, Reloginhos and daily draw"
```

### Task 4: Chamadas nas outras páginas (opções de texto, D8)

**Files:** `src/app/page.tsx:327-337`, `src/app/bio/page.tsx:59-64`, `src/app/contatos/page.tsx:248-262`, `src/components/CarrosselRedesSociais.tsx:33-38`

**Justificativa:** D3 pede opções que somem todas as promoções e usem escassez e urgência verdadeiras. Todas levam ao grupo (ou a `/promocoes` no site) e mantêm "sorteio diário" (D1).

| Superfície | Opção 1 — escassez (padrão) | Opção 2 — urgência | Opção 3 — exclusividade |
|---|---|---|---|
| Home (h4 + p + botão) | "🎁 Só 5 por kit + sorteio todo dia!" / "Semana dos Kits de 28/09 a 04/10, Reloginhos de 1 hora e sorteio diário. Só no grupo." / "Entre e garanta o seu" | "⏰ Oferta relâmpago toda semana!" / "Reloginho revelado 30 min antes, só no grupo. Kits até 04/10 e sorteio diário." / "Entrar agora" | "🔒 Promoções só para quem está no grupo" / "Kits, Reloginhos e sorteio diário que não aparecem em outro lugar." / "Quero entrar" |
| Bio (label + desc) | "Grupo oficial — kits e sorteio" / "Só 5 por kit até 04/10 + sorteio diário" | "Grupo oficial — Reloginho" / "Oferta de 1 hora revelada 30 min antes" | "Grupo oficial — exclusivo" / "Kits, Reloginhos e sorteio diário" |
| Contatos (h3 + p) | "🎁 Grupo oficial: kits, Reloginhos e sorteio diário" / "Semana dos Kits até 04/10 (só 5 por kit), ofertas relâmpago de 1 hora e sorteio todo dia. Consulte as regras em /promocoes." | igual com foco no Reloginho | igual com foco em exclusividade |
| Carrossel (titulo + desc) | "Kits, Reloginhos e Sorteios" / "Só 5 por kit até 04/10, ofertas de 1 hora e sorteio diário no grupo oficial." | "Reloginho da Tatá" / "Oferta relâmpago revelada 30 min antes, só no grupo." | "Só pra quem está no grupo" / "Kits, Reloginhos e sorteio diário exclusivos." |

- [ ] **Step 1:** Aplicar a opção escolhida (D8; padrão opção 1). Contatos ganha link `<Link href="/promocoes">Ver promoções e regras</Link>`.
- [ ] **Step 2:** Criar `scripts/test-promessas-grupo.mjs`:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const arquivos = ['src/app/page.tsx', 'src/app/bio/page.tsx', 'src/app/contatos/page.tsx', 'src/components/CarrosselRedesSociais.tsx', 'src/app/promocoes/page.tsx', 'src/components/SemanaDosKits.tsx', 'src/components/AgendaReloginhos.tsx'];

test('nenhuma superfície usa frases proibidas', () => {
  for (const f of arquivos) {
    const t = readFileSync(f, 'utf8');
    for (const p of [/levam o prêmio na hora/i, /concorra/i, /últimas vagas/i, /R\$\s?(18|46)\b/]) {
      assert.ok(!p.test(t), `${f}: ${p}`);
    }
  }
});

test('superfícies de kit remetem às regras', () => {
  for (const f of ['src/app/promocoes/page.tsx', 'src/components/SemanaDosKits.tsx']) {
    assert.ok(/Consulte as regras|regulamento/i.test(readFileSync(f, 'utf8')), `${f} sem regras`);
  }
});
```

- [ ] **Step 3:** Run `node --test scripts/test-promessas-grupo.mjs` → Expected: FAIL antes do Step 1 (home tem "Concorra"; bio tem "concorra"), PASS depois.
- [ ] **Step 4:** `npx tsc --noEmit`, `npx eslint` nos 4 arquivos, `npx next build` → 0.
- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx src/app/bio/page.tsx src/app/contatos/page.tsx src/components/CarrosselRedesSociais.tsx scripts/test-promessas-grupo.mjs
git commit -m "feat(promocoes): group call-to-actions with kits, Reloginhos and daily draw"
```

### Task 5: Verificação visual e publicação

- [ ] **Step 1:** `npm run dev`; abrir `/promocoes`, `/promocoes/regulamento`, `/`, `/bio`, `/contatos` em 375 px e desktop; conferir que o layout segue o das outras páginas, que "Quero esta trilha" marca e persiste ao recarregar, e que a agenda mostra "hoje" certo. Não alterar o relógio do sistema: o horário do Reloginho é coberto pelo teste `relógio do Reloginho no fuso de Londrina`.
- [ ] **Step 2:** Revisão final da branch com `superpowers:requesting-code-review` (modelo opus).
- [ ] **Step 3:** PR, checks da Vercel, merge com "sim" do dono, conferir produção (`/promocoes` 200, contém "04/10", sem "R$ 18").

### Task 6: Texto do grupo para o dono

- [ ] **Step 1:** Entregar `docs/promocoes/mensagem-grupo-2026-09-28.md` e o teaser do manual §6 ("Amanhã tem Reloginho da Tatá…"). Não enviar em nome do dono.

### Task 7: Guia de continuidade (era Task 1 do plano de correções)

- [ ] Aplicar os Steps 1–5 da Task 1 de `docs/superpowers/plans/2026-09-25-correcoes-revisao-independente.md`, trocando as datas antigas pela semana 28/09–04/10 e registrando D1–D8.

### Task 8: Meta — verificação e transferência (era Task 4)

- [ ] Ler criativos dos 5 anúncios (identidade, URL, texto); com Chrome conectado, transferir a conta 264087404423426 ao portfólio 566690120345061 (autorizado: "SIM"), atribuir Página, Instagram, pixel, catálogo e gsamuyenga; verificar com `ads_get_ad_accounts`, `ads_get_ig_accounts`, `ads_get_datasets`.

### Task 9: Post de 01/08 (era Task 5)

- [ ] Com Chrome conectado, como Página: trocar só `caseirinhasdatata.caseirinhasdatata.shop` por `https://caseirinhasdatata.shop` e reler o post.
