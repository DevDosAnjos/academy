# 9 — Dados fictícios e contas de teste

Origem: issue #9 (`[Preparação] Dados fictícios e contas de teste`). Branch: `item/9-dados-ficticios-contas`.

## 1. Objetivo

Dar aos mocks (item #6) e aos testes (item #8) um único conjunto de dados fictícios coerente: contas de cada perfil e situação, e o cenário de gestão e portal com os casos de borda que as telas precisam mostrar. Assim, cada fase seguinte só expõe esses dados em handlers do seu assunto, sem inventar massa própria.

Fora do escopo: handlers de recursos de negócio (turmas, alunos, cobranças etc. nascem com cada fase, como decidido no #6); telas; regra de negócio nos dados (status e valores vêm prontos, como o servidor devolveria); login real (#17).

## 2. Requisitos

- R1: existe uma conta de cada perfil (Administrador, Professor, Aluno e Responsável), uma conta inativa e uma com convite não aceito (D1).
- R2: o Administrador e o Professor existem como usuários da gestão, e o Professor está ligado a turmas.
- R3: há 9 turmas (Infantil, Juvenil e Adulto × manhã, tarde e noite) e 3 planos.
- R4: há alunos, cobranças e despesas fictícios, coerentes entre si: toda referência (turma, plano, responsável, aluno) aponta para algo que existe.
- R5: o portal tem um aluno adulto, um responsável com dois alunos, um aluno com mensalidade em atraso e um aluno com tudo pago (D4).
- R6: os casos de borda existem: turma sem grupo, aluno pausado, bolsista integral, aula com experimental marcada e aula com professor substituto.
- R7: os mesmos dados alimentam os mocks e os testes: ficam no `db` em memória de `src/mocks/db.ts`, restaurados por `db.reset()` (D2).
- R8: cada conta de teste entra no ambiente simulado e cai na área certa; conta inativa e conta com convite pendente não entram (D3).
- R9: os dados são inventados: sem CPF, e-mail ou telefone reais (e-mails em `@exemplo.test`) e sem valor de segredo.

## 3. Critérios de aceite

- CA1 (R1): dado o conjunto de contas, então há exatamente uma conta ativa de cada um dos quatro perfis, mais uma com situação `inativa` e uma com `convite-pendente`.
- CA2 (R2, R3): dado o cenário, então há 9 turmas com as 9 combinações de grupo etário e período, 3 planos, e o Professor tem ao menos 2 turmas.
- CA3 (R4): dado o cenário, então toda referência por id (turma do aluno, plano, responsável, aluno da cobrança, professor da turma, turma da aula) existe, e há alunos, cobranças e despesas em quantidade maior que zero.
- CA4 (R5): dado o cenário, então há um aluno adulto com conta; um responsável ligado a exatamente 2 alunos; um aluno cuja cobrança do mês de referência está `atrasada`; e um aluno cujas cobranças estão todas `paga`.
- CA5 (R6): dado o cenário, então há uma turma sem grupo, um aluno `pausado`, um aluno com benefício de bolsa integral, uma aula com aula experimental marcada e uma aula com professor substituto.
- CA6 (R4, R6): dado aluno pausado ou com bolsa integral, então ele não tem cobrança em aberto (regra de `specs/projeto.md`).
- CA7 (R7): dado `db.examples` ou dados do cenário alterados em memória, quando `db.reset()`, então tudo volta à semente.
- CA8 (R8): dado `POST /sessao/simulada` com `{ accountId }` de cada conta ativa, então `GET /sessao` devolve `{ profile, accountId }` e `areaOf(profile)` é a área esperada (gestão para Administrador e Professor, portal para Aluno e Responsável).
- CA9 (R8): dado `POST /sessao/simulada` com `{ accountId }` da conta inativa, da conta com convite pendente ou de id inexistente, então responde 401 e `GET /sessao` segue 401.
- CA10 (R8): dado `POST /sessao/simulada` com `{ profile }` (forma de antes), então continua funcionando como no #6.
- CA11 (R9): dado o conjunto, então todo e-mail termina em `@exemplo.test` e nenhum campo guarda CPF.

## 4. Plano técnico

- Dados: em memória, sem banco. Tipos locais e provisórios em `src/mocks/fixtures/types.ts` (contrato real é P4; quando o back-end definir, só os tipos e os fixtures mudam). Valores em centavos (inteiro) e datas ISO 8601 fixas (nada depende do relógio); o "mês de referência" é uma constante do fixture. Status (`atrasada`, `pausado`) vêm gravados, não calculados.
- API: `POST /sessao/simulada` em `src/mocks/handlers/sessao.ts` passa a aceitar `{ accountId }` além de `{ profile }`; `GET /sessao` devolve também `accountId` quando houver. Sem outras rotas: expor turmas, alunos etc. é de cada fase.
- Interface: não muda (os botões de entrada em `pnpm dev` seguem por perfil).
- Segurança: dados inventados, nenhum dado pessoal real nem segredo (R9). A recusa de conta inativa e pendente no mock só simula o resultado que o servidor dará; a regra real é do servidor.
- Arquivos a alterar (vistos): `src/mocks/db.ts` (seed passa a vir dos fixtures; `reset()` restaura tudo), `src/mocks/handlers/sessao.ts`, `src/mocks/README.md`, `AGENTS.md` (estrutura, na entrega). A criar: `src/mocks/fixtures/{types,contas,academia,alunos,index}.ts`, `src/mocks/fixtures/fixtures.test.ts`, `src/mocks/handlers/sessao.test.ts`.
- Reuso: `Profile`, `areaOf` e `PROFILE_LABEL` de `src/shared/lib/session.ts`; `server` de `src/mocks/node.ts` e o setup do Vitest em `src/test/setup.ts`; imports com extensão `.ts` nos arquivos de `src/mocks`, como nos existentes.
- Riscos: (a) `db.reset()` hoje troca só `profile` e `examples`: esquecer um campo novo deixa estado vazar entre testes, coberto pelo CA7; (b) `main.tsx` importa `db` só com mocks ligados, então os fixtures não entram no build sem a variável; (c) os guias dizem que nomes e valores do canvas são exemplos, então os fixtures não os tomam como requisito.

## 5. Tarefas

- [x] T1: criar `fixtures/types.ts` e `fixtures/contas.ts` (6 contas: 4 perfis ativos, 1 inativa, 1 convite pendente; ligação Professor, Aluno e Responsável aos registros por id) — cobre CA1, CA11 — prova: `pnpm test` em `fixtures.test.ts` e `pnpm typecheck`
- [x] T2: criar `fixtures/academia.ts` (Administrador e Professor como usuários da gestão, 9 turmas com uma sem grupo, 3 planos, benefício de bolsa integral, despesas, aulas com experimental e com substituto) — cobre CA2, CA5 — prova: `pnpm test`
- [x] T3: criar `fixtures/alunos.ts` (aluno adulto, responsável com dois alunos, aluno em atraso, aluno todo pago, pausado, bolsista integral; cobranças coerentes com as regras do projeto) e `fixtures/index.ts` que reúne tudo — cobre CA3, CA4, CA6 — prova: `pnpm test`
- [x] T4: ligar `db.ts` aos fixtures (cópia nova a cada `reset()`, mantendo `examples`) — cobre CA7 — prova: teste de `reset()` em `fixtures.test.ts`
- [x] T5: estender `handlers/sessao.ts` (`{ accountId }`, 401 para inativa, pendente e inexistente; `accountId` em `GET /sessao`; `{ profile }` mantido) e escrever `sessao.test.ts` com o `server` do Vitest — cobre CA8, CA9, CA10 — prova: `pnpm test`
- [x] T6: documentar fixtures e contas em `src/mocks/README.md` e rodar a regressão — não cobre critério: é a documentação pedida pelo guia e confere a linha de base — prova: `pnpm build && pnpm lint && pnpm typecheck && pnpm format:check && pnpm test`

## 6. Decisões

- D1: "conta" é um usuário com perfil e situação (`ativa`, `inativa`, `convite-pendente`), ligado a um professor, aluno ou responsável por id. Alternativa: tratar só perfil, descartada porque a issue pede conta inativa e convite não aceito.
- D2: os fixtures são dados puros em TypeScript e o `db` em memória os copia a cada `reset()`; testes e navegador leem o mesmo `db`. Alternativa: JSON ou `@mswjs/data`, descartada (mesma razão da D4 do #6: sem relações a modelar ainda).
- D3 (muda o comportamento): no mock, entrar com conta inativa ou convite pendente dá 401 e não cria sessão; só conta ativa entra. Motivo: a issue pede que cada conta entre e caia na área certa, e as de exceção devem mostrar a recusa. Alternativa: entrar com qualquer conta, descartada por esconder o caso que as telas de acesso precisam mostrar.
- D4: um aluno adulto com conta própria e um responsável com dois alunos menores; criança e jovem não têm conta (menor entra pelo responsável), seguindo a proposta provisória de P18. Alternativa: conta para menor, descartada por estar em aberto.
- D5: os fixtures ficam em `src/mocks/fixtures/`, e não em `src/shared`, para não entrarem no build sem mocks e respeitar que `shared` não importa de `gestao` ou `portal`.
- Suposição: os formatos dos recursos (turma, plano, cobrança etc.) são provisórios (P4); se o contrato real vier diferente, ajustam-se só `fixtures/` e os handlers de cada fase.
- Suposição: nomes de turmas, planos e valores são inventados; se a academia (item #10) definir os reais, troca-se só o conteúdo dos fixtures.

## Construção

- T1 — arquivos: `src/mocks/fixtures/{types,contas}.ts` — prova: `pnpm test` (CA1, CA11 em `fixtures.test.ts`) e `pnpm typecheck` → passou
- T2 — arquivos: `src/mocks/fixtures/academia.ts` — prova: `pnpm test` (CA2, CA5) → passou
- T3 — arquivos: `src/mocks/fixtures/{alunos,index}.ts` — prova: `pnpm test` (CA3, CA4, CA6) → passou
- T4 — arquivos: `src/mocks/db.ts` (`db.data` e `accountId`, restaurados em `reset()`) — prova: `pnpm test` (CA7) → passou
- T5 — arquivos: `src/mocks/handlers/sessao.ts`, `src/mocks/handlers/sessao.test.ts` — prova: `pnpm test` (CA8, CA9, CA10) → passou
- T6 — arquivos: `src/mocks/README.md` — prova: regressão abaixo → passou
Regressão: `pnpm build && pnpm lint && pnpm typecheck && pnpm format:check && pnpm test` → todos passam; `pnpm test` com 34 testes em 7 arquivos (linha de base: 19). `pnpm test:e2e` não rodou (fora da prova do plano).
Desvios: nenhum.

## Verificação

### Rodada 1 — OK — 2026-10-06, estado 3400c7700a3577645452b0e04c4fa99444f9ffc5

| Critério | Status | Evidência |
|---|---|---|
| CA1 | PASSOU | `fixtures.test.ts` CA1 (4 perfis ativos, 1 inativa, 1 convite-pendente); `pnpm test` 34/34 |
| CA2 | PASSOU | `fixtures.test.ts` CA2 (9 combinações, 3 planos, p1 com 6 turmas) |
| CA3 | PASSOU | `fixtures.test.ts` CA3 (referências existem, contagens > 0) |
| CA4 | PASSOU | `fixtures.test.ts` CA4; lido `alunos.ts` (a1 adulto, r1 com a2+a3, a4 atrasada, a5 toda paga) |
| CA5 | PASSOU | `fixtures.test.ts` CA5; turma adulto-noite sem grupo, l1 experimental, l2 substituto |
| CA6 | PASSOU | `fixtures.test.ts` CA6; a6 e a7 sem cobrança |
| CA7 | PASSOU | `fixtures.test.ts` CA7 (examples, students, accounts voltam à semente) |
| CA8 | PASSOU | `sessao.test.ts` CA8 (4 contas, `{profile, accountId}`, áreas gestão/portal) |
| CA9 | PASSOU | `sessao.test.ts` CA9 (inativa, convite, inexistente: 401 e GET 401) |
| CA10 | PASSOU | `sessao.test.ts` CA10 (`{profile}` segue funcionando) |
| CA11 | PASSOU | `fixtures.test.ts` CA11; grep sem "cpf" em `fixtures/` além do teste |

Comandos: `pnpm build && pnpm lint && pnpm typecheck && pnpm format:check && pnpm test` → todos passam; 34 testes em 7 arquivos (linha de base do AGENTS.md: 34). `pnpm test:e2e` não rodado (item não toca UI nem o fluxo por perfil).
Achados:
- sugestão, código, `fixtures/academia.ts` — R2 fala em "usuários da gestão"; Administrador existe só como conta e não há entidade própria. Os testes não exercitam isso além de CA1; sem impacto nos critérios.
- sugestão, código, `fixtures.test.ts` CA2 — o id `p1` do Professor está fixo no teste em vez de vir da conta `c-prof`.

## Entrega

- O mock da API ganha dados fictícios coerentes em `src/mocks/fixtures/` (contas dos quatro perfis, mais uma inativa e um convite pendente; turmas, planos, alunos, responsáveis, cobranças), restaurados por `db.reset()`.
- O login do mock aceita `{accountId}`: só conta ativa entra (inativa e convite pendente dão 401); `{profile}` segue funcionando.
- Verificação: rodada 1 OK, CA1 a CA11; regressão (`build`, `lint`, `typecheck`, `format:check`, `test`) verde, 34 testes. `test:e2e` não rodou.
- Decisões: fixtures fora de `src/shared` para não entrarem no build sem mocks; menores sem conta (entram pelo responsável), conforme proposta provisória de P18. Formatos e nomes são provisórios (P4, item #10).
- Base `dev` não avançou desde a verificação; regressão não repetida.

Refs #9
