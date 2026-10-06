# 2 — [Preparação] Criar o projeto: Vite, React, TypeScript e shadcn/ui

Origem: issue #2 (DevDosAnjos/academy), Sprint 00. Branch: `item/2-criar-projeto-vite`.

## 1. Objetivo

Criar o esqueleto do front-end na raiz do repositório: app Vite com React e TypeScript estrito, Tailwind CSS e shadcn/ui iniciados, pastas por área, regras de código e acessibilidade, variáveis de ambiente e README de uso. É a base que os itens #3 a #9 e todas as fases usam.

Fora do escopo: tokens e tema do canvas (#3), rotas e proteção por sessão (#4), cliente da API (#5), MSW (#6), formulários e validação (#7), testes automatizados e publicação (#8), dados fictícios (#9). Nenhuma tela real do produto.

## 2. Requisitos

- R1: o projeto Vite (modelo React + TypeScript) existe na raiz do repositório, e o TypeScript roda em modo estrito (D1, D2).
- R2: o Tailwind CSS está instalado e o shadcn/ui iniciado, com `components.json` e o atalho `@/` apontando para `src/`.
- R3: existem as pastas por área `site`, `acesso`, `gestao` e `portal`, mais `shared` com componentes, API e formatos (D3).
- R4: ESLint com Prettier e o plugin `jsx-a11y` estão configurados, com comandos de verificação e de formatação (D4).
- R5: as variáveis de ambiente (endereço da API e chave que liga os mocks) estão declaradas em `.env.example`, só com nomes e sem valores reais, e tipadas para o código (D5).
- R6: o `README.md` explica como instalar, rodar, verificar o código e gerar o build; a publicação aponta para o item #8.
- R7: os comandos de desenvolvimento, build, verificação de código e de tipos rodam sem erro.
- R8: um componente do shadcn (Button) aparece em uma página de exemplo, sem criar rota nem área (D6).
- R9: o `AGENTS.md` passa a listar os comandos validados, em substituição ao "a definir" (D7).

## 3. Critérios de aceite

- CA1 (R1): dado um clone limpo, quando se roda `pnpm install` e `pnpm build`, então a instalação e o build terminam com código 0 e geram `dist/`.
- CA2 (R1): dado `tsconfig.app.json`, quando se lê o arquivo, então `"strict": true` está ligado; e uma atribuição de `string` a `number` em um arquivo de teste temporário faz `pnpm typecheck` falhar.
- CA3 (R2): dado o projeto, quando se importa `@/shared/components/ui/button` em `src/App.tsx`, então o tipo e o build resolvem o atalho, e `components.json` existe com os aliases apontando para `src/shared`.
- CA4 (R3): dado o repositório, quando se lista `src/`, então existem `site`, `acesso`, `gestao`, `portal` e `shared/{components,api,formats}`, cada pasta vazia com `.gitkeep`.
- CA5 (R4): dado um `<img>` sem `alt` em um arquivo temporário, quando se roda `pnpm lint`, então o lint falha com a regra do `jsx-a11y`; sem o problema, passa com código 0.
- CA6 (R4): dado um arquivo mal formatado, quando se roda `pnpm format:check`, então o comando falha; após `pnpm format`, passa.
- CA7 (R5): dado `.env.example`, quando se lê, então contém `VITE_API_URL` e `VITE_USE_MOCKS` sem valores reais, e `.env` real continua ignorado pelo Git.
- CA8 (R6): dado o `README.md`, quando se seguem os comandos descritos em ordem, então cada um roda como descrito.
- CA9 (R7): dado o projeto, quando se rodam `pnpm dev` (sobe e responde em `http://localhost:5173`), `pnpm build`, `pnpm lint` e `pnpm typecheck`, então nenhum termina com erro.
- CA10 (R8): dado o `pnpm dev` no ar, quando se abre a página inicial, então um botão do shadcn é exibido, com texto em português.
- CA11 (R9): dado o `AGENTS.md`, quando se lê a tabela de comandos, então instalar/build, rodar, lint e tipos têm o comando real; "Testes" diz "a definir no item #8".

## 4. Plano técnico

- Dados: não muda.
- API: não muda. Só se declara `VITE_API_URL`; o cliente é o item #5.
- Interface: uma página de exemplo em `src/App.tsx` com um `Button` do shadcn e um título, em português. Sem rotas, sem tema do canvas (#3). Os estados de tela (carregando, vazio, erro) ficam para os itens que carregam dados.
- Segurança: `.env.example` só com nomes; `.env*` já ignorado em `.gitignore` (visto). Nenhum segredo em `VITE_*`, pois vai ao navegador: a chave dos mocks e a URL são públicas por natureza.
- Arquivos a criar (nada disso existe hoje; o repositório só tem `docs/`, `README.md`, `AGENTS.md`, `specs/` e `.gitignore`): `package.json`, `pnpm-lock.yaml`, `index.html`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `eslint.config.js`, `.prettierrc`, `.prettierignore`, `.env.example`, `.nvmrc`, `components.json`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/vite-env.d.ts` (com os tipos das variáveis `VITE_*`), `src/shared/lib/utils.ts` (`cn`, gerado pelo shadcn), `src/shared/components/ui/button.tsx`, e `.gitkeep` em `src/{site,acesso,gestao,portal}` e `src/shared/{api,formats}`.
- Arquivos a alterar (vistos): `README.md` (seção de como rodar), `AGENTS.md` (tabela de comandos, estrutura e linha de base).
- Reuso: o `.gitignore` existente (já cobre `node_modules/`, `dist/`, `.env*`, exceto `.env.example`). Gerar o app com `pnpm create vite` (modelo `react-ts`) e `pnpm dlx shadcn@latest init`, sem reescrever o que eles geram além do necessário.
- Riscos: (a) o `create vite` não aceita pasta não vazia sem confirmação; gerar em pasta temporária fora do repositório e copiar só os arquivos do projeto, sem tocar em `docs/`, `specs/`, `AGENTS.md` e `README.md`. (b) O `init` do shadcn depende de rede e muda de versão; se falhar, fixar a versão que funcionou. (c) Tailwind v4 é configurado pelo plugin do Vite e não por `tailwind.config.js`; o shadcn atual já parte disso. (d) ESLint plano (`eslint.config.js`) e `jsx-a11y` precisam de versão compatível; o `pnpm lint` é a prova.

## 5. Tarefas

- [x] T1: gerar o app Vite `react-ts` em pasta temporária, copiar para a raiz sem sobrescrever `README.md`, `AGENTS.md`, `docs/`, `specs/` e `.gitignore`, definir `name`, `engines.node` e `.nvmrc` com o Node LTS (D2), e confirmar `strict: true` — cobre CA1, CA2 — prova: `pnpm install && pnpm build`
- [x] T2: adicionar o script `typecheck` (`tsc -b --noEmit` ou equivalente do modelo) — cobre CA2, CA9 — prova: `pnpm typecheck`
- [x] T3: instalar Tailwind CSS (plugin do Vite), configurar o atalho `@/` em `tsconfig.app.json` e `vite.config.ts`, iniciar o shadcn (`components.json` com aliases para `src/shared`) e adicionar o `Button` — cobre CA3 — prova: `pnpm build` com o import `@/shared/components/ui/button`
- [x] T4: criar as pastas por área e `shared/{components,api,formats}` com `.gitkeep` — cobre CA4 — prova: listar `src/`
- [x] T5: configurar ESLint (com `jsx-a11y`) e Prettier, scripts `lint`, `format` e `format:check`, sem conflito entre os dois (`eslint-config-prettier`) — cobre CA5, CA6 — prova: `pnpm lint`, `pnpm format:check`, e teste manual com `<img>` sem `alt`
- [x] T6: criar `.env.example` com `VITE_API_URL` e `VITE_USE_MOCKS`, e tipá-las em `src/vite-env.d.ts` — cobre CA7 — prova: `pnpm typecheck` e `git check-ignore .env`
- [x] T7: trocar o conteúdo do modelo do Vite por `src/App.tsx` com título e `Button` em português, removendo assets e CSS de exemplo — cobre CA10 — prova: `pnpm dev` e abrir `http://localhost:5173`
- [x] T8: escrever no `README.md` como instalar, rodar, verificar e gerar o build, e apontar a publicação para o item #8 — cobre CA8 — prova: executar os comandos do README em ordem
- [x] T9: rodar todos os comandos e atualizar a tabela de comandos, a estrutura e a linha de base do `AGENTS.md` — cobre CA9, CA11 — prova: `pnpm dev`, `pnpm build`, `pnpm lint`, `pnpm typecheck` sem erro

## 6. Decisões

- D1: o projeto fica na raiz do repositório, não em subpasta. Motivo: o repositório é só front-end e o `AGENTS.md` fala em estrutura por área na raiz do projeto. Alternativa: pasta `app/` ou `web/`.
- D2: pnpm como gerenciador e Node LTS (proposta da issue). `.nvmrc` e `engines.node` fixam a versão major do LTS vigente. A máquina tem Node v24, pnpm 12.9.1 (conforme `AGENTS.md`), compatível. Alternativa: npm.
- D3: pastas em `src/`: `site`, `acesso`, `gestao`, `portal` e `shared` (com `components`, `api`, `formats`, `lib`). O shadcn grava em `src/shared/components/ui`. Motivo: a issue pede "o que é compartilhado: componentes, API e formatos". Alternativa: `src/components` na raiz de `src`.
- D4: ESLint com Prettier e `jsx-a11y` (proposta da issue), em vez de Biome. Motivo: a regra de acessibilidade pedida existe no `jsx-a11y`.
- D5: variáveis `VITE_API_URL` e `VITE_USE_MOCKS`. Nomes são minha escolha; a issue só pede "endereço da API e chave que liga os mocks". Alternativa: nomes sem prefixo `VITE_`, que o Vite não expõe ao código.
- D6: a página de exemplo substitui o conteúdo do modelo e fica em `src/App.tsx`, sem rota. Motivo: rotas são o item #4; a página será trocada lá.
- D7: o `AGENTS.md` é atualizado neste item, pois ele próprio diz "a definir, após a fundação (#2)". Teste fica "a definir no item #8".
- Suposição: a "versão do Node (LTS atual)" é definida na hora da construção, consultando o LTS vigente. Se o dono preferir outra, só `.nvmrc` e `engines` mudam.
- Suposição: o item #2 não trata de testes, pois a issue os deixa para o #8 e o "Pronto quando" não os exige.

## Construção

- T1 — arquivos: `package.json`, `pnpm-lock.yaml`, `index.html`, `vite.config.ts`, `tsconfig*.json`, `.nvmrc` (24), `public/favicon.svg`, `src/main.tsx` — prova: `pnpm install && pnpm build` → código 0, `dist/` gerado; `"strict": true` explícito em `tsconfig.app.json` e `tsconfig.node.json`
- T2 — arquivos: `package.json` (`typecheck`: `tsc -b`) — prova: `pnpm typecheck` → 0; com `const n: number = "a"` em arquivo temporário → TS2322, falha (arquivo removido)
- T3 — arquivos: `vite.config.ts`, `tsconfig.app.json`, `tsconfig.json`, `components.json`, `src/index.css`, `src/shared/lib/utils.ts`, `src/shared/components/ui/button.tsx` — prova: `pnpm build` com import `@/shared/components/ui/button` em `App.tsx` → 0
- T4 — arquivos: `.gitkeep` em `src/{site,acesso,gestao,portal}` e `src/shared/{api,formats}` — prova: `find src -name .gitkeep` → 6 pastas
- T5 — arquivos: `eslint.config.js`, `.prettierrc`, `.prettierignore`, `package.json` (oxlint do modelo removido) — prova: `pnpm lint` → 0; `<img>` sem `alt` → `jsx-a11y/alt-text`, falha; `pnpm format:check` falha em arquivo mal formatado e passa após `pnpm format`
- T6 — arquivos: `.env.example`, `src/vite-env.d.ts` — prova: `pnpm typecheck` → 0; `git check-ignore .env` → `.env`
- T7 — arquivos: `src/App.tsx`, `src/index.css` — prova: `pnpm dev` → HTTP 200 em `http://localhost:5173/` e o módulo `App.tsx` servido contém "Entrar". Não conferido visualmente no navegador.
- T8 — arquivos: `README.md` — prova: comandos do README rodados em ordem (exceto `cp .env.example .env`, que não foi executado para não criar `.env`) → todos 0
- T9 — arquivos: `AGENTS.md` — prova: `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm format:check` → 0; `pnpm dev` sobe
Regressão: não há testes (item #8); build, lint, typecheck e format:check passam. Linha de base anterior: sem código.
Desvios: (1) o modelo atual do Vite traz `oxlint`; trocado por ESLint, conforme D4. (2) `tsconfig.app.json` ganhou `paths` sem `baseUrl` (deprecated no TypeScript 6). (3) shadcn iniciado com `-b radix -p nova`; gerou `cn` a partir do pacote `cn` e arquivos em `src/components` e `src/lib`, movidos para `src/shared` com aliases ajustados em `components.json`. (4) `src/shared/components/ui` fora do ESLint e do Prettier (código gerado); `*.md` fora do Prettier. (5) Node `.nvmrc` 24 e `engines >=24`. (6) `specs/projeto.md` não tem seção de comandos; não alterado.
Não é do item: nenhum.

## Verificação

### Rodada 1 — OK — 2026-10-06, estado d3ffd92e818ed6529e43f3317efd9e33a0c2896d

| Critério | Status | Evidência |
|---|---|---|
| CA1 | PASSOU | `pnpm install --frozen-lockfile` e `pnpm build` código 0, `dist/` gerado |
| CA2 | PASSOU | `"strict": true` em tsconfig.app.json; `const n: number = "a"` temporário → TS2322, `pnpm typecheck` falha |
| CA3 | PASSOU | App.tsx importa `@/shared/components/ui/button`; build 0; aliases de components.json em `@/shared` |
| CA4 | PASSOU | 6 `.gitkeep` (site, acesso, gestao, portal, shared/api, shared/formats); components e lib existem pelos arquivos do shadcn |
| CA5 | PASSOU | `<img>` sem alt → jsx-a11y/alt-text, falha; sem ele `pnpm lint` 0 |
| CA6 | PASSOU | arquivo mal formatado → `format:check` falha; limpo passa |
| CA7 | PASSOU | `.env.example` com os dois nomes vazios; `git check-ignore .env` → ignorado |
| CA8 | PASSOU | comandos do README rodam (cp .env.example .env não executado, trivial) |
| CA9 | PASSOU | dev responde 200 em :5173; build, lint, typecheck 0 |
| CA10 | PASSOU | dev serve App.tsx com "Entrar" (não conferido visualmente; evidência por módulo servido) |
| CA11 | PASSOU | tabela do AGENTS.md com comandos reais; Testes "a definir no item #8" |

Comandos: pnpm install --frozen-lockfile, build, lint, typecheck, format:check (todos 0); pnpm dev + curl (200); testes temporários removidos.
Achados:
- sugestão, código, package.json — `cn` (pacote npm) é dependência paralela ao `cn` de utils.ts; conferir se é realmente usada ou se é resíduo do init do shadcn.

## Entrega

- O que muda: cria o app Vite + React + TypeScript (strict) na raiz, com shadcn/ui (Button em página de exemplo `src/App.tsx`), atalho `@/`, pastas por área em `src/`, ESLint + Prettier + `jsx-a11y`, `.env.example` (`VITE_API_URL`, `VITE_USE_MOCKS`), `.nvmrc`, README e `AGENTS.md` com comandos validados. Inclui os arquivos da preparação (especificação, backlog, `AGENTS.md`).
- Verificação: rodada 1 OK (CA1 a CA11); build, lint, typecheck e format:check com código 0.
- Decisões: ver seção Decisões (D1 a D7).
- Limitações: testes ficam para o item #8; CA10 não conferido visualmente; achado de sugestão sobre o pacote `cn` em `package.json`, a conferir.
