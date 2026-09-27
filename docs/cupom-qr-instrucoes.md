# Cupom QR de segunda compra — instruções de uso

Este guia explica como gerar, imprimir e resgatar os cupons de segunda compra.

## Como funciona
1. O cliente faz um pedido pelo iFood.
2. Você coloca um cupom impresso dentro da embalagem.
3. O cliente aponta a câmera para o QR code e abre a página `caseirinhasdatata.shop/beneficio`, com o código do cupom já preenchido.
4. Na página, o cliente escolhe 1 benefício, entra no grupo de promoções e toca em **Resgatar pelo WhatsApp**. A mensagem chega no WhatsApp da loja (43) 99674-9607 já com o código escrito.
5. O prazo do cupom termina às 23h59 do dia seguinte ao pedido.

**Benefícios** (o cliente escolhe 1):
- Coca-Cola 2 L grátis, em pedido direto a partir de R$ 40.
- Salada Caesar grátis, em pedido direto a partir de R$ 40.
- Na compra de uma marmita de qualquer tamanho, leva uma mini. Vale só para retirada, em pedido a partir de R$ 25, 1 por cliente.

## 1. Antes de usar (uma única vez)
1. Faça o merge do PR #36 no GitHub. Sem esse passo, o QR abre uma página inexistente (erro 404) no site oficial.
2. Teste o link no celular: https://caseirinhasdatata.shop/beneficio?c=TATA-0001 deve abrir a página com o código preenchido.

## 2. Gerar os cupons (no computador)
Abra um terminal na pasta `C:\Users\acer\projects\caseirinhas-tata-next` e rode:

```bash
node scripts/gerar-cupons.mjs 1 60 2026-09-28
```

- O **1º número** é o número do primeiro cupom.
- O **2º número** é a quantidade de cupons.
- A **data** é o dia dos pedidos. O vencimento é calculado a partir dela e sai impresso no cupom.
- Para o dia seguinte, continue a numeração de onde parou, por exemplo `node scripts/gerar-cupons.mjs 61 60 2026-09-29`. **Nunca repita números:** cada código vale uma única vez.
- Os cupons ficam em `cupons\TATA-0001.png`, `cupons\TATA-0002.png` e assim por diante. A planilha de controle fica em `cupons\controle.csv`.

## 3. Imprimir (no celular)
Este notebook não tem Bluetooth, então a impressão é feita pelo celular.
1. Passe os PNGs para o celular, por exemplo pelo Google Drive, pelo WhatsApp Web (enviando para você mesmo) ou por cabo.
2. Ligue a impressora e pareie o celular com ela nas configurações de Bluetooth do aparelho.
3. Instale o app indicado no manual ou no QR code da caixa da impressora.
4. No app, escolha a opção de imprimir **imagem** com papel de **58 mm** e imprima o `TATA-0001.png`.
5. **Teste obrigatório:** escaneie o papel impresso com outro celular. O teste passa se a página abrir com o código TATA-0001 preenchido.
6. Se o QR não for lido, aumente a densidade de impressão no app ou troque a bobina de papel.

## 4. Na operação (dia dos pedidos)
1. Coloque 1 cupom em cada pedido do iFood, em ordem.
2. Anote no `controle.csv` a data do pedido ao lado do código. **Não anote nome nem telefone vindos do iFood.**
3. Às 10h do dia seguinte, publique no grupo: *"Cupons TATA vencem hoje 23h59 🎁"*.

## 5. No resgate (WhatsApp)
Quando chegar a mensagem *"Quero resgatar meu cupom TATA-0001 (...)"*:
1. Procure o código no `controle.csv`. Recuse se o código não existir, se já tiver data de resgate preenchida ou se o prazo já tiver vencido.
2. Confira a regra do benefício escolhido: valor mínimo do pedido e, no caso da mini, se o pedido é para retirada.
3. Preencha as colunas `data_resgate`, `beneficio` e `valor_pedido`, e aplique o benefício no pedido.

## 6. Resultado (quinta-feira)
No `controle.csv`, divida a quantidade de cupons com resgate pelo total de cupons entregues, e some o valor dos pedidos diretos. Uma taxa de resgate abaixo de 5% indica que o benefício, ou a forma de apresentá-lo, precisa de ajuste.

## Cuidados
- Confira no contrato com o iFood se é permitido colocar material promocional na embalagem.
- O cupom não diz "compre fora do iFood". Mantenha essa redação.
