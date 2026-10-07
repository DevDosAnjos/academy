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
