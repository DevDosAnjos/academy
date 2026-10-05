# Fase 16 · Financeiro › Visão geral

> Guia: Gestão · Etapa D · Financeiro · código `FIN` · [índice do guia](README.md)

- **Objetivo:** Mostrar em uma tela o dinheiro do mês e as pendências.
- **Depende de:** Fases 14 e 15.
- **Quem usa:** Administrador.

## Telas no canvas

- Financeiro › Visão geral.

## Dados

- Nenhum dado próprio. Tudo é calculado a partir de cobranças, pagamentos e despesas.

## Passo a passo

1. Criar o resumo no servidor.
2. Montar os quatro indicadores, cada um com o atalho para a tela do assunto.
3. Montar as listas de próximas cobranças e de últimas movimentações.

## Requisitos funcionais

| Código | Requisito |
| --- | --- |
| **RF-FIN-01** | Mostrar, para o mês atual, o recebido (com o percentual do previsto), o que falta receber, o que está em atraso e as despesas. |
| **RF-FIN-02** | Listar as próximas cobranças (aluno, vencimento, valor e status) e as últimas movimentações, com entradas e saídas. |
| **RF-FIN-03** | Cada indicador leva à tela onde o assunto é tratado. |

## Regras de negócio

| Código | Regra |
| --- | --- |
| **RN-FIN-01** | A tela é só de consulta: os números vêm de Mensalidades e de Despesas, e nada é digitado aqui. |
| **RN-FIN-02** | São poucos indicadores, sem painel cheio de gráficos. Os gráficos ficam em Relatórios. |

## Casos de uso

### UC-FIN-01 · Conferir a situação do mês

**Quem:** Administrador. **Antes:** Mês com cobranças geradas.

**Fluxo principal**

1. Abre Financeiro › Visão geral e lê os quatro indicadores.
2. Clica em “Ver” no indicador de atraso.

**Resultado**

O administrador chega à lista de atrasados em um clique.

## Pronto quando

- Os valores batem com Mensalidades e Despesas.
