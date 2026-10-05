# Fase 25 · Ajuda

> Guia: Gestão · Etapa F · Dados e fechamento · código `AJU` · [índice do guia](README.md)

- **Objetivo:** Explicar em uma página o que cada parte do sistema faz.
- **Depende de:** Todas as fases anteriores, porque os textos descrevem telas prontas.
- **Quem usa:** Todos.

## Telas no canvas

- Ajuda.

## Dados

- Nenhum dado próprio. É conteúdo fixo.

## Passo a passo

1. Montar a página com um bloco por módulo e, em cada bloco, um item por submódulo, com texto curto e o link “Abrir”.
2. Colocar a entrada no rodapé do menu.
3. Revisar os textos sempre que uma tela mudar.

## Requisitos funcionais

| Código | Requisito |
| --- | --- |
| **RF-AJU-01** | Mostrar um bloco por módulo, com um resumo de uma linha. |
| **RF-AJU-02** | Para cada submódulo, mostrar uma explicação curta e o link para abrir a tela. |
| **RF-AJU-03** | Explicar no topo que o menu muda conforme o perfil, e incluir os atalhos do menu (busca e notificações) e o que fica fora da gestão (portal e site). |

## Regras de negócio

| Código | Regra |
| --- | --- |
| **RN-AJU-01** | A Ajuda é conteúdo fixo, em linguagem simples, e não usa dados da academia. |
| **RN-AJU-02** | Para o professor, os links de áreas sem acesso não aparecem. _[sugestão]_ |

## Casos de uso

### UC-AJU-01 · Entender para que serve uma parte do sistema

**Quem:** Administrador ou Professor. **Antes:** Sessão aberta.

**Fluxo principal**

1. Clica em “Ajuda” no rodapé do menu e lê o bloco do módulo.
2. Clica em “Abrir” no submódulo desejado.

**Resultado**

O usuário chega à tela sabendo o que ela faz.

## Pronto quando

- Todo item do menu tem uma explicação na Ajuda, e todos os links abrem a tela certa.
