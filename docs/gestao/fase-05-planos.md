# Fase 05 · Financeiro › Planos e benefícios › Planos

> Guia: Gestão · Etapa B · Cadastros básicos · código `PLA` · [índice do guia](README.md)

- **Objetivo:** Definir o valor base da mensalidade de cada plano. Esta é a primeira metade de “Planos e benefícios”. Descontos e bolsas ficam na Fase 13, porque dependem dos alunos.
- **Depende de:** Fase 1.
- **Quem usa:** Administrador.

## Telas no canvas

- Financeiro › Planos e benefícios: tela de cartões.
- Financeiro › Planos e benefícios › Regras: aba Planos.

## Dados

- Plano: nome, valor base, periodicidade (mensal) e status (Ativo ou Inativo).

## Passo a passo

1. Criar a entidade Plano.
2. Montar a tela de cartões (Planos, Descontos individuais e Bolsas). Os dois últimos ficam sem conteúdo até a Fase 13.
3. Montar a aba Planos com a tabela.
4. Criar o formulário de plano. Ele não foi desenhado: seguir o padrão de janela das outras telas.
5. Guardar a data de cada mudança de valor.

## Requisitos funcionais

| Código | Requisito |
| --- | --- |
| **RF-PLA-01** | A tela inicial mostra três cartões, Planos, Descontos individuais e Bolsas, cada um com um resumo. |
| **RF-PLA-02** | A aba Planos lista nome, turmas, valor base, número de alunos e status. |
| **RF-PLA-03** | O administrador cria e edita planos. _[formulário não desenhado]_ |
| **RF-PLA-04** | O administrador ativa e desativa um plano. |

## Regras de negócio

| Código | Regra |
| --- | --- |
| **RN-PLA-01** | O plano dá o valor base. A mensalidade de cada aluno é o plano menos os benefícios. A regra de preço fica de um lado e a cobrança, do outro. |
| **RN-PLA-02** | Mudar o valor de um plano vale para as cobranças geradas depois da mudança. As cobranças já geradas não mudam. |
| **RN-PLA-03** | Não existe desconto por faixa. A graduação do aluno não altera o preço. |
| **RN-PLA-04** | Hoje só há planos mensais: Infantil, Juvenil e Adulto. |
| **RN-PLA-05** | Plano com alunos não é excluído, só desativado. _[sugestão]_ |

## Casos de uso

### UC-PLA-01 · Alterar o valor de um plano

**Quem:** Administrador. **Antes:** Plano existente.

**Fluxo principal**

1. Abre Planos e benefícios e entra em Planos.
2. Abre o plano e informa o novo valor.
3. Salva.
4. O sistema grava, registra no histórico e passa a usar o novo valor na próxima geração de cobranças.

**Resultado**

As cobranças já geradas continuam com o valor antigo.

## Pronto quando

- Os três planos estão cadastrados.
- Uma mudança de valor aparece no histórico.
