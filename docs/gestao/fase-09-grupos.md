# Fase 09 · Comunicação › Grupos

> Guia: Gestão · Etapa C · Operação e comunicação · código `GRU` · [índice do guia](README.md)

- **Objetivo:** Guardar qual grupo de WhatsApp pertence a cada turma, para o aviso sair no lugar certo.
- **Depende de:** Fase 6.
- **Quem usa:** Administrador. O professor vê os grupos das suas turmas.

## Telas no canvas

- Comunicação › Grupos: lista e painel.

## Dados

- Grupo: turma, nome do grupo, link de convite e status (Vinculado ou Sem grupo).

## Passo a passo

1. Criar a entidade Grupo, ligada à Turma.
2. Montar a lista com a situação de cada turma e o aviso das turmas sem grupo.
3. Montar o painel com nome, link, número de alunos e último comunicado.
4. Implementar “Vincular grupo” e “Editar vínculo”.
5. Mostrar a situação do grupo na lista e no painel de Turmas.

## Requisitos funcionais

| Código | Requisito |
| --- | --- |
| **RF-GRU-01** | Listar as turmas com o grupo, o professor, o número de alunos e o status. |
| **RF-GRU-02** | Mostrar quantas turmas têm grupo e destacar as que não têm. |
| **RF-GRU-03** | O painel mostra o nome do grupo, o link de convite, o número de alunos na turma e o último comunicado enviado. |
| **RF-GRU-04** | Vincular, editar e remover o vínculo de um grupo. |
| **RF-GRU-05** | Atalhos do painel: abrir o grupo no WhatsApp e criar um comunicado para a turma. |

## Regras de negócio

| Código | Regra |
| --- | --- |
| **RN-GRU-01** | O WhatsApp continua sendo o canal da academia. O sistema organiza os grupos e não substitui o WhatsApp. |
| **RN-GRU-02** | Cada turma tem no máximo um grupo. |
| **RN-GRU-03** | Turma sem grupo recebe comunicados só pelo portal e por e-mail, e a tela avisa isso. |
| **RN-GRU-04** | O sistema guarda o nome e o link do grupo. Ele não lê as mensagens do grupo. |

## Casos de uso

### UC-GRU-01 · Vincular um grupo a uma turma

**Quem:** Administrador. **Antes:** Grupo já criado no WhatsApp.

**Fluxo principal**

1. Abre Comunicação › Grupos.
2. Seleciona a turma sem grupo e clica em “Vincular grupo”.
3. Informa o nome e o link de convite.
4. Salva.

**Resultado**

A turma passa a “Vinculado” e os comunicados dela passam a oferecer o WhatsApp.

## Pronto quando

- A turma sem grupo aparece destacada.
- O link abre o grupo certo.
