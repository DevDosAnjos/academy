# Fase 04 · Agenda

> Guia: Portal do aluno · Etapa B · Consulta · código `AGP` · [índice do guia](README.md)

- **Objetivo:** Mostrar ao aluno os horários em que ele pode treinar na semana e o que mudou.
- **Depende de:** Fases 1 e 2. Gestão, Fases 6 (turmas), 7 (turma principal e outros horários) e 11 (agenda de aulas).
- **Quem usa:** Aluno e Responsável.

## Telas no canvas

- Portal › Agenda.
- No celular: Portal › Agenda.

## Dados

- Nenhum dado próprio. A tela lê as aulas das turmas em que o aluno pode treinar.

## Passo a passo

1. Buscar as aulas da semana das turmas em que o aluno pode treinar.
2. Montar a grade, com os dias nas colunas e os períodos (manhã, tarde e noite) nas linhas.
3. Diferenciar a turma principal, os outros horários, a aula com alteração e a aula que já aconteceu.
4. Implementar o filtro “Todos os horários” e “Só minha turma”.
5. Implementar a troca de semana.
6. Destacar as alterações, com atalho para o aviso.
7. Montar a versão do celular, em lista por dia.

## Requisitos funcionais

| Código | Requisito |
| --- | --- |
| **RF-AGP-01** | Mostrar a semana em grade, com os dias nas colunas e os períodos nas linhas. |
| **RF-AGP-02** | Cada aula mostra horário, turma e professor. |
| **RF-AGP-03** | Distinguir, com legenda, a turma principal, os outros horários permitidos, a aula com alteração e a aula que já aconteceu. |
| **RF-AGP-04** | Marcar a aula de hoje. |
| **RF-AGP-05** | Alternar entre “Todos os horários” e “Só minha turma”. |
| **RF-AGP-06** | Trocar de semana. |
| **RF-AGP-07** | Quando houver alteração, como troca de professor ou mudança de horário, destacar a aula e mostrar um resumo com o atalho “Ver aviso”. |
| **RF-AGP-08** | Mostrar como cancelada a aula que a gestão cancelou e o dia sem aula. _[não desenhado em detalhe]_ |

## Regras de negócio

| Código | Regra |
| --- | --- |
| **RN-AGP-01** | A agenda mostra só as turmas em que o aluno pode treinar: a principal e os outros horários permitidos. |
| **RN-AGP-02** | A agenda é só para consulta. O aluno não marca presença, não reserva vaga e não confirma aula. |
| **RN-AGP-03** | Não há registro de presença nem de frequência. |
| **RN-AGP-04** | As diferenças entre os tipos de aula não dependem só de cor: cada tipo tem também rótulo ou legenda. |
| **RN-AGP-05** | A agenda mostra na hora o que a gestão altera. |
| **RN-AGP-06** | A aula experimental de outra pessoa não aparece para o aluno. |

## Casos de uso

### UC-AGP-01 · Ver a troca de professor da semana

**Quem:** Aluno. **Antes:** Aula com professor substituto.

**Fluxo principal**

1. Abre a aba “Agenda”.
2. Vê a aula de sexta destacada, com a marca de professor alterado.
3. Lê o resumo da alteração.
4. Clica em “Ver aviso” para ler o comunicado completo.

**Resultado**

O aluno sabe quem dará a aula sem depender do grupo de WhatsApp.

## Pronto quando

- Uma troca de professor feita na gestão aparece na agenda do aluno.
- O aluno não vê turmas em que não pode treinar.
- Não existe nenhum botão de presença ou de reserva.
