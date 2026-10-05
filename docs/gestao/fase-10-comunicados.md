# Fase 10 · Comunicação › Comunicados

> Guia: Gestão · Etapa C · Operação e comunicação · código `COM` · [índice do guia](README.md)

- **Objetivo:** Enviar avisos para uma turma ou para toda a academia e guardar o que foi enviado.
- **Depende de:** Fases 7 e 9 e o serviço de e-mail da Fase 1.
- **Quem usa:** Administrador, para qualquer turma. Professor, para as suas turmas.

## Telas no canvas

- Comunicação › Comunicados: lista e painel de novo comunicado.

## Dados

- Comunicado: destino (uma turma ou todas), tipo, assunto, mensagem, canais, quem enviou, data e número de destinatários.

## Passo a passo

1. Criar a entidade Comunicado.
2. Implementar a regra de destinatários: alunos da turma, alunos que treinam naquele horário e responsáveis dos menores.
3. Implementar o envio pelo portal (gravar o aviso para o portal ler) e por e-mail.
4. Implementar o WhatsApp: abrir o grupo com a mensagem pronta.
5. Montar a lista com filtros por período, turma e tipo.
6. Montar o painel “Novo comunicado”, com os textos prontos por tipo.
7. Permitir abrir o comunicado já preenchido a partir de Turmas e de Grupos e, depois, da Agenda.

## Requisitos funcionais

| Código | Requisito |
| --- | --- |
| **RF-COM-01** | Listar os comunicados enviados com data, destino, assunto, tipo, autor e status. |
| **RF-COM-02** | Filtrar por período, turma e tipo. |
| **RF-COM-03** | Novo comunicado: escolher o destino (uma turma ou todas), o tipo e a mensagem. |
| **RF-COM-04** | Os tipos são Aula cancelada, Troca de professor, Alteração de horário e Aviso geral, cada um com um texto inicial pronto para editar. |
| **RF-COM-05** | Escolher os canais: Portal, WhatsApp e E-mail. |
| **RF-COM-06** | Antes de enviar, mostrar para quantos alunos e por quantos canais o aviso vai. |
| **RF-COM-07** | No tipo “Aula cancelada”, oferecer cancelar a aula na agenda no mesmo passo. |
| **RF-COM-08** | Outras telas abrem o comunicado já preenchido: mudança de horário da turma, troca de professor, cancelamento de aula e dia sem aula. |

## Regras de negócio

| Código | Regra |
| --- | --- |
| **RN-COM-01** | O portal recebe sempre. O e-mail vai para quem não desativou os avisos. O WhatsApp vai para o grupo da turma. |
| **RN-COM-02** | Sem integração de envio, o WhatsApp não é automático: o sistema abre o grupo com a mensagem pronta e o usuário envia. _[depende da decisão sobre a integração]_ |
| **RN-COM-03** | Para alunos menores, o aviso vai para o responsável. |
| **RN-COM-04** | Quem treina naquele horário, mesmo sendo de outra turma principal, também recebe. |
| **RN-COM-05** | Para turma sem grupo, o canal WhatsApp fica indisponível. |
| **RN-COM-06** | Comunicado enviado não é editado nem apagado. Ele fica na lista. |
| **RN-COM-07** | O professor só envia para as turmas em que dá aula. |

## Casos de uso

### UC-COM-01 · Enviar um comunicado para uma turma

**Quem:** Administrador ou Professor. **Antes:** Turma com alunos.

**Fluxo principal**

1. Abre Comunicação › Comunicados e clica em “Novo comunicado”.
2. Escolhe a turma e o tipo.
3. Revisa a mensagem sugerida.
4. Confere os canais e o número de destinatários.
5. Envia.
6. O sistema publica no portal, envia os e-mails, abre o WhatsApp do grupo e grava o comunicado.

**Variações**

- Falha no envio de e-mail: o comunicado fica gravado, o portal recebe e o sistema avisa quais e-mails não saíram.
- Tipo “Aula cancelada” com a opção marcada: a aula é cancelada na agenda no mesmo passo.

**Resultado**

Comunicado na lista, com status “Enviado”.

## Pronto quando

- Um comunicado de teste chega ao portal e por e-mail.
- O professor não consegue escolher a turma de outro professor.
