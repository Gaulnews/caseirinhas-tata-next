# Cupom QR de Segunda Compra — Plano de Implementação

> **Para agentes:** SUB-SKILL OBRIGATÓRIA: use superpowers:subagent-driven-development ou superpowers:executing-plans. Os passos usam checkbox (`- [ ]`).

**Objetivo:** aumentar os pedidos no iFood na segunda-feira, 28/09/2026. Cada cliente do iFood recebe na embalagem um cupom térmico com QR code. O QR code leva a uma página com um benefício exclusivo para a próxima compra direta e com a entrada no grupo de WhatsApp.

**Arquitetura:** uma página estática `/beneficio` no site Next.js existente mostra os benefícios e as regras. O cupom tem um código curto e sequencial (`TATA-0001`), que evita reuso e permite medir a conversão. O cupom é impresso pelo **celular Android**, com o app da impressora, porque este PC não tem adaptador Bluetooth (`Get-PnpDevice -Class Bluetooth` voltou vazio).

**Tecnologias:** Next.js (repo `caseirinhas-tata-next`), Vercel, impressora térmica de 58 mm com app Android, planilha de controle.

**Spec:** pedido do usuário em 27/09/2026 (objetivos 1 e 2 desta conversa) + `ifood-audit/Memorando_iFood_Caseirinhas_da_Tata.md`.

## Correções à ideia original
1. **Impressora no PC: inviável hoje.** O PC não tem Bluetooth, e esses modelos genéricos de 58 mm só têm app para Android/iOS (o anúncio não pôde ser lido para confirmar o nome). Imprimir pelo celular. Usar o PC só para gerar a imagem do cupom.
2. **Validade (revista em 27/09/2026):** o cupom vence **às 23h59 do dia seguinte ao pedido** (cerca de 36 h), e o vencimento vem impresso como data e hora, por exemplo "VENCE TERÇA 29/09 ÀS 23H59". Assim cobre o almoço e o jantar do dia seguinte. Um prazo de 72 h tirava a urgência e aumentava o esquecimento; 24 h exatas caíam no meio do almoço seguinte. Para gerar escassez: "Cupom numerado, 1 por cliente, só nesta semana". Para combater o esquecimento: um lembrete no grupo às 10h do dia seguinte ("Cupons TATA vencem hoje 23h59").
3. **"A partir do aceite" é ambíguo.** Contar a partir da **data impressa no cupom**, que é a data do pedido.
4. **Cupom sem código pode ser copiado.** Um print do QR circula no grupo e o benefício vira custo sem controle. Imprimir um código único, resgatar pelo WhatsApp informando esse código e dar baixa numa planilha.
5. **Custo do benefício 3.** "Compre uma marmita e leve uma mini" custa cerca de R$ 20 em preço de venda. Limitar a **retirada**, **1 por cliente** e **pedido a partir de R$ 25** (marmita média). As opções 1 (Coca 2 L, R$ 15,99) e 2 (Salada cesar) valem para **pedido direto a partir de R$ 40**, para proteger a margem.
6. **Risco com o iFood.** Os termos de parceria restringem o uso dos dados de clientes da plataforma e podem limitar o desvio ativo de clientes. Confira seu contrato. Na arte do cupom, use "Entre no grupo de promoções da Tatá" e **não** "compre fora do iFood". Não guardar telefone ou nome vindos do iFood; o cliente se identifica por conta própria no WhatsApp.
7. **O objetivo 1 não depende do QR.** O QR só gera vendas nos dias seguintes. Para amanhã, as ações estão na Tarefa 1.

## Restrições globais
- Link do grupo: `https://chat.whatsapp.com/DRbxArNS4ObKih8QZBs4ON` (sem o parâmetro `?mode=gi_t`, que é de rastreio do app).
- WhatsApp de resgate: `https://wa.me/5543996749607`.
- Largura útil da impressão: 48 mm (384 px a 203 dpi). QR com no mínimo 25 mm de lado.
- Página: `https://caseirinhasdatata.shop/beneficio`, com `noindex` (não é uma oferta pública).

## Foco de revisão
- QR escaneado em uma tela com pouca luz ou num papel térmico já desbotado: precisa abrir mesmo assim (QR com correção de erro nível M e contraste alto).
- Código usado duas vezes: o resgate recusa quando o código já tem baixa na planilha.
- Cliente depois das 23h59 do dia seguinte: a regra aparece na página e na mensagem de resgate.
- Cliente de fora da área de entrega: vale só para retirada.
- Página aberta em 4G fraco: página estática, sem imagens pesadas.

---

### Tarefa 1: Ações para vender no iFood amanhã (manual, no Portal do Parceiro)
- [ ] Pausar os combos duplicados, mantendo 1 de cada: "Combo 1 solo" e "Combo 2 casal".
- [ ] Renomear "Salada caser" para "Salada cesar" e juntar as duas categorias.
- [ ] Reescrever e **salvar** as fichas da Marmita mini, da Feijoada mini e da Salada cesar (porção, acompanhamentos, "serve 1"). Conferir que os contadores deixaram de mostrar 0/80.
- [ ] Criar o combo "Marmita mini + Coca lata" com preço cerca de 10% abaixo da soma dos dois.
- [ ] Ordenar as categorias: Marmitas → Combos → Saladas → Bebidas.
- [ ] Conferir o horário de abertura na segunda e o tempo de entrega (+10 min das 12h às 14h para entregas de 3 a 5 km).
- [ ] Verificação: abrir a loja pública às 10h de segunda e confirmar que as categorias "Refeições" e "Combos" mostram itens.

### Tarefa 2: Página `/beneficio`
**Arquivos:**
- Criar: `src/app/beneficio/page.tsx`
- Criar: `src/lib/beneficio.ts`
- Teste: `src/lib/beneficio.test.ts`

**Interfaces:**
- Produz: `BENEFICIOS: { id: 'coca2l'|'salada'|'mini'; titulo: string; condicao: string }[]`, `vencimento(dataPedido: Date): Date  // 23:59:59 do dia seguinte, America/Sao_Paulo`, `mensagemResgate(codigo: string, beneficioId: string): string` (URL `wa.me` com o texto codificado).

- [ ] Escrever o teste: `BENEFICIOS.length === 3`; `mensagemResgate('TATA-0001','mini')` começa com `https://wa.me/5543996749607?text=` e contém `TATA-0001` depois de decodificado.
- [ ] Rodar `npm test -- beneficio` e confirmar que FALHA (módulo ausente).
- [ ] Implementar `src/lib/beneficio.ts`, seguindo o padrão de `src/lib/promocoes-grupo.ts`.
- [ ] Implementar a página: título "Seu presente da Tatá 🎁", os 3 benefícios (o cliente escolhe 1), as regras (vence às 23h59 do dia seguinte ao pedido, conforme impresso, 1 por cliente, pedido direto pelo WhatsApp ou retirada, cupom com código único, não acumula com outras promoções), um botão "Entrar no grupo" e um campo para o código que gera o link de resgate. `metadata.robots = { index: false }`. Não incluir na sitemap.
- [ ] Rodar `npm test && npm run build` e confirmar PASS.
- [ ] Commit: `feat: add second-purchase benefit page`.

### Tarefa 3: Arte do cupom e impressão
**Arquivos:**
- Criar: `scripts/gerar-cupons.mjs` (usa o pacote `qrcode`)

- [ ] Script `gerarCupons(inicio: number, qtd: number)`: gera `cupons/TATA-0001.png` … com 384 px de largura, contendo a logo em texto, "Presente na próxima compra", o QR para `https://caseirinhasdatata.shop/beneficio?c=TATA-0001`, o código em fonte grande e a linha "VENCE __/__ ÀS 23H59" em fonte grande, mais "Cupom numerado · 1 por cliente".
- [ ] Rodar `node scripts/gerar-cupons.mjs 1 60` e confirmar 60 PNGs.
- [ ] No celular (iPhone ou Android): parear a impressora, instalar o app indicado no manual ou no QR da caixa, imprimir `TATA-0001.png` e escanear o papel com outro celular. Esperado: a página abre com o código preenchido.
- [ ] Criar a planilha de controle com as colunas `codigo | data_pedido | data_resgate | beneficio | valor_pedido`.

### Tarefa 4: Operação na segunda-feira
- [ ] Postar no grupo às 10h do dia seguinte: "Cupons TATA vencem hoje 23h59".
- [ ] Colocar 1 cupom em cada pedido do iFood e anotar o código ao lado do número do pedido, sem guardar dados pessoais.
- [ ] Resgate pelo WhatsApp: conferir o código e a validade na planilha, dar baixa e aplicar o benefício.
- [ ] Na quinta-feira, medir: cupons entregues × resgates × valor dos pedidos diretos.

