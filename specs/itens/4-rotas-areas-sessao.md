# 4 — Rotas, áreas e proteção por sessão e perfil

Origem: issue #4 (`[Preparação] Rotas, áreas e proteção por sessão e perfil`), com `docs/gestao/fase-01-base-do-sistema.md` (RF-BAS-10) e `docs/site-e-acesso/fase-01-login-e-sessao.md` (RF-LGN-08, RN-LGN-03). Branch: `item/4-rotas-areas-sessao`.

## 1. Objetivo

Deixar o app com as quatro áreas (site, acesso, gestão e portal) abrindo em páginas vazias, cada uma com o seu layout e o seu código carregado em separado, e com a proteção por sessão e perfil funcionando contra uma sessão simulada. É a base de rotas que os itens #16, #17 e #59 preenchem.

Fora do escopo: login real, API e sessão vinda do servidor (itens #5, #6 e #17); menu lateral completo, trilha e padrões de tela da gestão (#16); barra de navegação final do portal (#59); conteúdo de qualquer tela; "quem já tem sessão e abre o login vai direto à sua área" (RF-LGN-09, item #17); rota de recuperar senha (item #26); testes automatizados (item #8).

## 2. Requisitos

- R1: o app usa React Router e tem o mapa de endereços: site `/`; acesso `/entrar`, `/primeiro-acesso` e `/nova-senha`; gestão `/gestao` (Início) e `/gestao/configuracoes`; portal `/portal` (D1, D2).
- R2: o código de cada área é carregado em separado, só quando a área é aberta; abrir o site (`/`) não baixa código da gestão nem do portal (RNF-S09) (D3).
- R3: sem sessão, abrir uma tela da gestão ou do portal leva ao login e, depois de entrar, volta para a tela pedida (RF-LGN-08); o endereço de retorno que não seja caminho interno é ignorado (D4).
- R4: a conta da gestão (Administrador, Professor) não abre o portal, e a conta do portal (Aluno, Responsável) não abre a gestão: cada uma é levada ao início da sua própria área (RN-LGN-03) (D5).
- R5: Professor que abre uma tela só do administrador vê "Esta área é da administração", com atalhos para voltar (RF-BAS-10) (D6).
- R6: existe um layout por área: gestão com menu lateral, portal com barra superior e, no celular, abas embaixo, site e acesso com layouts simples (D7).
- R7: endereço que não existe mostra uma página própria, dentro do layout da área quando está sob `/gestao` ou `/portal` (e há sessão), e sem layout de área nos demais casos (D8).
- R8: toda rota tem título da página no formato "Tela · Área · Academy", do mais específico para o mais geral (RNF-S05) (D9).
- R9: a sessão é simulada no navegador, só em desenvolvimento, com os quatro perfis, por uma interface (`useSession`, `signIn`, `signOut`) que o item #17 troca pela sessão real sem mudar as telas (D10).
- R10: build, lint, typecheck e format:check continuam passando.

## 3. Critérios de aceite

- CA1 (R1): dado o app em `pnpm dev` com sessão de Administrador, quando se abrem `/`, `/entrar`, `/primeiro-acesso`, `/nova-senha`, `/gestao`, `/gestao/configuracoes` e `/portal` (este com a conta do portal), então cada um mostra a sua página vazia (título da tela e aviso de que será construída) no layout da sua área.
- CA2 (R2): dado `pnpm build`, quando se abre `dist/index.html` e o arquivo de entrada, então `dist/index.html` não tem `<script>` nem `<link>` de bloco de área, o arquivo de entrada não importa estaticamente nenhum bloco da gestão ou do portal (só os lista no mapa de `import()` dinâmico que o Vite gera), e `dist/assets` tem arquivos separados para cada área (D11).
- CA3 (R2): dado o app em `pnpm dev` ou `pnpm preview`, quando se abre `/` sem sessão com a aba de rede aberta, então nenhum arquivo da gestão nem do portal é pedido.
- CA4 (R3): dado o app sem sessão, quando se abre `/gestao/configuracoes`, então a pessoa vai para `/entrar` e, depois de entrar como Administrador, chega em `/gestao/configuracoes`.
- CA5 (R3): dado o app sem sessão, quando se abre `/portal`, então vai para `/entrar` e, depois de entrar como Aluno, chega em `/portal`.
- CA6 (R3): dado `/entrar?voltar=https://exemplo.com` ou `?voltar=//exemplo.com`, quando a pessoa entra, então vai para o início da sua área e não sai do app.
- CA7 (R4): dado sessão de Aluno ou Responsável, quando abre `/gestao` ou `/gestao/configuracoes`, então vai para `/portal`.
- CA8 (R4): dado sessão de Administrador ou Professor, quando abre `/portal`, então vai para `/gestao`.
- CA9 (R5): dado sessão de Professor, quando abre `/gestao/configuracoes`, então vê "Esta área é da administração" com os atalhos "Voltar" e "Ir para o Início", e o conteúdo da tela não é renderizado.
- CA10 (R5): dado sessão de Administrador, quando abre `/gestao/configuracoes`, então a página abre.
- CA11 (R6): dado cada área aberta, quando se olha a página, então a gestão tem menu lateral, o portal tem barra superior (e abas embaixo abaixo de 768 px, sem abas acima disso), e site e acesso têm layouts próprios, todos operáveis só com teclado.
- CA12 (R7): dado `/qualquer-coisa` sem sessão ou com sessão, quando abre, então vê "Página não encontrada" com link para o início do site.
- CA13 (R7): dado sessão de Administrador, quando abre `/gestao/inexistente`, então vê "Página não encontrada" dentro do layout da gestão; sem sessão, vai para o login (R3).
- CA14 (R8): dado cada rota do CA1 e a de página não encontrada, quando se lê `document.title`, então segue "Tela · Área · Academy" (por exemplo "Configurações · Gestão · Academy"; site e acesso usam "Academy" como área, sem repetir) e cada página tem um único `h1`.
- CA15 (R9): dado `pnpm build`, quando se busca o texto dos botões de perfil simulado em `dist`, então não existe; em `pnpm dev`, o login mostra os quatro botões de entrada, cada um abrindo a sessão do perfil, e "Sair" fecha a sessão e leva ao `/entrar`.
- CA16 (R3, R4, R5): dado a função de decisão de acesso `decideAccess`, quando recebe cada combinação de sessão (nenhuma e os quatro perfis) e exigência (gestão, só administrador, portal), então devolve permitir, ir ao login, ir à área própria ou área sem permissão, conforme os CA4 a CA10.
- CA17 (R10): dado o projeto, quando se rodam `pnpm build`, `pnpm lint`, `pnpm typecheck` e `pnpm format:check`, então todos terminam com código 0.

## 4. Plano técnico

- Dados e API: não mudam. Nenhuma chamada de rede; a sessão simulada é só do navegador.
- Interface: `react-router` (v7, modo de dados com `createBrowserRouter`; rotas de área com `lazy`, que gera um bloco por área). Árvore: raiz (restaura título) com filhos `site` (layout do site, `/`), `acesso` (layout centralizado, três rotas), `gestao` (guarda da gestão + layout com menu lateral; `configuracoes` exige Administrador), `portal` (guarda do portal + layout com barra superior e abas inferiores só abaixo de `md`) e `*`. Páginas vazias: `h1` e um aviso "Esta tela ainda será construída." O menu da gestão tem só os dois links que existem (Início e Configurações) e o portal só Início; o menu e as abas finais são dos itens #16 e #59. Largura: gestão sem layout de celular (`GESTAO_MIN_WIDTH`), portal e site responsivos (390 e 1440 px), como em `src/shared/lib/breakpoints.ts`. Login simulado em `/entrar`: quatro botões "Entrar como Administrador | Professor | Aluno | Responsável", renderizados só com `import.meta.env.DEV`; fora disso a página mostra só o título e o aviso. A tela do desenho (`docs/gestao/telas/Professor › Área sem acesso.png`) guia "Esta área é da administração"; texto, atalhos e visual seguem os componentes base do item #3.
- Segurança: guarda por rota é conveniência de tela, não permissão: quem recusa dado e ação é o servidor (`AGENTS.md`, RN-BAS-01); o item deixa isso dito em comentário na guarda. O endereço de retorno (`?voltar=`) é validado como caminho interno (começa com `/`, não com `//` nem `/\`, sem esquema) para não virar redirecionamento aberto. Sessão simulada só em `sessionStorage`, com perfil e nada pessoal, e some do build de produção. Nada de segredo.
- Arquivos a criar: `src/router.tsx`; `src/shared/lib/session.ts` (perfis, área do perfil, armazenamento simulado e `useSession`); `src/shared/lib/access.ts` (`decideAccess` e `safeReturnPath`, funções puras); `src/shared/components/require-access.tsx` (guarda das rotas); `src/shared/components/page-title.tsx` (ou gancho que aplica `handle.title`); `src/shared/components/empty-page.tsx`; `src/shared/components/not-found.tsx`; `src/site/{layout.tsx,home.tsx}`; `src/acesso/{layout.tsx,login.tsx,first-access.tsx,new-password.tsx}`; `src/gestao/{layout.tsx,home.tsx,settings.tsx,no-access.tsx}`; `src/portal/{layout.tsx,home.tsx}`. Os `.gitkeep` das quatro pastas saem quando ganham arquivo.
- Arquivos a alterar (vistos): `src/main.tsx` (monta o `RouterProvider`), `src/App.tsx` (página de exemplo do item #3, removida: não há mais o que ela exemplifique sem rota; o artboard de Configurações volta no item #20), `package.json` e `pnpm-lock.yaml` (`react-router`), `index.html` (título padrão `Academy`, já está), `AGENTS.md` (mapa de endereços, sessão simulada e comando de teste do item).
- Reuso: `Button` e demais componentes de `src/shared/components/ui`, `cn` de `src/shared/lib/utils.ts`, tokens de `src/index.css`, constantes de `src/shared/lib/breakpoints.ts`.
- Riscos: (a) a publicação precisa devolver `index.html` para qualquer caminho (fallback de SPA) senão `/gestao` direto dá 404; é do item #8, anotado lá no plano dele, e em `pnpm dev`/`preview` já funciona. (b) Código compartilhado importado pelo site puxa o que importar: `session.ts`, `access.ts` e os componentes de página não podem importar nada de `gestao` ou `portal`; o CA2 percebe se quebrar. (c) O estilo do item #3 foi conferido no navegador só pela construção (`AGENTS.md`); aqui também não há teste automatizado, então os CA de navegação saem de execução no navegador e, onde não houver, de `decideAccess` com script temporário.

## 5. Tarefas

- [x] T1: instalar `react-router` e criar `src/shared/lib/access.ts` (`decideAccess`, `safeReturnPath`) e `src/shared/lib/session.ts` (perfis, `areaOf`, `useSession`, `signIn`, `signOut`, armazenamento em `sessionStorage` com try/catch) — cobre CA6, CA16 — prova: script temporário (`node --experimental-strip-types`) chamando `decideAccess` com as combinações e `safeReturnPath` com `https://exemplo.com`, `//exemplo.com`, `/\x`, `/gestao/a?b=1`; `pnpm typecheck`
- [x] T2: criar `src/shared/components/{require-access,page-title,empty-page,not-found}.tsx` e `src/router.tsx` com a árvore de rotas (áreas com `lazy`, `handle.title`), trocar `src/main.tsx` para `RouterProvider` e remover o conteúdo de exemplo de `src/App.tsx` — cobre CA1, CA12, CA14 — prova: `pnpm build`; abrir cada rota em `pnpm dev` e ler `document.title` e o `h1`
- [x] T3: criar as áreas site e acesso (`src/site`, `src/acesso`) com layouts e páginas vazias, e o login simulado só em desenvolvimento, com retorno por `?voltar=` — cobre CA1, CA4, CA5, CA6, CA11, CA15 — prova: em `pnpm dev`, abrir `/gestao/configuracoes` sem sessão, entrar como Administrador e conferir o retorno; testar `?voltar=//exemplo.com`; `grep` do texto dos botões em `dist` sem resultado após `pnpm build`
- [x] T4: criar a área gestão (`src/gestao`) com guarda, layout de menu lateral, Início, Configurações (só Administrador), página de "Esta área é da administração" e página não encontrada no layout — cobre CA7, CA9, CA10, CA11, CA13 — prova: em `pnpm dev`, entrar como Professor e abrir `/gestao/configuracoes`; como Aluno abrir `/gestao`; como Administrador abrir `/gestao/inexistente`
- [x] T5: criar a área portal (`src/portal`) com guarda, layout de barra superior e abas inferiores abaixo de `md`, e Início — cobre CA5, CA8, CA11 — prova: em `pnpm dev`, entrar como Aluno e como Responsável e abrir `/portal` em 390 e 1440 px; como Professor abrir `/portal`
- [x] T6: conferir a separação por área no build — cobre CA2, CA3 — prova: `pnpm build` e listar `dist/assets`; `grep` em `dist/index.html` e no arquivo de entrada pelos nomes dos blocos da gestão e do portal; aba de rede em `/` sem sessão
- [x] T7: atualizar `AGENTS.md` (mapa de endereços, sessão simulada e que ela sai no item #17) e rodar a linha de base — cobre CA17 — prova: `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm format:check`

## 6. Decisões

- D1: biblioteca de rotas é o React Router, proposta da própria issue e a mais usada com Vite e `lazy`. Alternativa: TanStack Router, que pede mais configuração e geração de arquivos sem ganho aqui.
- D2: um endereço só, com o site na página inicial, como manda o P3 provisório (issue #14): `/` site, `/entrar`, `/primeiro-acesso`, `/nova-senha`, `/gestao/...`, `/portal/...`. A recuperação de senha (`/recuperar-senha`) e as telas de cada fase entram nos seus itens. Se o dono responder o P3 com subdomínios, muda só o mapa em `src/router.tsx`.
- D3: site e acesso entregues no mesmo app Vite, com o código de cada área em bloco separado carregado por `lazy`, como manda o P2 provisório (issue #13). Pré-renderização do site e meta por página não entram.
- D4: depois do login a pessoa volta para o endereço pedido, guardado em `?voltar=`, aceito só se for caminho interno. Alternativa: guardar em estado do roteador, que se perde ao recarregar a página de login. Se o caminho pedido não é da área da conta, vale o CA7/CA8 e ela cai no início da própria área.
- D5 (muda o comportamento): conta da gestão em `/portal` e conta do portal em `/gestao` são levadas ao início da própria área, sem mensagem. Motivo: RN-LGN-03 diz que a conta não abre a outra área; a tela "Esta área é da administração" é do perfil sem permissão dentro da gestão (RF-BAS-10), não disso. Alternativa: tela de acesso negado também aqui; descartada por não estar nos guias.
- D6 (muda o comportamento): só `/gestao/configuracoes` é exclusiva do Administrador neste item, porque é a rota de gestão que já existe e que o guia coloca na administração; as demais exigências por perfil nascem em cada item. Alternativa: criar também Financeiro vazio; descartada, é rota de outro item.
- D7: layouts mínimos. O menu da gestão e as abas do portal têm só os links que existem; os menus completos (RF-BAS-03 a RF-BAS-07, RF-POR) são dos itens #16 e #59. O ponto de corte das abas do portal é `md` (768 px), entre 390 e 1440 px de referência.
- D8: "Página não encontrada" fica dentro do layout da área só quando a rota já passou pela guarda; fora das áreas protegidas usa uma página simples com link para o início do site.
- D9: título no formato "Tela · Área · Academy". O nome da academia (item #20) substitui "Academy" quando houver. Site e acesso usam "Academy" como área, por exemplo "Entrar · Academy". Alternativa: título só com o nome da tela; descartada, o leitor de tela anuncia primeiro a parte mais específica e a área ajuda a situar.
- D10: sessão simulada em `sessionStorage` (some ao fechar a aba), entrada pelos quatro botões só em `import.meta.env.DEV`, em vez de variável de ambiente, para não depender de `.env` local nem aparecer no build. A interface é a que o item #17 mantém trocando a origem pela API. Alternativa: `localStorage`; descartada, dura demais para uma sessão falsa.
- D11: CA2 reescrito a pedido da verificação (rodada 1, achado obrigatório). O Vite lista os blocos dinâmicos em `__vite__mapDeps` no arquivo de entrada; isso não os baixa nem os importa estaticamente, e o que garante R2 é o CA3 (`/` não pede arquivo de gestão nem de portal). Alternativa: `manualChunks` por área com nomes que levem a área; descartada, é configuração a mais sem ganho de comportamento. Sem mudança de código: T6 continua marcada. As duas sugestões da rodada 1 (`state.signOut` no item #17 e recusar `\t`, `\n`, `\r` em `safeReturnPath`) não foram tomadas como tarefa; ficam como sugestão para o item #17.
- Suposição: a tela "Esta área é da administração" tem só um PNG (`Professor › Área sem acesso.png`) e não foi aberta por este agente; texto e atalhos vêm de RF-BAS-10 ("Voltar" e "Ir para o Início" são o texto escolhido). Se o desenho for outro, muda só `src/gestao/no-access.tsx`.
- Suposição: não há teste automatizado até o item #8; a prova de navegação é execução no navegador e `decideAccess` é conferida por script temporário. Se não houver navegador na construção, os CA de navegação ficam como limitação a registrar, como no item #3.

## Construção

- T1 — arquivos: `package.json`, `pnpm-lock.yaml` (`react-router` 8.4.0), `src/shared/lib/access.ts`, `src/shared/lib/session.ts` — prova: script temporário (removido) com `node --experimental-strip-types` → as 15 combinações de `decideAccess` e os 6 casos de `safeReturnPath` como esperado (`https://exemplo.com`, `//exemplo.com`, `/\x` recusados; `/gestao/a?b=1` aceito); `pnpm typecheck` → 0
- T2 — arquivos: `src/router.tsx`, `src/shared/components/{require-access,page-title,empty-page,not-found}.tsx`, `src/main.tsx`; `src/App.tsx` removido — prova: `pnpm build` → 0; rotas abertas no Edge headless (CDP) contra `pnpm dev`: títulos e um `h1` por página conforme CA14 (ex.: "Configurações · Gestão · Academy", "Entrar · Academy", "Academy" no site)
- T3 — arquivos: `src/site/{layout,home}.tsx`, `src/acesso/{layout,login,first-access,new-password}.tsx` — prova: no Edge headless, `/gestao/configuracoes` sem sessão → `/entrar?voltar=%2Fgestao%2Fconfiguracoes` → entrar como Administrador → `/gestao/configuracoes`; idem `/portal` com Aluno; `?voltar=https://exemplo.com` e `?voltar=//exemplo.com` → `/gestao`; `grep -rl "Entrar como" dist` → sem resultado; "Sair" fecha a sessão e termina em `/entrar` (sem `?voltar`)
- T4 — arquivos: `src/gestao/{layout,home,settings,no-access}.tsx` — prova: Edge headless: Professor em `/gestao/configuracoes` → h1 "Esta área é da administração" com "Voltar" e "Ir para o Início"; Aluno e Responsável em `/gestao` e `/gestao/configuracoes` → `/portal`; Administrador abre `/gestao/configuracoes` e `/gestao/inexistente` ("Página não encontrada" no layout da gestão, menu lateral presente)
- T5 — arquivos: `src/portal/{layout,home}.tsx` — prova: Edge headless: Aluno e Responsável abrem `/portal`; Professor e Administrador em `/portal` → `/gestao`; abas inferiores visíveis a 390 px (barra superior sem links) e escondidas a 1440 px
- T6 — arquivos: nenhum — prova: `pnpm build` → `dist/index.html` referencia só `index-*.js` e `index-*.css`; `index-*.js` não importa estaticamente nenhum bloco de área (só lista os blocos no mapa de `import()` dinâmico); `dist/assets` tem `layout-*.js` e `home-*.js` separados por área, mais `settings`, `login` etc.; Edge headless em `/` sem sessão pediu só `src/site/*`, `src/shared/*` e `main/router` (nenhum arquivo de `gestao` ou `portal`)
- T7 — arquivos: `AGENTS.md` (mapa de endereços, sessão simulada, guarda) — prova: `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm format:check` → todos 0

Regressão: `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm format:check` → todos 0, igual à linha de base (sem testes; item #8).
Desvios:
- `react-router` instalado na versão 8.4.0 (a que o `pnpm add` entregou), não 7; a API usada (`createBrowserRouter`, `lazy`, `handle`, `useMatches`) funcionou igual.
- CA2 ao pé da letra ("nenhum dos dois referencia os arquivos de código da gestão ou do portal"): o arquivo de entrada cita os nomes dos blocos no mapa de `import()` dinâmico, que é como o Vite faz o carregamento sob demanda. Nada é importado estaticamente nem aparece em `index.html`, e CA3 confirmou que `/` não pede esses arquivos. Os blocos têm nomes genéricos (`layout-*.js`, `home-*.js`), sem o nome da área.
- "Sair": navegar e só depois encerrar a sessão não funcionou com `await navigate` nem com `flushSync` (a guarda reage antes e manda para `/entrar?voltar=...`). Solução: `navigate('/entrar', { state: { signOut: true } })` e a tela de login chama `signOut()` ao abrir com esse estado.
- `specs/projeto.md` não tem seção de rotas; não foi alterado.
- CA11 (teclado) e CA3 (aba de rede em `pnpm preview`) conferidos só no Edge headless via CDP em `pnpm dev`, por script temporário; não há teste automatizado até o item #8. Operação só com teclado não foi testada à parte (links e botões nativos).
Não é do item: nenhum.

## Verificação

### Rodada 1 — CORRIGIR_ESPEC — 2026-10-06, estado 4bd7546e91cbafc954ee9e6f358fbba63355898a

| Critério | Status | Evidência |
|---|---|---|
| CA1 | PASSOU | Edge headless (CDP) em `pnpm dev`, Administrador: as 7 rotas abrem com `h1` e layout da área |
| CA2 | NÃO PASSOU | `dist/index.html` só referencia `index-*.js` e `.css`, sem import estático de área; mas `dist/assets/index-B4_-VKxU.js` lista os blocos de todas as áreas em `__vite__mapDeps`. Blocos separados existem (`layout-*` x4, `home-*` x3, `settings`, `login` etc.) |
| CA3 | PASSOU | Edge em `pnpm dev`, `/` sem sessão: nenhuma requisição com `gestao` ou `portal` (22 requisições). `pnpm preview` não rodado, o critério aceita dev |
| CA4 | PASSOU | `/gestao/configuracoes` sem sessão → `/entrar?voltar=%2Fgestao%2Fconfiguracoes` → entrar como Administrador → `/gestao/configuracoes` |
| CA5 | PASSOU | `/portal` sem sessão → `/entrar?voltar=%2Fportal` → Aluno → `/portal` |
| CA6 | PASSOU | `?voltar=https://exemplo.com`, `//exemplo.com` e `/\x` → `/gestao` |
| CA7 | PASSOU | Aluno e Responsável em `/gestao` e `/gestao/configuracoes` → `/portal` |
| CA8 | PASSOU | Administrador e Professor em `/portal` → `/gestao` |
| CA9 | PASSOU | Professor em `/gestao/configuracoes`: `h1` "Esta área é da administração", botões "Voltar" e "Ir para o Início"; `h1` de Configurações ausente |
| CA10 | PASSOU | Administrador abre `/gestao/configuracoes` |
| CA11 | PASSOU | Gestão com `aside` e nav; portal: abas `flex` e barra `none` a 390 px, inverso a 1440 px; site e acesso com layouts próprios; Tab percorre Início, Configurações, Sair (elementos nativos) |
| CA12 | PASSOU | `/qualquer` com e sem sessão → "Página não encontrada" sem layout de área, link "Ir para o início do site" |
| CA13 | PASSOU | Administrador em `/gestao/inexistente` → não encontrada com `aside`; sem sessão → `/entrar?voltar=...` |
| CA14 | PASSOU | Títulos lidos: "Academy", "Entrar · Academy", "Configurações · Gestão · Academy", "Início · Portal · Academy", "Página não encontrada · Gestão · Academy", "Página não encontrada · Academy"; um `h1` por página |
| CA15 | PASSOU | `grep -r "Entrar como" dist` → 0 ocorrências; em dev os 4 botões entram e "Sair" termina em `/entrar` sem sessão |
| CA16 | PASSOU | Cobertura indireta: as combinações de `decideAccess` exercitadas pela navegação (CA4 a CA10) e leitura de `src/shared/lib/access.ts`; sem script isolado das 15 combinações |
| CA17 | PASSOU | build, lint, typecheck e format:check → 0 (log em `%TEMP%/v4.log`) |

Comandos: `pnpm build` 0; `pnpm lint` 0; `pnpm typecheck` 0; `pnpm format:check` 0; script CDP temporário no Edge headless contra `pnpm dev` (fora do repositório). Sem testes automatizados (item #8), igual à linha de base.
Achados:
- obrigatório, especificação, CA2 (e R2/D3 que o sustentam) — esperado: "nenhum dos dois [index.html e arquivo de entrada] referencia os arquivos de código da gestão ou do portal"; observado: o arquivo de entrada referencia todos os blocos de área no mapa de dependências gerado pelo Vite (`__vite__mapDeps`), sem import estático e sem pedir os arquivos em `/` (CA3 passou); evidência: `index-B4_-VKxU.js` inicia com `__vite__mapDeps` listando `layout-*`, `home-*`, `settings-*`; corrigir: reescrever o CA2 para o que o Vite entrega e o que importa (sem import estático nem `<script>`/`<link>` de bloco de área no `index.html` e no entrada; blocos separados em `dist/assets`; CA3 prova que não são baixados), ou, se se quiser a letra, exigir `manualChunks` por área e nomes com a área. O código atende a intenção de R2.
- sugestão, código, `src/gestao/layout.tsx` e `src/portal/layout.tsx` — "Sair" depende de `state.signOut` lido pela tela de login; se alguém abrir `/entrar` com esse estado a sessão fecha, comportamento aceitável, só vale registrar quando o item #17 trocar a sessão.
- sugestão, código, `src/shared/lib/access.ts` `safeReturnPath` — não recusa caracteres de controle (`/\t/exemplo.com`); o navegador resolveria como mesma origem ou erro, sem redirecionamento externo observado (não testado), mas recusar `\t`, `\n` e `\r` fecha a dúvida.

### Correção da rodada 1
- Achado obrigatório (CA2, especificação): atendido pela fase 2 (D11, CA2 reescrito); sem mudança de código, nenhuma tarefa por marcar — prova: `pnpm build` → 0; `dist/index.html` sem `<script>`/`<link>` de bloco de área e blocos separados em `dist/assets`, como o CA2 reescrito pede
- Sugestões (`state.signOut`, caracteres de controle em `safeReturnPath`): opcionais, não tomadas; ficam para o item #17

Regressão: `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm format:check` → todos 0, igual à linha de base (sem testes; item #8).
Não é do item: nenhum.

### Rodada 2 — OK — 2026-10-06, estado 20cf231931c4ef63bdae29e9adfa62456c234b81

Desde a rodada 1 (`git diff 4bd7546e... 20cf2319...`) mudou só este arquivo (CA2 reescrito, D11); nenhum código mudou.

| Critério | Status | Evidência |
|---|---|---|
| CA1, CA3 a CA14, CA16 | PASSOU | mantido da rodada 1 (código inalterado) |
| CA2 | PASSOU | `dist/index.html` tem só `<script>` e `<link>` de `index-*`; `index-*.js` sem import estático (`from"./..."`/`import"./..."` vazio); `dist/assets` tem `layout-*` x4, `home-*` x3, `settings-*`, `login-*` separados; CA3 mantido |
| CA15 | PASSOU | `grep -rl "Entrar como" dist` → 0 arquivos (reconferido); dev mantido da rodada 1 |
| CA17 | PASSOU | build, lint, typecheck, format:check → 0 (log em `%TEMP%/v4b.log`) |

Comandos: `pnpm build && pnpm lint && pnpm typecheck && pnpm format:check` → 0. Sem testes automatizados (item #8), igual à linha de base.
Achados:
- obrigatório da rodada 1 (CA2, especificação): resolvido pela reescrita do CA2 (D11).
- sugestão, código, `state.signOut` na troca de sessão do item #17 — mantida da rodada 1.
- sugestão, código, `safeReturnPath` recusar `\t`, `\n`, `\r` — mantida da rodada 1.

## Entrega

- O que muda: roteador com as quatro áreas (site, acesso, gestão, portal) carregadas sob demanda, sessão simulada em `sessionStorage`, proteção por sessão e perfil com retorno ao endereço pedido (`?voltar=`), páginas vazias, 404 e "sem acesso".
- Verificação: rodada 2 `OK` (build, lint, typecheck e format:check em 0); sem testes automatizados, que chegam no item #8.
- Decisões: D4 (retorno por `?voltar=` só com caminho interno), D10 (sessão falsa em `sessionStorage`, entrada por botões só em dev), D11 (CA2 reescrito).
- Limitações: sessão é simulada até o item #17; sugestões em aberto para o #17 (`state.signOut`, recusar `\t`, `\n`, `\r` em `safeReturnPath`).

Refs #4
