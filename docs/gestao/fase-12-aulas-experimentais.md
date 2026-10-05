# Fase 12 · Operação › Aulas experimentais

> Guia: Gestão · Etapa C · Operação e comunicação · código `EXP` · [índice do guia](README.md)

- **Objetivo:** Acompanhar quem quer conhecer a academia, do pedido ao dia da aula.
- **Depende de:** Fases 6 e 11. O pedido pelo site depende do arquivo “Site e acesso”.
- **Quem usa:** Administrador. O professor vê as experimentais das suas aulas.

## Telas no canvas

- Operação › Aulas experimentais: lista e painel.
- Agendar (janela).
- Estado: lista vazia.

## Dados

- Aula experimental: nome, telefone, turma, aula (data e horário), status, origem (site ou gestão), mensagem da pessoa e observações.

## Passo a passo

1. Criar a entidade Aula experimental, ligada a uma aula da agenda.
2. Montar a lista com as abas Hoje, Próximas, Realizadas e Canceladas e os filtros por nome, tipo e período.
3. Montar o painel com contato e ações.
4. Montar a janela de agendamento, que mostra as próximas aulas da turma escolhida.
5. Montar o aviso de “pedido novo pelo site” no topo da lista. Ele recebe dados quando o site existir.
6. Implementar reagendar e cancelar.
7. Mostrar a experimental na aula da agenda e no Início.

## Requisitos funcionais

| Código | Requisito |
| --- | --- |
| **RF-EXP-01** | Listar as aulas experimentais com pessoa, telefone, data, horário, turma e status. |
| **RF-EXP-02** | Abas com contagem: Hoje, Próximas, Realizadas e Canceladas. |
| **RF-EXP-03** | Filtrar por nome, tipo e período. |
| **RF-EXP-04** | Destacar os pedidos novos que chegaram pelo site, com o que a pessoa escreveu. |
| **RF-EXP-05** | Agendar: nome, telefone, turma e uma das próximas aulas da turma, com observações. |
| **RF-EXP-06** | Ao agendar, oferecer o envio da confirmação pelo WhatsApp. |
| **RF-EXP-07** | O painel mostra quando, turma, professor e telefone, com as ações WhatsApp, Reagendar e Cancelar. |
| **RF-EXP-08** | Quando não houver nenhuma, mostrar o estado de lista vazia com o botão de agendar. |

## Regras de negócio

| Código | Regra |
| --- | --- |
| **RN-EXP-01** | O pedido chega pelo site ou é lançado na gestão. |
| **RN-EXP-02** | A experimental é marcada em uma aula que existe na agenda. |
| **RN-EXP-03** | Os status são Agendada, Confirmada, Realizada e Cancelada. Passa a Realizada quando a aula termina sem ter sido cancelada. _[sugestão]_ |
| **RN-EXP-04** | Quem faz aula experimental não é aluno: não tem cobrança, plano nem acesso ao portal. |
| **RN-EXP-05** | O botão “Registrar como aluno” aparece no desenho, mas depende do fluxo de matrícula. Não desenvolver. **[A DEFINIR]** |
| **RN-EXP-06** | O sistema não registra o resultado da aula experimental, como se a pessoa gostou ou vai se matricular. Isso ficou fora do escopo. |
| **RN-EXP-07** | Se a aula for cancelada, a experimental precisa ser reagendada ou cancelada. |

## Casos de uso

### UC-EXP-01 · Agendar a partir de um pedido do site

**Quem:** Administrador. **Antes:** Pedido recebido pelo site.

**Fluxo principal**

1. Abre Aulas experimentais e vê o aviso de pedido novo.
2. Abre o pedido.
3. Confere nome e telefone e escolhe a turma.
4. Escolhe uma das próximas aulas.
5. Deixa marcada a confirmação pelo WhatsApp e clica em “Agendar aula”.
6. O sistema grava e abre a conversa com a mensagem de confirmação.

**Variações**

- Nenhuma aula próxima na turma: o sistema pede outra turma ou outra data.

**Resultado**

Experimental na aba “Próximas” e visível na aula da agenda.

### UC-EXP-02 · Reagendar uma aula experimental

**Quem:** Administrador. **Antes:** Experimental agendada.

**Fluxo principal**

1. Seleciona a experimental e clica em “Reagendar”.
2. Escolhe outra aula.
3. Confirma.

**Resultado**

Nova data gravada. A anterior fica no histórico.

## Pronto quando

- A experimental aparece na aula da agenda.
- Não existe caminho para transformar a pessoa em aluno.
