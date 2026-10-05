# Fase 06 · Operação › Turmas

> Guia: Gestão · Etapa B · Cadastros básicos · código `TUR` · [índice do guia](README.md)

- **Objetivo:** Cadastrar as turmas por idade e período, com dias, horário, professor e plano padrão.
- **Depende de:** Fases 4 e 5.
- **Quem usa:** Administrador. O professor vê as suas turmas pela Fase 18.

## Telas no canvas

- Operação › Turmas: lista e painel.
- Editar turma (janela).

## Dados

- Turma: tipo (Infantil, Juvenil ou Adulto), período (Manhã, Tarde ou Noite), dias da semana, hora de início e de término, professor responsável, plano padrão e status.

## Passo a passo

1. Criar a entidade Turma.
2. Montar a lista com filtros por tipo, período e professor.
3. Montar o painel com alunos ativos, próxima aula, dias e horário, grupo e ações.
4. Montar a janela de criação e edição.
5. Implementar “Desativar turma”.
6. Deixar preparados os atalhos que dependem de fases futuras: Ver alunos (Fase 7), grupo de WhatsApp (9), aviso de mudança (10) e Ver agenda (11).

## Requisitos funcionais

| Código | Requisito |
| --- | --- |
| **RF-TUR-01** | Listar as turmas com dias, horário, professor, número de alunos e situação do grupo de WhatsApp. |
| **RF-TUR-02** | Filtrar por tipo, período e professor. |
| **RF-TUR-03** | O painel mostra alunos ativos, próxima aula, dias e horário e o grupo da turma. |
| **RF-TUR-04** | Criar e editar turma: tipo, período, dias, início, término, professor responsável e plano padrão. |
| **RF-TUR-05** | Desativar uma turma. |
| **RF-TUR-06** | Atalhos do painel: ver os alunos da turma, ver a agenda da turma e abrir o grupo no WhatsApp. |
| **RF-TUR-07** | Ao mudar dia ou horário, o sistema oferece abrir um comunicado pronto para avisar a turma. |

## Regras de negócio

| Código | Regra |
| --- | --- |
| **RN-TUR-01** | Turma é a combinação de tipo e período, com dias e horário. Hoje são 9: Infantil, Juvenil e Adulto, cada uma de manhã, à tarde e à noite. |
| **RN-TUR-02** | Ainda não se sabe se pode haver mais de uma turma para o mesmo tipo e período. O banco não deve impedir isso. **[A DEFINIR]** |
| **RN-TUR-03** | Toda turma tem um professor responsável e um plano padrão, que é sugerido para os alunos dela. |
| **RN-TUR-04** | A mudança de dia ou horário vale para as próximas aulas. As aulas passadas não mudam. |
| **RN-TUR-05** | Turma com alunos não é excluída, só desativada. _[sugestão]_ |
| **RN-TUR-06** | A turma não guarda presença. Não existe frequência no sistema. |

## Casos de uso

### UC-TUR-01 · Alterar o horário de uma turma

**Quem:** Administrador. **Antes:** Turma existente.

**Fluxo principal**

1. Abre Operação › Turmas e seleciona a turma.
2. Clica em “Editar”.
3. Muda os dias ou o horário e deixa marcado “Avisar a turma”.
4. Salva.
5. O sistema grava, ajusta as próximas aulas e abre o comunicado pronto para revisão.

**Variações**

- Aviso desmarcado: o sistema grava sem abrir o comunicado.

**Resultado**

Agenda e painel da turma mostram o novo horário.

## Pronto quando

- As 9 turmas estão cadastradas com professor e plano.
- Os filtros da lista funcionam.
