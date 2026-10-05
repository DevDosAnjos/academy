# Fase 11 · Operação › Agenda de aulas

> Guia: Gestão · Etapa C · Operação e comunicação · código `AGE` · [índice do guia](README.md)

- **Objetivo:** Ver e gerenciar as aulas por dia e horário.
- **Depende de:** Fases 4, 6 e 10.
- **Quem usa:** Administrador, para todas as aulas. Professor, para as aulas das suas turmas e as que ele cobre.

## Telas no canvas

- Operação › Agenda de aulas: lista e painel.
- Editar aula (janela).
- Cancelar aula (janela).
- Dias sem aula.

## Dados

- Aula: turma, data, início, término, professor da aula, status, motivo do cancelamento e observação para a equipe.
- Dia sem aula: data ou período, motivo, turmas e situação do aviso.

## Passo a passo

1. Gerar as aulas a partir dos dias e horários das turmas.
2. Montar a lista com os atalhos Hoje, Amanhã e Esta semana e os filtros por tipo, período e professor.
3. Calcular o status pelo horário.
4. Montar o painel da aula com as ações.
5. Montar a janela “Editar aula”, com a troca de professor e o alcance da mudança.
6. Montar a janela “Cancelar aula”, com motivo e aviso.
7. Montar a tela “Dias sem aula”.
8. Implementar “Nova aula” avulsa. O formulário não foi desenhado: usar o de editar.
9. Mostrar na aula quem tem aula experimental marcada. Isso fica completo na Fase 12.

## Requisitos funcionais

| Código | Requisito |
| --- | --- |
| **RF-AGE-01** | Listar as aulas do dia ou da semana com horário, turma, professor, aula experimental marcada e status. |
| **RF-AGE-02** | Atalhos Hoje, Amanhã e Esta semana, e filtros por tipo, período e professor. |
| **RF-AGE-03** | O painel mostra horário, turma, professor, número de alunos, aula experimental e grupo da turma. |
| **RF-AGE-04** | Ações do painel: Avisar turma, Editar aula, Ver turma e Cancelar aula. |
| **RF-AGE-05** | Editar aula: mudar data, horário e professor da aula, escolher se a mudança vale só para aquela aula ou também para as seguintes e anotar uma observação para a equipe. |
| **RF-AGE-06** | Ao trocar o professor, mostrar que é uma substituição e quem é o professor da turma. |
| **RF-AGE-07** | Cancelar aula: informar o motivo, avisar a turma pelos canais escolhidos com a mensagem pronta e decidir o que fazer com a aula experimental marcada. |
| **RF-AGE-08** | Dias sem aula: cadastrar feriados e recessos, cancelando de uma vez as aulas das turmas escolhidas. |
| **RF-AGE-09** | Dias sem aula: escolher quando avisar (agora ou uma semana antes) e enviar um único comunicado para todas as turmas afetadas. |
| **RF-AGE-10** | Editar ou desfazer um dia sem aula, mantendo as aulas. |
| **RF-AGE-11** | Criar uma aula avulsa. _[formulário não desenhado]_ |

## Regras de negócio

| Código | Regra |
| --- | --- |
| **RN-AGE-01** | A agenda não registra presença. Não há chamada, frequência nem percentual. |
| **RN-AGE-02** | As aulas nascem das turmas. A aula avulsa é exceção. |
| **RN-AGE-03** | Os status são Agendada, Em andamento, Concluída e Cancelada. Os três primeiros vêm do relógio. Cancelada é ação do usuário. |
| **RN-AGE-04** | A troca de professor de uma aula não muda o professor responsável da turma. |
| **RN-AGE-05** | Cancelar exige motivo: professor indisponível, feriado, evento na academia ou outro. |
| **RN-AGE-06** | Aula com experimental marcada só é cancelada depois de decidir o que fazer com a experimental. |
| **RN-AGE-07** | Dia sem aula já avisado não é avisado de novo. A situação do aviso fica visível: Enviado, Agendado ou Ainda não avisado. |
| **RN-AGE-08** | Aula concluída não pode ser editada nem cancelada. _[sugestão]_ |
| **RN-AGE-09** | O professor só altera aulas das suas turmas ou aulas em que é o substituto. |

## Casos de uso

### UC-AGE-01 · Cancelar uma aula e avisar a turma

**Quem:** Administrador ou Professor. **Antes:** Aula agendada.

**Fluxo principal**

1. Abre a agenda e seleciona a aula.
2. Clica em “Cancelar aula”.
3. Escolhe o motivo.
4. Revisa a mensagem e os canais do aviso.
5. Se houver aula experimental, escolhe o que fazer com ela.
6. Confirma.
7. O sistema cancela a aula, envia o comunicado e registra no histórico.

**Variações**

- “Manter aula”: nada muda.
- Turma sem grupo: o aviso sai pelo portal e por e-mail.

**Resultado**

Aula com status Cancelada e comunicado na lista de Comunicados.

### UC-AGE-02 · Trocar o professor de uma aula

**Quem:** Administrador. **Antes:** Aula agendada.

**Fluxo principal**

1. Seleciona a aula e clica em “Editar aula”.
2. Escolhe outro professor.
3. Escolhe o alcance da mudança.
4. Deixa marcado o aviso à turma.
5. Salva.
6. O sistema grava e abre o comunicado pronto de troca de professor.

**Resultado**

A aula mostra o substituto, e o Início do professor substituto avisa que ele cobre a aula.

### UC-AGE-03 · Marcar um dia sem aula

**Quem:** Administrador. **Antes:** Sessão de administrador.

**Fluxo principal**

1. Abre a Agenda, entra em “Dias sem aula” e clica em “Novo dia sem aula”.
2. Informa a data ou o período, o motivo e as turmas.
3. O sistema mostra quais aulas serão canceladas.
4. Escolhe quando avisar.
5. Confirma.

**Variações**

- Desfazer antes da data: as aulas voltam a Agendada.

**Resultado**

Aulas do dia canceladas e um comunicado enviado ou agendado.

## Pronto quando

- Em nenhum lugar da agenda há registro de presença.
- Cancelar uma aula gera um comunicado.
- Um feriado cancela todas as aulas do dia.
