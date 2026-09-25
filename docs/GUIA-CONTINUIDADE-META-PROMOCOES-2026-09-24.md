# Guia de continuidade — Meta, site e promoções do grupo (Caseirinhas da Tatá)

Atualizado em 24/09/2026. Público: agentes de IA (Claude, Codex e outros) que vão continuar este trabalho sem acesso à conversa original. Leia o guia inteiro antes de agir.

## 1. Regras do dono (obrigatórias)

1. **Não crie contas novas na Meta** (conta de anúncios, portfólio, Página, pixel). Configure as que já existem. O dono corrigiu isso de forma explícita em 24/09/2026.
2. **Nunca digite senhas**, nem quando o dono enviar uma. Peça que ele faça o login. Existe um arquivo com senha em `C:\Users\acer\Documents\CASEIRINHAS\senha-ig.md`: não use esse arquivo e recomende ao dono que troque a senha e apague o arquivo.
3. **Não gaste dinheiro sem aprovação.** Crie campanhas com status `PAUSED`. Ativar ou mudar orçamento exige "sim" do dono na conversa.
4. **Ações irreversíveis exigem "sim" explícito**, por exemplo transferir uma conta de anúncios para um portfólio.
5. **Não envie mensagens em nome do dono.** Prepare o texto e entregue para ele postar.
6. **As promoções são as de `C:\Users\acer\Documents\CASEIRINHAS\promo-ct.md`**. Regras, metas, prêmios e telefone não mudam. Só as datas mudam, e elas acompanham o início dos anúncios.
7. **Link oficial do grupo:** `https://chat.whatsapp.com/DRbxArNS4ObKih8QZBs4ON`. No código ele fica **somente** na constante `GRUPO_SORTEIOS` de `src/lib/site-data.ts`; páginas e componentes importam essa constante. Nenhum outro link de grupo pode aparecer.
8. **Prioridade de bairros por proximidade** da cozinha (Rua Maria Sinopoli Francovig, 1142, Londrina). A ordem fica em `src/lib/site-data.ts` (`bairros`).
9. Com o Codex: revise de forma independente, não reverta alterações alheias e registre achados verificáveis.

## 2. Ativos e identificadores

| Ativo | ID / valor | Observação |
|---|---|---|
| Portfólio (Business) | 566690120345061 | O nome exibido é "Gaul Samuyenga" |
| Conta do dono | facebook.com/gsamuyenga | Perfil "Bentt Gau"; aparece no portfólio como "Gaul Samuyenga (você)"; tem acesso total |
| Página Facebook | 870439819492677 — "Caseirinhas da Tatá" | gsamuyenga com acesso total |
| Instagram | @caseirinhasdatata — 17841477428364093 | Já está no portfólio e conectado à Página |
| Catálogo | 1567626821498785 — "Cardápio - Semanal" | Feed diário de `https://caseirinhasdatata.shop/produtos.csv` (30 itens) |
| Pixel / conjunto de dados | 1760424271666079 — "Meta-data-responder" | Recebe eventos desde 24/09/2026; gsamuyenga recebeu acesso total nessa data |
| Conta de anúncios candidata | 264087404423426 — "Bentt Gau" | Pessoal, fora do portfólio, com forma de pagamento; sem Instagram vinculado |
| Outras contas de anúncios | 463509960395460, 626885377723639 (GAUL-001, pendente de pagamento), 2227958814665119 | Não use sem instrução do dono |
| Site | caseirinhasdatata.shop | Vercel: projeto `caseirinhas-tata-next` (prj_aOfBEGIHs0ZfIWRChIzOZMsAPnVi), equipe team_UTs90DXh4YKhiaOBoFOkUbZ6 |
| Repositório | github.com/Gaulnews/caseirinhas-tata-next | Branch principal `main` |
| Variável de ambiente | `NEXT_PUBLIC_META_PIXEL_ID=1760424271666079` | Produção e preview |
| WhatsApp de pedidos | (43) 99674-9607 | |

## 3. O que já está feito

- **Site em produção (PR #33, merge `63e68c69`):** Meta Pixel (`PageView`, `Contact` em cliques de WhatsApp e iFood, `EntrouGrupo` em convites de grupo), página `/entregas/gleba-palhano`, grupo oficial único, bairros por proximidade e bot do WhatsApp com listas de no máximo 10 linhas.
- **Branch `feat/promocoes-grupo`** (enviado ao GitHub, sem merge até a data deste guia):
  - `src/lib/promocoes-grupo.ts` — fonte única das promoções, com datas e o gerador `mensagemGrupo()`.
  - `scripts/test-promocoes-grupo.mjs` — testes. Comando: `node --test scripts/test-promocoes-grupo.mjs`, com 4 testes que passam.
  - `src/app/promocoes/page.tsx` — página de destino dos anúncios; no sitemap.
  - `docs/promocoes/mensagem-grupo-2026-09-28.md` — texto pronto para o dono postar no grupo.
- **Meta:** gsamuyenga recebeu acesso total ao pixel. Página, Instagram e catálogo já tinham esse acesso.
- **Plano de execução:** `docs/superpowers/plans/2026-09-24-promocoes-grupo-e-anuncios.md`.

## 4. Datas das promoções

As durações vêm do `promo-ct.md` (8, 3 e 4 dias, contíguas). O início coincide com o início dos anúncios.

| Promoção | Meta | Período |
|---|---|---|
| 1 — Kit de Facas | 8 Mini ou 6 Grandes | 28/09 a 05/10/2026 |
| 2 — Kit de Ferramentas 46 peças | 5 Grandes ou 7 Mini | 06/10 a 08/10/2026 |
| 3 — Kit Churrasqueiro | 7 Mini ou 6 Médias | 09/10 a 12/10/2026 |
| Retirada dos prêmios | — | a partir de 13/10/2026 |

12/10 é feriado nacional. A página pede que o cliente confirme o funcionamento pelo WhatsApp.

**Se o início dos anúncios mudar**, siga estes passos na ordem:

1. Em `src/lib/promocoes-grupo.ts`, mude `inicio` e `fim` das 3 promoções. A Promoção 1 começa no novo dia de início, e as durações de 8, 3 e 4 dias continuam contíguas. Mude `RETIRADA_A_PARTIR_DE` para o dia seguinte ao fim da Promoção 3.
   Exemplo com início em 05/10/2026: P1 de 05/10 a 12/10, P2 de 13/10 a 15/10, P3 de 16/10 a 19/10, retirada a partir de 20/10.
2. Em `scripts/test-promocoes-grupo.mjs`, atualize as datas esperadas no primeiro teste, no teste de `promocoesEncerradas` e nos trechos `📅 De *dd/mm*` do último teste.
3. Rode `node --test scripts/test-promocoes-grupo.mjs`. O resultado esperado é 4 pass.
4. Gere de novo o texto do grupo com o comando da seção 6. Renomeie o arquivo com a nova data de início.
5. Faça commit, PR e deploy, e confira `/promocoes` em produção.
6. Ajuste as datas da campanha Meta (pendência 4) para as mesmas datas.

## 5. Pendências, em ordem

1. **Merge do branch `feat/promocoes-grupo`.** Abra o PR, espere os checks da Vercel e peça o "sim" do dono para o merge. Depois confira que `https://caseirinhasdatata.shop/promocoes` responde 200 e contém `28/09`.
2. **Corrigir o post de 01/08/2026 09:21** ("O Sábado Oficial da Tradição Chegou!", reel da Página). O dono autorizou. Troque **apenas** `caseirinhasdatata.caseirinhasdatata.shop` por `https://caseirinhasdatata.shop`. A edição não funcionou pelo perfil pessoal nem pelo menu "Gerenciar post" do Business Suite. Tente editar a legenda com o Facebook no perfil da Página, ou peça ao dono.
3. **Decisão sobre a conta de anúncios.** O dono pediu para manter a "Bentt Gau" pessoal **desde que isso não atrapalhe** o acesso, a configuração e a veiculação. Ela atrapalha em dois pontos:
   - Não tem Instagram vinculado (`ads_get_ig_accounts` retorna vazio). Por isso, os anúncios não aparecem como @caseirinhasdatata no Instagram.
   - Não recebe o pixel do portfólio. Por isso, a campanha não otimiza nem mede `EntrouGrupo` e `Contact`. A solução é transferi-la para o portfólio 566690120345061, mas a transferência é **irreversível**. Apresente isso ao dono e só execute com "sim" explícito.
4. **Campanha Meta pausada** (depende das pendências 1 e 3). Objetivo Tráfego, destino `https://caseirinhasdatata.shop/promocoes?utm_source=meta&utm_medium=paid&utm_campaign=promocoes-grupo-2026-09`, alfinete na cozinha com raio de 5 km, R$ 15 por dia, de 28/09 a 12/10/2026 (R$ 225 no total), status `PAUSED`. Ative só com aprovação do dono.
5. **Postar o texto do grupo:** entregue `docs/promocoes/mensagem-grupo-2026-09-28.md` ao dono. Não envie você mesmo.

## 6. Como verificar cada coisa

| Item | Comando ou ação | Resultado esperado |
|---|---|---|
| Dados das promoções | `node --test scripts/test-promocoes-grupo.mjs` | 4 pass, 0 fail |
| Tipos | `npx tsc --noEmit` | exit 0 |
| Build | `npx next build` | exit 0, rota `/promocoes` listada |
| Texto do grupo | `node -e "import('./src/lib/promocoes-grupo.ts').then(m=>process.stdout.write(m.mensagemGrupo()+'\n'))" > docs/promocoes/mensagem-grupo-2026-09-28.md` | Sem datas de agosto |
| Produção | `curl -s https://caseirinhasdatata.shop/ \| grep -c DRbxArNS4ObKih8QZBs4ON` | ≥ 1 |
| Pixel | Business Suite > Configurações > Conjuntos de dados e pixels | "O conjunto de dados está recebendo eventos" |
| Instagram na conta de anúncios | `ads_get_ig_accounts(ad_account_id)` | Lista @caseirinhasdatata |

## 7. Armadilhas conhecidas

- As páginas de Configurações do Business Suite demoram de 10 a 15 segundos para carregar. **Não conclua que uma lista está vazia antes de esperar**; esse erro já aconteceu com o Instagram.
- O Chrome da sessão pode estar logado em outro usuário ("Caseirinhas Tata", contato@caseirinhasdatata.shop). Confira quem é "(você)" antes de mudar permissões.
- `NEXT_PUBLIC_*` é fixada no build. Depois de mudar a variável na Vercel, é preciso um novo deploy.
- A Cloud API do WhatsApp aceita no máximo 10 linhas por lista. Veja `MAX_LINHAS_LISTA` em `src/lib/whatsapp-bot.ts`.
- `src/lib/promocoes-grupo.ts` não pode usar imports `@/`, porque o teste roda direto no Node.
- `node_modules` está versionado no repositório. Nunca faça `git add -A`; adicione os arquivos pelo caminho.
- O conector adspirer precisa de autorização e não funciona sem ela. Use o conector de anúncios da Meta.
