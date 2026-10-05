# Fase 17 · Início

> Guia: Gestão · Etapa E · Acompanhamento · código `INI` · [índice do guia](README.md)

- **Objetivo:** Mostrar o que está acontecendo hoje e o que pede atenção.
- **Depende de:** Fases 7, 11, 12 e 14.
- **Quem usa:** Administrador. O professor tem um Início próprio (Fase 18).

## Telas no canvas

- Início.

## Dados

- Nenhum dado próprio. É uma leitura dos outros módulos.

## Passo a passo

1. Criar o resumo do dia no servidor.
2. Montar os três indicadores.
3. Montar a lista “Aulas de hoje”.
4. Montar a lista “Precisa de atenção”.
5. Ligar cada item à tela que resolve o assunto.

## Requisitos funcionais

| Código | Requisito |
| --- | --- |
| **RF-INI-01** | Mostrar a data, os alunos ativos e o número de turmas, as aulas de hoje com a próxima, e o recebido no mês em relação ao previsto. |
| **RF-INI-02** | Listar as aulas de hoje com horário, turma, professor, status e aula experimental marcada. |
| **RF-INI-03** | Em cada aula, oferecer o atalho “Avisar turma”. |
| **RF-INI-04** | Listar o que precisa de atenção: mensalidades em atraso, mensalidades que vencem hoje e aulas experimentais de hoje, cada item com o caminho para resolver. |

## Regras de negócio

| Código | Regra |
| --- | --- |
| **RN-INI-01** | Só entra no Início o que pode virar ação. Não há gráficos. |
| **RN-INI-02** | O Início não é um cadastro. Ele lê os outros módulos. |
| **RN-INI-03** | Item de atenção resolvido sai da lista. |

## Casos de uso

### UC-INI-01 · Começar o dia pelo Início

**Quem:** Administrador. **Antes:** Sessão de administrador.

**Fluxo principal**

1. Entra no sistema.
2. Lê os indicadores e as aulas do dia.
3. Clica em um item de “Precisa de atenção”.
4. O sistema abre a tela daquele assunto.

**Resultado**

O administrador resolve a pendência na tela certa, sem procurar no menu.

## Pronto quando

- Cada item de atenção leva à tela certa.
- Os números batem com os módulos de origem.
