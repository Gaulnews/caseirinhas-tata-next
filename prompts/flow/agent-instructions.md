# Agent Instructions — Caseirinhas da Tata (Google Flow)

Este arquivo espelha o conteudo a ser colado manualmente em
**Instrucoes para o agente > Adicionar instrucao** dentro do projeto Flow
(`c8206598-7232-445a-9ba5-39a26e6ac8e5`). A UI do Flow nao expoe API, logo
este `.md` e a fonte da verdade versionada; qualquer edicao deve ser feita
aqui primeiro, via PR, e depois replicada manualmente na interface.

Cada bloco abaixo corresponde a uma instrucao individual (toggle on/off
separado na UI). Nao consolide os blocos em uma unica instrucao — mantenha
a granularidade para poder desativar apenas uma diretriz sem afetar as
demais.

---

## Instrucao 01 — Identidade visual da marca

**Titulo (campo da UI):** `Identidade Caseirinhas da Tata`

**Imagem de referencia:** anexar 1 still aprovado gerado a partir de
`prompts/flow/product/product-brigadeiro-pote-01.md` (paleta de cor base).

**Texto da instrucao:**
```
Sempre use uma paleta de cores quente (tons de marrom, dourado e creme),
iluminacao natural suave e estetica "home-made"/artesanal brasileira em
toda geracao de imagem ou video deste projeto. Evite qualquer aparencia
industrial, plastica ou de estudio comercial. Texturas devem parecer
reais e caseiras, nunca sinteticas ou geradas por IA de forma perceptível.
```

---

## Instrucao 02 — Personagem recorrente (Tata)

**Titulo (campo da UI):** `Personagem Tata`

**Imagem de referencia:** anexar o still gerado a partir de
`prompts/flow/character/character-tata-apresentacao-01.md`.

**Texto da instrucao:**
```
Quando o prompt mencionar "Tata" ou "a cozinheira", use como referencia a
mulher brasileira de meia-idade anexada nesta instrucao: avental com
estampa floral simples, tom caloroso e proximo, sem exagero comercial.
Mantenha os tracos faciais e o figurino consistentes em todas as geracoes
que envolvam este personagem.
```

---

## Instrucao 03 — Restricoes de formato e seguranca de marca

**Titulo (campo da UI):** `Formato e restricoes`

**Sem imagem de referencia.**

**Texto da instrucao:**
```
Gere sempre em aspect ratio 9:16, sem texto renderizado na imagem/video
(nenhuma legenda, logotipo ou call-to-action embutido — isso e adicionado
em pos-producao). Nao inclua marcas concorrentes, embalagens de terceiros
ou logotipos de outras empresas. Nao gere pessoas reconheciveis alem da
Tata referenciada. Confirme antes de gerar sempre que o prompt divergir
das categorias definidas em prompts/flow/ (product, character,
environment, cta).
```

---

## Ciclo de sincronizacao

1. Editar este arquivo via PR quando uma diretriz de marca mudar.
2. Apos merge, abrir o projeto no Flow e atualizar manualmente a
   instrucao correspondente (mesmo titulo, para manter rastreabilidade).
3. Registrar a data da ultima sincronizacao manual no rodape deste
   arquivo (campo abaixo).

**Ultima sincronizacao manual na UI do Flow:** _(preencher apos aplicar)_
