# Fase 07 · Pagamento online

> Guia: Portal do aluno · Etapa C · Financeiro e pagamento · código `PGO` · [índice do guia](README.md)

- **Objetivo:** Permitir pagar a mensalidade pelo portal, com baixa automática na gestão.
- **Depende de:** Fase 6. Gestão, Fases 14 (mensalidades) e 24 (integrações). Depende da escolha do provedor de pagamento.
- **Quem usa:** Aluno e Responsável.

## Telas no canvas

- Portal › Pagar mensalidade (janela).
- Portal › Pagamento confirmado (janela).
- Portal › Pagamento não aprovado (janela).
- No celular: Portal › Pagar mensalidade.

## Dados

- Tentativa de pagamento: cobrança, forma, valor, situação, identificação no provedor e data.
- Os dados do cartão não são guardados.

## Passo a passo

1. Escolher o provedor e criar a conta de teste.
2. Implementar a camada de pagamento isolada, a mesma citada na Fase 24 da Gestão.
3. Montar a janela de pagamento com as três formas.
4. Pix: gerar o QR Code e o código copia e cola e aguardar a confirmação.
5. Cartão: usar o formulário seguro do provedor e tratar a resposta na hora.
6. Boleto: gerar o boleto e enviar por e-mail.
7. Receber as confirmações do provedor e dar baixa na cobrança.
8. Montar as janelas de pagamento confirmado e de pagamento não aprovado.
9. Enviar o comprovante por e-mail.
10. Avisar a gestão por notificação: pagamento recebido e pagamento não aprovado.
11. Testar pagamento repetido, confirmação atrasada e confirmação recebida duas vezes.

## Requisitos funcionais

| Código | Requisito |
| --- | --- |
| **RF-PGO-01** | Abrir a janela de pagamento a partir do Início e do Financeiro, com o mês, o plano, o vencimento e o valor. |
| **RF-PGO-02** | Escolher entre Pix, cartão de crédito e boleto. |
| **RF-PGO-03** | Pix: mostrar o QR Code e o código copia e cola, com o prazo de validade, e confirmar na tela sozinho quando o pagamento entrar. |
| **RF-PGO-04** | Cartão: informar número, nome, validade e código de segurança, com resposta na hora. |
| **RF-PGO-05** | Boleto: gerar com vencimento no dia e enviar também por e-mail, avisando que a confirmação leva até 3 dias úteis. |
| **RF-PGO-06** | Pagamento confirmado: mostrar valor, forma, data e hora e referência, enviar o comprovante por e-mail e permitir baixar. |
| **RF-PGO-07** | Pagamento não aprovado: informar que nada foi cobrado e que a mensalidade continua em aberto, e oferecer tentar outro cartão, pagar com Pix ou pagar depois. |
| **RF-PGO-08** | Informar na janela quem processa o pagamento. |
| **RF-PGO-09** | Depois da confirmação, a mensalidade passa a paga no portal e na gestão, sem ação do administrador. |

## Regras de negócio

| Código | Regra |
| --- | --- |
| **RN-PGO-01** | O provedor de pagamento ainda não foi escolhido. **[A DEFINIR]** |
| **RN-PGO-02** | O sistema não guarda o número do cartão nem o código de segurança. Esses dados vão direto ao provedor. |
| **RN-PGO-03** | A baixa só acontece com a confirmação do provedor, nunca só pelo retorno do navegador. |
| **RN-PGO-04** | A mesma confirmação recebida duas vezes não gera dois pagamentos. |
| **RN-PGO-05** | Cobrança paga não pode ser paga de novo. |
| **RN-PGO-06** | O pagamento é sempre do valor inteiro da cobrança. **[A DEFINIR: pagamento parcial, juros e multa]** |
| **RN-PGO-07** | O código do Pix tem validade, de 30 minutos no desenho. Depois disso, é gerado um novo. |
| **RN-PGO-08** | O boleto fica aguardando até compensar. A mensalidade só passa a paga com a confirmação. |
| **RN-PGO-09** | Cada pagamento e cada tentativa recusada geram registro no histórico de alterações e notificação na gestão. |
| **RN-PGO-10** | Os lembretes automáticos param quando o pagamento é confirmado. |
| **RN-PGO-11** | Quem paga pode ser o aluno ou o responsável. O comprovante vai para o e-mail da conta que pagou. |
| **RN-PGO-12** | Ainda não foi decidido quem arca com as taxas do provedor. **[A DEFINIR]** |

## Casos de uso

### UC-PGO-01 · Pagar a mensalidade com Pix

**Quem:** Aluno ou Responsável. **Antes:** Mensalidade em aberto e provedor configurado.

**Fluxo principal**

1. Clica em “Pagar agora” no Início ou em “Pagar” no Financeiro.
2. Escolhe Pix.
3. O portal mostra o QR Code e o código copia e cola.
4. Paga no aplicativo do banco.
5. O provedor confirma, e o sistema dá baixa na cobrança.
6. O portal mostra “Pagamento confirmado” e envia o comprovante por e-mail.

**Variações**

- O código expira sem pagamento: o portal oferece gerar um novo.
- O usuário fecha a janela antes de pagar: a mensalidade continua em aberto.

**Resultado**

Mensalidade paga no portal e na gestão, e lembretes interrompidos.

### UC-PGO-02 · Pagar com cartão recusado

**Quem:** Aluno ou Responsável. **Antes:** Mensalidade em aberto.

**Fluxo principal**

1. Escolhe cartão de crédito e informa os dados.
2. O provedor recusa o cartão.
3. O portal mostra “Pagamento não aprovado” e informa que nada foi cobrado.
4. Escolhe “Pagar com Pix” e conclui o pagamento.

**Variações**

- Escolhe “Tentar outro cartão”: volta ao formulário do cartão.
- Escolhe “Pagar depois”: a janela fecha e a mensalidade continua em aberto.

**Resultado**

A gestão recebe a notificação da tentativa recusada e, depois, a do pagamento.

### UC-PGO-03 · Pagar com boleto

**Quem:** Aluno ou Responsável. **Antes:** Mensalidade em aberto.

**Fluxo principal**

1. Escolhe boleto e clica em “Gerar boleto”.
2. O portal gera o boleto e o envia também por e-mail.
3. O usuário paga no banco.
4. Em até 3 dias úteis o provedor confirma, e o sistema dá baixa.

**Variações**

- O boleto vence sem pagamento: a mensalidade continua em aberto e um novo boleto pode ser gerado.

**Resultado**

Mensalidade paga depois da compensação.

## Pronto quando

- Um pagamento de teste por Pix muda a mensalidade para paga na gestão sem ninguém mexer.
- Receber a mesma confirmação duas vezes não cria dois pagamentos.
- Nenhum dado de cartão fica gravado no banco de dados.
- Trocar o provedor não exige mudar as telas do portal.
