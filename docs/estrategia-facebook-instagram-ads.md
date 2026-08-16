# Estratégia de Facebook & Instagram Ads — Caseirinhas da Tatá

**Objetivo do negócio:** aumentar o volume diário de clientes novos nas regiões de menor poder aquisitivo de Londrina, ao menor custo de aquisição possível, usando como isca a entrada no grupo de WhatsApp com promoções exclusivas (tática já validada organicamente no grupo atual).

---

## 1. Dados-base da campanha

| Item | Valor |
|---|---|
| Endereço | R. Maria Sinopoli Francovig, 1142 - Conj. Semíramis Barros Braga, Londrina - PR, 86088-080 |
| Telefone / WhatsApp pedidos | (43) 99674-9607 — `https://wa.me/5543996749607` |
| Site | `https://caseirinhasdatata.shop` |
| Facebook (Página oficial dos anúncios) | `https://www.facebook.com/profile.php?id=61585142010817` — "Caseirinhas da Tatá \| Londrina PR" (confirmado em 13/08/2026 como a Página exibida no Painel Profissional vinculado à conta de anúncios) |
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
| Business Manager | Conta existe. **Página confirmada:** "Caseirinhas da Tatá \| Londrina PR" (id 61585142010817) — ver auditoria completa na seção 2.1. **Vínculo do Instagram ainda não confirmado** |
| Pixel da Meta | **Ainda não existe** — precisa ser criado do zero |

**Ajuste do plano por causa do orçamento menor:** com R$ 10–15/dia, **não faz sentido dividir em vários conjuntos de anúncios** — toda a verba deve ir para **1 campanha, 1 conjunto de anúncios**, mirando só o cluster Cinco Conjuntos/Zona Norte (raio de 5–6 km a partir do endereço-base). Isso concentra o volume necessário para o conjunto sair da fase de aprendizado mais rápido. Os outros 3 clusters (Centro/Gleba Palhano, Alpes, Leste) ficam para uma segunda fase, quando o orçamento aumentar ou quando o cluster inicial mostrar custo por conversa estável.

### Checklist antes de subir a campanha

**1. Confirmar vínculo Página + Instagram + saldo, todos apontando para a Página correta (id 61585142010817):**

1. ✅ **Feito** — confirmado em Contas → Páginas: a Página oficial dos anúncios é "Caseirinhas da Tatá \| Londrina PR" (id 61585142010817).

2. **Confirmar que o saldo (R$ 89,99) está na Conta de Anúncios que tem acesso a essa Página** — o saldo pertence à **Conta de Anúncios**, não à Página diretamente, então o que precisa ser garantido é que a Conta de Anúncios com esse saldo tem a Página id 61585142010817 atribuída como ativo utilizável:
   - `business.facebook.com` → **Configurações do Negócio** → **Contas** → **Contas de anúncios**. Confirmar o nome/ID da conta de anúncios (a mesma que aparece na tela de "Saldo disponível" dos prints anteriores).
   - Clicar nessa Conta de Anúncios → aba **Páginas** (ou "Ativos atribuídos") → conferir se "Caseirinhas da Tatá \| Londrina PR" (id 61585142010817) aparece com permissão de **Anunciar/Advertise**.
   - Confirmação cruzada: abrir a Página id 61585142010817 → **Configurações do Negócio** → **Contas** → **Páginas** → clicar nela → aba **Contas de anúncios** → a mesma Conta de Anúncios do saldo deve aparecer listada ali.
   - Se a Conta de Anúncios do saldo **não** tiver essa Página atribuída, é preciso atribuir manualmente nessa mesma tela ("Atribuir contas de anúncios" → selecionar a conta → conceder acesso de "Anunciar") antes de criar a campanha — senão a Página não vai aparecer como opção na hora de montar o anúncio.

3. **Confirmar a conta do Instagram vinculada** — a conta informada é `https://www.instagram.com/caseirinhasdatata` (usuário `@caseirinhasdatata`):
   - `business.facebook.com` → **Configurações do Negócio** → **Contas** → **Contas do Instagram**. Verificar se `@caseirinhasdatata` aparece na lista.
   - Clicar em `@caseirinhasdatata` → conferir em **"Página conectada"** se ela está associada à Página id 61585142010817 (e não à outra Página, id 61589396367560) — uma conta do Instagram só pode estar conectada oficialmente a uma Página do Facebook por vez.
   - Na mesma tela, em **"Contas de anúncios com acesso"**, confirmar que a Conta de Anúncios com o saldo de R$ 89,99 está listada com permissão de uso — sem isso, os anúncios não conseguem veicular usando o perfil `@caseirinhasdatata` (a Meta usaria um perfil genérico do Facebook no lugar, o que é ruim para quem clica ver o Instagram real da Tatá).
   - Se `@caseirinhasdatata` **não** aparecer na lista: abrir o app do Instagram → Perfil → **Configurações** → **Contas** → **Compartilhamento em outros apps/Contas conectadas** → **Facebook**, e conectar a essa Página especificamente (id 61585142010817). Depois repetir o passo acima para conceder acesso à Conta de Anúncios.

4. **Atalho para verificar tudo de uma vez, direto na criação do anúncio:** no Gerenciador de Anúncios, iniciar a criação de um anúncio (sem publicar) até a etapa **"Identidade"** — ali a Meta mostra exatamente qual Página e qual conta do Instagram estão disponíveis para essa Conta de Anúncios. Se `@caseirinhasdatata` não aparecer como opção nessa etapa, é sinal de que o vínculo (passo 3) ainda não está correto.

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

2. **Duas Páginas do Facebook distintas existem — RESOLVIDO em 13/08/2026:**

   | URL | Nome da Página | Papel |
   |---|---|---|
   | `facebook.com/profile.php?id=61585142010817` | "Caseirinhas da Tatá \| Londrina PR" | ✅ **Página oficial para os anúncios** — confirmado como a Página exibida no Painel Profissional vinculado à conta de anúncios |
   | `facebook.com/profile.php?id=61589396367560` | "Caseirinhas Da Tata" | Também aparece em Contas → Páginas do Business Manager, mas **não é a usada nos anúncios** — decisão sobre mesclar ou despublicar essa Página fica pendente, sem urgência (não bloqueia a campanha) |

   Ambas apareceram em **Configurações do Negócio → Contas → Páginas**, ou seja, tecnicamente as duas estão vinculadas a este Business Manager e poderiam ser selecionadas na criação do anúncio — por isso a confirmação de qual é a "oficial" era necessária antes de montar a campanha, para não escolher a errada por engano na hora de configurar o Clique-para-WhatsApp.

   **Pendência não-bloqueante para depois:** como as duas Páginas continuam ativas e vinculadas, decidir em algum momento se vale mesclar (Configurações da Página → Geral → "Solicitar mesclagem de Páginas", se os critérios do Facebook permitirem) ou despublicar a "Caseirinhas Da Tata" (id 61589396367560), para não dividir avaliações/seguidores entre as duas. Enquanto isso não for feito, manter todos os links públicos (site, Instagram, Google Business Profile) apontando só para a Página oficial (id 61585142010817).

### 2.2 Auditoria de Usuários, Parceiros e Ativos — `business_id=1839641340307117` (relatada em 13/08/2026)

**⚠️ Achado crítico ainda não resolvido:** apareceram **dois IDs de Business Manager diferentes** nesta conversa:

| Contexto | `business_id` |
|---|---|
| Tela de confirmação de telefone (sessão anterior) | `566690120345061` |
| Tela de Usuários/Ativos (esta sessão) | `1839641340307117` |

Isso pode ser (a) o mesmo Business Manager acessado por rotas diferentes com um parâmetro secundário confuso, ou (b) **dois Business Managers realmente distintos** — o que seria grave, porque a Conta de Anúncios com o saldo de R$ 89,99 e a Página oficial (id 61585142010817) precisam estar **no mesmo Business Manager** (ou compartilhadas via parceiro) para serem usadas juntas numa campanha. Enquanto isso não for confirmado, não dá para garantir que o saldo relatado está de fato disponível para os ativos descritos abaixo.

**Resumo do que foi reportado em `business_id=1839641340307117`:**

| Categoria | Detalhe |
|---|---|
| Usuário (Pessoas) | "caseirinhasdatata restaurante" — Acesso total ("Tudo"), atribuído à conta do Instagram `@caseirinhasdatata` |
| Parceiros | 2 parceiros; 1 detalhado, nome exibido como **"unknown"**, Identificação `2805008196564390` |
| Catálogo | "WhatsApp Product Catalog" — Acesso total |
| Conta do Instagram | `@caseirinhasdatata`, Identificação `17841477428364093`, propriedade de "caseirinhasdatata" — ✅ confirma que a conta profissional do Instagram existe como ativo dentro deste portfólio |
| Conta de WhatsApp (WABA) | **"Caseirinhas Da Tata"** (sem acento — mesmo nome da Página duplicada, id 61589396367560, não da Página oficial dos anúncios), Identificação `1348408177111724`, propriedade de "caseirinhasdatata", tipo "Aplicativo WhatsApp Business" |
| Perfil ativo no navegador | Instagram `@caseirinhasdatata` |
| Outros perfis salvos no navegador | Facebook "Bentt Gau"; Instagram `@gaulsamuyenga` (perfis pessoais de quem está operando a conta, não do negócio) |

**Pontos que precisam de decisão/confirmação da Tatá antes de prosseguir — não vou presumir a resposta:**

1. **Parceiro "unknown" (id `2805008196564390`) com acesso total ao catálogo do WhatsApp — investigado, achado: provável acesso órfão.** Abrindo os detalhes do parceiro dentro do Business Manager, tanto o campo **Nome** quanto **Detalhes** aparecem literalmente como "unknown", sem nenhum app associado, sem data de concessão visível — e o único ativo compartilhado é o "WhatsApp Product Catalog" (Acesso total). Quando a Meta não consegue resolver nem o nome do parceiro, o padrão mais comum é que o **Business Manager de origem desse parceiro foi excluído, desativado ou banido** depois que o acesso foi concedido — ou seja, não existe mais um dono identificável do outro lado para perguntar "é seu?". **Leitura de risco:** esse parceiro não tem acesso à Página, à Conta de Anúncios nem ao saldo — só ao catálogo de produtos do WhatsApp — então não é um risco financeiro direto para as campanhas, mas é uma permissão órfã (sem dono verificável) que fica sem função. **Recomendação:** revogar esse acesso (Ativos atribuídos → Catálogo → remover parceiro) por higiene, já que não há como confirmar legitimidade nem uso ativo. Decisão final é da Tatá — não vou revogar por conta própria.
2. **A Conta de WhatsApp (WABA) chama "Caseirinhas Da Tata"** — mesmo nome da Página *não*-oficial. Preciso saber **qual número de telefone está por trás dessa WABA**: se é o `(43) 99674-9607` (número real de pedidos) ou outro número — isso define se essa é a conta que deve ser usada como destino dos anúncios de Clique-para-WhatsApp.
3. **Confirmar se `business_id=1839641340307117` é o mesmo Business Manager onde está o saldo de R$ 89,99 e a Página id 61585142010817 — ainda em aberto.** A Tatá tentou localizar a Conta de Anúncios com o saldo dentro deste Business Manager e não conseguiu, o que é um indício (não uma confirmação) de que a conta com saldo pode estar em outro Business Manager, possivelmente o `566690120345061` visto na etapa de confirmação de telefone. Passos para achar de forma definitiva, na seção "Como localizar a Conta de Anúncios com o saldo" logo abaixo.

### Como localizar a Conta de Anúncios com o saldo (quando ela não aparece em Contas de anúncios do Business Manager atual)

1. **Caminho mais direto — Gerenciador de Anúncios:** acessar `business.facebook.com/adsmanager` (ou `adsmanager.facebook.com`) diretamente, sem passar pelas Configurações do Negócio. No canto superior esquerdo, clicar no **seletor de conta** (mostra o nome da conta de anúncios atual com uma seta para baixo). Esse seletor lista **todas as Contas de Anúncios que o seu login pessoal tem acesso**, mesmo que estejam espalhadas em Business Managers diferentes — geralmente cada conta aparece com um nome/ID e, ao lado, o nome do Business Manager "dono" dela. Procurar ali por qualquer conta com saldo R$ 89,99 (clicar em cada uma → "Configurações" → "Faturamento" mostra o saldo).
2. **Caminho alternativo — reabrir a tela de pagamento original:** voltar exatamente para a tela onde apareceu "Saldo disponível R$ 89,99" (a mesma dos prints anteriores) e copiar a **URL completa** da barra de endereço nesse momento — ela deve conter um `business_id=` e, possivelmente, um `act=` (o "act_" seguido de números é o ID direto da conta de anúncios, o identificador mais confiável). Enviar essa URL aqui resolve a dúvida sem depender de navegar por menus.
3. Depois de achar essa conta, checar se ela é a mesma listada em `business_id=1839641340307117` → Contas de anúncios, ou se pertence a um Business Manager diferente — se for diferente, o próximo passo é **compartilhar a Página (id 61585142010817) e a conta do Instagram com essa Conta de Anúncios** (via "Atribuir ativos" na própria Conta de Anúncios), em vez de tentar mover o saldo — saldo pré-pago fica preso à Conta de Anúncios onde foi depositado, não é algo que se transfere entre contas.

---

## 2.3 Estrutura de grupos de promoção por região (a serem criados)

Decisão confirmada: em vez de manter só o grupo único atual (`chat.whatsapp.com/Jb1zGlNNCR11iObZS6oNxk`), a Tatá quer **grupos novos organizados por região**, seguindo a mesma lista de bairros/links já usada nos clusters de anúncio (seção 4) — o que é a escolha certa, porque mantém 1:1 a relação entre "de onde vem o anúncio" e "para qual grupo a pessoa é convidada".

**Para não fragmentar demais** (20 bairros ≠ 20 grupos administráveis por uma única pessoa), a estrutura reaproveita os **mesmos 4 clusters geográficos já definidos para os anúncios** — 1 grupo por cluster, não por bairro individual:

| Cluster (grupo) | Bairros incluídos | Prioridade de criação |
|---|---|---|
| **Caseirinhas da Tatá — Promoções Cinco Conjuntos/Zona Norte** | Cinco Conjuntos, Milton Gavetti, Vivi Xavier, Carnascialli, Heimtal, Conj. Hab. João Paz, Parigot de Souza 1/2/3, Maria Celina, Novo Amparo, Ouro Verde, Perobinha, Vista Bela, Coliseu | 🔴 **Urgente — é o cluster da campanha da Semana 1** |
| Caseirinhas da Tatá — Promoções Centro/Gleba Palhano | Centro, Gleba Palhano | 🟡 Fase 2 |
| Caseirinhas da Tatá — Promoções Alpes | Alpes, Jardim dos Alpes I, Jardim dos Alpes II | 🟡 Fase 2 |
| Caseirinhas da Tatá — Promoções Leste | Conjunto Alexandre Urbanas | 🟡 Fase 2 |

Cada bairro mantém seu link individual de aterrissagem (`/entregas/[bairro]`, tabela completa na seção 4) — o grupo é que é compartilhado entre os bairros do mesmo cluster.

### Passo a passo para criar cada grupo (WhatsApp)

1. Abrir o WhatsApp do número oficial `(43) 99674-9607` → **Novo grupo**.
2. Nome: `Caseirinhas da Tatá — Promoções [Nome do Cluster]` (ex.: "Promoções Cinco Conjuntos/Zona Norte").
3. Foto do grupo: usar a logomarca já existente no site (`logo-caseirinhas-da-tata.jpg` ou `emblema-caseirinhas-da-tata.png`, em `public/`).
4. Descrição do grupo: explicar que é um canal de ofertas exclusivas, com o horário de funcionamento (Seg. a Dom., 11h–14h30).
5. Em **Configurações do grupo → Enviar mensagens**, considerar restringir só para admins — mantém o grupo como canal de ofertas (broadcast), evita spam entre os próprios clientes e reduz trabalho de moderação.
6. Gerar o link de convite em **Configurações do grupo → Convidar via link de convite do grupo** → copiar.
7. Repetir para os demais clusters, na ordem de prioridade da tabela acima (o cluster Cinco Conjuntos/Zona Norte primeiro, os outros 3 só quando a Fase 2 começar).

**Depois de criados:** enviar os links aqui. Assim que eu tiver o link do cluster Cinco Conjuntos/Zona Norte, eu: (a) atualizo o CTA de grupo na home (`src/app/page.tsx`, hoje aponta para o grupo único genérico) para direcionar por região, e (b) ajusto o funil da seção 3 deste documento para descrever o encaminhamento correto por cluster em vez de um único grupo genérico.

---

## 3. Funil recomendado: Click-to-WhatsApp, não link direto de grupo

**Não usar o link do grupo (`chat.whatsapp.com/...`) como destino direto do anúncio.** Três motivos práticos:

1. O Gerenciador de Anúncios da Meta tem um objetivo nativo para isso — **"Cadastros" / "Mensagens"** via anúncios *Clique para o WhatsApp* — que abre uma conversa direto com o número comercial, sem sair do app. Isso reduz etapas de fricção (cada etapa a mais derruba a taxa de conversão e sobe o CPL).
2. Um link de convite de grupo é um recurso que a Meta e o próprio WhatsApp podem limitar ou invalidar sem aviso (grupos têm teto de 1024 membros, e o link expira se for redefinido) — um anúncio ativo apontando pra um link morto queima orçamento sem ninguém perceber até tarde.
3. Abrir a conversa direto com o número comercial gera uma lista de contatos que **pode ser reaproveitada** (retargeting, campanhas futuras, integração com o motor de mensagens já existente no ecossistema do negócio) — o grupo sozinho não dá isso.

**Funil proposto (atualizado para grupos por região — ver seção 2.3):**

```
Anúncio do cluster Cinco Conjuntos/Zona Norte (Feed/Reels/Stories)
   │  CTA: "Enviar mensagem"
   ▼
WhatsApp abre com mensagem pré-preenchida JÁ IDENTIFICANDO A REGIÃO
   ("Oi! Vi o anúncio de Cinco Conjuntos/Zona Norte e quero
     entrar no grupo de promoções 🎁")
   ▼
Resposta (manual por enquanto) envia o link do grupo
   DESSE cluster especificamente
   ▼
Cliente entra no grupo do cluster → recebe promoção de boas-vindas
   ▼
Primeiro pedido no mesmo dia (janela 11h–14h30)
```

**Por que a mensagem pré-preenchida já identifica a região:** como cada conjunto de anúncios mira um cluster geográfico específico (seção 4), o texto que abre no WhatsApp já pode citar o cluster (ex.: "vi o anúncio de Cinco Conjuntos/Zona Norte") — assim quem responde sabe **na hora**, sem precisar checar o painel de anúncios, qual dos 4 links de grupo enviar. Isso importa principalmente a partir da Fase 2, quando mais de um cluster estiver ativo ao mesmo tempo e as mensagens começarem a chegar misturadas.

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

### 4.1 Ficha pronta da campanha — Semana 1 (pode ser digitada direto no Gerenciador de Anúncios)

Não depende do link do grupo nem do Pixel para ser criada — o objetivo Clique-para-WhatsApp já mede "conversas iniciadas" nativamente, sem precisar de Pixel. Só depende da Página confirmada (id 61585142010817) e, se disponível, da conta do Instagram (`@caseirinhasdatata`).

**Campanha**
| Campo | Valor |
|---|---|
| Nome | `Captação WhatsApp - Cinco Conjuntos Zona Norte - S1` |
| Objetivo | Interesse/Cadastros → destino **WhatsApp** (o rótulo exato varia com a versão do Gerenciador; procurar a opção que abre conversa no WhatsApp, não "Tráfego" para o site) |
| Orçamento no nível da campanha | Não usar CBO — orçamento fica no conjunto de anúncios (só 1 conjunto ativo por enquanto) |

**Conjunto de anúncios**
| Campo | Valor |
|---|---|
| Nome | `Cinco Conjuntos - Zona Norte` |
| Página | Caseirinhas da Tatá \| Londrina PR (id 61585142010817) |
| Número de WhatsApp | (43) 99674-9607 |
| Orçamento diário | R$ 10 a R$ 15 |
| Lance | Custo mais baixo (sem teto) |
| Otimização para | Conversas iniciadas |
| Localização | Raio de 5–6 km a partir de R. Maria Sinopoli Francovig, 1142, Londrina-PR — cobre Cinco Conjuntos, Milton Gavetti, Vivi Xavier, Carnascialli, Heimtal, Conj. João Paz, Parigot 1/2/3, Maria Celina, Novo Amparo, Ouro Verde, Perobinha, Vista Bela, Coliseu |
| Idade | 22–55 |
| Interesses | Nenhum (público amplo) + Advantage+ Audience ligado |
| Posicionamentos | Advantage+ (automático) |

**Anúncios (criar 2–3 e revezar):**

| Anúncio | Criativo (já existe em `public/cardapio/`) | Copy |
|---|---|---|
| 1 — Isca do grupo (prioridade) | Vídeo do prato do dia em rotação (ex. `segunda-bife-acebolado-sobrecoxa.mp4`) | "🎁 Entra no nosso grupo de ofertas e garanta desconto na sua marmita de hoje! Só R$ 20 pra quem entrar agora. Chama no WhatsApp 👇" |
| 2 — Prova social / prato do dia | Foto do prato do dia (ex. `terca-frango-grelhado-panqueca.jpg`) | "Hoje tem [prato do dia] fresquinho, R$ 25. Entrega rápida na sua região. Chama no zap!" |
| 3 — Urgência de horário | Vídeo de churrasco de sexta ou feijoada de domingo | "Só até as 14h30! Marmita caseira quentinha, R$ 20 a R$ 28. Peça agora." |

**Mensagem pré-preenchida do botão "Enviar mensagem" (ou "pergunta rápida" configurável no anúncio):**
> Oi! Vi o anúncio de Cinco Conjuntos/Zona Norte e quero entrar no grupo de promoções 🎁

**Script de resposta manual (até ter automação), a ser usado por quem responde no WhatsApp do número (43) 99674-9607:**
> Oi! Que bom que você chegou 😊 Aqui está o link do nosso grupo de promoções exclusivas da sua região: **[link do grupo Cinco Conjuntos/Zona Norte — criar seguindo a seção 2.3]**. Lá a gente avisa toda vez que tem desconto e novidade no cardápio do dia! 🍱 Me confirma seu bairro pra eu já anotar sua região de entrega?

Esse script já pode ser usado assim que o grupo do cluster Cinco Conjuntos/Zona Norte existir — não precisa esperar o restante do checklist técnico (Pixel, Instagram, saldo) para começar a testar manualmente as respostas.

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
