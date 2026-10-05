# Fase 13 · Financeiro › Planos e benefícios › Descontos e bolsas

> Guia: Gestão · Etapa D · Financeiro · código `BEN` · [índice do guia](README.md)

- **Objetivo:** Registrar os descontos individuais e as bolsas, que reduzem a mensalidade de alunos específicos.
- **Depende de:** Fases 5 e 7.
- **Quem usa:** Administrador.

## Telas no canvas

- Financeiro › Planos e benefícios › Regras: abas Descontos individuais e Bolsas.
- Conceder benefício (janela).

## Dados

- Benefício: aluno, tipo (desconto individual ou bolsa), valor em reais ou percentual, motivo, quem decidiu, início e validade.

## Passo a passo

1. Criar a entidade Benefício.
2. Montar as abas de descontos individuais e de bolsas.
3. Montar a janela “Conceder benefício”, com o resumo da nova mensalidade.
4. Mostrar os benefícios na edição e na ficha do aluno e marcar “Bolsista” na lista de alunos.
5. Mostrar o aviso da regra de combinação em aberto. O botão “Definir regra” fica sem ação por enquanto.
6. Completar os resumos dos cartões da tela inicial de Planos e benefícios.

## Requisitos funcionais

| Código | Requisito |
| --- | --- |
| **RF-BEN-01** | Listar os descontos individuais com aluno, valor, motivo, quem concedeu e validade. |
| **RF-BEN-02** | Listar as bolsas com aluno, turma, tamanho, início e validade. |
| **RF-BEN-03** | Conceder benefício: escolher o aluno, o tipo, o valor ou o tamanho, o motivo e a validade. |
| **RF-BEN-04** | Antes de confirmar, a janela mostra o plano, o benefício, a nova mensalidade e a partir de qual mês ela vale. |
| **RF-BEN-05** | Encerrar um benefício. _[não desenhado]_ |
| **RF-BEN-06** | A tela avisa que a regra de combinação ainda não foi definida. |

## Regras de negócio

| Código | Regra |
| --- | --- |
| **RN-BEN-01** | Há dois tipos de benefício: o desconto individual, em reais por mês, e a bolsa, em percentual (30%, 50% ou integral). |
| **RN-BEN-02** | Não existe desconto por faixa. |
| **RN-BEN-03** | Todo benefício guarda o motivo e quem decidiu, o professor ou o dono. Quem lança no sistema é o administrador. |
| **RN-BEN-04** | O benefício vale a partir da próxima cobrança gerada. Cobrança já gerada não muda. |
| **RN-BEN-05** | A validade pode ser “sem prazo” ou uma data. Benefício vencido deixa de ser aplicado. |
| **RN-BEN-06** | Com bolsa integral, o aluno não recebe cobrança. |
| **RN-BEN-07** | Quando o aluno tem mais de um benefício, a forma de combinar ainda não foi definida. Até lá, o sistema pede a decisão caso a caso na geração das cobranças. **[A DEFINIR]** |
| **RN-BEN-08** | Na pausa do aluno, os benefícios ficam guardados. |

## Casos de uso

### UC-BEN-01 · Conceder um desconto individual

**Quem:** Administrador. **Antes:** Decisão do professor ou do dono já tomada.

**Fluxo principal**

1. Abre Planos e benefícios, entra em Descontos individuais e clica em “Novo desconto”.
2. Escolhe o aluno.
3. Informa o valor, o motivo e a validade.
4. Confere a nova mensalidade.
5. Confirma.
6. O sistema grava e registra no histórico.

**Variações**

- Aluno já tem outro benefício: o sistema avisa que a combinação será decidida na geração das cobranças.

**Resultado**

O desconto entra na próxima cobrança do aluno.

## Pronto quando

- A mensalidade na ficha do aluno muda depois de conceder o benefício.
- Não há opção de desconto por faixa em nenhuma tela.
