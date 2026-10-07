# Especificação do projeto — Academy (front-end)

Diz o que o produto é e como ele é construído. O detalhe de cada entrega fica no arquivo do item, em `specs/itens/`. Fontes: `README.md`, `docs/visao-geral.md` e os guias em `docs/gestao/`, `docs/portal/` e `docs/site-e-acesso/` (39 fases, uma por arquivo, com requisitos RF, regras RN, casos de uso UC e "Pronto quando"). Os guias não são copiados aqui.

## 1. Objetivo

Front-end do Sistema de Gestão para Academia de Jiu-Jitsu: alunos, aulas, graduações, mensalidades e avisos. São três partes sobre o mesmo banco e o mesmo login: Gestão (administrador e professor), Portal do aluno (aluno e responsável) e Site e acesso (visitante, login, primeiro acesso e recuperação de senha). Este repositório tem só a interface; regras de negócio, cálculos, permissões, auditoria, e-mail e pagamento são do servidor, que fica fora daqui.

## 2. Quem usa

| Perfil | O que faz no sistema | O que não pode fazer |
|---|---|---|
| Administrador | Gestão com acesso total: cadastros, financeiro, configurações, importação e exportação | — |
| Professor | Gestão só das turmas em que dá aula: alunos, aulas, graduações e avisos | Acessar o financeiro e as áreas do administrador |
| Aluno | Portal: horários, avisos, graduação, mensalidades e pagamento online | Marcar presença, reservar aula, ver progresso de graduação |
| Responsável | Portal, por um ou mais alunos menores ligados à conta | Ver alunos não ligados à conta |
| Visitante | Site público e pedido de aula experimental | Criar conta (toda conta nasce de convite) |

## 3. Escopo

- Entra: as 39 fases dos guias, na parte de interface, e a preparação do front-end (Sprint 00).
- Fica fora: o back-end (projeto separado, que fala com o front por HTTP), regras de negócio e cálculos, e-mails enviados pelo sistema, recebimento das confirmações do provedor de pagamento, serviço e domínio de e-mail, versão da gestão para celular.

## 4. Requisitos gerais

- Acesso e segurança: login único; a permissão é conferida no servidor, esconder botão não basta; sem sessão válida, telas da gestão e do portal levam ao login. Prazos de sessão, convite e senha estão em aberto (P5).
- Dados pessoais: alunos, responsáveis e pedidos de aula experimental; política de LGPD e guarda em aberto (P14).
- Desempenho e volume: metas sugeridas de 2 s (gestão e portal) e 2,5 s (site no celular), por confirmar (P1).
- Dispositivos: Gestão só em computador, a partir de 1280 px. Portal e site em computador (1440 px) e celular (390 px).
- Idioma e formato: interface em português do Brasil, linguagem simples; formatos brasileiros (moeda, data, telefone). Acessibilidade: uso só com teclado, contraste AA, campos com rótulo.
- Regras do sistema inteiro (README e visão geral): não existe frequência nem presença; graduação é decisão do mestre; mensalidade é o plano menos os benefícios e ninguém digita o valor; não existe cadastro aberto; aluno nunca é excluído (Ativo, Pausado, Inativo).

## 5. Arquitetura

Alvo que os itens vão seguir (projeto do zero, nada construído ainda).

- Stack: TypeScript (modo estrito), React, Vite, shadcn/ui com Tailwind CSS e Radix, MSW para simular a API. Gerenciador de pacotes, Node e lint conforme o item #2 (propostas: pnpm, Node LTS, ESLint com Prettier e jsx-a11y).
- Camadas e pastas: por área (`site`, `acesso`, `gestao`, `portal`) mais o compartilhado (componentes, API, formatos), como pede o item #2.
- Padrões: um app Vite só, com o código de cada área carregado em separado; o site não carrega nada da gestão nem do portal (RNF-S09). Cliente da API isolado; os handlers do MSW de cada fase são o mapa da API que o front espera.
- Back-end e contrato da API (decisão #15, 07/10/2026): o back-end é um projeto separado, que fala com o front por HTTP. O front é feito contra mocks MSW, que definem os payloads antes de a API existir; o back-end parte deles. Rotas e payloads são descritos em OpenAPI, mantido neste repositório enquanto só existe o front e levado ao projeto do back-end quando ele começar; dele saem os tipos do TypeScript, hoje escritos à mão em `src/shared/api/types.ts`. A ordem das rotas acompanha as sprints do front. Em aberto: quem desenvolve o back-end. A parte de pagamento fica isolada para trocar de provedor.
- Como roda: desenvolvimento local contra mocks MSW (chave em variável de ambiente); publicação (deploy e prévia por PR) adiada, travada por P23; o item #8 cobre só testes e esteira de qualidade (`pnpm test`, `pnpm test:e2e`, `.github/workflows/ci.yml`).

## 6. Dados

Descritos nos guias, fase a fase. Entidades centrais: academia, usuário e convite, professor, plano, benefício, turma, aluno, responsável, graduação, grupo, comunicado, aula, aula experimental, cobrança e mensalidade, despesa, histórico de alterações. O front só consome a API; o modelo é do servidor.

## 7. Integrações externas

| Serviço | Para quê | Se falhar |
|---|---|---|
| Back-end (API) | Todos os dados e regras | Desenvolvimento segue contra mocks MSW (decisão #15) |
| Provedor de pagamento online | Pix, cartão e boleto no portal | Não escolhido (P21); pagamento lançado à mão na gestão, cartão em Integrações mostra "Não configurado" |
| E-mail e WhatsApp | Convites, avisos, lembretes | E-mail é do servidor; WhatsApp abre a conversa com mensagem pronta (P11) |

## 8. Regras de negócio gerais

- Toda conta nasce de convite enviado pela gestão; avisos, lembretes e cobranças de aluno menor vão para o responsável.
- Aluno pausado, inativo ou com bolsa integral não recebe cobrança; a cobrança guarda a composição do valor e não muda depois.
- Pagamento só do valor inteiro, sem juros nem multa, até decisão (P16).
- Onde o guia marca [A DEFINIR], usar a solução provisória da issue de decisão correspondente e não inventar. Onde marca [sugestão], vale o guia até a confirmação (P1).

## 9. Decisões

| Decisão | Motivo | Alternativa descartada |
|---|---|---|
| Base dos PRs é `dev` (dono) | Fluxo do dono | `main` |
| Planejamento nas issues do GitHub; sprints são os milestones (dono) | Já montado e ordenado | Backlog só no arquivo |
| Telas em `docs/<sistema>/telas/`, separadas em `desktop` e `mobile` (dono) | Agente lê as imagens do repositório | Só o link do canvas |
| Respostas e documentos em português do Brasil; código em inglês (dono) | Preferência do dono | — |
| Enquanto P1 a P21 estão abertas, vale a solução provisória de cada issue | Os guias mandam não desenvolver por conta própria | Esperar a resposta |
| Issues de design não barram fases (recomendação, P22) | Os guias mandam seguir o padrão das telas existentes | Barrar até as telas existirem |
