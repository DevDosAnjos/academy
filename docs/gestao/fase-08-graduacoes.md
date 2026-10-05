# Fase 08 · Operação › Graduações

> Guia: Gestão · Etapa C · Operação e comunicação · código `GRA` · [índice do guia](README.md)

- **Objetivo:** Registrar e consultar as graduações decididas pelo mestre.
- **Depende de:** Fases 4 e 7.
- **Quem usa:** Administrador, para todos os alunos. Professor, para os alunos das suas turmas.

## Telas no canvas

- Operação › Graduações: lista.
- Registrar graduação (janela).
- Graduar vários alunos.
- Importar histórico e Exportar são feitos na Fase 23.

## Dados

- Graduação: aluno, faixa e grau anteriores, faixa e grau novos, data, decidido por, registrado por e observações.

## Passo a passo

1. Criar a lista de faixas e graus como um dado configurável.
2. Criar a entidade Graduação e a regra que atualiza a graduação atual do aluno.
3. Montar a janela “Registrar graduação”.
4. Montar a lista com o resumo e os filtros por aluno, faixa e período.
5. Montar a tela “Graduar vários alunos”.
6. Ligar os atalhos “Registrar graduação” do painel, da ficha e da edição do aluno.
7. Mostrar o histórico em linha do tempo na ficha do aluno.

## Requisitos funcionais

| Código | Requisito |
| --- | --- |
| **RF-GRA-01** | A lista mostra aluno, turma, graduação anterior, nova graduação, data e quem registrou. |
| **RF-GRA-02** | A lista tem um resumo do período: total de graduações, novos graus e trocas de faixa. |
| **RF-GRA-03** | Filtros por aluno, faixa e intervalo de datas. |
| **RF-GRA-04** | “Registrar graduação”: escolher o aluno, ver a graduação atual e informar faixa, grau, data, quem decidiu e observações. |
| **RF-GRA-05** | A janela mostra lado a lado a faixa atual e a nova antes de confirmar. |
| **RF-GRA-06** | “Graduar vários alunos”: filtrar por turma, marcar os alunos e escolher para cada um “mais um grau” ou “próxima faixa”, com a mesma data e o mesmo responsável pela decisão. |
| **RF-GRA-07** | No registro em lote, o usuário escolhe se cada aluno é avisado pelo portal e por e-mail. |
| **RF-GRA-08** | O histórico de graduações aparece na ficha do aluno, da mais recente para a mais antiga. |

## Regras de negócio

| Código | Regra |
| --- | --- |
| **RN-GRA-01** | O sistema informa e registra. O mestre decide. Não existe sugestão de aluno “apto”, barra de progresso, número mínimo de aulas nem aviso do tipo “faltam X aulas”. |
| **RN-GRA-02** | A graduação não depende de frequência, que não existe no sistema. |
| **RN-GRA-03** | Cada registro guarda quem decidiu e quem lançou no sistema. |
| **RN-GRA-04** | A graduação registrada passa a ser a atual do aluno. As anteriores ficam no histórico e não são apagadas. |
| **RN-GRA-05** | A data da graduação não pode ser futura. |
| **RN-GRA-06** | Aluno no último grau da faixa só pode receber a próxima faixa. |
| **RN-GRA-07** | As faixas usadas no desenho são Branca, Azul, Roxa, Marrom e Preta para adultos e Cinza, Amarela, Laranja e Verde para crianças e jovens, com graus de 0 a 4. A lista precisa ser confirmada com a academia. **[A DEFINIR]** |
| **RN-GRA-08** | A graduação não muda o valor da mensalidade. |
| **RN-GRA-09** | O professor só registra graduação de alunos das suas turmas. |

## Casos de uso

### UC-GRA-01 · Registrar a graduação de um aluno

**Quem:** Administrador ou Professor. **Antes:** Decisão do mestre já tomada.

**Fluxo principal**

1. Abre “Registrar graduação” pela lista de graduações ou pelo aluno.
2. Escolhe o aluno. Se abriu pelo aluno, ele já vem preenchido.
3. O sistema mostra a graduação atual.
4. Informa a nova faixa e o grau, a data e quem decidiu.
5. Confirma.
6. O sistema grava, atualiza a graduação do aluno, registra no histórico e avisa o aluno pelo portal e por e-mail.

**Variações**

- Data futura: o sistema recusa.
- Professor procura aluno de outra turma: o aluno não aparece na lista.

**Resultado**

A nova graduação aparece na lista, no painel e na ficha do aluno.

### UC-GRA-02 · Graduar vários alunos de uma vez

**Quem:** Administrador ou Professor. **Antes:** Decisão do mestre já tomada.

**Fluxo principal**

1. Abre “Graduar vários alunos”.
2. Filtra a turma.
3. Marca os alunos e escolhe o avanço de cada um.
4. Informa a data e quem decidiu e escolhe se os alunos são avisados.
5. Confirma.
6. O sistema grava todas as graduações de uma vez.

**Variações**

- Nenhum aluno marcado: o botão de confirmar fica desativado.
- Falha no meio da gravação: nada é gravado e o sistema informa.

**Resultado**

Uma graduação registrada para cada aluno marcado.

## Pronto quando

- Nenhuma tela sugere quem deve ser graduado.
- O histórico do aluno mostra a nova graduação.
- O professor não vê alunos de outras turmas.
