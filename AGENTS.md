# AGENTS.md — Academy (front-end)

Lido em toda sessão de todo agente. Manter curto: fatos e comandos.

## Projeto

- O que é: front-end do sistema de gestão de academia de Jiu-Jitsu (gestão, portal do aluno, site e acesso). Especificação: `specs/projeto.md`.
- Dono: Nathan (DevNathan). Stack: TypeScript, React, Vite, shadcn/ui (Tailwind, Radix), MSW. Máquina com Node v24.21.0, pnpm 12.9.1 e npm 11.19.0.
- Backlog: `specs/backlog.md`. Itens: `specs/itens/`. Fontes: issues do GitHub e guias em `docs/` (um arquivo por fase).
- Estrutura: app Vite na raiz. `src/{site,acesso,gestao,portal}` por área e `src/shared/{components,api,formats,lib}` (shadcn em `src/shared/components/ui`). Atalho `@/` = `src/`. Rotas em `src/router.tsx` (React Router, cada área em bloco `lazy`): site `/`; acesso `/entrar`, `/primeiro-acesso`, `/nova-senha`; gestão `/gestao`, `/gestao/configuracoes` (só Administrador); portal `/portal`. Guarda `RequireAccess` + `decideAccess` (`src/shared/lib/access.ts`); `?voltar=` só aceita caminho interno. Sessão simulada em `sessionStorage` (`src/shared/lib/session.ts`, botões de entrada só em `pnpm dev`), trocada pela real no item #17. Área compartilhada (`src/shared`) nunca importa de `gestao` ou `portal`. Variáveis em `.env.example` (`VITE_API_URL`, `VITE_USE_MOCKS`), lidas só em `src/shared/api/env.ts`.
- API: todas as chamadas passam por `api` (`src/shared/api/client.ts`; `credentials: 'include'`, `X-XSRF-TOKEN` copiado do cookie `XSRF-TOKEN` nos métodos que alteram, tempo limite 15 s). Falhas viram `ApiError` (`unauthorized`, `forbidden`, `not-found`, `invalid`, `server`, `network`). Contrato provisório em `src/shared/api/types.ts` (erro `{code,message,fields?}`, `Page<T>`, datas ISO 8601). Dados por TanStack Query (`queryClient` em `query.ts`: nova tentativa só em rede e 5xx, até 2; 401 encerra a sessão e limpa o cache; 403 só informa). `QueryState` (`src/shared/components/query-state.tsx`) mostra carregando, vazio, erro e conteúdo. Rota `/dev/api-exemplo` só em DEV (sai com a primeira lista real).
- Formulários: React Hook Form + Zod. `Form*` em `ui/form.tsx`, hook `useSubmitForm` (`src/shared/lib/use-submit-form.ts`: foco no primeiro erro, `ApiError.fields` nos campos, envio único), regras Zod em `src/shared/lib/schemas.ts` (e-mail, telefone, data, valor, senha), `PhoneInput`/`PasswordInput` em `src/shared/components`. Formatos pt-BR e fuso de Brasília em `src/shared/formats` (`formatPhone`, `formatDate`, `formatTime`, `formatCurrency`, `brDateToIso`). Exemplo em `/dev/api-exemplo-formulario` só em DEV (mock `POST /exemplo-formulario`, `?mock=invalido|invalido-geral`).
- Mocks (MSW): `src/mocks/` (`handlers/<assunto>.ts` + registro `handlers.ts`, `db.ts` em memória, `scenario.ts` para `?mock=demora|erro|vazio|401|403`, `browser.ts`, `node.ts`); ligam com `VITE_USE_MOCKS=true`; passo a passo em `src/mocks/README.md`.
- Telas: `docs/gestao/telas/`, `docs/portal/telas/{desktop,mobile}/`, `docs/site-e-acesso/telas/{desktop,mobile}/` (PNG, 83 no total, abertos direto do repositório). Canvas: https://claude.ai/artifact/TXG9EGaFortgEQtvqHfRAm (não conferido).

## Comandos

| Ação | Comando | Validado |
|---|---|---|
| Instalar / build | `pnpm install` / `pnpm build` | sim |
| Rodar | `pnpm dev` (http://localhost:5173) | sim |
| Tipos | `pnpm typecheck` | sim |
| Testes | a definir no item #8 | não |
| Lint ou formatação | `pnpm lint` / `pnpm format:check` (`pnpm format` corrige) | sim |

Linha de base: build, lint, typecheck e format:check passam; não há testes (item #8). Tokens do canvas em `src/index.css`; cor de destaque por `applyAccentColor` (`src/shared/lib/theme.ts`); `cn` vem de `clsx` e `tailwind-merge`.
Saída longa: gravar o log em pasta temporária fora do repositório e ler só o resumo e as falhas.

## Regras do projeto

- Só front-end: regra de negócio, cálculo, permissão, auditoria, e-mail e pagamento são do servidor. A permissão nunca é só esconder botão.
- Respeitar as regras do sistema inteiro em `specs/projeto.md` (sem frequência, graduação é do mestre, mensalidade não é digitada, sem cadastro aberto, aluno nunca excluído).
- [A DEFINIR] nos guias: usar a solução provisória da issue de decisão, sem inventar. [sugestão]: vale o guia.
- Cada item cita o artboard do canvas e o PNG de cada tela; tela sem desenho segue o padrão das existentes.
- Variáveis e segredos: `.env.example` só com nomes; nunca valores reais.

## Idioma

- Respostas e documentos: português do Brasil.
- Código, nomes de arquivos e comentários: inglês.
- Textos exibidos ao usuário final: português do Brasil, linguagem simples.
- Mensagens de commit: português do Brasil (padrão do histórico atual).

## Autonomia

- Especificação de cada item: parar para o dono ler nos dois primeiros itens; depois, seguir sem parar.
- Repositório remoto: https://github.com/DevDosAnjos/academy.
- Commit direto na base: não. Os arquivos da preparação entram no commit do primeiro item.
- Push e abertura de PR: autorizado.
- Base dos PRs: `dev`. Formato da branch do item: `item/<ID>-slug`.
- Merge: agente, por squash, em `dev`, depois da verificação OK e das verificações do PR.
- Formato da mensagem de commit e do título do PR: `<título> (#<ID>)`.

## Issues

- Sprints: milestones Sprint 00 a Sprint 17, nessa ordem.
- Rótulos: `epic`, `preparação`, `revisão` → item do agente; `design` → item de pessoa; `decisão` → pendência para o dono; `roadmap` → só fonte; `bloqueio`, `gestão`, `portal`, `site-e-acesso` → só marcam trava e parte do sistema. Exceção: #10 (levar decisões à academia) é item de pessoa.
- Conta do agente: DevDosAnjos.
- Atribuir a issue ao começar: agente.
- Fechar a issue no merge: agente.
- Fim de sprint: parar para o dono revisar.

## Limitações aceitas

- Item #3 (base visual: tokens e tema): CA2 (fontes), CA4 (mudança da cor de destaque no navegador), CA6 (teclado) e CA11 (comparação visual com o artboard) foram conferidos só pela construção, no Edge headless, e não pela verificação independente, por falta de navegador na verificação. Aceito pelo dono.
- Item #5 (cliente da API e contrato): CA6 (401 levando a `/entrar?voltar=/gestao` de ponta a ponta) e o clique em "Tentar de novo" de `/dev/api-exemplo` ficaram sem conferência no navegador. O redirecionamento é o `RequireAccess` do item #4, não alterado. Aceito pelo dono.
- Item #6 (mocks da API com MSW): CA1, CA2 e CA10 (lista renderizada com e sem `VITE_USE_MOCKS=true` e estados vazio e erro em `/dev/api-exemplo`) foram conferidos só pela construção, no Edge headless, e não pela verificação independente, por falta de navegador na verificação. Aceito pelo dono.
- Item #7 (formulários e validação): CA1 a CA5, CA7, CA10, CA12 e CA13 (formulário de exemplo em `/dev/api-exemplo-formulario`) foram conferidos só pela construção, no Edge headless e antes da correção do `mode: onTouched`, e não pela verificação independente, por falta de navegador na verificação. Aceito pelo dono.
