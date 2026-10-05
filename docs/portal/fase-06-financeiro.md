# Fase 06 · Financeiro

> Guia: Portal do aluno · Etapa C · Financeiro e pagamento · código `FNP` · [índice do guia](README.md)

- **Objetivo:** Mostrar ao aluno quanto ele paga, por quê, o que está em aberto e o que já pagou.
- **Depende de:** Fases 1 e 2. Gestão, Fases 13 (descontos e bolsas) e 14 (mensalidades).
- **Quem usa:** Aluno e Responsável.

## Telas no canvas

- Portal › Financeiro.
- No celular: Portal › Financeiro.

## Dados

- Nenhum dado próprio. A tela lê as cobranças, os pagamentos e os comprovantes gerados na gestão.

## Passo a passo

1. Montar o bloco da mensalidade em aberto, com o status e o botão de pagar. O botão só passa a funcionar na Fase 7.
2. Montar a composição do valor.
3. Montar o histórico por ano.
4. Implementar o comprovante para baixar.
5. Tratar os casos de mensalidade em atraso e de tudo pago.

## Requisitos funcionais

| Código | Requisito |
| --- | --- |
| **RF-FNP-01** | Mostrar a mensalidade em aberto: mês, status, valor e vencimento, com o botão “Pagar”. |
| **RF-FNP-02** | Mostrar a composição do valor: o plano, cada benefício e o total, e o dia de vencimento. |
| **RF-FNP-03** | Listar o histórico por ano, com referência, vencimento, valor, data do pagamento, forma e status. |
| **RF-FNP-04** | Baixar o comprovante de cada pagamento. |
| **RF-FNP-05** | Quando houver mensalidade em atraso, mostrá-la antes da mensalidade do mês. |
| **RF-FNP-06** | Quando tudo estiver pago, informar que está em dia e quando vence a próxima. |

## Regras de negócio

| Código | Regra |
| --- | --- |
| **RN-FNP-01** | O aluno vê só as próprias cobranças. O responsável vê as dos alunos vinculados. |
| **RN-FNP-02** | O valor e a composição vêm da cobrança gerada na gestão. O portal não recalcula nada. |
| **RN-FNP-03** | Os status são os mesmos da gestão: Pendente, Vence hoje, Em atraso, Pago e Pago com atraso. |
| **RN-FNP-04** | O aluno não altera valor, vencimento nem benefício. |
| **RN-FNP-05** | O pagamento lançado à mão na gestão aparece no histórico do portal com comprovante, igual ao pagamento feito online. |
| **RN-FNP-06** | Não há juros nem multa enquanto a academia não decidir. **[A DEFINIR]** |

## Casos de uso

### UC-FNP-01 · Entender o valor da mensalidade

**Quem:** Aluno ou Responsável. **Antes:** Mês com cobrança gerada.

**Fluxo principal**

1. Abre a aba “Financeiro”.
2. Vê a mensalidade do mês e o vencimento.
3. Lê a composição: o plano, o desconto e o total.

**Resultado**

O aluno entende por que paga aquele valor.

### UC-FNP-02 · Baixar um comprovante

**Quem:** Aluno ou Responsável. **Antes:** Pelo menos um pagamento feito.

**Fluxo principal**

1. Abre a aba “Financeiro”.
2. Escolhe o ano no histórico.
3. Clica em “Comprovante” na linha do mês.

**Resultado**

O arquivo do comprovante é baixado.

## Pronto quando

- O valor e a composição são iguais aos da mesma cobrança na gestão.
- Um pagamento registrado na gestão aparece no histórico do portal.
- Uma conta não vê cobranças de aluno não vinculado.
