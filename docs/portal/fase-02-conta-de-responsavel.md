# Fase 02 · Conta de responsável

> Guia: Portal do aluno · Etapa A · Base do portal · código `RSP` · [índice do guia](README.md)

- **Objetivo:** Permitir que um responsável acompanhe e pague por um ou mais alunos menores com uma só conta.
- **Depende de:** Fase 1 deste guia. Gestão, Fase 7 (vínculo entre responsável e aluno).
- **Quem usa:** Responsável.

## Telas no canvas

- Portal › Início (responsável): faixa “Você está vendo”, com os alunos da conta.
- No celular: Portal › Início (responsável).

## Dados

- Vínculo entre responsável e aluno, criado na gestão.
- Aluno selecionado na sessão.

## Passo a passo

1. Implementar a faixa “Você está vendo”, com cada aluno vinculado e a situação financeira de cada um.
2. Guardar o aluno selecionado e fazer todas as abas mostrarem os dados dele.
3. Calcular o total em aberto da família.
4. Ajustar os títulos das telas ao nome do aluno, como em “Próxima aula da Maria”.
5. Garantir que os avisos e os lembretes do aluno menor cheguem ao responsável.

## Requisitos funcionais

| Código | Requisito |
| --- | --- |
| **RF-RSP-01** | A conta de responsável mostra a faixa “Você está vendo”, com o nome, a turma e a situação financeira de cada aluno vinculado. |
| **RF-RSP-02** | Ao escolher um aluno, todas as abas passam a mostrar os dados dele. |
| **RF-RSP-03** | A faixa mostra o total em aberto na família, com atalho para ver tudo. |
| **RF-RSP-04** | Os títulos das telas usam o nome do aluno escolhido. |
| **RF-RSP-05** | A barra identifica quem está logado como Responsável. |
| **RF-RSP-06** | O responsável paga as mensalidades de qualquer aluno vinculado. |

## Regras de negócio

| Código | Regra |
| --- | --- |
| **RN-RSP-01** | O responsável vê e faz pelo aluno menor tudo o que o aluno veria e faria. |
| **RN-RSP-02** | Os avisos, os lembretes e os comprovantes de um aluno menor vão para o e-mail do responsável. |
| **RN-RSP-03** | Uma conta de responsável pode ter vários alunos vinculados. |
| **RN-RSP-04** | Ainda não foi decidido se um aluno pode ter mais de um responsável com acesso. O banco não deve impedir isso. **[A DEFINIR]** |
| **RN-RSP-05** | Ainda não foi decidido se o aluno menor pode ter conta própria além da do responsável. **[A DEFINIR]** |
| **RN-RSP-06** | O vínculo entre responsável e aluno é criado e alterado só na gestão. |
| **RN-RSP-07** | Em “Minhas informações”, os dados mostrados são os do aluno escolhido. |

## Casos de uso

### UC-RSP-01 · Acompanhar dois filhos com uma conta

**Quem:** Responsável. **Antes:** Dois alunos vinculados à conta.

**Fluxo principal**

1. Entra no portal.
2. Vê na faixa os dois alunos e a situação de cada um.
3. Clica no segundo aluno.
4. Todas as abas passam a mostrar os dados dele.
5. Volta para o primeiro aluno e paga a mensalidade em atraso.

**Variações**

- Só um aluno vinculado: a faixa mostra só ele, sem opção de troca.

**Resultado**

O responsável acompanha e paga por cada aluno sem trocar de conta.

## Pronto quando

- Trocar de aluno muda os dados de todas as abas.
- O total da família bate com a soma das cobranças em aberto dos alunos vinculados.
