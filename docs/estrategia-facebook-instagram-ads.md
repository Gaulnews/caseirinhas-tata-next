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

## 2. Funil recomendado: Click-to-WhatsApp, não link direto de grupo

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

## 3. Estrutura da campanha no Gerenciador de Anúncios

- **Objetivo:** Cadastros (Leads) → formato "Anúncios que geram cliques para o WhatsApp".
- **Orçamento:** definir no nível da campanha (CBO/Advantage+ campaign budget), não por conjunto — a Meta redistribui sozinha para onde o custo por resultado está menor.
- **Lance:** custo mais baixo (sem teto de custo) — com orçamento pequeno, um teto de custo trava a entrega e prolonga a fase de aprendizado.
- **Conjuntos de anúncios — agrupar por polo geográfico, não por bairro individual.** Com 20 bairros, segmentar 1 conjunto por bairro pulveriza o orçamento e cada conjunto nunca sai da fase de aprendizado (mínimo recomendado pela Meta: ~50 resultados/semana por conjunto). Agrupar em 4 clusters usando os links como referência de raio de entrega:

  | Cluster | Bairros | Raio sugerido |
  |---|---|---|
  | Centro/Gleba Palhano | Centro, Gleba Palhano | 3–4 km a partir do endereço-base |
  | Cinco Conjuntos / Zona Norte | Cinco Conjuntos, Milton Gavetti, Vivi Xavier, Carnascialli, Heimtal, Conj. João Paz, Parigot 1/2/3, Maria Celina, Novo Amparo, Ouro Verde, Perobinha, Vista Bela, Coliseu | 5–6 km (é a região onde fica o endereço-base — maior densidade) |
  | Alpes | Alpes, Jardim dos Alpes I, Jardim dos Alpes II | 3–4 km |
  | Leste | Conjunto Alexandre Urbanas | 3–4 km |

  Isso conserva a granularidade dos links por bairro para o **site/SEO local** (cada `/entregas/[bairro]` continua indexável e serve de página de pouso para tráfego orgânico e para a variante de retargeting abaixo), mas evita fragmentar o orçamento de mídia paga em 20 públicos minúsculos.

- **Segmentação:** endereço + raio (acima), idade 22–55, sem restrição de interesse — deixar o público **amplo** e Advantage+ Audience ligado. Para o público de menor renda, segmentação por interesse tende a encarecer o CPM sem ganho de precisão; localização é o filtro que importa aqui.
- **Posicionamentos:** Advantage+ (automático) — o algoritmo tende a priorizar Reels/Stories, que historicamente têm CPM mais barato que Feed para este tipo de público.
- **Programação de anúncios (dayparting):** só é possível fora do Advantage+ Campaign Budget (exige orçamento por conjunto + lance manual). Se o orçamento total for pequeno, o ganho do CBO automático costuma compensar mais do que restringir horário. Se optar por restringir, concentrar a veiculação entre **9h e 13h**, para capturar a decisão de almoço do mesmo dia.

---

## 4. Orçamento e controle de custo

- **Fase de teste (primeiros 4–7 dias):** R$ 20–30/dia total, dividido nos 4 clusters — sem alterar orçamento ou segmentação nesse período (qualquer edição de orçamento acima de ~20% reinicia a fase de aprendizado).
- **Depois do teste:** realocar o orçamento para o(s) cluster(s) com menor custo por conversa iniciada, cortando ou pausando o que estiver mais caro.
- **3–4 criativos por conjunto**, trocando os que tiverem frequência alta (>3) ou CTR caindo — sinal de fadiga de anúncio.
- **Regra prática de decisão:** comparar sempre **custo por conversa iniciada no WhatsApp**, não CPM nem CTR isoladamente — é a métrica mais próxima do resultado real (entrada no grupo → pedido).

---

## 5. Criativos e copy

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

## 6. Retargeting e mensuração (lacuna técnica identificada)

O site **não tem nenhum pixel de rastreamento da Meta instalado** hoje (`src/app/layout.tsx` não contém script de Pixel/Conversions API). Isso limita a otimização de campanha de duas formas:

1. A Meta não consegue otimizar entrega com base em quem de fato visitou o site vindo do anúncio.
2. Não é possível criar públicos de remarketing ("quem visitou `/cardapio` mas não converteu", "quem visitou páginas de bairro específicas") nem públicos semelhantes (lookalike) a partir da base de clientes.

**Recomendação (ação de acompanhamento, não incluída neste commit por depender de um dado que só existe na conta de anúncios do negócio):** criar um Pixel da Meta no Gerenciador de Eventos, obter o `Pixel ID`, e então instalar via `next/script` no `layout.tsx`, disparando `PageView` em todas as páginas e um evento `Lead` nos cliques dos botões de WhatsApp (`BotaoWhatsApp` e os CTAs de `page.tsx`/`entregas/[bairro]/page.tsx`). Isso é o pré-requisito técnico para: (a) otimização de entrega orientada a conversão real, não só a cliques, e (b) criar público semelhante (lookalike) a partir de quem já conversa no WhatsApp/grupo — o público mais barato de escalar depois da fase de teste.

---

## 7. Cronograma de acompanhamento

| Frequência | Ação |
|---|---|
| Diária (primeiros 7 dias) | Checar se orçamento está sendo gasto e se as conversas estão chegando; não editar nada |
| A cada 3–4 dias | Comparar custo por conversa iniciada entre os 4 clusters |
| Semanal | Pausar/realocar orçamento dos clusters mais caros; trocar criativos com frequência alta |
| Quinzenal | Revisar oferta do grupo (a promoção de entrada precisa girar para não perder força) |

---

## 8. Resumo executivo

- **Não** usar o link do grupo como destino direto do anúncio — usar anúncios de Clique para o WhatsApp com o número comercial.
- Agrupar os 20 bairros em **4 clusters geográficos** para os conjuntos de anúncios, não 20 conjuntos separados.
- Orçamento de teste: **R$ 20–30/dia**, lance de custo mais baixo, Advantage+ Campaign Budget.
- Reaproveitar as fotos/vídeos do cardápio semanal já existentes em `public/cardapio/` como criativo.
- Métrica de decisão: **custo por conversa iniciada no WhatsApp**, revisado a cada 3–4 dias.
- Pendência técnica para a próxima fase: instalar o Pixel da Meta (requer `Pixel ID` da conta de anúncios do negócio) para habilitar remarketing e públicos semelhantes.
