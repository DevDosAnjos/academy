# Fase 15 · Financeiro › Despesas

> Guia: Gestão · Etapa D · Financeiro · código `DES` · [índice do guia](README.md)

- **Objetivo:** Controlar as contas e os gastos da academia.
- **Depende de:** Fase 1.
- **Quem usa:** Administrador.

## Telas no canvas

- Financeiro › Despesas: lista e painel.
- Nova despesa (janela). A mesma janela serve para editar.
- Importar planilha e Exportar são feitos na Fase 23.

## Dados

- Despesa: descrição, categoria, valor, vencimento, recorrência (avulsa ou mensal), forma de pagamento, status, data do pagamento e boleto anexado.

## Passo a passo

1. Criar a entidade Despesa.
2. Montar a lista com os três totais do mês e os filtros por período, categoria e status.
3. Montar o painel com os detalhes e as ações.
4. Montar a janela “Nova despesa”.
5. Implementar a recorrência mensal.
6. Implementar o anexo do boleto.

## Requisitos funcionais

| Código | Requisito |
| --- | --- |
| **RF-DES-01** | Listar as despesas com descrição, recorrência, categoria, vencimento, valor e status. |
| **RF-DES-02** | Mostrar o previsto no mês, o que já foi pago e o que falta pagar. |
| **RF-DES-03** | Filtrar por período, categoria e status. |
| **RF-DES-04** | O painel mostra valor, vencimento, recorrência, forma de pagamento e último pagamento. |
| **RF-DES-05** | Cadastrar e editar uma despesa, com a opção “já foi paga”. |
| **RF-DES-06** | Marcar uma despesa como paga. |
| **RF-DES-07** | Anexar o boleto. |

## Regras de negócio

| Código | Regra |
| --- | --- |
| **RN-DES-01** | Os status são A pagar, Pago e Vencido, este quando passa do vencimento sem pagamento. |
| **RN-DES-02** | A despesa mensal se repete todo mês no mesmo dia até ser encerrada. _[detalhar com a academia]_ |
| **RN-DES-03** | As categorias iniciais são Estrutura, Serviços, Manutenção e Material. **[A DEFINIR: se serão editáveis]** |
| **RN-DES-04** | Despesa não tem ligação com aluno. |

## Casos de uso

### UC-DES-01 · Lançar uma despesa

**Quem:** Administrador. **Antes:** Sessão de administrador.

**Fluxo principal**

1. Abre Despesas e clica em “Nova despesa”.
2. Informa descrição, categoria, valor, vencimento, recorrência e forma de pagamento.
3. Se já pagou, marca a opção.
4. Salva.

**Resultado**

Despesa na lista e totais do mês atualizados.

### UC-DES-02 · Marcar uma despesa como paga

**Quem:** Administrador. **Antes:** Despesa a pagar.

**Fluxo principal**

1. Seleciona a despesa.
2. Clica em “Marcar como paga”.
3. O sistema grava a data e muda o status.

**Resultado**

Os totais “Pago” e “A pagar” do mês são atualizados.

## Pronto quando

- Os três totais batem com a lista.
- A despesa mensal aparece no mês seguinte.
