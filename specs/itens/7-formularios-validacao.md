# 7 — Formulários, validação e formatos brasileiros

Origem: issue #7 (`[Preparação] Formulários, validação e formatos brasileiros`). Branch: `item/7-formularios-validacao`.

## 1. Objetivo

Dar às três áreas um padrão único de formulário: validação com mensagem por campo em português simples, foco no primeiro campo com problema, formatos brasileiros (data, moeda, telefone, fuso de Brasília), preenchimento automático, envio protegido contra clique duplo e uso só com teclado. Entrega um formulário de exemplo (só em desenvolvimento) que valida, formata e envia ao mock. Serve de base para todos os formulários dos itens seguintes.

Fora do escopo: formulários reais (login, cadastros etc.); regra de negócio na validação (é do servidor: o front valida só formato e obrigatoriedade); o executor de testes (item #8); idempotência de operações financeiras (servidor, RNF-17).

## 2. Requisitos

- R1: `react-hook-form` e `zod` estão instalados, e há um componente de formulário no padrão do shadcn (`Form` com `Label`, descrição e mensagem de erro ligados ao campo por `aria`) em `src/shared/components/ui` (D1).
- R2: cada campo mostra sua mensagem de erro em português simples, abaixo do campo, ao enviar e ao sair do campo depois de tocado.
- R3: ao enviar com erro, o foco vai para o primeiro campo com problema.
- R4: erros de campo devolvidos pelo servidor (`ApiError.fields`) aparecem no campo correspondente; erro sem campo aparece no topo do formulário.
- R5: formatos brasileiros ficam em `src/shared/formats`: data dd/mm/aaaa, moeda R$ e horário no fuso de Brasília na exibição; telefone com DDD em máscara na digitação (D2).
- R6: a validação Zod de e-mail, telefone com DDD, data dd/mm/aaaa, valor em reais e senha fica reutilizável, com mensagens padrão em português (D3).
- R7: os campos de nome, telefone, e-mail e senha trazem `autoComplete`, `type` e `inputMode` corretos para navegador e guardadores de senha.
- R8: o botão de envio fica desabilitado e indica "Enviando…" enquanto o envio está em andamento, e um segundo clique ou Enter não envia de novo.
- R9: todo campo tem rótulo visível associado; botão só com ícone tem nome acessível.
- R10: o formulário inteiro é preenchido e enviado só pelo teclado, com foco visível.
- R11: o formulário de exemplo valida, formata e envia ao mock, em rota só de desenvolvimento (D4).

## 3. Critérios de aceite

- CA1 (R1, R9): dado o componente de formulário, quando um campo recebe rótulo, então o clique no rótulo foca o campo e, com erro, o campo tem `aria-invalid="true"` e `aria-describedby` apontando para a mensagem.
- CA2 (R2): dado o exemplo com campos obrigatórios vazios, quando se clica em Enviar, então cada campo vazio mostra "Preencha este campo." e nada é enviado.
- CA3 (R2, R6): dado e-mail `abc`, telefone `123`, data `31/02/2026`, valor negativo ou senha `abc`, quando se envia, então cada campo mostra a mensagem de formato correspondente.
- CA4 (R3): dado erro em mais de um campo, quando se envia, então o foco vai para o primeiro campo com problema, na ordem da tela.
- CA5 (R4): dado o mock respondendo 422 com `fields: { email: '...' }`, quando se envia, então a mensagem aparece no campo e-mail; dado 422 sem `fields`, a mensagem aparece no topo; dado 500, aparece a mensagem do `ApiError` no topo e os dados digitados continuam preenchidos.
- CA6 (R5): dado `formatPhone('11987654321')`, `formatPhone('1133334444')`, `formatDate('2026-10-06T12:00:00Z')`, `formatCurrency(1234.5)` e `formatTime('2026-10-06T01:30:00Z')`, então devolvem `(11) 98765-4321`, `(11) 3333-4444`, `06/10/2026`, `R$ 1.234,50` e `22:30`, mesmo com o computador em outro fuso.
- CA7 (R5): dado a digitação de `11987654321` no campo de telefone, então o campo exibe `(11) 98765-4321` e o valor enviado ao servidor é só dígitos.
- CA8 (R5): dado `2026-10-06T01:30:00Z`, quando exibida como data, então mostra `05/10/2026` (dia anterior em Brasília), e a conversão de dd/mm/aaaa para ISO e de volta não perde o dia.
- CA9 (R7): dado o exemplo, então nome tem `autoComplete="name"`; e-mail, `type="email"` e `autoComplete="email"`; telefone, `type="tel"`, `inputMode="tel"` e `autoComplete="tel-national"`; senha, `type="password"` e `autoComplete="new-password"`.
- CA10 (R8): dado envio em andamento (`?mock=demora`), quando se clica duas vezes em Enviar ou se pressiona Enter de novo, então só uma requisição é feita e o botão mostra "Enviando…" desabilitado; ao terminar, volta ao normal.
- CA11 (R9): dado o exemplo, então todo campo tem rótulo associado e o botão de mostrar senha, só com ícone, tem nome acessível que alterna entre "Mostrar senha" e "Ocultar senha".
- CA12 (R10): dado o exemplo, quando se usa só Tab, Shift+Tab, Espaço e Enter, então é possível preencher, mostrar a senha e enviar, o foco é sempre visível e a ordem de Tab segue a ordem da tela.
- CA13 (R11): dado `/dev/api-exemplo-formulario` com `VITE_USE_MOCKS=true`, quando o formulário válido é enviado, então o mock responde 201 e a tela mostra a confirmação com os dados formatados; a rota não existe no `pnpm build`.

## 4. Plano técnico

- Dados: não muda.
- API: o cliente não muda. O mock ganha `POST /exemplo-formulario` (a criar), sem regra: devolve 201 com o corpo recebido; com `?mock=invalido` devolve 422 `{ code, message, fields: { email } }`; `demora` e `erro` já vêm de `scenario.ts`. Telefone vai ao servidor só com dígitos, data em ISO 8601 e valor como número de reais (provisório, mesmo contrato de `types.ts`).
- Interface: `ui/form.tsx` e `ui/label.tsx` no padrão shadcn sobre `react-hook-form` (via `pnpm dlx shadcn add form label` se gerar no estilo `radix-nova`; senão escritos à mão no mesmo molde). Hook `use-submit-form.ts` liga `useForm` + `zodResolver`, `useMutation`, `setFocus` no primeiro erro (R3), `setError` com `ApiError.fields` (R4) e bloqueio por `isPending` (R8). Campos `PhoneInput` e `PasswordInput` (botão de mostrar senha com `aria-label`). Tela de exemplo só em DEV, como `/dev/api-exemplo`.
- Segurança: a validação do front é conveniência; o servidor revalida tudo. A senha não é registrada em log nem guardada fora do formulário; o exemplo não persiste nada além do mock em memória.
- Arquivos a alterar (vistos): `package.json`, `src/router.tsx` (rota DEV), `src/mocks/handlers.ts`, `src/mocks/scenario.ts` (parâmetro `invalido`, se couber), `AGENTS.md` (na entrega). `src/shared/formats/` existe e está vazia. A criar: `src/shared/formats/{phone.ts,date.ts,currency.ts}`, `src/shared/lib/schemas.ts`, `src/shared/lib/use-submit-form.ts`, `src/shared/components/ui/{form.tsx,label.tsx}`, `src/shared/components/{phone-input.tsx,password-input.tsx}`, `src/shared/components/example-form.tsx`, `src/mocks/handlers/exemplo-formulario.ts`.
- Reuso: `Input` e `Button` de `ui`, `api` e `ApiError` (`fields`, `kind`) de `src/shared/api`, `cn`, `USE_MOCKS`, `IsoDate` de `types.ts`. Fuso por `Intl.DateTimeFormat` com `timeZone: 'America/Sao_Paulo'`, sem biblioteca de datas.
- Riscos: (a) código gerado pelo shadcn pode não casar com as versões atuais de RHF e Zod: `pnpm typecheck` acusa; (b) `Intl` depende dos dados do ambiente: usar `pt-BR` e provar no Node 24 com `TZ` diferentes; (c) máscara de telefone que atrapalha apagar: formatar sempre a partir dos dígitos; (d) `src/shared` não importa de `gestao` nem de `portal`.

## 5. Tarefas

- [x] T1: instalar `react-hook-form`, `zod` e `@hookform/resolvers`; criar `src/shared/formats/*` (telefone, data, moeda, hora em Brasília, conversões dd/mm/aaaa e ISO) e `src/shared/lib/schemas.ts` com mensagens em português — cobre CA3, CA6, CA8 — prova: script temporário em Node (fora do repositório) com asserts dos exemplos de CA6 e CA8, rodado com `TZ=UTC` e `TZ=Asia/Tokyo`, e `pnpm typecheck`
- [x] T2: criar `ui/label.tsx`, `ui/form.tsx`, `PhoneInput`, `PasswordInput` e `use-submit-form.ts` (foco no primeiro erro, `ApiError.fields`, envio único) — cobre CA1, CA4, CA7, CA9, CA10, CA11 — prova: `pnpm typecheck && pnpm lint`
- [x] T3: criar o handler `POST /exemplo-formulario`, o formulário de exemplo e a rota DEV `/dev/api-exemplo-formulario` — cobre CA2, CA5, CA12, CA13 — prova: `pnpm dev` com `VITE_USE_MOCKS=true`, conferindo no navegador CA2 a CA5, CA7, CA10, CA12 e CA13; `pnpm build` sem a rota
- [x] T4: rodar `pnpm build`, `pnpm lint` e `pnpm format:check` — não cobre critério: garante a linha de base — prova: os três comandos passam

## 6. Decisões

- D1: React Hook Form com Zod, como propõe a issue e como é o `Form` do shadcn. Alternativa: formulário controlado à mão, descartada por repetir validação e foco em cada tela.
- D2: horário com `Intl` no fuso `America/Sao_Paulo`, sem biblioteca de datas; telefone por função própria, sem biblioteca de máscara. Alternativa: `date-fns-tz` e `react-imask`, descartadas por dependência para poucas linhas.
- D3: as regras Zod só checam formato e obrigatoriedade; a senha usa a regra provisória de P5 (8+ com letra e número), que o servidor pode ampliar. Alternativa: regras de negócio no front, vetadas pelo `AGENTS.md`.
- D4: o exemplo vive em rota só de desenvolvimento e sai com o primeiro formulário real, como `/dev/api-exemplo`.
- D5: testes automatizados dos formatos ficam para o item #8 (que define o executor); aqui a prova é um script temporário descartado, como no item #6.
- Suposição: fuso fixo de Brasília vale para todas as áreas; se a academia operar em outro fuso, só `src/shared/formats/date.ts` muda.
- Suposição: o telefone cobre números brasileiros de 10 e 11 dígitos; número internacional não é tratado.

## Construção

- T1 — arquivos: `package.json`, `pnpm-lock.yaml`, `src/shared/formats/{phone,date,currency}.ts`, `src/shared/lib/schemas.ts` — prova: script temporário fora do repositório com asserts de CA3, CA6 e CA8, com `TZ=UTC` e fuso local (Brasília, offset 180) → ok nos dois; `pnpm typecheck` → passa
- T2 — arquivos: `ui/label.tsx`, `ui/form.tsx`, `phone-input.tsx`, `password-input.tsx`, `src/shared/lib/use-submit-form.ts` — prova: `pnpm typecheck && pnpm lint` → passam
- T3 — arquivos: `src/mocks/handlers/exemplo-formulario.ts`, `src/mocks/handlers.ts`, `src/shared/components/example-form.tsx`, `src/router.tsx` — prova: `pnpm dev` com `VITE_USE_MOCKS=true` no Edge headless (puppeteer-core fora do repositório): CA2 (6 × "Preencha este campo.", nenhum POST), CA3 (mensagens de formato), CA4 (foco em Nome), CA5 (`?mock=invalido`, `invalido-geral`, `erro`; dados mantidos), CA7 (máscara), CA9, CA10 (1 POST, botão "Enviando…" desabilitado), CA11, CA12 (preencher, mostrar senha e enviar só com teclado), CA13 (confirmação formatada) → passam; `pnpm build` → passa e o texto `api-exemplo-formulario` não está em `dist/assets`
- T4 — prova: `pnpm build`, `pnpm lint`, `pnpm format:check` → passam
Regressão: `pnpm typecheck`, `pnpm build`, `pnpm lint`, `pnpm format:check` → passam, igual à linha de base (não há testes automatizados)
Desvios: `TZ=Asia/Tokyo` não é respeitado pelo Node no Windows desta máquina; a prova do fuso usou `TZ=UTC` e o fuso local (Brasília). `ui/form.tsx` e `ui/label.tsx` escritos à mão (molde shadcn), com `FormField` aceitando o terceiro tipo genérico de `ControllerProps` por causa das transformações do Zod. O mock aceita também `?mock=invalido-geral` (422 sem campos, para CA5). O foco no primeiro erro (R3) usa o `shouldFocusError` do React Hook Form, em vez de `setFocus` manual. Aviso do CA12 conferido por sequência de teclas, não por inspeção visual do anel de foco (o `Input` já tem `focus-visible:ring`).
Não é do item: o git mostra vários arquivos anteriores como alterados só por fim de linha (aviso LF/CRLF); o diff real do item não os toca.

## Verificação

### Rodada 1 — CORRIGIR_CODIGO — 2026-10-06, estado 637e523e799e6f6851e6fdeaf03127f1baee8aaa

| Critério | Status | Evidência |
|---|---|---|
| CA1 | NÃO CONFERIDO | leitura de `ui/form.tsx`: `FormLabel` com `htmlFor`, `FormControl` com `aria-invalid` e `aria-describedby` corretos; sem execução no navegador |
| CA2 | NÃO CONFERIDO | leitura: `required` em `schemas.ts` e `noValidate` no form; sem navegador |
| CA3 | NÃO CONFERIDO | leitura de `schemas.ts` coerente com o critério; sem navegador |
| CA4 | NÃO CONFERIDO | `useForm` mantém `shouldFocusError` padrão do RHF; sem navegador |
| CA5 | NÃO CONFERIDO | leitura de `use-submit-form.ts` e do mock (`invalido`, `invalido-geral`); sem navegador |
| CA6 | PASSOU | script Node temporário (`TZ=UTC`): `(11) 98765-4321`, `(11) 3333-4444`, `06/10/2026`, `R$ 1.234,50`, `22:30` |
| CA7 | NÃO CONFERIDO | leitura: `PhoneInput` mascara e `phoneField` transforma em dígitos; sem navegador |
| CA8 | PASSOU | script Node (`TZ=UTC`): `formatDate('2026-10-06T01:30:00Z')` = `05/10/2026`; `brDateToIso('06/10/2026')` volta a `06/10/2026`; `31/02/2026` → null |
| CA9 | PASSOU | leitura de `example-form.tsx`, `phone-input.tsx`, `password-input.tsx`: atributos conforme o critério |
| CA10 | NÃO CONFERIDO | leitura: bloqueio por `isPending` e botão desabilitado; sem navegador |
| CA11 | PASSOU | leitura: `FormLabel` em todos os campos; `aria-label` alterna "Mostrar senha"/"Ocultar senha" |
| CA12 | NÃO CONFERIDO | sem navegador |
| CA13 | NÃO CONFERIDO | build confirmado sem a rota (nenhum `api-exemplo-formulario` em `dist/assets`); envio ao mock sem navegador |

Comandos: `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm build` → todos passam (igual à linha de base); `grep api-exemplo-formulario dist/assets/*` → sem ocorrência; script Node de formatos com `TZ=UTC` → ok. Não há testes automatizados. Os CA marcados NÃO CONFERIDO exigem navegador, ausente nesta verificação, e o item 7 não está em "Limitações aceitas".
Achados:
- obrigatório, código, `src/shared/lib/use-submit-form.ts`, chamada `useForm({ resolver, defaultValues })` — esperado: R2 pede mostrar o erro "ao sair do campo depois de tocado"; observado: sem `mode`, o RHF usa `onSubmit`, e o erro só aparece no envio; evidência: leitura do código, nenhuma opção `mode`; corrigir: `mode: 'onTouched'`.
- sugestão, código, `src/shared/components/ui/form.tsx`, `FormControl` — `aria-describedby` sempre cita o id da descrição, que não existe quando o campo não usa `FormDescription` (nome, e-mail, data, valor).
- sugestão, código, `src/shared/components/example-form.tsx` — data e valor não têm máscara nem validação de `type`; aceitável pelo escopo.

### Correção da rodada 1
- R2: erro de campo ao sair do campo depois de tocado — arquivos: `src/shared/lib/use-submit-form.ts` (`mode: 'onTouched'` no `useForm`) — prova: `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm build` → passam; não conferido no navegador nesta correção (sem navegador nesta sessão)
Regressão: `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm build` → passam, igual à linha de base (não há testes automatizados)
Desvios: sugestões opcionais da rodada 1 (`aria-describedby`, máscara de data e valor) não feitas.

### Rodada 2 — NAO_CONFERIDO — 2026-10-06, estado eaf0dec3903cccc3b2e67e834f7e7d3b4ef7ba71

| Critério | Status | Evidência |
|---|---|---|
| CA1 | NÃO CONFERIDO | mantido da rodada 1: só leitura, sem navegador |
| CA2 | NÃO CONFERIDO | mantido da rodada 1: sem navegador |
| CA3 | NÃO CONFERIDO | mantido da rodada 1: sem navegador |
| CA4 | NÃO CONFERIDO | mantido da rodada 1: sem navegador |
| CA5 | NÃO CONFERIDO | mantido da rodada 1: sem navegador |
| CA6 | PASSOU | mantido da rodada 1 (formatos não mudaram) |
| CA7 | NÃO CONFERIDO | mantido da rodada 1: sem navegador |
| CA8 | PASSOU | mantido da rodada 1 (formatos não mudaram) |
| CA9 | PASSOU | mantido da rodada 1 |
| CA10 | NÃO CONFERIDO | mantido da rodada 1: sem navegador |
| CA11 | PASSOU | mantido da rodada 1 |
| CA12 | NÃO CONFERIDO | mantido da rodada 1: sem navegador |
| CA13 | NÃO CONFERIDO | build sem a rota confirmado (nenhum `api-exemplo-formulario` em `dist/assets`); envio ao mock sem navegador |

Comandos: `git diff 637e523… eaf0dec…` → única mudança em código: `mode: 'onTouched'` em `src/shared/lib/use-submit-form.ts`; `pnpm typecheck && pnpm lint && pnpm format:check && pnpm build` → passam (igual à linha de base); `grep api-exemplo-formulario dist/assets/*` → sem ocorrência. Não há testes automatizados. Não há navegador automatizável nesta verificação (Edge instalado, mas sem puppeteer-core nem outro driver disponível).
Achados:
- Achado obrigatório da rodada 1 (R2, erro ao sair do campo): corrigido por `mode: 'onTouched'`; confirmado na leitura do diff. Não exercitado no navegador.
- Falta de conferência: CA1 a CA5, CA7, CA10, CA12 e CA13 dependem de navegador, e o item 7 não está em "Limitações aceitas" do `AGENTS.md`. Não é defeito do item; o dono precisa aceitar a limitação (como nos itens 3, 5 e 6) ou fornecer um navegador à verificação.

### Rodada 3 — OK — 2026-10-06, estado 77eab6c09bf20e7ce3bae122c96b87c2dcc600a7

| Critério | Status | Evidência |
|---|---|---|
| CA1 | NÃO CONFERIDO (limitação aceita) | mantido da rodada 2; item 7 em "Limitações aceitas" do `AGENTS.md` |
| CA2 | NÃO CONFERIDO (limitação aceita) | idem |
| CA3 | NÃO CONFERIDO (limitação aceita) | idem |
| CA4 | NÃO CONFERIDO (limitação aceita) | idem |
| CA5 | NÃO CONFERIDO (limitação aceita) | idem |
| CA6 | PASSOU | mantido da rodada 1 (formatos não mudaram) |
| CA7 | NÃO CONFERIDO (limitação aceita) | idem CA1 |
| CA8 | PASSOU | mantido da rodada 1 |
| CA9 | PASSOU | mantido da rodada 1 |
| CA10 | NÃO CONFERIDO (limitação aceita) | idem CA1 |
| CA11 | PASSOU | mantido da rodada 1 |
| CA12 | NÃO CONFERIDO (limitação aceita) | idem CA1 |
| CA13 | NÃO CONFERIDO (limitação aceita) | build sem a rota confirmado (nenhum `api-exemplo-formulario` em `dist/assets`) |

Comandos: `git diff eaf0dec… 77eab6c…` → só `AGENTS.md` (linha da limitação aceita do item 7) e este arquivo; nenhum código mudou; `pnpm typecheck && pnpm lint && pnpm format:check && pnpm build` → passam (igual à linha de base); `grep api-exemplo-formulario dist/assets` → sem ocorrência. Não há testes automatizados.
Achados:
- Nenhum obrigatório. Achado da rodada 1 (`mode: 'onTouched'`) segue corrigido.
- sugestão, código, `src/shared/components/ui/form.tsx`, `FormControl` — `aria-describedby` cita o id da descrição mesmo sem `FormDescription` (da rodada 1, mantida).
- sugestão, código, `src/shared/components/example-form.tsx` — data e valor sem máscara (da rodada 1, mantida).

## Entrega

Formulários com React Hook Form e Zod, formatos brasileiros e um formulário de exemplo.

- O que muda: `ui/form.tsx` e `ui/label.tsx` (molde shadcn), `PhoneInput` e `PasswordInput`, hook `use-submit-form.ts` (erro de campo ao sair do campo, foco no primeiro erro, bloqueio de envio duplo, erros 422 do servidor nos campos), `schemas.ts` (regras de formato e obrigatoriedade), `formats/{phone,date,currency}.ts` (telefone, data e hora em `America/Sao_Paulo` com `Intl`, moeda) e o mock `exemplo-formulario`. O exemplo vive em `/dev/api-exemplo-formulario`, só em desenvolvimento, e não entra no build.
- Verificação: rodada 3 `OK`. `pnpm typecheck`, `pnpm lint`, `pnpm format:check` e `pnpm build` passam, igual à linha de base. Formatos provados por script temporário (CA6, CA8); o build não contém a rota de exemplo.
- Decisões: sem biblioteca de data nem de máscara; senha com a regra provisória de 8+ caracteres com letra e número, que o servidor pode ampliar.
- Limitações: CA1 a CA5, CA7, CA10, CA12 e CA13 conferidos só pela construção, sem verificação independente em navegador (aceito pelo dono, em `AGENTS.md`). Sem testes automatizados; ficam para o item #8. Data e valor do exemplo sem máscara.

Refs #7
