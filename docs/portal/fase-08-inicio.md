# Fase 08 · Início

> Guia: Portal do aluno · Etapa D · Início · código `INP` · [índice do guia](README.md)

- **Objetivo:** Mostrar ao aluno, logo ao entrar, o que interessa hoje: a próxima aula, a mensalidade, os avisos e a graduação.
- **Depende de:** Fases 2 a 7 deste guia.
- **Quem usa:** Aluno e Responsável.

## Telas no canvas

- Portal › Início (aluno).
- Portal › Início (tudo em dia, sem avisos).
- Portal › Início (responsável).
- No celular: Portal › Início (aluno) e Portal › Início (responsável).

## Dados

- Nenhum dado próprio. É uma leitura das outras abas.

## Passo a passo

1. Criar no servidor o resumo do aluno.
2. Montar o cartão “Próxima aula”.
3. Montar o cartão da mensalidade, com as variações em aberto, em atraso e paga.
4. Montar o bloco “Avisos recentes”, com o estado sem avisos novos.
5. Montar o cartão da graduação.
6. Ajustar a tela para a conta de responsável.

## Requisitos funcionais

| Código | Requisito |
| --- | --- |
| **RF-INP-01** | Mostrar a data e uma saudação com o nome de quem está logado. |
| **RF-INP-02** | Próxima aula: dia, horário, turma e professor, com o atalho para a agenda. |
| **RF-INP-03** | Avisar no cartão da aula quando uma das próximas aulas tiver alteração, e informar quando não houver nenhuma na semana. |
| **RF-INP-04** | Mensalidade: mês, status e valor, com o botão “Pagar agora” e o atalho para o Financeiro. |
| **RF-INP-05** | Quando a mensalidade estiver paga, mostrar “Tudo em dia”, a data do pagamento, o próximo vencimento e o atalho para os comprovantes. |
| **RF-INP-06** | Avisos recentes: os últimos avisos, com atalho para todos. Sem avisos novos, a tela informa isso. |
| **RF-INP-07** | Graduação: faixa e grau atuais e desde quando, com a marca “Nova” quando a graduação é do dia, e o atalho para “Minhas informações”. |
| **RF-INP-08** | Na conta de responsável, mostrar a mesma tela para o aluno escolhido, com os títulos no nome dele. |

## Regras de negócio

| Código | Regra |
| --- | --- |
| **RN-INP-01** | O Início não tem dados próprios. Ele lê as outras abas. |
| **RN-INP-02** | Só entra no Início o que é do aluno e pode virar ação. |
| **RN-INP-03** | Não há gráficos, frequência nem progresso de graduação. |
| **RN-INP-04** | Havendo mensalidade em atraso, é ela que aparece no cartão, antes da mensalidade do mês. |
| **RN-INP-05** | Cada cartão leva à aba onde o assunto é tratado. |

## Casos de uso

### UC-INP-01 · Ver o dia e pagar pelo Início

**Quem:** Aluno. **Antes:** Mensalidade vencendo hoje.

**Fluxo principal**

1. Entra no portal.
2. Lê a próxima aula e o aviso de alteração.
3. Vê que a mensalidade vence hoje.
4. Clica em “Pagar agora” e conclui o pagamento.

**Variações**

- Tudo em dia: o cartão mostra “Tudo em dia” e o próximo vencimento.

**Resultado**

O cartão da mensalidade passa a mostrar “Paga”.

## Pronto quando

- Os dados dos cartões batem com as abas de origem.
- Depois de pagar, o Início mostra “Tudo em dia” sem precisar sair e entrar de novo.
- Na conta de responsável, trocar de aluno muda os quatro blocos.
