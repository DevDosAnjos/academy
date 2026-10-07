# 8 — Testes e esteira de qualidade

Origem: issue #8 (`[Preparação] Testes, qualidade e publicação automática`). Branch: `item/8-testes-qualidade-publicacao`.

## 1. Objetivo

Dar ao front um executor de testes (Vitest, Testing Library e Playwright, com verificação de acessibilidade AA via axe) e uma esteira no GitHub Actions em todo pull request (lint, tipos, testes e build). Serve de base para todos os itens seguintes. Navegadores-alvo: versões atuais de Chrome, Edge, Firefox e Safari, no computador e no celular.

Fora do escopo: contas de teste de cada perfil (item #9); testes de regra de negócio (é do servidor; no front o teste cobre o que a tela faz com ela); publicação (deploy e prévia por pull request), adiada por decisão do dono e travada por P23 (ver "Trabalho adiado" no backlog).

## 2. Requisitos

- R1: `pnpm test` roda testes de unidade e de componente com Vitest, jsdom e Testing Library (`@testing-library/react`, `jest-dom`, `user-event`), e `pnpm test:e2e` roda os de ponta a ponta com Playwright (D1).
- R2: o front tem testes de unidade e de componente dos padrões já construídos: formatos pt-BR, regras Zod, decisão de acesso, cliente da API e formulário de exemplo.
- R3: há ao menos um fluxo de ponta a ponta, com sessão simulada (D2): visitante sem sessão que abre `/gestao` vai ao login com `?voltar=`; cada perfil simulado cai na sua área e o professor é barrado em `/gestao/configuracoes`.
- R4: os testes verificam acessibilidade no nível AA com axe, nos componentes (`vitest-axe`) e nas páginas de ponta a ponta (`@axe-core/playwright`, tags WCAG 2 A e AA), e falham com violação.
- R5: os testes de ponta a ponta rodam nos navegadores-alvo: Chromium, Firefox e WebKit no computador (1440 px) e Chromium e WebKit emulando celular (390 px), mais Edge pelo canal `msedge` quando instalado (D3).
- R6: um workflow do GitHub Actions roda em todo pull request: `lint`, `format:check`, `typecheck`, testes unitários, `build` e testes de ponta a ponta, e cada etapa que falha reprova o PR (D4).
- R7: a documentação do projeto diz como rodar os testes: `AGENTS.md` (comandos e linha de base) e o passo a passo curto de escrita de teste.
- R8: o item deixa claro que publicação e prévia por PR não foram feitas (D5).

## 3. Critérios de aceite

- CA1 (R1): dado o repositório limpo, quando se roda `pnpm test`, então o Vitest executa os arquivos `*.test.ts(x)` de `src/` em jsdom e termina com código 0.
- CA2 (R1): dado o servidor de desenvolvimento com mocks, quando se roda `pnpm test:e2e`, então o Playwright sobe o app sozinho, executa os testes de `e2e/` e termina com código 0.
- CA3 (R2): dado `formatPhone`, `formatDate`, `formatTime`, `formatCurrency` e `brDateToIso`, quando recebem os exemplos do item #7 (`(11) 98765-4321`, `06/10/2026`, `22:30`, `R$ 1.234,50`, `2026-10-06T01:30:00Z` → `05/10/2026`, `31/02/2026` → nulo), então devolvem o esperado.
- CA4 (R2): dado `schemas.ts`, quando recebe e-mail `abc`, telefone `123`, data `31/02/2026`, valor negativo e senha `abc`, então cada regra falha com a mensagem em português definida no item #7, e entradas válidas passam.
- CA5 (R2): dado `decideAccess` e `safeReturnPath`, quando recebem todas as combinações de perfil e requisito e os caminhos `/gestao`, `//evil.com`, `/\evil` e `https://x`, então devolvem as decisões do item #4 e só aceitam caminho interno.
- CA6 (R2): dado o cliente `api` com o servidor MSW de `src/mocks/node.ts`, quando a resposta é 401, 403, 404, 422 com `fields`, 500 ou falha de rede, então vira `ApiError` com o `kind` correspondente.
- CA7 (R2): dado o formulário de exemplo renderizado, quando se envia vazio, então cada campo obrigatório mostra "Preencha este campo." e nada é enviado; quando se digita `11987654321` no telefone, então o campo mostra `(11) 98765-4321`.
- CA8 (R3): dado um navegador sem sessão, quando abre `/gestao`, então vai para `/entrar?voltar=/gestao`.
- CA9 (R3): dado a sessão simulada de Administrador, de Professor, de Aluno e de Responsável, quando abre `/gestao`, então Administrador e Professor veem a gestão e Aluno e Responsável vão para `/portal`; quando o Professor abre `/gestao/configuracoes`, então vê o aviso de acesso negado e o Administrador vê a página.
- CA10 (R4): dado o formulário de exemplo e as páginas `/`, `/entrar`, `/gestao` e `/portal` (estas com sessão simulada), quando o axe roda no nível WCAG 2 A e AA, então não há violação; uma violação introduzida de propósito (imagem sem texto alternativo) faz o teste falhar.
- CA11 (R5): dado `pnpm test:e2e`, quando termina, então o relatório lista os projetos `chromium`, `firefox`, `webkit`, `mobile-chrome` e `mobile-safari`, cada um com os testes de CA8 a CA10 executados (e `edge` quando o canal estiver instalado).
- CA12 (R6): dado um pull request aberto para `dev` ou `main`, quando o workflow roda, então executa as etapas na ordem lint, format, tipos, testes unitários, build e ponta a ponta, e um teste que falha deixa o PR com a verificação reprovada.
- CA13 (R6): dado o workflow, quando falha o teste de ponta a ponta, então o relatório do Playwright fica anexado à execução como artefato.
- CA14 (R7, R8): dado o `AGENTS.md`, então a linha "Testes" traz os comandos validados, a linha de base cita os testes, e a descrição do PR diz que a publicação e a prévia por PR ficaram para o item que nascer de P23.

## 4. Plano técnico

- Dados: não muda.
- API: não muda. O cliente é testado contra `src/mocks/node.ts` (`server`), já existente; sem handlers novos.
- Interface: não muda. Pode-se acrescentar só o que o teste exigir de acessibilidade (por exemplo nome acessível faltando) e isso é registrado em "Construção".
- Segurança: não se aplica. Contas e senhas reais não entram; a sessão simulada é gravada pelo próprio teste no `sessionStorage`, e o workflow não usa segredos.
- Arquivos a alterar (vistos): `package.json` (scripts `test`, `test:watch`, `test:e2e` e devDependencies), `pnpm-lock.yaml`, `vite.config.ts` (bloco `test`: jsdom, `setupFiles`, `include: ['src/**/*.test.{ts,tsx}']`, `css: false`), `tsconfig.app.json` e `tsconfig.node.json` (tipos de teste, inclusão de `e2e` e do config do Playwright em um dos dois), `eslint.config.js` (ignorar `playwright-report`, `test-results`; globals de Node em `e2e`), `.gitignore` e `.prettierignore` (`playwright-report/`, `test-results/`, `coverage/`), `AGENTS.md` (na entrega). Existem mas não mudam: `src/mocks/node.ts`, `src/shared/lib/{access,session,schemas}.ts`, `src/shared/formats/*`, `src/shared/api/client.ts`.
- A criar: `src/test/setup.ts` (jest-dom, axe, `cleanup`, `server.listen/resetHandlers/close` do MSW); testes ao lado do código (`src/shared/formats/formats.test.ts`, `src/shared/lib/schemas.test.ts`, `src/shared/lib/access.test.ts`, `src/shared/api/client.test.ts`, `src/shared/components/example-form.test.tsx`); `playwright.config.ts` (projetos de R5, `webServer: pnpm dev` com `VITE_USE_MOCKS=true`, `baseURL http://localhost:5173`, `retries` 1 em CI); `e2e/helpers.ts` (grava a sessão simulada por `addInitScript` na chave `academy.simulated-session` e roda axe); `e2e/acesso.spec.ts` e `e2e/acessibilidade.spec.ts`; `.github/workflows/ci.yml`; passo a passo curto de teste no `README` de `src/mocks/` ou em `src/test/README.md`.
- Reuso: `server` de `src/mocks/node.ts`; `signIn`/`getSession` e a chave de sessão de `session.ts`; `decideAccess` e `safeReturnPath`; rota DEV `/dev/api-exemplo-formulario` e o mock `POST /exemplo-formulario`; `?mock=invalido|invalido-geral|erro|demora`. Versão do Node lida de `.nvmrc` (24) com `actions/setup-node` e pnpm por `pnpm/action-setup`.
- Riscos: (a) `msw` 3 em jsdom (fetch, `AbortSignal` do tempo limite de 15 s): o teste do cliente acusa; usar `server.listen({ onUnhandledRequest: 'error' })`. (b) `react-router` 8 e rotas `lazy` em jsdom: componente testado fora do roteador completo, e a navegação fica no Playwright. (c) WebKit e Firefox no Windows local podem não rodar: a prova nos cinco projetos é feita no Actions; localmente vale o que estiver instalado, dito em "Construção". (d) Rotas `/dev/*` só existem em DEV: por isso o e2e roda `pnpm dev` e não `preview`. (e) `src/shared` não importa de `gestao` nem de `portal`; teste de área fica na própria área. (f) E2E lento no PR: tempo medido na primeira execução, e `workers` ajustado se passar de uns 10 minutos.

## 5. Tarefas

- [x] T1: instalar `vitest`, `jsdom`, `@testing-library/{react,jest-dom,user-event}`, `vitest-axe`, `@playwright/test`, `@axe-core/playwright`; configurar o bloco `test` no `vite.config.ts`, `src/test/setup.ts`, scripts `test`, `test:watch`, `test:e2e`, tipos, ESLint e ignores — cobre CA1 — prova: `pnpm test` com um teste mínimo passa (código 0) e `pnpm typecheck && pnpm lint && pnpm format:check` passam
- [x] T2: testes de unidade de formatos, schemas, `decideAccess`/`safeReturnPath` e cliente da API com MSW — cobre CA3, CA4, CA5, CA6 — prova: `pnpm test`; quebrar de propósito um formato e ver o teste falhar (desfeito depois)
- [x] T3: teste de componente do formulário de exemplo (vazio, máscara de telefone) e verificação axe nele — cobre CA7 e a parte de componente de CA10 — prova: `pnpm test`
- [x] T4: `playwright.config.ts` com os projetos de R5 e `webServer`, `e2e/helpers.ts` e `e2e/acesso.spec.ts` (sem sessão, perfis, professor barrado) — cobre CA2, CA8, CA9, CA11 — prova: `pnpm test:e2e` (navegadores instalados com `pnpm exec playwright install`) lista os projetos e passa
- [x] T5: `e2e/acessibilidade.spec.ts` com axe WCAG 2 A e AA nas quatro páginas; corrigir só o que o axe apontar de violação real, registrando em "Construção" — cobre CA10 — prova: `pnpm test:e2e`; imagem sem `alt` posta de propósito reprova o teste (desfeita depois)
- [x] T6: `.github/workflows/ci.yml` (pull request; Node do `.nvmrc`, pnpm com cache, etapas de CA12, instalação dos navegadores, artefato do relatório do Playwright quando falha) — cobre CA12, CA13 — prova: `pnpm exec playwright test --list` e leitura do YAML local; execução real na abertura do PR, com resultado anotado em "Entrega"
- [x] T7: atualizar `AGENTS.md` (comando de testes validado, linha de base, regra de onde ficam os testes), escrever o passo a passo curto de teste e registrar a publicação adiada — cobre CA14 — prova: leitura do `AGENTS.md`; `pnpm format:check` passa
- [x] T8: rodar `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm format:check` e `pnpm test` — não cobre critério: garante a linha de base — prova: os cinco comandos passam

## 6. Decisões

- D1: Vitest com Testing Library e jsdom nos testes de unidade e componente, e Playwright nos de ponta a ponta, como propõe a issue; o Vitest usa a configuração do Vite já existente, sem segundo arquivo. Alternativa: Jest e Cypress, descartados por exigirem outra cadeia de build e transformação.
- D2: o ponta a ponta do item usa a sessão simulada gravada no `sessionStorage` e os mocks MSW, porque as contas de teste de cada perfil são do item #9 e o login real do #17. Os fluxos reais com essas contas entram nos itens que as trouxerem. Alternativa: esperar o #9, descartada porque a esteira precisa existir antes.
- D3: Edge é coberto pelo Chromium na esteira (mesmo motor) e, quando o canal `msedge` existe na máquina, por um projeto próprio; Safari é coberto pelo WebKit do Playwright, que é aproximação do Safari real. Alternativa: contratar serviço de navegadores reais, descartada por custo, e é limite aceito para a primeira versão.
- D4: um workflow só, com um job de qualidade (lint, format, tipos, testes unitários, build) e um de ponta a ponta, disparado em `pull_request`, sem filtro de base. Protegê-lo como verificação obrigatória do merge é configuração do repositório e do dono, não do código. Alternativa: workflow por etapa, descartada por repetir a instalação.
- D5: publicação automática e prévia por pull request ficam fora, por decisão do dono já registrada (P23, "Trabalho adiado"). Por isso o "Pronto quando" da issue ("roda a esteira e publica uma prévia") fica cumprido só na primeira metade, e o item não fecha a issue #8 de forma completa: o merge segue o fluxo do `AGENTS.md`, e o dono decide se fecha a issue ou a mantém aberta até a publicação (muda o comportamento da esteira: nada é publicado).
- D6: testes de regra de negócio do servidor não são escritos; no front só se testa o que a tela faz (RNF-21, RNF-P19, RNF-S24, conforme a issue). Cobertura mínima por número não é exigida.
- Suposição: o Actions do repositório DevDosAnjos/academy está habilitado e pode baixar os navegadores do Playwright; se não, o job de ponta a ponta falha e só ele é ajustado.
- Suposição: `pnpm dev` com `VITE_USE_MOCKS=true` serve para o e2e; se o mock inicial (Administrador em `db.profile`) interferir na sessão simulada, o teste usa `?mock=` ou `sessionStorage` antes da carga.

## Construção

- T1 — arquivos: `package.json`, `pnpm-lock.yaml`, `vite.config.ts` (bloco `test`, `defineConfig` de `vitest/config`), `tsconfig.app.json`, `tsconfig.node.json`, `eslint.config.js`, `.gitignore`, `.prettierignore`, `.prettierrc`, `src/test/setup.ts` — prova: `pnpm test` → passa; `pnpm typecheck && pnpm lint && pnpm format:check` → passam
- T2 — arquivos: `src/shared/formats/formats.test.ts`, `src/shared/lib/{schemas,access}.test.ts`, `src/shared/api/client.test.ts` — prova: `pnpm test` → 16 passam; trocar `(11) ` por `(12) ` em `phone.ts` fez o teste falhar (desfeito)
- T3 — arquivos: `src/shared/components/example-form.test.tsx` — prova: `pnpm test` → 19 passam; trocar a mensagem "Preencha este campo." em `schemas.ts` fez 2 testes falharem (desfeito). Axe do componente com `color-contrast` desligado (jsdom não tem layout; contraste é conferido no e2e)
- T4 — arquivos: `playwright.config.ts`, `e2e/helpers.ts`, `e2e/acesso.spec.ts` — prova: `pnpm exec playwright test --list` → 5 projetos (`chromium`, `firefox`, `webkit`, `mobile-chrome`, `mobile-safari`) e `edge` (canal instalado aqui); `pnpm test:e2e --project=chromium --project=firefox --project=mobile-chrome --project=edge` → 48 passam. `webkit` e `mobile-safari` NÃO rodaram nesta máquina: o WebKit do Playwright no Windows pede `icutu77.dll` e `ssl-60.dll` ("Host system is missing dependencies"). Valem no Actions (risco c do plano); T4 marcada com essa ressalva
- T5 — arquivos: `e2e/acessibilidade.spec.ts` (`/`, `/entrar`, `/gestao`, `/portal` e o formulário de exemplo) — prova: passa nos 4 navegadores locais, sem violação e sem precisar mexer na interface; `<img>` sem `alt` posto em `src/site/home.tsx` reprovou o teste com `image-alt` (desfeito, arquivo igual ao original)
- T6 — arquivos: `.github/workflows/ci.yml` (job `quality`: lint, format, tipos, testes, build; job `e2e` com os três navegadores e artefato `playwright-report` em falha) — prova: `pnpm exec playwright test --list` → 72 testes; YAML conferido por `prettier --check`. Execução real só na abertura do PR
- T7 — arquivos: `AGENTS.md`, `specs/projeto.md`, `src/test/README.md` — prova: leitura; `pnpm format:check` → passa
- T8 — prova: `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm format:check`, `pnpm test` → todos código 0

Regressão: build, lint, typecheck, format:check e `pnpm test` (19 testes) passam; linha de base anterior (sem testes) não piorou.
Desvios:
- msw 3 renomeou a opção: `server.listen({ onUnhandledFrame: 'error' })` no lugar de `onUnhandledRequest`.
- `.prettierrc` ganhou `"endOfLine": "auto"`: com `core.autocrlf=true` nesta máquina Windows, `format:check` reprovava 13 arquivos já existentes por causa de CRLF. Sem efeito em LF.
- `tsconfig.app.json` ganhou só `@testing-library/jest-dom` em `types`; as matchers do axe vêm de `src/test/axe.d.ts`; `@testing-library/dom` instalado por ser peer do `react`.
- Em `e2e/` os imports relativos levam `.ts` (exigência do `nodenext`) e `AxeBuilder` é import nomeado.
- WebKit e Safari móvel sem execução local (ver T4).
Não é do item: `src/shared/formats/phone.ts` e `src/shared/lib/schemas.ts` aparecem como alterados no `git status` só por fim de linha (conteúdo igual ao original).

## Verificação

### Rodada 1 — NAO_CONFERIDO — 2026-10-06, estado 1b3ea5e0346c57580417102cb64d6835a5848be2

| Critério | Status | Evidência |
|---|---|---|
| CA1 | PASSOU | `pnpm test` → 5 arquivos, 19 testes, código 0 (jsdom via bloco `test` do `vite.config.ts`) |
| CA2 | PASSOU | `pnpm test:e2e --project=chromium --project=firefox --project=mobile-chrome --project=edge` → 48 passam; Playwright subiu `pnpm dev` com mocks sozinho |
| CA3 | PASSOU | `formats.test.ts` exercita todos os exemplos do critério; passa |
| CA4 | PASSOU | `schemas.test.ts` passa (lido só pelo resultado; mensagens conferidas pela construção) |
| CA5 | PASSOU | `access.test.ts`: todas as combinações e `//evil.com`, `/\evil`, `https://x`; passa |
| CA6 | PASSOU | `client.test.ts`: 401, 403, 404, 422 (com `fields`), 500 e rede, com o `server` MSW; passa |
| CA7 | PASSOU | `example-form.test.tsx`: vazio mostra "Preencha este campo." em 6 campos sem envio; máscara `(11) 98765-4321` |
| CA8 | PASSOU | `acesso.spec.ts` passa nos 4 projetos locais |
| CA9 | PASSOU | `acesso.spec.ts` (4 perfis, professor barrado, administrador vê configurações) passa nos 4 projetos locais |
| CA10 | PASSOU (parcial) | axe WCAG A/AA sem violação em `/`, `/entrar`, `/gestao`, `/portal`, formulário (e2e) e no componente (vitest). A violação de propósito (img sem alt) só consta da construção; não reexecutada aqui |
| CA11 | NÃO CONFERIDO | `chromium`, `firefox`, `mobile-chrome`, `edge` rodaram; `webkit` e `mobile-safari` não rodam nesta máquina e não estão em "Limitações aceitas" |
| CA12 | NÃO CONFERIDO | `ci.yml` lido: ordem lint, format, tipos, testes, build, depois e2e (job `needs: quality`); sem execução real no Actions e sem limitação aceita |
| CA13 | NÃO CONFERIDO | `ci.yml` tem `upload-artifact` com `if: failure()` e `playwright-report/` (reporter html em CI); não executado |
| CA14 | PASSOU (parcial) | `AGENTS.md` traz comandos, linha de base com testes e publicação adiada (P23). A descrição do PR é da fase de entrega, ainda não existe |

Comandos: `pnpm test` → 19 passam; `pnpm typecheck` → ok; `pnpm lint` → ok; `pnpm format:check` → ok; `pnpm build` → ok; `pnpm test:e2e` nos 4 projetos locais → 48 passam.
Achados:
- sugestão, código, `playwright.config.ts` (`hasEdge` por caminhos fixos) — funciona; só observar que o projeto `edge` não existe na esteira (ubuntu sem Edge), coerente com D3.
- pendência, não é defeito do item: CA11 (webkit, mobile-safari), CA12 e CA13 só se confirmam na primeira execução do Actions. Para seguir, o dono aceita a limitação em "Limitações aceitas" do `AGENTS.md`, ou o resultado do Actions é registrado após abrir o PR.

### Rodada 2 — OK — 2026-10-06, estado 21781afcf45922aea42698ab0ef9a37b04eafc9e

Mudança desde a rodada 1: só `AGENTS.md` (duas linhas em "Limitações aceitas") e este arquivo; código idêntico.

| Critério | Status | Evidência |
|---|---|---|
| CA1 | PASSOU | `pnpm test` → 5 arquivos, 19 testes, código 0 |
| CA2 | PASSOU | `pnpm test:e2e` em chromium, firefox, mobile-chrome, edge → 48 passam |
| CA3 a CA7 | PASSOU | mantido da rodada 1; `pnpm test` reexecutado, 19 passam |
| CA8, CA9 | PASSOU | `acesso.spec.ts` passa nos 4 projetos locais |
| CA10 | PASSOU | axe sem violação nas quatro páginas e no formulário (e2e e vitest); a violação de propósito consta da construção (não reexecutada: não se altera código na verificação) |
| CA11 | NÃO CONFERIDO (limitação aceita) | webkit e mobile-safari não rodam aqui; "Limitações aceitas" do `AGENTS.md` (item #8) |
| CA12 | NÃO CONFERIDO (limitação aceita) | `ci.yml` lido na rodada 1; execução real no Actions após abrir o PR |
| CA13 | NÃO CONFERIDO (limitação aceita) | idem |
| CA14 | PASSOU (parcial) | `AGENTS.md` com comandos, linha de base e publicação adiada (P23); a descrição do PR é da entrega e deve citar a publicação adiada |

Comandos: `pnpm test` → 19 passam; `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm build` → código 0; `pnpm test:e2e` nos 4 projetos locais → 48 passam.
Achados:
- sugestão, código, `playwright.config.ts` (`hasEdge`) — o projeto `edge` não existe na esteira; coerente com D3.

## Entrega

Testes e esteira de qualidade (#8).

- O que muda: Vitest com Testing Library e jsdom (19 testes de formatos, schemas, acesso, cliente da API e formulário de exemplo); Playwright de ponta a ponta com sessão simulada e mocks MSW (acesso por perfil e acessibilidade com axe WCAG A/AA), em chromium, firefox, mobile-chrome, webkit, mobile-safari e, quando existe na máquina, edge; workflow `.github/workflows/ci.yml` com job `quality` (lint, format, tipos, testes, build) e job `e2e`, com relatório do Playwright como artefato em falha; `AGENTS.md` e `src/test/README.md` atualizados.
- Verificação: rodada 2 OK. `pnpm test` (19), `typecheck`, `lint`, `format:check`, `build` e `test:e2e` nos 4 projetos locais (48 testes) passam.
- Limitações: webkit e mobile-safari não rodam na máquina local (Windows); CA11, CA12 e CA13 são conferidos pelo Actions neste PR (aceito pelo dono em "Limitações aceitas").
- Publicação automática e prévia por PR ficam fora, por decisão do dono (P23, "Trabalho adiado"): nada é publicado. O item cumpre só a primeira metade do "Pronto quando" da issue, e o dono decide se fecha a issue #8 ou a mantém aberta até a publicação.
- Decisões: `.prettierrc` com `endOfLine: auto` (CRLF no Windows); proteger o workflow como verificação obrigatória do merge é configuração do repositório, do dono.

Refs #8
