# 5 — Cliente da API e contrato com o back-end

Origem: issue #5 (`[Preparação] Cliente da API e contrato com o back-end`), com `docs/gestao/README.md` (Fase 0) e `docs/site-e-acesso/README.md` (RNF-S14, RNF-S15). Branch: `item/5-cliente-api-contrato`.

## 1. Objetivo

Dar ao front um cliente único de chamadas ao servidor e uma camada de dados (cache, carregando, vazio, erro e nova tentativa), com um contrato provisório (erro, paginação, datas) que os itens seguintes e o MSW (#6) copiam. A sessão é cookie protegido: o front não guarda credencial.

Fora do escopo: handlers e inicialização do MSW (item #6; aqui só se lê `VITE_USE_MOCKS`); login real e troca da sessão simulada (item #17); qualquer endpoint de negócio; tipos gerados (não há contrato do servidor ainda); testes automatizados e CI (item #8); obter o "documento de contexto do projeto" e combinar o padrão com o back-end (trabalho de pessoa, ligado a P4).

## 2. Requisitos

- R1: todas as chamadas ao servidor passam por um cliente único em `src/shared/api`, com endereço-base vindo de `VITE_API_URL` (D1).
- R2: a credencial vai só em cookie protegido enviado com a requisição (`credentials: 'include'`); o front não lê nem guarda token ou senha (RNF-S14).
- R3: requisição que altera dados (POST, PUT, PATCH, DELETE) leva o token anti-forjamento que o servidor entregar, e o cliente não envia nada se ele não existir além do cookie (RNF-S15) (D2).
- R4: toda falha vira um `ApiError` de tipo fixo: sem sessão (401), sem permissão (403), não encontrado (404), entrada inválida (400/422, com erros por campo), servidor (5xx) e rede/tempo esgotado (D3).
- R5: o 401 encerra a sessão do front e leva ao login com retorno à tela pedida, pelo mecanismo existente de `RequireAccess`; o 403 não encerra a sessão (D4) (muda o comportamento).
- R6: a camada de dados usa TanStack Query com nova tentativa só para falha de rede e 5xx (no máximo 2) e nunca para 4xx (D5).
- R7: existe um componente compartilhado que mostra carregando, vazio, erro com "Tentar de novo" e conteúdo, com texto em português simples e dizendo o que aconteceu.
- R8: o contrato provisório fica em tipos TypeScript: erro `{ code, message, fields? }`, lista paginada `{ items, total, page, pageSize }` e datas em texto ISO 8601 (D3, D6).
- R9: trocar mocks por API real é só variável de ambiente: `VITE_API_URL` vazio usa o mesmo endereço do app (onde o MSW responde) e `VITE_USE_MOCKS` fica exposta em um só lugar para o item #6 (D1).
- R10: uma lista de exemplo, só em desenvolvimento, carrega pelo cliente e mostra os estados carregando, vazio e erro (pronto da issue) (D7).
- R11: build, lint, typecheck e format:check continuam passando e o site (`/`) não baixa código da gestão nem do portal (RNF-S09).

## 3. Critérios de aceite

- CA1 (R1, R9): dado `VITE_API_URL=https://api.exemplo`, quando o cliente chama `/alunos`, então a requisição vai a `https://api.exemplo/alunos`; com a variável vazia, vai a `/alunos` do mesmo endereço do app.
- CA2 (R2): dado qualquer chamada, quando se inspeciona a requisição, então tem `credentials: 'include'` e não há `Authorization`, `localStorage` nem `sessionStorage` guardando credencial (`grep` em `src/shared/api`).
- CA3 (R3): dado o cookie `XSRF-TOKEN` presente, quando o cliente faz POST, PUT, PATCH ou DELETE, então envia o cabeçalho `X-XSRF-TOKEN` com o valor; em GET não envia; sem o cookie, não envia o cabeçalho.
- CA4 (R4): dado resposta 401, 403, 404, 422 com `fields`, 500 e falha de `fetch`, quando o cliente chama, então rejeita com `ApiError` de tipo `unauthorized`, `forbidden`, `not-found`, `invalid` (com `fields`), `server` e `network`, nessa ordem; corpo de erro que não seja JSON no formato do contrato ainda gera `ApiError` com mensagem padrão em português.
- CA5 (R4): dado resposta que não chega em 15 segundos, quando o tempo esgota, então rejeita com `ApiError` `network` e a requisição é cancelada.
- CA6 (R5): dado sessão simulada aberta em `/gestao`, quando uma chamada devolve 401, então a sessão fecha e a pessoa vai a `/entrar?voltar=/gestao`; com 403, a sessão continua e a tela mostra o erro "Você não tem permissão para isso".
- CA7 (R6): dado falha de rede ou 500, quando a consulta roda, então são feitas até 3 tentativas no total; dado 401, 403, 404 ou 422, então 1 só.
- CA8 (R7): dado o componente com consulta carregando, com lista vazia, com erro e com dados, quando renderiza, então mostra respectivamente indicador de carregamento, mensagem de vazio, mensagem de erro com botão "Tentar de novo" que refaz a consulta, e o conteúdo.
- CA9 (R8): dado `pnpm typecheck`, quando um tipo de lista ou de erro é usado fora do formato, então falha; o exemplo usa `Page<T>` e `ApiErrorBody`.
- CA10 (R9): dado `.env.example`, quando lido, então lista só `VITE_API_URL` e `VITE_USE_MOCKS` sem valores; `src/shared/api/env.ts` é o único arquivo que lê `import.meta.env` dessas duas variáveis.
- CA11 (R10): dado `pnpm dev`, quando se abre `/dev/api-exemplo`, então a lista passa pelo cliente e mostra carregando, depois dados; com `?estado=vazio` mostra o vazio; com `?estado=erro` mostra o erro, e "Tentar de novo" refaz a chamada.
- CA12 (R10): dado `pnpm build`, quando se busca `api-exemplo` em `dist`, então não existe (rota só de desenvolvimento).
- CA13 (R11): dado o projeto, quando se rodam `pnpm build`, `pnpm lint`, `pnpm typecheck` e `pnpm format:check`, então todos terminam com código 0, e abrir `/` sem sessão não pede arquivo de `gestao` nem de `portal`.

## 4. Plano técnico

- Dados: não muda (o modelo é do servidor).
- API: o front não cria rota. Define o contrato provisório que ele espera (D3, D6): erro `{ code, message, fields?: Record<string, string> }`; lista `GET ...?page=1&pageSize=20` devolvendo `{ items, total, page, pageSize }`; datas ISO 8601 em texto; nomes de campo em `camelCase`; token anti-forjamento no cookie `XSRF-TOKEN`, devolvido no cabeçalho `X-XSRF-TOKEN`. Tudo isso é proposta até P4 ser respondida; os tipos em `src/shared/api/types.ts` são o ponto único para ajustar.
- Interface: `QueryClientProvider` em `src/main.tsx`; componente `QueryState` para os quatro estados; rota `/dev/api-exemplo` só com `import.meta.env.DEV`, em bloco `lazy` próprio, sem layout de área, com `h1` e título "API (exemplo) · Academy". O exemplo usa `fetch` simulado dentro do próprio arquivo (devolve itens, lista vazia ou erro conforme `?estado=`) injetado no cliente, porque o MSW é do item #6.
- Segurança: cookie de sessão `HttpOnly`, `Secure` e `SameSite` é configurado pelo servidor; o front só envia `credentials: 'include'` e nunca grava credencial em storage. Anti-forjamento conforme R3. `ApiError.message` mostrada ao usuário é a do contrato ou a padrão; nada de detalhe interno nem de corpo da resposta na tela. O exemplo não envia dado pessoal. A permissão continua sendo do servidor: o 403 só informa (`AGENTS.md`). Se `VITE_API_URL` apontar para outra origem, o servidor precisa liberar CORS com credenciais para a origem do app (anotar no plano de #6 e na hospedagem, item #8).
- Arquivos a criar: `src/shared/api/env.ts` (lê as duas variáveis); `src/shared/api/types.ts` (`Page<T>`, `ApiErrorBody`); `src/shared/api/errors.ts` (`ApiError`, classificação por status); `src/shared/api/client.ts` (`createApiClient({ baseUrl, fetchImpl })` e `api` padrão com `get/post/put/patch/delete`, tempo limite de 15 s, JSON, `credentials`, token anti-forjamento); `src/shared/api/query.ts` (`queryClient`, regra de nova tentativa, tratamento global de 401); `src/shared/components/query-state.tsx`; `src/shared/api/example-list.tsx` (página de exemplo, DEV).
- Arquivos a alterar (vistos): `src/main.tsx`, `src/router.tsx` (rota de exemplo só em DEV), `package.json` e `pnpm-lock.yaml` (`@tanstack/react-query`), `AGENTS.md` (cliente, contrato provisório, rota de exemplo), `.env.example` (já tem os dois nomes; conferir sem mudar valores).
- Reuso: `signOut` e `useSession` de `src/shared/lib/session.ts` (o 401 chama `signOut`; `RequireAccess` já leva ao login com `?voltar=`), `safeReturnPath`/`decideAccess` de `src/shared/lib/access.ts`, `cn` e componentes de `src/shared/components/ui`, `EmptyPage` como modelo de aviso. `src/shared/api` hoje só tem `.gitkeep`, que sai.
- Regra de pastas: `src/shared/api` não importa de `gestao` nem de `portal`.
- Riscos: (a) o contrato real pode divergir (D3): os tipos e `errors.ts` concentram o ajuste; (b) o 401 em página sem sessão simulada não deve entrar em laço: `signOut` sem sessão não muda nada e o guarda só redireciona onde há `RequireAccess`; (c) `queryClient` global compartilha cache entre contas: `signOut` limpa o cache (`queryClient.clear()`) para não mostrar dado da conta anterior; (d) sem testes automatizados (item #8), a prova é script temporário com `fetch` simulado e execução no navegador.

## 5. Tarefas

- [x] T1: instalar `@tanstack/react-query`; criar `src/shared/api/{env,types,errors}.ts` — cobre CA9, CA10 — prova: `pnpm typecheck`; `grep` de `import.meta.env` em `src/shared/api`
- [x] T2: criar `src/shared/api/client.ts` com base, `credentials: 'include'`, cabeçalho `X-XSRF-TOKEN` em métodos que alteram, JSON, tempo limite de 15 s e conversão de falhas em `ApiError` — cobre CA1, CA2, CA3, CA4, CA5 — prova: script temporário (`node --experimental-strip-types`) com `fetch` simulado para cada status, rede, tempo esgotado e cookie com e sem token; `grep` de `Authorization|localStorage|sessionStorage` em `src/shared/api` sem resultado
- [x] T3: criar `src/shared/api/query.ts` (`queryClient`, nova tentativa só em `network` e `server` até 2 vezes, 401 chama `signOut` e limpa o cache) e envolver o app em `src/main.tsx` — cobre CA6, CA7 — prova: script temporário da função de nova tentativa; em `pnpm dev`, com sessão de Administrador em `/gestao`, simular 401 pelo exemplo e conferir ida a `/entrar?voltar=/gestao`
- [x] T4: criar `src/shared/components/query-state.tsx` com carregando, vazio, erro (com "Tentar de novo") e conteúdo, e o 403 com texto próprio — cobre CA6, CA8 — prova: `pnpm typecheck`; conferido no navegador em T5
- [x] T5: criar `src/shared/api/example-list.tsx` e a rota `/dev/api-exemplo` só em DEV em `src/router.tsx`; remover `src/shared/api/.gitkeep` — cobre CA11, CA12, CA13 — prova: em `pnpm dev`, abrir `/dev/api-exemplo`, `?estado=vazio`, `?estado=erro` e `?estado=401`/`403`; `pnpm build` e `grep -r api-exemplo dist` sem resultado
- [x] T6: atualizar `AGENTS.md` (cliente, contrato provisório, rota de exemplo, `QueryState`) e conferir `.env.example` — não cobre critério: mantém o guia dos agentes verdadeiro — prova: leitura; `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm format:check` com código 0

## 6. Decisões

- D1: o endereço-base é `VITE_API_URL`; vazio significa mesmo endereço do app, que é onde o MSW (#6) intercepta. `VITE_USE_MOCKS` é lida só em `env.ts`; quem a usa para ligar o MSW é o item #6. Alternativa descartada: um cliente para mocks e outro para a API real.
- D2: o anti-forjamento segue o padrão de cookie legível `XSRF-TOKEN` copiado para o cabeçalho `X-XSRF-TOKEN`, porque a issue pede "conforme o que o servidor exigir" e esse é o padrão mais comum. Se o servidor exigir outro, só o cliente muda. Suposição: se o servidor usar apenas `SameSite`, o cabeçalho é ignorado sem dano.
- D3 (muda o comportamento): enquanto P4 não é respondida, vale o contrato provisório da seção 4 (erro, paginação, datas), adotando a proposta da issue #15 como pede o backlog. Se o contrato real vier diferente, ajustam-se `types.ts` e `errors.ts`; handlers e telas dos itens seguintes já nascem sobre eles.
- D4 (muda o comportamento): 401 encerra a sessão do front e leva ao login com retorno; 403 só informa e mantém a sessão. Motivo: 401 significa sessão inválida e 403 significa conta sem permissão (RF-LGN-08, RN-BAS-01). Alternativa: tratar 403 como saída, descartada por perder a sessão válida.
- D5: TanStack Query, proposta da issue; nova tentativa até 2 vezes só para rede e 5xx, sem repetir 4xx nem mutações (para não duplicar efeito). Alternativa: SWR, sem ganho para o projeto.
- D6: tipos escritos à mão em `types.ts`; gerar a partir do contrato fica para quando existir contrato (a tarefa da issue "gerados a partir dele, quando existir" não é feita agora). Suposição: se o servidor entregar OpenAPI, um item novo troca os tipos.
- D7: o pronto da issue ("lista de exemplo") é cumprido por rota só de desenvolvimento com `fetch` simulado injetado, e não por MSW, que é o item #6; a rota sai quando houver a primeira lista real (#16 em diante). Alternativa: adiantar o MSW, descartada por invadir o #6.
- Suposição: o cookie de sessão e o `XSRF-TOKEN` estão na mesma origem ou no mesmo site do app; se a API ficar em outro domínio, vale a nota de CORS e `SameSite` na seção 4 e muda a hospedagem do item #8.
- Fora do item: obter o "documento de contexto do projeto" e combinar o padrão com o back-end é trabalho de pessoa, ligado a P4; não vira tarefa aqui.

## Construção

- T1 — arquivos: `package.json`, `pnpm-lock.yaml`, `src/shared/api/{env,types,errors}.ts` — prova: `pnpm typecheck` → 0; `grep import.meta.env src/shared/api` → só `env.ts`
- T2 — arquivos: `src/shared/api/client.ts` — prova: script temporário `node --experimental-strip-types` (fetch simulado: base com e sem `VITE_API_URL`, `credentials`, cookie com e sem token em GET/POST/PUT/PATCH/DELETE, 401/403/404/422 com fields/500/corpo não JSON/rede/tempo esgotado com abort) → "T2 OK"; `grep Authorization|localStorage|sessionStorage src/shared/api` → sem resultado
- T3 — arquivos: `src/shared/api/query.ts`, `src/main.tsx` — prova: script temporário com `QueryClient` real (retryDelay 0): server e network 3 chamadas, invalid e forbidden 1 → "T3 OK"; no Edge headless (CDP) com sessão administrador em `/gestao`, 401 pelo exemplo → `sessionStorage` da sessão vazio
- T4 — arquivos: `src/shared/components/query-state.tsx` — prova: `pnpm typecheck` → 0; estados conferidos no navegador em T5
- T5 — arquivos: `src/shared/api/example-list.tsx`, `src/router.tsx`, `.gitkeep` removido — prova: Edge headless em `pnpm dev`: `/dev/api-exemplo` → Exemplo A/B, `?estado=vazio` → "Nenhum item para mostrar.", `?estado=erro` → mensagem + "Tentar de novo", `?estado=403` → "Você não tem permissão para isso."; título "API (exemplo) · Academy"; `pnpm build` e `grep -r api-exemplo dist` → sem resultado
- T6 — arquivos: `AGENTS.md`; `.env.example` conferido sem mudança (2 nomes sem valor) — prova: `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm format:check` → todos 0

Regressão: build, lint, typecheck e format:check → 0 (igual à linha de base; não há testes).
Desvios: `env.ts` usa `import.meta.env?.` para o cliente poder ser importado em script do Node. A rota de exemplo entra em `routes[0].children` (dentro de `PageTitle`) para ter o título. "Tentar de novo" do erro e a volta a `/entrar?voltar=/gestao` não foram vistos de ponta a ponta no navegador: o 401 foi visto fechando a sessão, e o redirecionamento é o `RequireAccess` do item #4 (não alterado), já que o exemplo não fica sob `/gestao`. O `queryClient.clear()` ocorre só no 401; sair pelo botão não limpa o cache (o `signOut` de `session.ts` não importa `api`, para evitar ciclo).
Não é do item: nenhum.

## Verificação

### Rodada 1 — CORRIGIR_CODIGO — 2026-10-06, estado d97aa733e100a3601f14180fe6d985a60929340b

| Critério | Status | Evidência |
|---|---|---|
| CA1 | PASSOU | script Node com fetch simulado: base `https://api.exemplo` + `/alunos` → URL correta; base vazia usa o caminho relativo (código `baseUrl + path`, `API_URL` padrão `''`) |
| CA2 | PASSOU | `credentials: 'include'` visto em todas as chamadas do script; `grep Authorization\|localStorage\|sessionStorage src/shared/api` sem resultado |
| CA3 | PASSOU | script com cookie `XSRF-TOKEN`: GET sem cabeçalho; POST/PUT/PATCH/DELETE com `X-XSRF-TOKEN` (valor decodificado); sem cookie, sem cabeçalho |
| CA4 | PASSOU | script: 401 unauthorized, 403 forbidden, 404 not-found, 422 invalid com `fields`, 500 server (corpo HTML) e 400 sem corpo com mensagem padrão, falha de fetch network |
| CA5 | PASSOU | script com `timeoutMs` curto e fetch que respeita `signal`: `network` e `signal.aborted === true` (limite de 15 s lido no código, constante `TIMEOUT_MS`) |
| CA6 | NÃO CONFERIDO | 403 visto no navegador ("Você não tem permissão para isso."); 401 → `signOut` e `/entrar?voltar=/gestao` não observados de ponta a ponta (leitura: `onError` chama `signOut`, que emite para `useSession`, e `RequireAccess` redireciona) |
| CA7 | PASSOU | leitura de `shouldRetry` (`failureCount < 2`, só `network`/`server`) = 3 chamadas no total; 4xx = 1; não executado com `QueryClient` nesta rodada |
| CA8 | PASSOU | Edge headless em `pnpm dev`: carregando não capturado; vazio, erro com "Tentar de novo" e conteúdo vistos; clique em "Tentar de novo" não exercitado |
| CA9 | PASSOU | `pnpm typecheck` → 0; `Page<T>` e `ApiErrorBody` usados no exemplo e no erro |
| CA10 | PASSOU | `.env.example` com só `VITE_API_URL=` e `VITE_USE_MOCKS=`; `import.meta.env` do app só em `env.ts` (demais usos: `DEV` em `router.tsx` e `login.tsx`) |
| CA11 | PASSOU | Edge headless: `/dev/api-exemplo` → Exemplo A/B; `?estado=vazio` → "Nenhum item para mostrar."; `?estado=erro` → mensagem + "Tentar de novo"; título "API (exemplo) · Academy" |
| CA12 | PASSOU | `pnpm build` e `grep -r api-exemplo dist` sem resultado |
| CA13 | PASSOU | build, lint, typecheck, format:check → 0; áreas continuam em chunks `lazy` (o chunk de entrada só cita "Configurações" como título de rota); abrir `/` sem sessão não foi medido na rede |

Comandos: `pnpm typecheck` 0; `pnpm lint` 0; `pnpm format:check` 0; `pnpm build` 0; scripts temporários Node (`--experimental-strip-types`) para o cliente; Edge headless `--dump-dom` em `pnpm dev` nas quatro URLs do exemplo. Não há testes automatizados (linha de base do `AGENTS.md`).
Achados:
- obrigatório, código, `src/shared/api/query.ts` (`onError`) e `src/shared/lib/session.ts` (`signOut`/`signIn`) — esperado: o plano técnico, risco (c), diz que `signOut` limpa o cache para não mostrar dado da conta anterior; observado: `queryClient.clear()` só roda no 401, então sair pelo botão e entrar com outra conta na mesma aba mantém o cache da conta anterior (a Construção registra o desvio); evidência: leitura de `query.ts` e `session.ts` (`signOut` não limpa nada); corrigir: limpar o cache em todo encerramento e troca de sessão, sem criar ciclo de importação (por exemplo, `session.ts` expõe um gancho de limpeza que `query.ts` registra, ou `main.tsx` assina a sessão).
- sugestão, código, `src/shared/api/client.ts` — o tempo limite é desligado (`clearTimeout` no `finally`) antes de ler o corpo; corpo que trava depois dos cabeçalhos não esgota em 15 s.
- sugestão, código — `CA6` 401 de ponta a ponta e o clique em "Tentar de novo" ficaram sem observação; conferir na próxima rodada, se possível.

### Correção da rodada 1
- achado obrigatório (cache limpo só no 401) corrigido — arquivos: `src/shared/lib/session.ts` (`subscribe` exportado), `src/shared/api/query.ts` (`subscribe(() => queryClient.clear())`; `onError` só chama `signOut`) — o cache agora é limpo em todo `signIn` e `signOut`, sem ciclo de importação (`session.ts` continua sem importar `api`) — prova: `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm build` → todos 0; `grep -r api-exemplo dist` → sem resultado. Não rodou no navegador. Sugestões da rodada não adotadas (opcionais).

### Rodada 2 — NAO_CONFERIDO — 2026-10-06, estado 3659d4994930820500dece5c0f7438fc08f6ddf8

| Critério | Status | Evidência |
|---|---|---|
| CA1 a CA5 | PASSOU | mantido da rodada 1 (`client.ts` e `errors.ts` não mudaram: `git diff d97aa73 3659d49 -- src` só toca `query.ts` e `session.ts`) |
| CA6 | NÃO CONFERIDO | 403 visto na rodada 1; 401 → `/entrar?voltar=/gestao` de ponta a ponta continua sem observação nesta máquina e não está em "Limitações aceitas" |
| CA7 | PASSOU | mantido da rodada 1 (`shouldRetry` inalterada; leitura, sem execução com `QueryClient`) |
| CA8, CA11 | PASSOU | mantido da rodada 1 |
| CA9, CA10, CA12 | PASSOU | typecheck 0; `.env.example` inalterado; `grep -r api-exemplo dist` sem resultado (código 1) |
| CA13 | PASSOU | build, lint, typecheck, format:check → 0 |

Achado obrigatório da rodada 1 (cache da conta anterior): corrigido. `session.ts` exporta `subscribe`; `query.ts` registra `subscribe(() => queryClient.clear())`, e `signIn` e `signOut` chamam `emit()`, então todo login e logout limpa o cache. `session.ts` não importa `api` (sem ciclo; typecheck 0). Conferido por leitura do diff, não executado no navegador.

Comandos: `git diff d97aa73 3659d49 -- src`; `pnpm typecheck` 0; `pnpm lint` 0; `pnpm format:check` 0; `pnpm build` 0; `grep -r api-exemplo dist` sem resultado.
Achados:
- sugestão, código, `src/shared/api/client.ts` — mantida da rodada 1: o tempo limite é desligado antes de ler o corpo.
- sugestão, especificação — CA6 (401 de ponta a ponta) e o clique em "Tentar de novo" (CA8) ficaram sem observação; conferir no navegador (`/dev/api-exemplo?estado=401` com sessão em `/gestao`) ou registrar como limitação aceita no `AGENTS.md`.

### Rodada 3 — OK — 2026-10-06, estado 17c5724284a5de34d95e958024cfc56763765cae

| Critério | Status | Evidência |
|---|---|---|
| CA1 a CA5 | PASSOU | mantido da rodada 1 (`git diff 3659d49 17c5724 -- src` vazio; só mudaram `AGENTS.md` e este arquivo) |
| CA6 | NÃO CONFERIDO (limitação aceita) | 403 visto na rodada 1; 401 de ponta a ponta está em "Limitações aceitas" do `AGENTS.md` (item #5) |
| CA7 | PASSOU | mantido da rodada 1 |
| CA8 | PASSOU | mantido da rodada 1; clique em "Tentar de novo" em "Limitações aceitas" |
| CA9, CA10, CA11 | PASSOU | mantido; typecheck 0 |
| CA12 | PASSOU | `grep -r api-exemplo dist` sem resultado (código 1) |
| CA13 | PASSOU | build, lint, typecheck, format:check → 0 |

Achado obrigatório da rodada 1 (cache da conta anterior): corrigido na rodada 2, sem mudança de código desde então.

Comandos: `git diff 3659d49 17c5724` (só `AGENTS.md` e este arquivo); `pnpm typecheck` 0; `pnpm lint` 0; `pnpm format:check` 0; `pnpm build` 0; `grep -r api-exemplo dist` sem resultado; `grep Authorization|localStorage|sessionStorage src/shared/api` sem resultado.
Achados:
- sugestão, código, `src/shared/api/client.ts` — mantida: o tempo limite é desligado antes de ler o corpo.

## Entrega

Cliente único da API (`src/shared/api/client.ts`: cookie de sessão, `X-XSRF-TOKEN` nos métodos que alteram, tempo limite de 15 s, `ApiError` tipado), contrato provisório (`types.ts`), camada de dados com React Query (`query.ts`: nova tentativa só em falha de rede ou 5xx, 401 encerra a sessão, cache limpo em todo login e logout), componente de estados `QueryState` e rota de exemplo só em desenvolvimento (`/dev/api-exemplo`, fora do build).

Verificação: rodada 3 `OK` (build, lint, typecheck e format:check em 0; não há testes na linha de base). Decisão: `env.ts` é o único ponto que lê `import.meta.env` do cliente.

Limitações: CA6 (401 levando a `/entrar?voltar=/gestao` de ponta a ponta) e o clique em "Tentar de novo" não foram vistos no navegador (aceito pelo dono, em `AGENTS.md`). O tempo limite não cobre a leitura do corpo.
