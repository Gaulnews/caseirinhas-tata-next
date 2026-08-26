# Flow Prompts — Caseirinhas da Tata

Estrutura de versionamento de prompts para o projeto Google Flow
(`labs.google/fx/tools/flow/project/c8206598-7232-445a-9ba5-39a26e6ac8e5`).

O Google Flow não expõe API pública: os arquivos abaixo são a fonte da
verdade (source of truth) dos prompts. Cada geração feita manualmente na
UI do Flow deve referenciar o `id` do prompt correspondente neste
repositório, garantindo rastreabilidade entre código-fonte e asset gerado.

## Estrutura de pastas

```
prompts/flow/
├── config.yaml              # Parâmetros padrão do projeto (aspect ratio, modelo, duração)
├── product/                 # Prompts de still/vídeo de produto (embalagens, textura)
├── character/                # Prompts com personagem recorrente (consistência visual)
├── environment/              # Prompts de ambiente/cenário (cozinha, feira, entrega)
├── cta/                      # Prompts de encerramento com call-to-action
└── log.csv                   # Registro de execução: prompt_id, data, asset_url, status
```

## Convenção de nomenclatura

Cada arquivo de prompt usa o padrão:

`<categoria>-<tema>-<sequencial>.md`

Exemplo: `product-brigadeiro-pote-01.md`.

## Ciclo de uso

1. Escrever ou editar o prompt em `.md` neste repositório (PR obrigatório).
2. Colar o prompt na UI do Flow, aplicando os parâmetros de `config.yaml`.
3. Fazer o download do asset gerado e subir para a pasta correspondente
   no Google Drive (`/Caseirinhas da Tata/Flow Assets/<categoria>/`).
4. Registrar o resultado em `log.csv` (prompt_id, url do asset no Drive,
   status: aprovado/reprovado/pendente).
5. Publicar o asset aprovado via Facebook Pages e Google Business Profile.
