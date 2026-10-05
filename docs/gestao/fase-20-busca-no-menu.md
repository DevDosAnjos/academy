# Fase 20 · Busca no menu

> Guia: Gestão · Etapa E · Acompanhamento · código `BUS` · [índice do guia](README.md)

- **Objetivo:** Chegar a qualquer tela, ação ou pessoa digitando poucas letras.
- **Depende de:** Fase 17, quando a maior parte das telas já existe.
- **Quem usa:** Todos, dentro do que o perfil permite.

## Telas no canvas

- Busca no menu (Ctrl K).

## Dados

- Nenhum dado próprio. Usa um índice de telas e ações e a busca de alunos e professores.

## Passo a passo

1. Montar o índice de telas e de ações, com palavras relacionadas.
2. Implementar a busca de pessoas no servidor.
3. Montar a janela de busca.
4. Ligar o atalho de teclado e o campo do menu.
5. Filtrar os resultados pelo perfil.

## Requisitos funcionais

| Código | Requisito |
| --- | --- |
| **RF-BUS-01** | Abrir a busca pelo campo no topo do menu ou pelo atalho Ctrl K. |
| **RF-BUS-02** | Buscar em três grupos: telas, ações e pessoas (alunos e professores). |
| **RF-BUS-03** | Encontrar mesmo sem acento e por palavras relacionadas. Por exemplo, “faixa” encontra Graduações. |
| **RF-BUS-04** | Com o campo vazio, mostrar as telas mais usadas e as ações rápidas. |
| **RF-BUS-05** | Escolher um resultado com o teclado ou com o mouse e ir direto para a tela ou a ação. |
| **RF-BUS-06** | Quando nada for encontrado, informar e sugerir outra busca. |

## Regras de negócio

| Código | Regra |
| --- | --- |
| **RN-BUS-01** | A busca só mostra o que o perfil pode acessar. |
| **RN-BUS-02** | Buscar uma pessoa leva à lista com a pessoa selecionada, e não a uma tela nova. |

## Casos de uso

### UC-BUS-01 · Registrar uma graduação a partir da busca

**Quem:** Administrador ou Professor. **Antes:** Sessão aberta.

**Fluxo principal**

1. Pressiona Ctrl K.
2. Digita “grad”.
3. Escolhe “Registrar graduação”.
4. O sistema abre a janela de registro.

**Resultado**

O usuário chega à ação sem passar pelo menu.

## Pronto quando

- “grad” encontra Graduações e Registrar graduação.
- O professor não encontra telas do Financeiro.
