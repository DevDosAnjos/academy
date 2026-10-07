# Fase 19 · Notificações

> Guia: Gestão · Etapa E · Acompanhamento · código `NOT` · [índice do guia](README.md)

> **Atualização de escopo (07/10/2026, issue #14):** o site público de cada academia saiu do escopo; no lugar dele entra a landing page da plataforma (#96). O que estava escrito aparece riscado, com a atualização logo depois quando há.

- **Objetivo:** Avisar o usuário do que aconteceu e pede atenção, sem ele precisar procurar.
- ~~**Depende de:** Fases 12 e 14. Parte dos avisos vem do portal e do site.~~ _Atualização:_ **Depende de:** Fases 12 e 14. Parte dos avisos vem do portal.
- **Quem usa:** Administrador. O professor recebe só o que é das suas turmas.

## Telas no canvas

- Notificações: painel aberto pelo sino do menu.

## Dados

- Notificação: tipo, texto, link, data, lida ou não lida e destinatário.

## Passo a passo

1. Criar a entidade Notificação e gerá-la a partir dos eventos do sistema.
2. Montar o contador no menu.
3. Montar o painel com os filtros.
4. Implementar “Marcar todas como lidas”.

## Requisitos funcionais

| Código | Requisito |
| --- | --- |
| **RF-NOT-01** | O sino no rodapé do menu mostra quantas notificações não foram lidas. |
| **RF-NOT-02** | O painel abre ao lado do menu, por cima da tela atual. |
| **RF-NOT-03** | Agrupar por “Hoje” e “Esta semana” e filtrar entre Todas e Não lidas. |
| **RF-NOT-04** | Cada notificação tem título, detalhe, horário e a ação que resolve, com link. |
| **RF-NOT-05** | Marcar todas como lidas. |
| **RF-NOT-06** | Quando não houver notificações não lidas, mostrar o estado “Tudo lido”. |

## Regras de negócio

| Código | Regra |
| --- | --- |
| **RN-NOT-01** | ~~Geram notificação: pedido de aula experimental pelo site, pagamento recebido pelo portal, pagamento não aprovado no portal, mensalidades que vencem hoje, convite não aceito e turma sem grupo de WhatsApp.~~ _Atualização:_ Geram notificação: pagamento recebido pelo portal, pagamento não aprovado no portal, mensalidades que vencem hoje, convite não aceito e turma sem grupo de WhatsApp. |
| **RN-NOT-02** | O professor só recebe as notificações das suas turmas e nenhuma de assunto financeiro. |
| **RN-NOT-03** | A notificação informa. Ela não substitui a lista “Precisa de atenção” do Início. |

## Casos de uso

### ~~UC-NOT-01 · Tratar um pedido de aula experimental pela notificação~~ _Removido do escopo (#14)._

**Quem:** Administrador. **Antes:** Pedido recebido pelo site.

**Fluxo principal**

1. Vê o contador no sino.
2. Abre o painel.
3. Clica em “Agendar” na notificação do pedido.
4. O sistema abre a janela de agendamento com os dados do pedido.

**Resultado**

Notificação lida e aula experimental agendada.

## Pronto quando

- ~~Um pedido feito no site gera a notificação.~~ _Removido do escopo (#14)._
- O contador diminui ao marcar como lidas.
