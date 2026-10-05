# Fase 23 · Configurações › Importar e exportar dados

> Guia: Gestão · Etapa F · Dados e fechamento · código `IMP` · [índice do guia](README.md)

- **Objetivo:** Trazer dados de planilhas para o sistema e levar dados do sistema para fora, com controle.
- **Depende de:** Fases 7, 8, 14, 15, 21 e 22.
- **Quem usa:** Administrador. O professor não importa nem exporta.

## Telas no canvas

- Configurações › Importar e exportar dados: tela central.
- Importar alunos, pagamentos, despesas e graduações: quatro telas em etapas.
- Exportar alunos, mensalidades, despesas, graduações e relatórios: cinco janelas.
- Botão “Baixar dados do aluno”, na ficha do aluno.

## Dados

- Importação: tipo, arquivo, quem fez, data, linhas importadas e linhas com problema.
- Exportação: tipo, o que saiu, formato, colunas, quem fez e data.

## Passo a passo

1. Implementar a leitura de arquivos .xlsx e .csv e os modelos para baixar.
2. Montar o assistente de importação em etapas, primeiro para alunos.
3. Implementar as validações e o tratamento das linhas com problema.
4. Repetir o assistente para pagamentos, despesas e graduações.
5. Montar a janela de exportação, primeiro para alunos.
6. Repetir a exportação para mensalidades, despesas, graduações e relatórios.
7. Montar a tela central, com as últimas operações e desde quando há dados.
8. Implementar a cópia completa, com confirmação de senha.
9. Implementar “Baixar dados do aluno”.
10. Conferir que tudo é registrado no histórico.

## Requisitos funcionais

| Código | Requisito |
| --- | --- |
| **RF-IMP-01** | Importar em quatro etapas: enviar a planilha, conferir as colunas, revisar e concluir. |
| **RF-IMP-02** | Oferecer um modelo de planilha para cada tipo de dado. |
| **RF-IMP-03** | Na conferência, ligar cada coluna da planilha a um campo do sistema ou marcar “não importar”. |
| **RF-IMP-04** | Na revisão, mostrar quantas linhas estão prontas, quantas precisam de ajuste e quantas já existem, e listar o problema de cada linha. |
| **RF-IMP-05** | Guardar as linhas com problema para corrigir depois, sem impedir a importação das demais. |
| **RF-IMP-06** | Importar alunos, pagamentos anteriores, despesas e histórico de graduações. |
| **RF-IMP-07** | Exportar a partir de Alunos, Mensalidades, Despesas, Graduações e Relatórios. |
| **RF-IMP-08** | Na exportação, escolher o que vai no arquivo (o que está na tela ou um conjunto maior), o formato (Excel, CSV ou PDF) e as colunas. |
| **RF-IMP-09** | Avisar quando o usuário inclui colunas com dados pessoais. |
| **RF-IMP-10** | A tela central reúne os quatro tipos de dado, cada um com Importar, Exportar e Baixar modelo e com a situação da última importação. |
| **RF-IMP-11** | A tela central lista as últimas importações e exportações e mostra desde quando há dados de cada tipo. |
| **RF-IMP-12** | Gerar a cópia completa, com todas as planilhas em um arquivo, pedindo a senha de novo. |
| **RF-IMP-13** | Baixar os dados de um só aluno pela ficha. _[tela não desenhada]_ |

## Regras de negócio

| Código | Regra |
| --- | --- |
| **RN-IMP-01** | Só o administrador importa e exporta. |
| **RN-IMP-02** | Toda importação passa pela revisão antes de gravar. |
| **RN-IMP-03** | Registros que já existem são ignorados: aluno com o mesmo nome e nascimento, pagamento do mesmo aluno e mês, despesa com a mesma data, descrição e valor, e graduação com o mesmo aluno, faixa e data. |
| **RN-IMP-04** | O valor da mensalidade não é importado. Ele vem do plano e dos benefícios. |
| **RN-IMP-05** | Pagamentos importados entram como histórico. Não geram cobrança nem aviso. |
| **RN-IMP-06** | Graduações importadas não geram aviso e só mudam a faixa atual se forem mais recentes que a registrada. |
| **RN-IMP-07** | Colunas com dado pessoal (telefone, e-mail, nascimento e responsável) vêm desmarcadas na exportação. |
| **RN-IMP-08** | A exportação de relatórios leva só números somados. |
| **RN-IMP-09** | Toda importação e toda exportação ficam no histórico, com quem fez e o que entrou ou saiu. |
| **RN-IMP-10** | A cópia completa contém dados pessoais de todos os alunos. Por isso exige a senha. |

## Casos de uso

### UC-IMP-01 · Importar os alunos de uma planilha

**Quem:** Administrador. **Antes:** Turmas já cadastradas.

**Fluxo principal**

1. Abre Alunos e clica em “Importar planilha”.
2. Envia o arquivo.
3. Confere a ligação das colunas.
4. Revisa as linhas com problema.
5. Clica em “Importar”.
6. O sistema grava as linhas prontas e guarda as demais para correção.

**Variações**

- Turma da planilha não existe: a linha fica para ajuste, com a opção de escolher a turma.
- Menor sem responsável: a linha fica para ajuste.
- Arquivo em formato não aceito: o sistema recusa e explica o motivo.

**Resultado**

Alunos importados na lista, e a importação registrada na tela central e no histórico.

### UC-IMP-02 · Exportar as mensalidades do mês

**Quem:** Administrador. **Antes:** Mês com cobranças geradas.

**Fluxo principal**

1. Em Mensalidades, clica em “Exportar”.
2. Mantém a opção “O que está na tela”.
3. Escolhe o formato Excel.
4. Confere as colunas.
5. Clica em “Exportar”.

**Variações**

- Telefone ou responsável marcados: o sistema avisa que o arquivo leva dados pessoais.
- Nenhuma coluna marcada: o botão fica desativado.

**Resultado**

Arquivo baixado e registro “Dados exportados” no histórico.

### UC-IMP-03 · Gerar a cópia completa

**Quem:** Administrador. **Antes:** Sessão de administrador.

**Fluxo principal**

1. Abre Configurações › Importar e exportar dados.
2. Clica em “Gerar cópia completa”.
3. Informa a senha.
4. O sistema gera o arquivo e registra no histórico.

**Variações**

- Senha errada: o arquivo não é gerado.

**Resultado**

Arquivo com todas as planilhas pronto para baixar.

## Pronto quando

- Importar a mesma planilha duas vezes não duplica registros.
- Uma exportação aparece no histórico.
- O professor não vê nenhum botão de exportar.
