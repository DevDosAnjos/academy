# Fase 14 · Financeiro › Mensalidades

> Guia: Gestão · Etapa D · Financeiro · código `MEN` · [índice do guia](README.md)

- **Objetivo:** Gerar, acompanhar e receber as mensalidades.
- **Depende de:** Fases 7 e 13. O pagamento online depende do arquivo do Portal e do provedor de pagamento.
- **Quem usa:** Administrador.

## Telas no canvas

- Financeiro › Mensalidades: lista e painel.
- Registrar pagamento (janela).
- Gerar cobranças do mês.
- Em atraso (enviar lembrete).
- Lembretes automáticos (janela).
- Financeiro do aluno (janela), dentro de Alunos.
- Estado: erro ao carregar.
- Importar pagamentos e Exportar são feitos na Fase 23.

## Dados

- Cobrança: aluno, mês de referência, vencimento, composição (plano e cada benefício aplicado), valor e status.
- Pagamento: cobrança, data, valor, forma, origem (gestão ou portal), observações e comprovante.
- Lembrete: cobrança, canal, data e se foi automático ou manual.

## Passo a passo

1. Criar as entidades Cobrança e Pagamento.
2. Implementar o cálculo da mensalidade: plano menos benefícios válidos, guardando a composição na cobrança.
3. Montar a tela “Gerar cobranças do mês”, com a revisão do que mudou e das decisões pendentes.
4. Montar a lista do mês com os filtros e o painel com a composição do valor.
5. Montar a janela “Registrar pagamento” e o comprovante.
6. Implementar a atualização do status pelo calendário.
7. Implementar “Alterar cobrança”. A tela não foi desenhada.
8. Montar a tela “Em atraso”, com o envio de lembrete para vários alunos.
9. Implementar os lembretes automáticos.
10. Completar “Financeiro do aluno” e a situação financeira na lista de alunos.
11. Deixar o ponto de entrada para o pagamento feito pelo portal.

## Requisitos funcionais

| Código | Requisito |
| --- | --- |
| **RF-MEN-01** | Listar as cobranças do mês com aluno, plano, vencimento, valor e status, e o resumo de quantas existem e quantas foram pagas. |
| **RF-MEN-02** | Filtrar por mês, status, aluno e turma. |
| **RF-MEN-03** | Destacar as mensalidades em atraso do mês anterior, com atalho para a lista de atrasados. |
| **RF-MEN-04** | O painel mostra a composição do valor (plano e cada benefício), o vencimento, a turma e o último pagamento. |
| **RF-MEN-05** | Ações do painel: Registrar pagamento, Enviar lembrete, Alterar cobrança e Histórico de cobranças. |
| **RF-MEN-06** | Registrar pagamento: data, valor recebido, forma (dinheiro, Pix, cartão ou transferência) e observações, com a opção de enviar o comprovante por e-mail. |
| **RF-MEN-07** | Gerar cobranças do mês: mostrar quantos alunos serão cobrados, quantos ficam sem cobrança e por quê, e o que mudou em relação ao mês anterior. |
| **RF-MEN-08** | Gerar cobranças do mês: listar os casos que precisam de decisão, como aluno com mais de um benefício, e só gerar depois de decididos. |
| **RF-MEN-09** | Gerar cobranças do mês: mostrar o total previsto, a diferença para o mês anterior e a distribuição por dia de vencimento, com a opção de avisar os alunos. |
| **RF-MEN-10** | Em atraso: listar as mensalidades vencidas com dias de atraso, valor e último lembrete, com seleção de vários alunos. |
| **RF-MEN-11** | Em atraso: enviar lembrete aos selecionados por portal, e-mail e WhatsApp, com uma mensagem que preenche nome, valor e vencimento de cada um. |
| **RF-MEN-12** | Lembretes automáticos: ligar e desligar os avisos de 3 dias antes, no dia, 3 dias depois e 10 dias depois do vencimento, e escolher os canais de cada um e o horário de envio. |
| **RF-MEN-13** | Financeiro do aluno: situação, mensalidade, próximo vencimento, composição e as cobranças do aluno com data de pagamento, forma, status e comprovante. |
| **RF-MEN-14** | Alterar uma cobrança específica (valor ou vencimento), informando o motivo. _[tela não desenhada]_ |
| **RF-MEN-15** | Se a lista não carregar, mostrar o erro com “Tentar de novo” e informar que nenhuma cobrança foi alterada. |

## Regras de negócio

| Código | Regra |
| --- | --- |
| **RN-MEN-01** | Cada aluno ativo tem uma cobrança por mês, com vencimento no dia escolhido no cadastro (1, 5, 10 ou 15). |
| **RN-MEN-02** | O valor da cobrança é o plano menos os benefícios válidos no momento da geração. A composição fica guardada na cobrança e não muda se o plano ou o benefício mudarem depois. |
| **RN-MEN-03** | Não recebem cobrança o aluno com bolsa integral, o aluno pausado e o aluno inativo. |
| **RN-MEN-04** | A geração é uma ação do administrador, uma vez por mês, com revisão antes. Gerar de novo o mesmo mês não duplica cobranças. |
| **RN-MEN-05** | Os status da cobrança são Pendente, Vence hoje, Em atraso, Pago e Pago com atraso. |
| **RN-MEN-06** | O pagamento feito pelo portal é registrado sozinho. O manual é lançado pelo administrador. Os dois geram comprovante. |
| **RN-MEN-07** | Não há regra para pagamento parcial, juros ou multa. Considerar só o pagamento do valor inteiro até a academia decidir. **[A DEFINIR]** |
| **RN-MEN-08** | Os lembretes de alunos menores vão para o responsável. |
| **RN-MEN-09** | Os lembretes automáticos param quando o pagamento é registrado. |
| **RN-MEN-10** | O lembrete automático por WhatsApp depende de integração. Sem ela, sai pelo portal e por e-mail, e no WhatsApp o sistema abre uma conversa por aluno com a mensagem pronta. |
| **RN-MEN-11** | O aluno novo entra na geração seguinte ao cadastro. A cobrança do primeiro mês depende da matrícula. **[A DEFINIR]** |
| **RN-MEN-12** | Toda alteração de cobrança e todo pagamento ficam no histórico. |

## Casos de uso

### UC-MEN-01 · Gerar as cobranças do mês

**Quem:** Administrador. **Antes:** Planos, alunos e benefícios atualizados.

**Fluxo principal**

1. Abre Mensalidades e clica em “Gerar cobranças” do mês seguinte.
2. O sistema mostra quem será cobrado, quem não será e o que mudou.
3. Resolve as decisões pendentes.
4. Confere o total previsto e os vencimentos.
5. Escolhe se avisa os alunos.
6. Clica em “Gerar”.
7. O sistema cria as cobranças, envia os avisos e registra no histórico.

**Variações**

- Mês já gerado: o sistema informa e só cria as cobranças que faltam, como a de um aluno novo.
- Falha no meio da gravação: nada é gravado.

**Resultado**

Uma cobrança por aluno cobrado, visível em Mensalidades e no portal.

### UC-MEN-02 · Registrar um pagamento

**Quem:** Administrador. **Antes:** Cobrança em aberto.

**Fluxo principal**

1. Seleciona a cobrança e clica em “Registrar pagamento”.
2. Informa data, valor e forma.
3. Decide se envia o comprovante por e-mail.
4. Confirma.
5. O sistema marca a cobrança como paga, gera o comprovante e para os lembretes.

**Variações**

- Cobrança já paga: a ação não aparece.
- Pagamento depois do vencimento: o status fica “Pago com atraso”.

**Resultado**

Situação financeira do aluno atualizada em todas as telas.

### UC-MEN-03 · Enviar lembrete aos atrasados

**Quem:** Administrador. **Antes:** Existem mensalidades em atraso.

**Fluxo principal**

1. Abre Mensalidades e entra em “Em atraso”.
2. Marca os alunos.
3. Escolhe os canais e revisa a mensagem.
4. Envia.

**Variações**

- Nenhum aluno marcado: o envio fica desativado.
- Aluno menor: o lembrete vai para o responsável.

**Resultado**

A coluna “Último lembrete” é atualizada.

## Pronto quando

- Gerar duas vezes o mesmo mês não cria cobrança repetida.
- Mudar um plano depois da geração não altera as cobranças já criadas.
- Aluno pausado ou com bolsa integral não recebe cobrança.
- Um pagamento registrado faz os lembretes pararem.
