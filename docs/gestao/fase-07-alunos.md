# Fase 07 · Pessoas › Alunos

> Guia: Gestão · Etapa B · Cadastros básicos · código `ALU` · [índice do guia](README.md)

- **Objetivo:** Ser o ponto central de consulta e ação sobre cada aluno: olhar, entender a situação e agir sem sair da tela.
- **Depende de:** Fases 5 e 6. Algumas ações do painel só ficam completas depois: graduação na Fase 8 e financeiro na Fase 14.
- **Quem usa:** Administrador. O professor vê os alunos das suas turmas em tela própria (Fase 18).

## Telas no canvas

- Pessoas › Alunos: lista, filtros e painel.
- Ficha completa (janela): dados, histórico de graduações e resumo financeiro.
- Editar aluno (janela).
- Financeiro do aluno (janela). É completada na Fase 14.
- Pausar ou encerrar (janela).
- Estado: busca sem resultados.
- Importar planilha e Exportar são feitos na Fase 23.

## Dados

- Aluno: nome completo, nascimento, telefone ou WhatsApp, e-mail, situação (Ativo, Pausado ou Inativo), turma principal, outros horários em que pode treinar, plano, dia de vencimento, graduação atual e data de entrada.
- Responsável: nome, telefone, e-mail e alunos vinculados.

## Passo a passo

1. Criar as entidades Aluno e Responsável e o vínculo entre elas.
2. Montar a lista com os filtros rápidos (Todos, Ativos, Inativos e Bolsistas) e os filtros por nome, turma, período, faixa e situação financeira.
3. Montar o painel lateral com o resumo e as ações.
4. Montar a ficha completa.
5. Montar a janela de edição, com dados pessoais, responsável, treino e plano.
6. Implementar o cadastro simples de novo aluno, que é provisório (ver a regra sobre matrícula).
7. Implementar pausar e encerrar.
8. Deixar os pontos de encaixe para graduação (Fase 8), benefícios (13), financeiro (14) e acesso ao portal (arquivo do Portal).

## Requisitos funcionais

| Código | Requisito |
| --- | --- |
| **RF-ALU-01** | A lista mostra aluno, turma, faixa e situação financeira, com o total de ativos e de inativos. |
| **RF-ALU-02** | Filtros rápidos: Todos, Ativos, Inativos e Bolsistas, cada um com a contagem. |
| **RF-ALU-03** | Filtros por nome, turma, período, faixa e situação financeira. |
| **RF-ALU-04** | O painel mostra situação, turma, graduação e data da última, plano e valor, situação financeira e telefone. |
| **RF-ALU-05** | Ações do painel: WhatsApp, Editar, Registrar graduação, Financeiro do aluno e Ficha completa. |
| **RF-ALU-06** | A ficha completa mostra os dados do aluno, os benefícios e a mensalidade atual, o histórico de graduações em linha do tempo e o resumo financeiro. |
| **RF-ALU-07** | A edição altera dados pessoais, responsável, situação, turma principal, outros horários, plano e dia de vencimento. |
| **RF-ALU-08** | A edição mostra, sem permitir digitar, os benefícios do aluno e a mensalidade resultante. |
| **RF-ALU-09** | A edição mostra a situação do acesso ao portal e permite reenviar o acesso. |
| **RF-ALU-10** | “Pausar ou encerrar” permite escolher entre pausa, com retorno previsto opcional, e encerramento, informar o motivo e decidir o que fazer com as cobranças em aberto. |
| **RF-ALU-11** | A janela de pausa ou encerramento explica o que acontece com mensalidades, benefícios, portal e grupo da turma. |
| **RF-ALU-12** | “Novo aluno” abre um cadastro simples, com os mesmos campos da edição. _[provisório: ver a regra sobre matrícula]_ |

## Regras de negócio

| Código | Regra |
| --- | --- |
| **RN-ALU-01** | As situações do aluno são Ativo, Pausado e Inativo. Aluno nunca é excluído: o histórico fica. |
| **RN-ALU-02** | Menor de idade precisa de responsável. Os avisos e as cobranças do menor vão para o responsável. |
| **RN-ALU-03** | O aluno tem uma turma principal e pode ter outros horários em que treina. _[quase certo: confirmar com a academia]_ |
| **RN-ALU-04** | O dia de vencimento é escolhido entre 1, 5, 10 e 15. |
| **RN-ALU-05** | A mensalidade mostrada é calculada (plano menos benefícios). Ninguém digita o valor. |
| **RN-ALU-06** | A graduação não é editada no cadastro. Ela só muda por “Registrar graduação” (Fase 8). |
| **RN-ALU-07** | A situação financeira vem das cobranças: Em dia, Vence hoje ou Em atraso. |
| **RN-ALU-08** | “Bolsista” é o aluno com bolsa ativa. |
| **RN-ALU-09** | Na pausa, o sistema não gera cobrança nova, guarda os benefícios para a volta, mantém o acesso ao portal e mantém o aluno no grupo da turma. As cobranças em aberto são mantidas ou canceladas conforme a escolha feita na hora. |
| **RN-ALU-10** | O fluxo de matrícula não está definido: quando alguém passa a ser aluno, se há contrato, se há pagamento inicial e quem faz cada etapa. Não desenvolver matrícula. Até lá, “Novo aluno” é só um cadastro simples. **[A DEFINIR]** |
| **RN-ALU-11** | Dois cadastros com o mesmo nome e a mesma data de nascimento são tratados como o mesmo aluno. |
| **RN-ALU-12** | O sistema não guarda presença nem frequência do aluno. |

## Casos de uso

### UC-ALU-01 · Consultar um aluno e agir

**Quem:** Administrador. **Antes:** Sessão de administrador.

**Fluxo principal**

1. Abre Pessoas › Alunos.
2. Filtra ou busca pelo nome.
3. Seleciona o aluno.
4. O painel mostra situação, turma, graduação, plano e situação financeira.
5. Escolhe uma ação: WhatsApp, Editar, Registrar graduação, Financeiro do aluno ou Ficha completa.

**Variações**

- Nenhum aluno encontrado: a tela mostra o estado “busca sem resultados”, com a opção de limpar os filtros.

**Resultado**

A ação escolhida abre no mesmo contexto, sem trocar de módulo.

### UC-ALU-02 · Editar o cadastro de um aluno

**Quem:** Administrador. **Antes:** Aluno existente.

**Fluxo principal**

1. No painel do aluno, clica em “Editar”.
2. Altera os dados.
3. Salva.
4. O sistema valida, grava e registra no histórico.

**Variações**

- Aluno menor sem responsável: o sistema pede o responsável antes de gravar.
- Troca de turma principal ou de plano: vale a partir da próxima geração de cobranças.

**Resultado**

Lista, painel e ficha mostram os dados novos.

### UC-ALU-03 · Pausar um aluno

**Quem:** Administrador. **Antes:** Aluno ativo.

**Fluxo principal**

1. Abre “Pausar ou encerrar” a partir do aluno.
2. Escolhe “Pausar” e informa o motivo e, se souber, o retorno previsto.
3. Decide se as cobranças em aberto ficam ou são canceladas.
4. Confirma.
5. O sistema muda a situação para Pausado e registra no histórico.

**Variações**

- Escolhe “Encerrar”: o aluno passa a Inativo e deixa de ser cobrado. O histórico é mantido.

**Resultado**

O aluno pausado não entra na próxima geração de cobranças.

## Pronto quando

- É possível encontrar um aluno e abrir qualquer ação em até três cliques.
- Um menor sem responsável não é gravado.
- Um aluno pausado sai da contagem de ativos e não recebe cobrança nova.
