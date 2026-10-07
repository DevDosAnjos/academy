# Mocks da API (MSW)

Servidor simulado com dados fictícios em memória. Liga com `VITE_USE_MOCKS=true` (em `.env.local`) e `pnpm dev`; com a variável vazia, o app fala com a API real (`VITE_API_URL`). Os mesmos handlers servem ao navegador (`browser.ts`) e a Node (`node.ts`, para os testes).

## Acrescentar um handler

1. Crie `src/mocks/handlers/<assunto>.ts` exportando uma lista de `http.get/post/...`. Use o prefixo `*/` no caminho (ex.: `'*/alunos'`), que funciona no navegador e em Node.
2. Se precisar de dados, acrescente-os em `db.ts` (objetos simples, com a semente em `reset()`).
3. Comece o handler com `const early = await scenario(request, { list: true })` e devolva `early` se existir (`list` só em rotas de lista).
4. Registre a lista em `handlers.ts`.
5. Sem regra de negócio: devolva dados prontos, sem validar nem calcular.

## Simular situações

Acrescente `?mock=` na URL da requisição: `demora` (2 s), `erro` (500), `vazio` (lista vazia), `401`, `403`. Em `/dev/api-exemplo`, `?estado=` faz o mesmo.

## Perfis

`POST /sessao/simulada` com `{ "profile": "administrador" | "professor" | "aluno" | "responsavel" }` define a sessão do mock; `GET /sessao` devolve `{ profile }` ou 401. No navegador o mock começa como Administrador; em Node, sem sessão (401). Aluno e Responsável recebem 403 em `/exemplo`.

## Dados fictícios e contas de teste

Os dados ficam em `src/mocks/fixtures/` (`types`, `contas`, `academia`, `alunos`, `index`) e entram no `db.data`, que `db.reset()` restaura (use `db.reset()` em `beforeEach` nos testes). Valores em centavos, datas ISO 8601 fixas, mês de referência `REFERENCE_MONTH` (2026-09); status vêm prontos. Os formatos são o primeiro rascunho do contrato, que será descrito em OpenAPI (#15), e e-mails são `@exemplo.test`.

| Conta (`accountId`) | Perfil | Situação |
|---|---|---|
| `c-admin` | Administrador | ativa |
| `c-prof` | Professor (turmas da manhã e da tarde) | ativa |
| `c-aluno` | Aluno adulto (`a1`) | ativa |
| `c-resp` | Responsável (dois alunos: `a2`, `a3`) | ativa |
| `c-inativa` | Professor | inativa |
| `c-convite` | Aluno | convite pendente |

`POST /sessao/simulada` aceita `{ "accountId": "c-aluno" }`: só conta ativa entra; inativa, convite pendente ou id inexistente dão 401. `GET /sessao` devolve também `accountId`. Casos de borda: turma sem grupo (`t-adulto-noite`), aluno pausado (`a6`), bolsista integral (`a7`), aluno em atraso (`a4`), aluno todo pago (`a5`), aula com experimental (`l1`) e com substituto (`l2`).
