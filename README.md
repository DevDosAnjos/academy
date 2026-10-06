# Academy

Front-end do **Sistema de Gestão para Academia de Jiu-Jitsu**: alunos, aulas, graduações, mensalidades e avisos.

> **Situação:** em preparação. O esqueleto do projeto existe (Vite, React, TypeScript e shadcn/ui); as telas ainda não. A preparação do projeto está na [Sprint 00](https://github.com/DevDosAnjos/Academy/milestone/1).

## O sistema

São três partes, que usam o mesmo banco de dados e o mesmo login.

| Parte | Para quem | O que faz | Onde funciona |
| --- | --- | --- | --- |
| Gestão | Administrador e Professor | Cadastros, agenda, graduações, financeiro, comunicados, relatórios e configurações. | Só no computador |
| Portal do aluno | Aluno e Responsável | Horários, avisos, graduação, mensalidades e pagamento online. | Computador e celular |
| Site e acesso | Visitante e todas as contas | Site da academia, pedido de aula experimental, login, primeiro acesso e recuperação de senha. | Computador e celular |

A gestão é o centro: quase tudo nasce nela. O portal mostra ao aluno e ao responsável o que a gestão registrou, e o site apresenta a academia a quem ainda não é aluno.

**Este repositório tem só o front-end.** As regras de negócio, os cálculos, as permissões, a auditoria, o envio de e-mail e o pagamento são do servidor, que fica fora daqui.

## Stack

- TypeScript, React e Vite
- shadcn/ui, com Tailwind CSS e Radix
- [MSW](https://mswjs.io/) para simular a API. Os handlers de cada fase são o mapa da API que o front espera.

## Como rodar

Precisa de Node 24 (veja `.nvmrc`) e pnpm.

```bash
pnpm install         # instala as dependências
cp .env.example .env # variáveis de ambiente (só nomes; preencha local, sem segredos)
pnpm dev             # sobe em http://localhost:5173
pnpm lint            # ESLint (inclui acessibilidade com jsx-a11y)
pnpm typecheck       # TypeScript
pnpm format:check    # Prettier (use pnpm format para corrigir)
pnpm build           # gera dist/
```

A publicação será definida no item #8.

## Documentação

Os guias de desenvolvimento estão em [`docs/`](docs/README.md), em Markdown, com um arquivo por fase.

| Documento | O que traz |
| --- | --- |
| [Visão geral](docs/visao-geral.md) | O sistema em poucos minutos, a ordem de construção e as decisões em aberto. |
| [Gestão](docs/gestao/README.md) | 25 fases, 183 requisitos funcionais e 144 regras de negócio. |
| [Portal do aluno](docs/portal/README.md) | 8 fases, 57 requisitos funcionais e 56 regras de negócio. |
| [Site e acesso](docs/site-e-acesso/README.md) | 6 fases, 61 requisitos funcionais e 59 regras de negócio. |

Para trabalhar em uma tela, abra o arquivo da fase. Ele traz o objetivo, as dependências, as telas, os requisitos, as regras e a lista “Pronto quando”.

## Telas

As telas estão desenhadas no canvas: https://claude.ai/artifact/TXG9EGaFortgEQtvqHfRAm

São 83 artboards, em cinco páginas: Desktop · Gestão, Desktop · Portal do aluno, Desktop · Site e acesso, Celular · Portal do aluno e Celular · Site e acesso. Os guias citam cada tela pelo nome que ela tem no canvas.

## Planejamento

O planejamento está no GitHub, em sprints e issues.

- **Roadmap:** [issue #1](https://github.com/DevDosAnjos/Academy/issues/1), com todas as sprints, fases e pendências.
- **Sprints:** os [marcos](https://github.com/DevDosAnjos/Academy/milestones), da Sprint 00 à Sprint 17, na ordem de construção dos guias.

| Rótulo | O que marca |
| --- | --- |
| `epic` | Uma fase dos guias, com as telas e os requisitos de um módulo. |
| `decisão` | Ponto em aberto que precisa de resposta da academia ou do projeto. |
| `design` | Tela ou estado que os guias pedem e ainda não está no canvas. |
| `preparação` | O que precisa existir antes das telas. |
| `revisão` | Revisão final e requisitos não funcionais. |
| `bloqueio` | Trava uma fase inteira. |
| `gestão`, `portal`, `site-e-acesso` | A parte do sistema. |

## Regras que valem para o sistema inteiro

Nenhuma tela pode contrariar estas regras. A lista completa está na [visão geral](docs/visao-geral.md#regras-que-valem-para-o-sistema-inteiro).

- Não existe frequência nem presença: não há chamada, check-in nem percentual de aulas.
- A graduação é decisão do mestre. O sistema informa e registra, e não sugere quem está apto.
- A mensalidade é o plano menos os benefícios. Ninguém digita o valor, e não existe desconto por faixa.
- Toda conta nasce de um convite enviado pela gestão. Não existe cadastro aberto.
- A permissão é conferida no servidor. Esconder um botão não basta.
- Aluno nunca é excluído: as situações são Ativo, Pausado e Inativo, e o histórico fica.
