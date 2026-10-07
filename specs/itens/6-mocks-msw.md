# 6 — Mocks da API com MSW (Mock Service Worker)

Origem: issue #6 (`[Preparação] Mocks da API com MSW (Mock Service Worker)`). Branch: `item/6-mocks-msw`.

## 1. Objetivo

Dar ao front um servidor simulado no navegador e em Node (mesmos handlers), com dados fictícios em memória, sessão por perfil e um jeito padrão de simular demora, erro e lista vazia, para as fases seguintes desenvolverem telas sem esperar o back-end. Os handlers viram o mapa da API que o front espera (P4).

Fora do escopo: handlers de recursos de negócio (cada fase cria os dos recursos que usa); o executor de testes e a lista de exemplo rodando nele (item #8, mas os handlers já são importáveis em Node); login real (item #17); regra de negócio nos mocks.

## 2. Requisitos

- R1: o MSW está instalado e o service worker gerado em `public/`.
- R2: o worker só liga quando `VITE_USE_MOCKS=true`; com a variável vazia nada do MSW roda e as chamadas vão à API real (D1).
- R3: os mesmos handlers servem ao navegador (`setupWorker`) e a Node (`setupServer`) (D2).
- R4: os handlers ficam em um arquivo por assunto, com um registro único que os reúne (D3).
- R5: os dados fictícios ficam em memória, em objetos simples, e o que uma chamada cria aparece nas seguintes (D4).
- R6: a sessão simulada tem os perfis Administrador, Professor, Aluno e Responsável, além de "sem sessão" (401) e "sem permissão" (403) (D5).
- R7: qualquer rota aceita simular demora, erro de servidor, lista vazia, 401 e 403 pelo parâmetro `mock` da URL (D6).
- R8: os mocks devolvem dados prontos e não validam nem calculam regra de negócio.
- R9: a lista de exemplo de `/dev/api-exemplo` carrega do MSW em vez do `fetch` simulado (pronto da issue).
- R10: está documentado como acrescentar um handler.

## 3. Critérios de aceite

- CA1 (R1, R2): dado `VITE_USE_MOCKS=true`, quando `pnpm dev` abre `/dev/api-exemplo`, então a lista carrega e a requisição `/exemplo` aparece atendida pelo service worker.
- CA2 (R2): dado `VITE_USE_MOCKS` vazio, quando o app abre, então nenhum worker é registrado e `/exemplo` vai ao endereço real.
- CA3 (R3): dado o servidor Node com os mesmos handlers, quando um script chama `api.get('/exemplo?page=1&pageSize=20')`, então devolve a mesma página que o navegador.
- CA4 (R5): dado um `POST /exemplo` com `{ name }`, quando se repete o `GET /exemplo`, então o item novo aparece; após recarregar a página, a lista volta ao estado inicial.
- CA5 (R6): dado nenhum perfil escolhido, quando `GET /exemplo`, então 401; dado perfil Aluno ou Responsável, então 403; dado Administrador ou Professor, então 200.
- CA6 (R6): dado `POST /sessao/simulada` com um perfil, quando `GET /sessao`, então devolve `{ profile }`; sem perfil, 401.
- CA7 (R7): dado `?mock=vazio`, `?mock=erro`, `?mock=401`, `?mock=403` e `?mock=demora`, quando `GET /exemplo`, então devolve respectivamente lista vazia, 500, 401, 403 e resposta atrasada em 2 s.
- CA8 (R7): dado `?mock=erro` em outra rota qualquer registrada (ex.: `/sessao`), então também 500.
- CA9 (R8, R4): dado a revisão dos handlers, então nenhum deles valida campo nem calcula valor, e cada assunto está em arquivo próprio.
- CA10 (R9): dado `/dev/api-exemplo?estado=vazio|erro`, então mostra vazio e erro pelos mesmos estados de antes, via MSW.
- CA11 (R10): dado o `AGENTS.md`/`src/mocks/README.md`, então há o passo a passo de um handler novo.

## 4. Plano técnico

- Dados: em memória (`src/mocks/db.ts`, a criar): objetos simples com `reset()`; sem `@mswjs/data` (D4).
- API: mapa provisório criado nos handlers, sem regra: `GET /sessao`, `POST /sessao/simulada` (só mock), `GET`/`POST /exemplo`. Contrato de erro e página de `src/shared/api/types.ts`.
- Interface: `src/shared/api/example-list.tsx` passa a usar o cliente real (`api`) e sem o `fakeFetch`; nada mais muda.
- Segurança: mocks nunca em produção: ligados só por `VITE_USE_MOCKS=true`, lida em `src/shared/api/env.ts`; sem dado real nem segredo nos fictícios. A permissão real é do servidor; o 403 do mock é só simulação.
- Arquivos a alterar (vistos): `package.json`, `src/main.tsx` (inicia o worker antes de renderizar), `src/shared/api/example-list.tsx`, `.env.example` (comentário), `AGENTS.md` (comando/estrutura, na entrega). A criar: `public/mockServiceWorker.js` (gerado por `msw init`), `src/mocks/{browser.ts,node.ts,handlers.ts,db.ts,scenario.ts,README.md}`, `src/mocks/handlers/{sessao.ts,exemplo.ts}`.
- Reuso: `api` e `ApiError` de `src/shared/api`, tipos `Page` e `Profile` (`src/shared/lib/session.ts`), `USE_MOCKS` de `env.ts`.
- Riscos: (a) worker publicado em `dist` por estar em `public/`: o código não o registra sem a variável, e o risco fica anotado; (b) imports com extensão `.ts` nos arquivos usados em Node, como no cliente; (c) `main.tsx` não pode atrasar o app quando os mocks estão desligados: import dinâmico só com a variável ligada.

## 5. Tarefas

- [x] T1: instalar `msw` (dev), rodar `msw init public/ --save` e criar `db.ts`, `scenario.ts` (parâmetro `mock`), `handlers/sessao.ts`, `handlers/exemplo.ts`, `handlers.ts`, `browser.ts` e `node.ts` — cobre CA4, CA5, CA6, CA7, CA8, CA9 — prova: script temporário com `setupServer` chamando as rotas e `pnpm typecheck`
- [x] T2: iniciar o worker em `src/main.tsx` só com `USE_MOCKS` e trocar `example-list.tsx` para o cliente real — cobre CA1, CA2, CA3, CA10 — prova: `pnpm dev` com a variável ligada e desligada no navegador; `pnpm build && pnpm lint && pnpm format:check`
- [x] T3: escrever `src/mocks/README.md` (como acrescentar handler, parâmetro `mock`, perfis) e citar no `.env.example` — cobre CA11 — prova: leitura do arquivo

## 6. Decisões

- D1: uma só variável, `VITE_USE_MOCKS=true`, liga o worker (desenvolvimento e demonstração); produção a deixa vazia. Alternativa: duas variáveis, descartada por excesso.
- D2: `src/mocks/node.ts` exporta o `setupServer` pronto; o executor de testes é do #8, que só o importa. Alternativa: instalar o executor aqui, descartada por invadir o #8.
- D3: um arquivo por assunto em `src/mocks/handlers/`; nesta fase só `sessao` e `exemplo`, os demais assuntos da issue nascem com cada fase.
- D4: objetos simples em memória, sem `@mswjs/data` (resolve o "Em aberto" da issue): sem relações a modelar ainda; se uma fase pedir, troca-se a biblioteca só em `db.ts`.
- D5: a sessão do mock é um perfil guardado em memória, definido por `POST /sessao/simulada` (só existe no mock); é independente da sessão em `sessionStorage` do item #4, que o item #17 substitui. Alternativa: ler o `sessionStorage` nos handlers, descartada por acoplar mock e front.
- D6: demora, erro e vazio por `?mock=demora|erro|vazio|401|403` na URL da requisição, aplicado por uma função comum em `scenario.ts`; "vazio" só atua em rotas de lista. Alternativa: painel na tela, descartada por ser mais código. Demora fixa de 2 s.
- Suposição: o formato `/sessao` e `/exemplo` é provisório (P4); se o contrato real vier diferente, ajustam-se só os handlers.

## Construção

- T1 — arquivos: `package.json`, `pnpm-lock.yaml`, `public/mockServiceWorker.js`, `eslint.config.js` (ignora `public`), `src/mocks/{db,scenario,handlers,browser,node}.ts`, `src/mocks/handlers/{sessao,exemplo}.ts` — prova: script temporário (removido) com `setupServer` e `createApiClient({ baseUrl: 'http://localhost' })` cobrindo CA4 (POST persiste), CA5 (401/403/200 por perfil), CA6, CA7 (vazio, erro, 401, 403, demora ≥ 1,9 s), CA8 (`/sessao?mock=erro` → 500), reset; todos ok; `pnpm typecheck` → passa
- T2 — arquivos: `src/main.tsx`, `src/shared/api/example-list.tsx` — prova: `pnpm dev` com `VITE_USE_MOCKS=true` e sem, no Edge headless via DevTools: com mocks lista "Exemplo A/B", `?estado=vazio` mostra vazio, `?estado=erro` mostra erro, 1 service worker registrado e `/exemplo` atendida; sem mocks 0 worker e `/exemplo` vai ao servidor (404 do Vite, exibido como erro); `pnpm build`, `pnpm lint`, `pnpm format:check` → passam
- T3 — arquivos: `src/mocks/README.md`, `.env.example` — prova: leitura do arquivo; contém passo a passo, parâmetro `mock` e perfis

Regressão: `pnpm build && pnpm lint && pnpm format:check && pnpm typecheck` → todos passam, igual à linha de base (sem testes ainda, item #8).
Desvios:
- Caminhos dos handlers usam prefixo `*/` (ex.: `*/exemplo`) para funcionar em Node, onde caminho relativo não resolve.
- No navegador o mock inicia com perfil Administrador (`src/main.tsx`), senão `/dev/api-exemplo` daria 401 e a CA1 não carregaria a lista; em Node (CA5) começa sem sessão.
- `eslint.config.js` passou a ignorar `public/` (o `mockServiceWorker.js` gerado gerava aviso).
- CA3 provado com `createApiClient({ baseUrl })`, pois `api` usa base vazia e Node não aceita URL relativa.
- `README.md` e `AGENTS.md` citam a estrutura; `AGENTS.md` atualizado agora.
- CA10: `?estado=` da página vira `?mock=` na requisição; `401`/`403` seguem o mesmo mapeamento.
Não é do item: arquivos `src/router.tsx`, `src/shared/api/{client,env,errors,query,types}.ts`, `src/shared/components/query-state.tsx`, `src/shared/lib/session.ts` aparecem como modificados só por fim de linha (LF/CRLF, `core.autocrlf`) após `pnpm format`; sem mudança de conteúdo.

## Verificação

### Rodada 1 — NAO_CONFERIDO — 2026-10-06, estado 2b166fb5bd99aac56b5b90f3124296b4175859f1

| Critério | Status | Evidência |
|---|---|---|
| CA1 | NÃO CONFERIDO | sem navegador utilizável na verificação (Edge headless `--dump-dom` não renderizou `/dev/api-exemplo`); código de `main.tsx` e `browser.ts` lido, coerente, mas não observado |
| CA2 | NÃO CONFERIDO | idem; `main.tsx` só importa o worker dentro de `if (USE_MOCKS)` (lido, não observado) |
| CA3 | PASSOU | script Node temporário (removido), `setupServer` + `createApiClient({baseUrl})`: GET `/exemplo?page=1&pageSize=20` devolve `{items:[A,B],total:2,page:1,pageSize:20}` |
| CA4 | PASSOU | POST `/exemplo {name:'Novo'}` e novo GET traz o item 3; reload do navegador não observado, mas a semente é recriada por `db.ts` ao carregar o módulo |
| CA5 | PASSOU | sem perfil 401; aluno e responsável 403; administrador e professor 200 |
| CA6 | PASSOU | `POST /sessao/simulada` professor, `GET /sessao` -> `{profile:'professor'}`; após `db.reset()` 401 |
| CA7 | PASSOU | `vazio` lista vazia, `erro` 500, `401`, `403`, `demora` 2010 ms |
| CA8 | PASSOU | `/sessao?mock=erro` -> 500 |
| CA9 | PASSOU | leitura: handlers sem validação nem cálculo; `sessao.ts` e `exemplo.ts` em arquivos próprios, registro em `handlers.ts` |
| CA10 | NÃO CONFERIDO | sem navegador; `example-list.tsx` usa `api` com `?mock=${estado}` (lido) |
| CA11 | PASSOU | `src/mocks/README.md` tem passo a passo, parâmetro `mock` e perfis; `AGENTS.md` cita a estrutura |

Comandos: `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm build` -> todos passam (igual à linha de base); script Node de CA3 a CA8 -> saídas acima. Teste em navegador (Edge headless por `--dump-dom`) -> sem resultado útil; servidor de desenvolvimento e Edge encerrados.
Achados:
- sugestão, código, `public/mockServiceWorker.js` — vai para `dist` (risco (a) já anotado na especificação); o registro só ocorre com `VITE_USE_MOCKS=true`.
- sugestão, código, `src/mocks/handlers/exemplo.ts` — id do item novo é `length + 1`; sem exclusão não colide, mas pode colidir se uma fase acrescentar remoção.
- NAO_CONFERIDO: CA1, CA2 e CA10 exigem navegador e não estão em "Limitações aceitas" do `AGENTS.md`. Para seguir: conferir no navegador (`pnpm dev` com e sem `VITE_USE_MOCKS=true`; `?estado=vazio|erro`) ou o dono registrar a limitação em "Limitações aceitas". A construção diz ter provado os três no Edge headless.

### Rodada 2 — OK — 2026-10-06, estado 55cf87a4123c2185c69ddd7abb729b06017e8b44

Desde a rodada 1 só mudaram `AGENTS.md` (limitação aceita do item #6) e este arquivo; nenhum código mudou (`git diff` entre os estados).

| Critério | Status | Evidência |
|---|---|---|
| CA1 | NÃO CONFERIDO (limitação aceita) | "Limitações aceitas" do `AGENTS.md`, item #6 |
| CA2 | NÃO CONFERIDO (limitação aceita) | idem |
| CA3 | PASSOU | mantido da rodada 1 |
| CA4 | PASSOU | mantido da rodada 1 |
| CA5 | PASSOU | mantido da rodada 1 |
| CA6 | PASSOU | mantido da rodada 1 |
| CA7 | PASSOU | mantido da rodada 1 |
| CA8 | PASSOU | mantido da rodada 1 |
| CA9 | PASSOU | mantido da rodada 1 |
| CA10 | NÃO CONFERIDO (limitação aceita) | idem CA1 |
| CA11 | PASSOU | mantido da rodada 1 |

Comandos: `pnpm typecheck && pnpm lint && pnpm format:check && pnpm build` -> todos passam (igual à linha de base; sem testes, item #8).
Achados:
- sugestão, código, `public/mockServiceWorker.js` — vai para `dist`; só registra com `VITE_USE_MOCKS=true` (mantido da rodada 1).
- sugestão, código, `src/mocks/handlers/exemplo.ts` — id novo é `length + 1`; pode colidir se surgir remoção (mantido da rodada 1).

## Entrega

Mocks da API com MSW: com `VITE_USE_MOCKS=true` o navegador registra o service worker e atende `/sessao`, `/sessao/simulada` e `/exemplo` com dados em memória (`src/mocks/`); sem a variável nada é carregado. Cenários de demora, erro, vazio, 401 e 403 por `?mock=` na requisição; `/dev/api-exemplo` aceita `?estado=` e o repassa. Passo a passo em `src/mocks/README.md`.

Verificação: rodada 2 OK. `pnpm typecheck`, `pnpm lint`, `pnpm format:check` e `pnpm build` passam, igual à linha de base (sem testes, item #8). CA3 a CA9 e CA11 provados por script Node temporário.

Decisões e limitações:
- CA1, CA2 e CA10 (renderização no navegador) sem conferência independente; limitação aceita pelo dono no `AGENTS.md`.
- `public/mockServiceWorker.js` vai para o `dist`, mas só registra com `VITE_USE_MOCKS=true`.
- Id do item novo em `/exemplo` é `length + 1`; revisar se surgir remoção.
- O formato de `/sessao` e `/exemplo` é provisório; ajustam-se só os handlers.

## Atualização — decisão da #15 (07/10/2026)

Nota acrescentada depois da entrega; o texto acima não foi alterado.

- A ordem se inverte: os handlers definem os payloads e o back-end parte deles (a issue previa o handler "conferido contra a API real"). Quando o OpenAPI existir, os handlers passam a ser conferidos contra ele e continuam servindo ao desenvolvimento e aos testes.
- O formato de `/sessao` e `/exemplo`, tratado como provisório (P4), passa a ser o primeiro rascunho do contrato.
- Não mudam: o MSW só liga com `VITE_USE_MOCKS=true`, os mesmos handlers servem ao navegador e a Node, e os mocks não têm regra de negócio.
