# Estratégia de Facebook & Instagram Ads — Caseirinhas da Tatá

**Objetivo do negócio:** aumentar o volume diário de clientes novos nas regiões de menor poder aquisitivo de Londrina, ao menor custo de aquisição possível, usando como isca a entrada no grupo de WhatsApp com promoções exclusivas (tática já validada organicamente no grupo atual).

---

## 1. Dados-base da campanha

| Item | Valor |
|---|---|
| Endereço | R. Maria Sinopoli Francovig, 1142 - Conj. Semíramis Barros Braga, Londrina - PR, 86088-080 |
| Telefone / WhatsApp pedidos | (43) 99674-9607 — `https://wa.me/5543996749607` |
| Site | `https://caseirinhasdatata.shop` |
| Facebook | `https://www.facebook.com/profile.php?id=61589396367560` |
| Instagram | `https://www.instagram.com/caseirinhasdatata` |
| Grupo WhatsApp (isca atual) | `https://chat.whatsapp.com/Jb1zGlNNCR11iObZS6oNxk` |
| Produto | Marmitex (marmitas caseiras), almoço |
| Horário de funcionamento | Seg. a Dom., 11:00–14:30 |
| Ticket médio | R$ 20–28 |
| Público-alvo | Classes C/D, bairros de menor renda da Zona Norte, Leste e polos da cidade |

O site já tem 20 landing pages locais (`/entregas/[bairro]`) com CTA de WhatsApp, uma delas (Gleba Palhano) estava **ausente do dicionário de bairros** em `src/lib/site-data.ts` — corrigido neste mesmo commit, pois um anúncio pago apontando para uma página de bairro que cai em "não encontrado" desperdiça verba.

---

## 2. Plano de lançamento confirmado (Semana 1)

Decisões já tomadas com a Tatá para a primeira semana de campanha:

| Decisão | Valor confirmado |
|---|---|
| Orçamento diário | **R$ 10 a R$ 15/dia** (abaixo da faixa de teste inicial sugerida — ver ajuste na seção 4) |
| Foco geográfico inicial | **Só o cluster Cinco Conjuntos / Zona Norte** (maior densidade de bairros atendidos) |
| Business Manager | Conta existe, mas **vínculo da Página e do Instagram não confirmado** |
| Pixel da Meta | **Ainda não existe** — precisa ser criado do zero |

**Ajuste do plano por causa do orçamento menor:** com R$ 10–15/dia, **não faz sentido dividir em vários conjuntos de anúncios** — toda a verba deve ir para **1 campanha, 1 conjunto de anúncios**, mirando só o cluster Cinco Conjuntos/Zona Norte (raio de 5–6 km a partir do endereço-base). Isso concentra o volume necessário para o conjunto sair da fase de aprendizado mais rápido. Os outros 3 clusters (Centro/Gleba Palhano, Alpes, Leste) ficam para uma segunda fase, quando o orçamento aumentar ou quando o cluster inicial mostrar custo por conversa estável.

### Checklist antes de subir a campanha

**1. Confirmar vínculo Página + Instagram no Business Manager:**
1. Acessar `business.facebook.com` → **Configurações do Negócio** → **Contas** → **Páginas**. Confirmar que "Caseirinhas da Tatá" aparece lá.
2. Em **Contas** → **Contas do Instagram**, confirmar se `@caseirinhasdatata` aparece vinculada a esse Business Manager.
3. Se o Instagram não aparecer: abrir a Página do Facebook → **Configurações** → **Contas vinculadas** → **Instagram** → conectar por lá, ou adicionar diretamente pelo Business Manager.
4. Confirmar que a **Conta de Anúncios** ativa está no mesmo Business Manager e tem a Página disponível para uso em anúncios (sem isso, o formato Clique-para-WhatsApp não fica disponível na criação do anúncio).

**2. Criar o Pixel da Meta (ainda não existe):**
1. Acessar o **Gerenciador de Eventos** (`business.facebook.com/events_manager2`) → **Conectar fontes de dados** → **Web** → **Pixel da Meta**.
2. Dar um nome (ex.: "Pixel Caseirinhas da Tatá") e informar a URL do site (`https://caseirinhasdatata.shop`).
3. Quando a Meta oferecer opções de instalação (parceiro, Gerenciador de Tags do Google, código manual), escolher **"Adicionar código manualmente"** — o site é Next.js e a instalação será feita direto no código.
4. Copiar o **Pixel ID** gerado (um número, ex.: `1234567890123456`) e repassar para instalação no `layout.tsx` (ver seção 7).

### 2.1 Auditoria da conta de anúncios (confirmado via prints do Business Manager em 13/08/2026)

Analisando os prints de `business.facebook.com` → **Configurações de pagamento**:

| Campo | Valor visto na conta | Leitura |
|---|---|---|
| Saldo disponível | **R$ 89,99** | Praticamente intacto — confirma que **nenhuma campanha rodou de fato ainda** (só R$ 0,01 de diferença do depósito, provavelmente arredondamento interno da Meta, não gasto real) |
| Forma de pagamento | **Saldo disponível (pré-pago)** — nenhum cartão cadastrado | Bom para controle de orçamento: a Meta debita do saldo 1x/dia; **sem saldo, os anúncios pausam sozinhos** — não há risco de cobrança além do que for depositado manualmente |
| Limite de gastos diário definido pela Meta | R$ 186,09 | É um teto de segurança automático da plataforma, **não é o orçamento da campanha**. Não conflita com o plano de R$ 10–15/dia — só entraria em jogo se algum dia o orçamento diário configurado ultrapassasse esse valor |
| Última atividade de pagamento | 05/mai/2026, pagamento manual, **R$ 90,00**, status "Com fundos" | Único depósito feito até agora; é esse saldo que vai cobrir a Semana 1 |
| Nome da empresa | Caseirinhas da Tatá | Confere |
| Moeda | Real brasileiro (BRL) | Correto |
| Identificação fiscal | `11045046930` (11 dígitos) | Formato de **CPF**, não CNPJ (14 dígitos) — a conta está registrada como pessoa física. Não bloqueia a veiculação de anúncios, mas vale confirmar se é intencional (negócio informal/MEI) ou se deveria ser o CNPJ da empresa, por causa de nota fiscal/comprovante de despesa |

**Dois pontos que precisam de confirmação/correção antes de subir a campanha:**

1. **Endereço cadastrado nas Informações Comerciais está incompleto e com erro de digitação:**
   - Cadastrado: `Maria Signopoli Francovig, 86088080 Londrina, Brasil`
   - Correto (informado pela Tatá): `R. Maria Sinopoli Francovig, 1142 - Conj. Semíramis Barros Braga, Londrina - PR, 86088-080`
   - Diferenças: "**Signopoli**" em vez de "**Sinopoli**", falta o número (**1142**) e o complemento (**Conj. Semíramis Barros Braga**). Recomendo corrigir em **Configurações do Negócio → Informações comerciais → Editar**, principalmente se em algum momento for necessário verificar o negócio (Meta Business Verification) ou emitir comprovante de pagamento.

2. **Duas URLs diferentes de Página do Facebook apareceram em momentos diferentes desta conversa — precisa esclarecer qual é a certa:**

   | URL informada | Quando | Nome da Página (confirmado por consulta pública) |
   |---|---|---|
   | `facebook.com/profile.php?id=61589396367560` | Na primeira mensagem desta tarefa | "Caseirinhas Da Tata" |
   | `facebook.com/profile.php?id=61585142010817` | Nesta mensagem | "Caseirinhas da Tatá \| Londrina PR" |

   São **duas Páginas do Facebook distintas**, com nomes ligeiramente diferentes — não é a mesma Página com URLs diferentes. Antes de configurar o anúncio de Clique-para-WhatsApp é indispensável confirmar **qual das duas está de fato vinculada a este Business Manager/conta de anúncios** (a outra pode ser uma Página antiga, duplicada, ou criada por engano). Ver pergunta de esclarecimento enviada junto com esta atualização.

---

## 3. Funil recomendado: Click-to-WhatsApp, não link direto de grupo

**Não usar o link do grupo (`chat.whatsapp.com/...`) como destino direto do anúncio.** Três motivos práticos:

1. O Gerenciador de Anúncios da Meta tem um objetivo nativo para isso — **"Cadastros" / "Mensagens"** via anúncios *Clique para o WhatsApp* — que abre uma conversa direto com o número comercial, sem sair do app. Isso reduz etapas de fricção (cada etapa a mais derruba a taxa de conversão e sobe o CPL).
2. Um link de convite de grupo é um recurso que a Meta e o próprio WhatsApp podem limitar ou invalidar sem aviso (grupos têm teto de 1024 membros, e o link expira se for redefinido) — um anúncio ativo apontando pra um link morto queima orçamento sem ninguém perceber até tarde.
3. Abrir a conversa direto com o número comercial gera uma lista de contatos que **pode ser reaproveitada** (retargeting, campanhas futuras, integração com o motor de mensagens já existente no ecossistema do negócio) — o grupo sozinho não dá isso.

**Funil proposto:**

```
Anúncio (Feed/Reels/Stories)
   │  CTA: "Enviar mensagem"
   ▼
WhatsApp abre com mensagem pré-preenchida
   (ex.: "Oi! Vi o anúncio e quero entrar no grupo de promoções 🎁")
   ▼
Resposta automática/manual envia o link do grupo
   + pergunta o bairro (todos os 20 links de /entregas/[bairro]
     já existem para confirmar área de entrega)
   ▼
Cliente entra no grupo → recebe promoção de boas-vindas
   ▼
Primeiro pedido no mesmo dia (janela 11h–14h30)
```

A promoção de boas-vindas do grupo (`🎁 Concorra a Marmitas Grátis!`) já existe na home (`src/app/page.tsx`) — reaproveitar o mesmo gancho nos criativos do anúncio mantém consistência de mensagem entre anúncio → clique → grupo.

---

## 4. Estrutura da campanha no Gerenciador de Anúncios

- **Objetivo:** Cadastros (Leads) → formato "Anúncios que geram cliques para o WhatsApp".
- **Orçamento:** com R$ 10–15/dia (decisão da Semana 1), definir orçamento **direto no único conjunto de anúncios** — não há necessidade de Advantage+ Campaign Budget (CBO) enquanto houver só 1 conjunto ativo. O CBO passa a fazer sentido só na Fase 2, quando mais de um cluster estiver rodando ao mesmo tempo.
- **Lance:** custo mais baixo (sem teto de custo) — com orçamento pequeno, um teto de custo trava a entrega e prolonga a fase de aprendizado.
- **Semana 1 — 1 único conjunto de anúncios**, mirando o cluster Cinco Conjuntos/Zona Norte:

  | Cluster | Bairros | Raio sugerido | Fase |
  |---|---|---|---|
  | **Cinco Conjuntos / Zona Norte** | Cinco Conjuntos, Milton Gavetti, Vivi Xavier, Carnascialli, Heimtal, Conj. João Paz, Parigot 1/2/3, Maria Celina, Novo Amparo, Ouro Verde, Perobinha, Vista Bela, Coliseu | 5–6 km a partir do endereço-base (é a região onde a empresa fica — maior densidade) | **Semana 1 (ativo agora)** |
  | Centro/Gleba Palhano | Centro, Gleba Palhano | 3–4 km | Fase 2 |
  | Alpes | Alpes, Jardim dos Alpes I, Jardim dos Alpes II | 3–4 km | Fase 2 |
  | Leste | Conjunto Alexandre Urbanas | 3–4 km | Fase 2 |

  Os outros 3 clusters só devem virar conjuntos de anúncios novos quando: (a) o orçamento diário subir, ou (b) o cluster Cinco Conjuntos/Zona Norte já tiver um custo por conversa estável por pelo menos 1 semana. Isso conserva a granularidade dos links por bairro para o **site/SEO local** (cada `/entregas/[bairro]` continua indexável e serve de página de pouso para tráfego orgânico), mas evita fragmentar um orçamento pequeno em públicos demais.

- **Segmentação:** endereço + raio (acima), idade 22–55, sem restrição de interesse — deixar o público **amplo** e Advantage+ Audience ligado. Para o público de menor renda, segmentação por interesse tende a encarecer o CPM sem ganho de precisão; localização é o filtro que importa aqui.
- **Posicionamentos:** Advantage+ (automático) — o algoritmo tende a priorizar Reels/Stories, que historicamente têm CPM mais barato que Feed para este tipo de público.
- **Programação de anúncios (dayparting):** só é possível fora do Advantage+ Campaign Budget (exige orçamento por conjunto + lance manual). Se o orçamento total for pequeno, o ganho do CBO automático costuma compensar mais do que restringir horário. Se optar por restringir, concentrar a veiculação entre **9h e 13h**, para capturar a decisão de almoço do mesmo dia.

---

## 5. Orçamento e controle de custo

- **Fase de teste (primeiros 7 dias):** R$ 10–15/dia, **todo concentrado no único conjunto** (Cinco Conjuntos/Zona Norte) — sem alterar orçamento ou segmentação nesse período (qualquer edição de orçamento acima de ~20% reinicia a fase de aprendizado). Com essa verba, o volume de resultados/semana é baixo — por isso é ainda mais importante não fragmentar em vários conjuntos nem trocar a segmentação no meio da semana.
- **Depois dos 7 dias:** se o custo por conversa estiver estável e dentro do ticket médio (R$ 20–28), decidir entre (a) aumentar o orçamento do mesmo conjunto em incrementos de até 20%, ou (b) abrir um segundo conjunto para o próximo cluster prioritário (Centro/Gleba Palhano), mantendo o primeiro rodando.
- **2–3 criativos no conjunto** (menos que os 3–4 sugeridos originalmente, pois orçamento baixo dilui a entrega se houver criativos demais competindo entre si) — trocar o que tiver frequência alta (>3) ou CTR caindo.
- **Regra prática de decisão:** comparar sempre **custo por conversa iniciada no WhatsApp**, não CPM nem CTR isoladamente — é a métrica mais próxima do resultado real (entrada no grupo → pedido).

---

## 6. Criativos e copy

Recursos já existentes no site (`public/cardapio/`) podem ser reaproveitados direto nos anúncios — fotos e vídeos verticais dos pratos por dia da semana (segunda a domingo, incluindo os 3 vídeos das opções de domingo).

**Ganchos de copy (variar entre os 3–4 criativos ativos):**

1. **Isca do grupo (prioridade):**
   > 🎁 Entra no nosso grupo de ofertas e garanta desconto na sua marmita de hoje! Só R$ 20 a partir de hoje pra quem entrar. Chama no WhatsApp 👇

2. **Prova social / prato do dia:**
   > Hoje tem [prato do dia, ex.: Bife Acebolado com Sobrecoxa Assada] fresquinho, R$ 25. Entrega rápida em [bairro/região]. Chama no zap!

3. **Urgência de horário (reforça pedido no mesmo dia, já que o negócio só funciona 11h–14h30):**
   > Só até as 14h30! Marmita caseira quentinha, R$ 20 a R$ 28, entrega rápida na sua região. Peça agora.

**Formato:** priorizar vídeo vertical curto (Reels/Stories, 9:16) com o prato pronto — os `.mp4` já existentes por dia da semana em `public/cardapio/` são o material primário. Foto como formato secundário (feed).

---

## 7. Retargeting e mensuração (Pixel a ser criado — ver checklist da seção 2)

O site **não tem nenhum pixel de rastreamento da Meta instalado** hoje (`src/app/layout.tsx` não contém script de Pixel/Conversions API), e a conta de anúncios ainda não tem um Pixel criado. Isso limita a otimização de campanha de duas formas:

1. A Meta não consegue otimizar entrega com base em quem de fato visitou o site vindo do anúncio.
2. Não é possível criar públicos de remarketing ("quem visitou `/cardapio` mas não converteu", "quem visitou páginas de bairro específicas") nem públicos semelhantes (lookalike) a partir da base de clientes.

**Próximo passo (fora deste commit — depende do `Pixel ID`, que só existe depois do passo 2 do checklist na seção 2):** assim que o Pixel for criado no Gerenciador de Eventos e o `Pixel ID` for informado, instalar via `next/script` no `layout.tsx`, disparando `PageView` em todas as páginas e um evento `Lead` nos cliques dos botões de WhatsApp (`BotaoWhatsApp` e os CTAs de `page.tsx`/`entregas/[bairro]/page.tsx`). Isso é o pré-requisito técnico para: (a) otimização de entrega orientada a conversão real, não só a cliques, e (b) criar público semelhante (lookalike) a partir de quem já conversa no WhatsApp/grupo — o público mais barato de escalar depois da fase de teste. Não é bloqueante para subir a campanha da Semana 1, mas quanto antes for instalado, mais rápido a Meta acumula dados de conversão.

---

## 8. Cronograma de acompanhamento

| Frequência | Ação |
|---|---|
| Diária (primeiros 7 dias) | Checar se orçamento está sendo gasto e se as conversas estão chegando; não editar nada |
| A cada 3–4 dias | Acompanhar o custo por conversa iniciada no conjunto ativo |
| Semanal | Decidir entre aumentar orçamento ou abrir o próximo cluster (Fase 2); trocar criativos com frequência alta |
| Quinzenal | Revisar oferta do grupo (a promoção de entrada precisa girar para não perder força) |

---

## 9. Resumo executivo

- **Não** usar o link do grupo como destino direto do anúncio — usar anúncios de Clique para o WhatsApp com o número comercial.
- **Semana 1 confirmada:** R$ 10–15/dia, **1 único conjunto de anúncios**, focado no cluster Cinco Conjuntos/Zona Norte. Os outros 3 clusters (Centro/Gleba Palhano, Alpes, Leste) ficam para a Fase 2.
- Antes de subir a campanha: confirmar no Business Manager que a Página e o Instagram estão vinculados corretamente (checklist na seção 2).
- Criar o Pixel da Meta no Gerenciador de Eventos (ainda não existe) — não bloqueia a Semana 1, mas quanto antes instalado no site, melhor a otimização futura.
- Reaproveitar as fotos/vídeos do cardápio semanal já existentes em `public/cardapio/` como criativo.
- Métrica de decisão: **custo por conversa iniciada no WhatsApp**, revisado a cada 3–4 dias.
