# Fase 03 · Minhas informações

> Guia: Portal do aluno · Etapa B · Consulta · código `MIN` · [índice do guia](README.md)

- **Objetivo:** Mostrar ao aluno o que a academia tem registrado sobre ele: dados, treinos, plano e graduação.
- **Depende de:** Fases 1 e 2. Gestão, Fases 7 (cadastro do aluno), 8 (graduações) e 13 (descontos e bolsas).
- **Quem usa:** Aluno e Responsável.

## Telas no canvas

- Portal › Minhas informações.
- No celular: Portal › Minhas informações.

## Dados

- Preferências de e-mail da conta: receber os avisos da academia e receber o lembrete de vencimento.
- O restante é lido do cadastro do aluno, das turmas, do plano, dos benefícios e das graduações.

## Passo a passo

1. Montar o topo com nome, situação e turma.
2. Montar os blocos Dados pessoais, Treinos, Plano e benefícios e Graduação.
3. Montar o histórico de graduações.
4. Montar o bloco “Notificações por e-mail”, com as duas preferências.
5. Implementar “Editar meus dados”. A tela não foi desenhada.

## Requisitos funcionais

| Código | Requisito |
| --- | --- |
| **RF-MIN-01** | Mostrar no topo o nome, a situação e a turma do aluno. |
| **RF-MIN-02** | Dados pessoais: nome completo, nascimento, telefone e e-mail. |
| **RF-MIN-03** | Treinos: a turma principal com dias, horário e professor, e os outros horários em que o aluno pode treinar, com atalho para a agenda. |
| **RF-MIN-04** | Plano e benefícios: o plano, cada benefício e a mensalidade atual com o dia de vencimento, com atalho para o Financeiro. |
| **RF-MIN-05** | Graduação: faixa e grau atuais, desde quando, quem graduou e o histórico das graduações anteriores. |
| **RF-MIN-06** | Notificações por e-mail: ligar e desligar “Avisos da academia” e “Lembrete de vencimento”. |
| **RF-MIN-07** | Editar os próprios dados de contato. _[tela não desenhada]_ |

## Regras de negócio

| Código | Regra |
| --- | --- |
| **RN-MIN-01** | O aluno não altera turma, plano, benefício, vencimento nem graduação. Isso é feito na gestão. |
| **RN-MIN-02** | Ainda não foi decidido quais dados o aluno pode editar sozinho. A proposta é só telefone e e-mail. **[A DEFINIR]** |
| **RN-MIN-03** | A graduação é só informada. O portal não mostra progresso, aulas que faltam nem previsão da próxima faixa. |
| **RN-MIN-04** | O portal não mostra presença nem frequência. |
| **RN-MIN-05** | Desligar o e-mail não desliga o portal: os avisos continuam aparecendo no portal. |
| **RN-MIN-06** | O histórico de graduações importado na gestão aparece aqui quando essa opção foi marcada na importação. |
| **RN-MIN-07** | Toda alteração feita pelo aluno fica no histórico de alterações da gestão, com a origem “portal”. |

## Casos de uso

### UC-MIN-01 · Conferir a graduação e o histórico

**Quem:** Aluno ou Responsável. **Antes:** Sessão aberta.

**Fluxo principal**

1. Abre a aba “Minhas informações”.
2. Vê a faixa e o grau atuais e desde quando.
3. Lê o histórico das graduações anteriores.

**Resultado**

O aluno confere a própria trajetória sem precisar perguntar na academia.

### UC-MIN-02 · Desligar o e-mail de lembrete

**Quem:** Aluno ou Responsável. **Antes:** Sessão aberta.

**Fluxo principal**

1. Abre “Minhas informações”.
2. Desliga “Lembrete de vencimento”.
3. O sistema grava a preferência.

**Resultado**

Os lembretes deixam de ir por e-mail e continuam aparecendo no portal.

## Pronto quando

- Os dados mostrados batem com a ficha do aluno na gestão.
- Nenhuma parte da tela sugere quando será a próxima graduação.
- Desligar o e-mail interrompe os envios seguintes.
