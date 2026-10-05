# Fase 18 · Visão do professor

> Guia: Gestão · Etapa E · Acompanhamento · código `PRF` · [índice do guia](README.md)

- **Objetivo:** Dar ao professor só o que ele precisa: suas aulas, seus alunos, as graduações e os avisos.
- **Depende de:** Fases 7, 8, 10, 11 e 17.
- **Quem usa:** Professor.

## Telas no canvas

- Professor › Início.
- Professor › Meus alunos.
- Professor › Área sem acesso.

## Dados

- Nenhum dado próprio.

## Passo a passo

1. Revisar em todas as APIs o filtro “só as turmas do professor”.
2. Montar o Início do professor.
3. Montar “Meus alunos”.
4. Conferir o menu reduzido.
5. Escrever os testes de permissão com um usuário de professor.

## Requisitos funcionais

| Código | Requisito |
| --- | --- |
| **RF-PRF-01** | O Início do professor mostra as suas aulas de hoje, o número de alunos e de turmas e as aulas experimentais de hoje nas suas aulas. |
| **RF-PRF-02** | Avisar quando ele vai cobrir a aula de outro professor. |
| **RF-PRF-03** | Listar as suas turmas e as graduações que ele registrou. |
| **RF-PRF-04** | Oferecer os atalhos “Registrar graduação” e “Avisar uma turma”. |
| **RF-PRF-05** | “Meus alunos” lista os alunos das suas turmas, com filtros por nome, turma e faixa. |
| **RF-PRF-06** | O painel do aluno mostra graduação e data da última, nascimento, responsável e telefone, com as ações Registrar graduação e WhatsApp. |
| **RF-PRF-07** | O bloco “Seu acesso” explica o que o professor pode e não pode fazer. |

## Regras de negócio

| Código | Regra |
| --- | --- |
| **RN-PRF-01** | O professor vê apenas alunos, turmas, aulas, experimentais e comunicados das turmas em que dá aula ou que está cobrindo. |
| **RN-PRF-02** | O professor não vê plano, mensalidade, benefício nem situação financeira e não edita o cadastro do aluno. |
| **RN-PRF-03** | O professor não acessa Professores, Financeiro, Relatórios, Configurações nem importação e exportação. |
| **RN-PRF-04** | O professor pode registrar graduação, enviar comunicado e alterar ou cancelar aula, sempre dentro das suas turmas. |

## Casos de uso

### UC-PRF-01 · Conferir o dia como professor

**Quem:** Professor. **Antes:** Sessão de professor.

**Fluxo principal**

1. Entra no sistema.
2. Vê as aulas do dia e o aviso de substituição.
3. Clica em “Avisar turma” em uma das aulas.
4. Envia o comunicado.

**Variações**

- Tenta abrir o Financeiro: o sistema mostra “Esta área é da administração”.

**Resultado**

Comunicado enviado para a turma do professor.

## Pronto quando

- Com um usuário de professor, nenhum valor em reais aparece em nenhuma tela.
- Alunos de outros professores não aparecem em listas, buscas nem escolhas.
