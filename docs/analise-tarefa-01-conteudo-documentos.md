# [TAREFA-ANALISE-01] — Análise Aprofundada dos Documentos de Infraestrutura, Deploy e SEO

**Metodologia aplicada:** pipeline adaptado do skill `deep-research` (Extração → Segunda Passagem Aprofundada → Verificação Cruzada com o Código-Fonte → Síntese → Devil's Advocate → Compilação de Relatório), seguindo a estrutura definida em `SKILL.md`, `socratic_mentor_agent.md`, `synthesis_agent.md`, `devils_advocate_agent.md` e `report_compiler_agent.md` fornecidos como padrão de referência.

**Adaptação de escopo:** os agentes de origem foram desenhados para corpora acadêmicos (artigos, DOIs, citação em duas/três camadas com `<!--ref:slug-->`). Os documentos-alvo aqui são registros técnicos internos (transcrições de suporte/deploy e um plano de implementação), não literatura revisada por pares. Por isso as citações abaixo usam `[Doc N, linha X]` em vez do aparato de citação acadêmica — mantendo o princípio equivalente (toda afirmação rastreável até a fonte), sem fabricar um sistema de referência que não se aplica a este material.

**AI Disclosure:** este relatório foi produzido com apoio de ferramenta de IA (Claude Code), incluindo leitura integral dos 5 arquivos de referência e dos 3 documentos-alvo (sendo 2 idênticos), além de inspeção direta do estado atual do repositório `caseirinhas-tata-next` (branch `claude/analise-conteudo-documentos-6qlyof`, HEAD `ff6030c0`) para verificação cruzada.

---

## 1. Inventário dos Documentos Analisados

| # | Arquivo | Natureza | Observação |
|---|---------|----------|------------|
| Doc 1 | `Categorias02...23_22_35.43..._1.txt` | Log de diagnóstico + roteiro de correção (Termux/Vercel) | **Idêntico byte-a-byte** ao Doc 2 |
| Doc 2 | `Categorias02...23_22_35.43....txt` | Log de diagnóstico + roteiro de correção (Termux/Vercel) | Duplicata exata do Doc 1 — tratado como fonte única daqui em diante |
| Doc 3 | `Mapa-do-site-rotas-do-site-categorias-tags-seo..txt` | Plano de implementação de arquitetura SEO + auditoria Apify | Documento mais extenso; contém 3 blocos distintos (ver §2.3) |

Os anexos `categorias-seo-page..txt` e a segunda menção a `Mapa-do-site-rotas-do-site-categorias-tags-seo..txt` citados no corpo da tarefa **não estavam presentes como arquivos anexados** nesta sessão (apenas referenciados por nome no texto da tarefa) — tratados como `[MATERIAL GAP]`, sem preenchimento por suposição.

---

## 2. Primeira Extração — Conteúdo Íntegro por Documento

### 2.1 Doc 1/2 — Diagnóstico Termux + Vercel (Bloco A)

**Problema 1 — Termux/Git:** comando executado dentro de `~/caseirinhas-motor` (repositório do motor de WhatsApp/Baileys), não do repositório do site `caseirinhas-tata-next` → erro `fatal: not a git repository` [linha 2].

**Problema 2 — Build de 41ms na Vercel:** tempo de build anômalo (`Build Completed in [41ms]`) indicando que a Vercel tratou o projeto como pasta estática/vazia, não como aplicação Next.js — build normal de Next.js leva 20-30s [linha 3]. Confirmado também que a branch principal identificada nos logs era `main` (não `master`) [linha 3].

**Roteiro de correção proposto (3 passos):**
1. Recriar clone limpo de `https://github.com/Gaulnews/caseirinhas-tata-next.git`, instalar `apify-client`, commitar e forçar push para `main` [linhas 8-28].
2. Corrigir "Framework Preset" nas configurações da Vercel de `Other` para `Next.js` [linhas 32-37].
3. Verificar domínios `caseirinhasdatata.shop` e `www.caseirinhasdatata.shop` em Settings → Domains, com apontamento DNS via Hostinger/Registro.br se necessário [linhas 40-43].

### 2.2 Doc 1/2 — Diagnóstico de Reconexão GitHub↔Vercel (Bloco B, dentro do mesmo arquivo em Doc 3)

*(Este bloco aparece de fato dentro do arquivo "Mapa do site", linhas 241-272 — ver nota de discrepância em §4.1)*

- Erro `404: NOT_FOUND` + `"No Active Branches / Commit using our Git connections"` → integração GitHub↔Vercel desfeita [linha 241-242].
- Correção: reconectar repositório em Settings → Git, confirmar "Production Branch" [linhas 244-252], depois forçar push (`git add .` / commit / `git branch -M master` / `git push -u origin master`) — nota explícita de que se a branch real for `main`, substituir `master` por `main` nos comandos [linhas 253-268].

### 2.3 Doc 3 — "Mapa do Site" (documento composto, 3 sub-blocos)

**Sub-bloco 1 (linhas 1-503): Plano de implementação SEO** — instrui criação de:
- `src/app/sitemap.ts` com 4 URLs estáticas (`/`, `/categorias`, `/tags`, `/mapa-do-site`) [linhas 10-42].
- `src/app/categorias/page.tsx` — 4 categorias (`pratos-do-dia`, `pacotes-b2b`, `opcoes-fit`, `sobremesas`), cada uma linkando para `/categorias/[slug]` [linhas 44-85].
- `src/app/tags/page.tsx` — 9 tags (`#ZonaNorte`, `#CincoConjuntos`, `#AlmoçoRápido`, `#ComidaCaseira`, `#MarmitaLondrina`, `#Coliseu`, `#Alpes`, `#Parigot`, `#B2B`), cada uma linkando para `/tags/[slug-lowercase-sem-#]` [linhas 87-124].
- `src/app/mapa-do-site/page.tsx` — página de navegação hierárquica, com link externo para `caseirinhas-engine.vercel.app` (painel CRM) e link interno para `/api/seo-audit` [linhas 126-166].
- `src/app/api/seo-audit/route.ts` — rota de API que chama o ator Apify `pC8gsptNv2RwJm0QE` (auditoria estilo Ahrefs), protegida por query param `secret=senha_secreta_tata_2026` (comparação hardcoded no código-fonte) e por `process.env.APIFY_API_TOKEN` (com fallback literal `'<YOUR_API_TOKEN>'`) [linhas 168-233].
- Instrução final: commit com `git push origin master` (nota: `master`, não `main`, inconsistente com o resto do documento) [linha 236].

**Sub-bloco 2 (linhas 241-272):** idêntico ao "Bloco B" descrito em §2.2 — reconexão GitHub↔Vercel.

**Sub-bloco 3 (linhas 274-503): Diagnóstico de negócio + expansão SEO local**, contendo:
- Diagrama ASCII da arquitetura de 3 sistemas: `caseirinhas-tata-next` (site, Next.js/Vercel), `caseirinhas-engine` (652 leads B2B, Vercel), `caseirinhas-wpp` (motor de mensagens Baileys, Render) [linhas 276-289].
- **Dados de Google Business Profile (GBP)**: horário — Seg-Sex 11:00-14:35, Sáb 11:30-15:00, Dom fechado [linha 307]; atributos de serviço (refeição no local, entrega rápida, bom para crianças, banheiro, sem drive-through) [linha 308]; **NAP**: telefones `(43) 99674-9607` / `(43) 99982-1401`, endereço na Zona Norte de Londrina [linha 309].
- Recomendação de Schema.org (`@type: Restaurant`) com dados completos: nome, imagem (`logo-caseirinhas-da-tata.jpg`), `telephone: +5543996749607`, `priceRange: $`, `servesCuisine`, endereço postal (`postalCode: 86088-080`), geo-coordenadas (`latitude: -23.2800, longitude: -51.1600`), `openingHoursSpecification`, `hasMenu` apontando para `/categorias` [linhas 314-401] — código completo para `src/app/layout.tsx`.
- **Rota dinâmica por bairro**: `src/app/tags/[slug]/page.tsx`, com `generateMetadata` assíncrono (`params: Promise<{ slug: string }>`, padrão Next.js App Router mais recente com params assíncronos), CTA de WhatsApp (`wa.me/5543996749607`) [linhas 403-480].
- Comando de deploy final: `mkdir -p src/app/tags/\[slug\]` seguido de commit e `git push origin main` (aqui já usando `main`, consistente com o diagnóstico original) [linhas 481-503].

---

## 3. Segunda Passagem — Análise Aprofundada (detalhes não capturados na primeira leitura)

Releitura integral dos 3 documentos em busca de padrões, inconsistências textuais e dados implícitos:

1. **Inconsistência interna de nome de branch dentro do próprio Doc 3**: o sub-bloco 1 encerra com `git push origin master` [linha 236], mas o mesmo documento, poucas linhas depois, no sub-bloco 2, trata `main` como a branch correta confirmada pelos logs da Vercel [linha 252, nota linha 268] e o sub-bloco 3 volta a usar `main` [linha 500]. Isso sugere que os 3 sub-blocos foram gerados em momentos/conversas diferentes e depois concatenados no mesmo arquivo — o documento não é uma unidade redacional única, é um **log de conversa de suporte acumulado**.
2. **O ator Apify é identificado apenas por ID opaco** (`pC8gsptNv2RwJm0QE`), sem nome do ator nem link de documentação — não há como verificar independentemente que esse ID corresponde a um ator real de auditoria Ahrefs sem acesso à console Apify. Tratado como afirmação não verificável nesta análise (`[MATERIAL GAP]`).
3. **A "senha" da rota de auditoria é um segredo estático no código-fonte**, não um segredo de ambiente: `secret !== 'senha_secreta_tata_2026'` está em texto plano no arquivo `route.ts` que é commitado no GitHub público-privado do projeto — isso anula a função de proteção do "trava de segurança" descrita na linha 182-185, porque qualquer pessoa com acesso ao repositório (ou ao histórico de commits, mesmo que a string seja trocada depois) tem a senha. Esse ponto é retomado como achado Crítico no Devil's Advocate (§5).
4. **O diagrama ASCII (linhas 277-289) é a única fonte, em todo o corpus, que documenta a existência dos sistemas `caseirinhas-engine` e `caseirinhas-wpp`** — nenhum dos outros dois documentos os menciona. Isso é relevante porque a tarefa de análise foi restrita a `caseirinhas-tata-next`; os outros dois repositórios não estão no escopo desta sessão (não foram anexados/adicionados) e qualquer afirmação sobre o estado atual deles seria especulação.
5. **Coordenadas geográficas fornecidas** (`-23.2800, -51.1600`) são aproximadas ao nível de bairro/cidade (Londrina-PR), não ao endereço exato — o próprio `streetAddress` no schema proposto é genérico (`"Zona Norte"`), não um logradouro completo. Isso é consistente com a política de não publicar endereço residencial exato (comum em delivery caseiro), mas tecnicamente enfraquece a precisão do Schema.org `PostalAddress`/`GeoCoordinates` para fins de Google Maps/Local Pack.
6. **O `generateMetadata`/`params: Promise<{slug: string}>` no código proposto para `tags/[slug]/page.tsx`** já usa a API assíncrona de `params` — isso é o padrão correto para versões recentes do Next.js App Router (13.4+/15+), o que é coerente com o `package.json` real do projeto, que usa `next@16.2.10` (verificado em §4).
7. **O horário de funcionamento do GBP e o do Schema.org propostos batem exatamente** (Seg-Sex 11:00-14:35; Sáb 11:30-15:00; Dom fechado) — não há divergência entre a "ficha" e o "código" nos documentos, o que é um ponto positivo de consistência interna dos dados de origem.
8. **O texto da tarefa cita 5 nomes de documentos-alvo, mas apenas 3 arquivos distintos de conteúdo foram de fato anexados** (2 sendo cópias idênticas) — os nomes `categorias-seo-page..txt` e a segunda ocorrência de `Mapa-do-site-rotas-do-site-categorias-tags-seo..txt` no texto da tarefa não correspondem a anexos adicionais reais.

---

## 4. Verificação Cruzada com o Estado Real do Repositório

Esta etapa não está prevista nos agentes de referência (que trabalham só sobre texto/literatura), mas é o value-add mais importante possível aqui: o repositório-alvo dos documentos (`caseirinhas-tata-next`) está diretamente acessível nesta sessão. Inspecionei o HEAD atual (`ff6030c0`, branch `claude/analise-conteudo-documentos-6qlyof`) e comparei com o que os documentos prescreviam.

### 4.1 O que os documentos prescreviam e **foi implementado**

| Prescrito no Doc 3 | Estado real no repositório |
|---|---|
| `npm install apify-client` | ✅ presente em `package.json` (`"apify-client": "^2.24.0"`) |
| `src/app/sitemap.ts` | ✅ existe, mas com conteúdo **divergente** do documento (ver §4.2) |
| `src/app/categorias/page.tsx` | ✅ existe, conteúdo **idêntico** ao proposto no documento |
| `src/app/tags/page.tsx` | ✅ existe, conteúdo **idêntico** ao proposto no documento |
| `src/app/mapa-do-site/page.tsx` | ✅ existe, conteúdo **idêntico** ao proposto no documento |
| `src/app/api/seo-audit/route.ts` | ✅ existe, conteúdo **idêntico** ao proposto (segredo hardcoded incluído — ver §5) |
| Branch principal = `main`, domínio conectado | ✅ confirmado — histórico de commits recente na branch `main`, domínio `caseirinhasdatata.shop` referenciado em `metadataBase` |

### 4.2 O que os documentos prescreviam e **NÃO foi implementado** (ou foi substituído)

| Item | Prescrito | Realidade no código |
|---|---|---|
| Schema.org JSON-LD (`@type: Restaurant`) em `layout.tsx` | Código completo fornecido (linhas 316-401 do Doc 3) | **Ausente.** `src/app/layout.tsx` atual não contém nenhum `<script type="application/ld+json">` nem qualquer dado estruturado. Todo o investimento em NAP, horários e geo-coordenadas descrito no documento **não chegou a ser publicado no HTML**. |
| `src/app/tags/[slug]/page.tsx` (rota dinâmica por bairro, vinculada às tags de `/tags`) | Código completo fornecido | **Não existe** esse caminho. Existe, em vez disso, `src/app/entregas/[bairro]/page.tsx` — uma implementação **posterior e diferente**, com 19 bairros reais do GBP (Centro, Coliseu, Perobinha, Ouro Verde, etc.) e `generateStaticParams`. Ou seja, o time evoluiu a ideia do documento para uma rota melhor (SSG, lista de bairros real), mas **sob outra URL** (`/entregas/[bairro]`, não `/tags/[slug]`). |

### 4.3 Bugs reais e verificáveis no código atual, decorrentes dessa divergência

1. **Links quebrados em `/tags`**: `src/app/tags/page.tsx` gera `<Link href={\`/tags/${tag...}\`}>` para as 9 tags [tags/page.tsx:26], mas **não existe nenhuma rota em `src/app/tags/[slug]/` ou similar** — confirmado por busca de diretórios (`find src/app/tags -type d` retorna só o diretório-pai). Todo clique nessas 9 tags resulta em **404**.
2. **Links quebrados em `/categorias`**: mesmo padrão — `src/app/categorias/page.tsx` gera `<Link href={\`/categorias/${cat.slug}\`}>` para as 4 categorias [categorias/page.tsx:75], e **não existe `src/app/categorias/[slug]/`**. Todo clique também resulta em **404**. Este bug não está descrito em nenhum dos 3 documentos — é um achado desta análise, não um problema já relatado.
3. **`sitemap.ts` não inclui as 19 rotas estáticas de `/entregas/[bairro]`** que de fato existem e são geradas via `generateStaticParams` — são 19 páginas reais, indexáveis, mas ausentes do sitemap XML enviado ao Google. Esse é exatamente o tipo de "sinal de rastreabilidade" que o Doc 3 buscava maximizar (linha 1: "elevar a autoridade de domínio... dominar as buscas locais"), e o sitemap atual deixa passar a maior parte do inventário real de páginas.
4. **Dois arquivos de configuração do Next.js coexistem**: `next.config.mjs` (com `swcMinify: true` — opção removida/obsoleta desde o Next.js 13, sem efeito no Next 16.2.10 atual) e `next.config.ts` (vazio, apenas placeholder). Nenhum dos documentos analisados menciona a criação de dois arquivos de config. O Next.js só carrega um arquivo de configuração por vez (ordem de precedência interna); ter os dois é um resíduo que pode mascarar qual configuração está realmente ativa — os `headers()` de segurança (HSTS, X-Content-Type-Options) definidos em `next.config.mjs` podem ou não estar em vigor dependendo de qual arquivo o build realmente resolve.
5. **Segredo estático em produção**: confirmado em código real (não apenas no documento) — `src/app/api/seo-audit/route.ts:13` compara contra a string literal `'senha_secreta_tata_2026'`, versionada no Git. Isso é tratado com prioridade no Devil's Advocate abaixo.

---

## 5. Relatório Devil's Advocate — Checkpoint Único (aplicado ao corpus + código)

### Veredito: **REVISE**

### Issues Críticas (bloqueiam confiança no estado "pronto para produção")

1. **Segredo de autorização hardcoded e versionado publicamente**
   - **Tipo**: Segurança / Vulnerabilidade de dados sensíveis
   - **Localização**: `src/app/api/seo-audit/route.ts:13`, também presente nos 3 documentos-fonte
   - **Problema**: a rota `/api/seo-audit?secret=senha_secreta_tata_2026` usa uma constante de string comparada diretamente no código, e não uma variável de ambiente. Qualquer pessoa com acesso de leitura ao repositório (histórico de commits incluso) conhece o segredo permanentemente, mesmo que ele seja trocado no futuro — trocar a string exige novo deploy, e o valor antigo permanece no histórico do Git.
   - **Impacto**: consumo não autorizado da API paga do Apify (`client.actor(...).call(...)` consome créditos), possível exaustão de cota/orçamento.
   - **Recomendação**: mover o segredo para `process.env.SEO_AUDIT_SECRET` (variável de ambiente da Vercel, nunca commitada), e usar comparação de tempo constante (evitar timing attack trivial), ou substituir por autenticação via header + IP allowlist se o uso for só interno.

### Issues Maiores

1. **Rotas dinâmicas quebradas (`/categorias/[slug]` e `/tags/[slug]`)**
   - **Tipo**: Correção / UX / SEO
   - **Localização**: `src/app/categorias/page.tsx`, `src/app/tags/page.tsx`
   - **Problema**: as 13 combinações de links (4 categorias + 9 tags) apontam para páginas inexistentes. Do ponto de vista de SEO — objetivo central de todo o Doc 3 — **um 404 em massa em páginas linkadas internamente é contraproducente**: sinaliza baixa qualidade ao Googlebot e desperdiça o "link equity" interno que a arquitetura de informação (Doc 3, linha 2) pretendia construir.
   - **Recomendação**: criar as rotas faltantes (seguindo o padrão já bem-sucedido de `entregas/[bairro]/page.tsx`, que usa `generateStaticParams`), ou trocar os links para páginas-âncora existentes até as rotas serem criadas.

2. **Dados estruturados (Schema.org) planejados, nunca publicados**
   - **Tipo**: Lacuna de execução (gap entre plano e implementação)
   - **Localização**: `src/app/layout.tsx` (ausência)
   - **Problema**: o documento descreve em detalhe (telefone, horário, geo, cardápio) exatamente os dados que o Google Local Pack usa para exibir rich results — sem o JSON-LD, esse investimento de dados fica só no papel.
   - **Recomendação**: se a decisão de não publicar for intencional (por exemplo, dados desatualizados), documentar isso; caso contrário, portar o bloco `jsonLd` do Doc 3 para o `layout.tsx` atual (adaptando para Server Component, já que o layout atual não é mais o mesmo arquivo-base do documento).

3. **Sitemap incompleto frente ao inventário real de páginas**
   - **Tipo**: SEO / Rastreabilidade
   - **Localização**: `src/app/sitemap.ts`
   - **Problema**: 19 páginas estáticas de bairro (`/entregas/[bairro]`) não aparecem no sitemap.
   - **Recomendação**: gerar as entradas de `/entregas/[bairro]` dinamicamente dentro de `sitemap.ts`, iterando sobre a mesma lista de bairros usada em `generateStaticParams`.

### Issues Menores

- Dois arquivos de configuração do Next.js (`next.config.mjs` + `next.config.ts`) coexistindo — risco de ambiguidade sobre qual está ativo; recomenda-se consolidar em um único arquivo.
- `swcMinify` em `next.config.mjs` é uma opção obsoleta no Next.js 16 (sem efeito prático, mas gera ruído/confusão para quem mantém o projeto).
- Inconsistência de nomenclatura de branch (`master` vs `main`) dentro do próprio Doc 3 — não afeta o código atual (a branch real é `main`), mas indica que o documento é um log de suporte acumulado ao longo do tempo, não uma especificação única e coesa.

### Observações (não são falhas, mas merecem registro)
- A evolução de `/tags/[slug]` (proposta) para `/entregas/[bairro]` (implementada) é, em si, uma melhoria: 19 bairros reais do GBP em vez de 9 tags genéricas, com geração estática de rotas. O "desvio" do plano original não é regressão — é uma iteração melhor que simplesmente não foi refletida de volta nos outros artefatos (`/tags`, `sitemap.ts`).
- A infraestrutura de negócio (diagrama de 3 sistemas: site, engine de leads B2B, motor de mensagens) descrita no Doc 3 está fora do escopo de acesso desta sessão (repositórios não anexados) — não é possível confirmar ou refutar o estado atual de `caseirinhas-engine` e `caseirinhas-wpp` a partir daqui.

### Contra-argumento mais forte contra este relatório
Um leitor cético poderia argumentar que os Docs 1-3 são apenas *logs históricos de suporte* (não uma especificação viva), e que comparar seu conteúdo ao HEAD atual do repositório é injusto — o código pode ter evoluído por decisões posteriores não documentadas nestes 3 arquivos. Esse argumento é parcialmente válido (de fato, `/entregas/[bairro]` é evidência de evolução posterior legítima) — mas **não neutraliza** os achados de `/categorias/[slug]` e `/tags/[slug]` quebrados, nem o segredo hardcoded: esses são bugs comportamentais observáveis agora, independentemente da origem histórica dos documentos.

---

## 6. Síntese Integrada

**Convergência:** os 3 documentos (2 idênticos + 1 composto) descrevem, de forma consistente, um único fio narrativo: (1) um problema de infraestrutura de deploy foi diagnosticado e corrigido; (2) em seguida, uma arquitetura de conteúdo SEO foi planejada e majoritariamente implementada; (3) uma camada adicional de SEO local (dados estruturados + rotas por bairro) foi planejada, mas só parcialmente chegou ao código.

**Divergência/gap central:** existe uma lacuna sistemática entre "documento que planeja" e "código que hoje está em produção" especificamente na camada mais avançada (Schema.org, rotas dinâmicas de tags/categorias). As partes mais simples do plano (páginas estáticas, sitemap básico, rota de API) foram implementadas quase literalmente; as partes que exigiam rotas dinâmicas ou modificação de arquivo compartilhado (`layout.tsx`) ficaram incompletas ou foram substituídas por uma solução paralela não sincronizada com o resto do site (`/entregas` vs `/tags`).

**Lacunas de conhecimento (Knowledge Gaps):**
1. Não é possível confirmar, sem acesso à Vercel, se o domínio está de fato com "Valid Configuration" e se o Framework Preset foi corrigido para Next.js — os documentos descrevem instruções, não confirmação de execução.
2. Não é possível confirmar se `APIFY_API_TOKEN` está configurado como variável de ambiente na Vercel (o código depende disso silenciosamente falhando para o literal `'<YOUR_API_TOKEN>'` caso não esteja).
3. O estado de `caseirinhas-engine` e `caseirinhas-wpp` está fora do escopo verificável desta sessão.

---

## 7. Perguntas Socráticas para Reflexão (sem respostas diretas)

Seguindo o princípio do `socratic_mentor_agent` de nunca entregar conclusões prontas quando a decisão é do responsável pelo produto, ficam registradas — não respondidas — três perguntas que a análise expõe:

1. A rota `/entregas/[bairro]` foi uma evolução deliberada da ideia de `/tags/[slug]`, ou um esquecimento de que `/tags` continuaria linkando para algo que nunca existiu? A resposta muda se a correção certa é "criar `/tags/[slug]`" ou "aposentar os links de `/tags` em favor de `/entregas`".
2. Qual o critério real de "pronto" para este projeto — os documentos descrevem instruções passo a passo para o operador humano executar manualmente na Vercel; sem uma confirmação de execução, como saber quais dessas instruções foram, de fato, aplicadas fora do código (domínio, framework preset, variável de ambiente)?
3. O segredo hardcoded da rota de auditoria foi um atalho consciente ("é só para uso interno, tudo bem") ou um descuido que sobreviveu porque a rota nunca foi de fato usada em produção? A resposta determina a urgência da correção.

---

## 8. Limitações desta Análise

- Restrita aos 3 arquivos efetivamente anexados (2 idênticos); os 2 nomes de documento citados no corpo da tarefa mas não anexados (`categorias-seo-page..txt` e a segunda menção ao mapa do site) não puderam ser analisados.
- Verificação cruzada limitada ao repositório `caseirinhas-tata-next`; os repositórios `caseirinhas-engine` e `caseirinhas-wpp` mencionados no Doc 3 não foram inspecionados (fora do escopo de acesso desta sessão).
- Não houve acesso ao painel da Vercel nem ao Google Business Profile reais — toda a seção de "instruções para executar na Vercel/GBP" foi tratada como plano documentado, não como fato confirmado em produção.
- Este é um documento de análise (memorização + extração + síntese + crítica), não uma tarefa de implementação — nenhuma alteração de código foi feita; as recomendações do §5 aguardam confirmação explícita antes de qualquer execução.

---

*Relatório gerado para a tarefa TAREFA-ANALISE-01, seguindo estrutura adaptada do skill deep-research fornecido como padrão de referência pelo usuário.*
