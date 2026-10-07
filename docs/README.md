# Documentação


> **Atualização de escopo (07/10/2026, issue #14):** o site público de cada academia saiu do escopo; no lugar dele entra a landing page da plataforma (#96). O que estava escrito aparece riscado, com a atualização logo depois quando há.
Guias de desenvolvimento do **Sistema de Gestão para Academia de Jiu-Jitsu**, versão 1.0, de 2 de outubro de 2026.

## Por onde começar

| Documento | O que traz |
| --- | --- |
| [Visão geral](visao-geral.md) | Resumo dos três guias: o que o sistema faz, como as partes se ligam, a ordem de construção e as decisões em aberto. |
| [Gestão](gestao/README.md) | Painel do administrador e do professor. 25 fases. |
| [Portal do aluno](portal/README.md) | Área do aluno e do responsável. 8 fases. |
| [Site e acesso](site-e-acesso/README.md) | ~~Site público, login, primeiro acesso e recuperação de senha. 6 fases.~~ _Atualização:_ Login, primeiro acesso e recuperação de senha, e a landing page da plataforma (#96). 3 fases; as fases 4 a 6, do site público, saíram do escopo. |

## Como está organizado

- Cada guia tem um `README.md` com o que vale para o guia inteiro: sobre o guia, visão geral, decisões em aberto, requisitos não funcionais, ordem de desenvolvimento, revisão final e glossário.
- Cada fase tem o seu arquivo, com objetivo, dependências, telas no canvas, dados, passo a passo, requisitos funcionais, regras de negócio, casos de uso e a lista “Pronto quando”.
- Para trabalhar em uma tela, basta abrir o arquivo da fase. Não é preciso ler o guia inteiro.
- Quando o texto fala em “arquivo”, como em “arquivo Site e acesso”, ele se refere ao guia de mesmo nome, que aqui é uma pasta.
- Quando cita “Gestão, Fase 12”, o arquivo é `gestao/fase-12-…`. O mesmo vale para “Portal, Fase 3” e “Site e acesso, Fase 4”.

## Códigos

| Código | Significado | Onde aparece |
| --- | --- | --- |
| RF | Requisito funcional | `RF-ALU-03` é o terceiro requisito funcional da fase de Alunos. |
| RN | Regra de negócio | `RN-MEN-02` é a segunda regra de Mensalidades. |
| UC | Caso de uso | `UC-GRA-01` é o primeiro caso de uso de Graduações. |
| RNF | Requisito não funcional | `RNF-10` é da Gestão, `RNF-P10` é do Portal e `RNF-S10` é do Site e acesso. |

## Marcações

- **[A DEFINIR]** marca um ponto que depende de decisão da academia. Não desenvolver por conta própria: usar a solução provisória indicada e voltar ao ponto quando houver decisão.
- _[sugestão]_ marca uma proposta de boa prática que não veio da academia nem das telas. Precisa de confirmação.
- _[não desenhado]_ marca uma tela ou um texto que o sistema precisa ter e que ainda não está no canvas.
- Os nomes, valores e datas que aparecem nas telas do canvas são dados de exemplo, não requisitos.

## Todas as fases

### Gestão

| Fase | Código | Arquivo |
| --- | --- | --- |
| 01 | `BAS` | [Base do sistema: acesso, menu e padrões de tela](gestao/fase-01-base-do-sistema.md) |
| 02 | `ACA` | [Configurações › Academia](gestao/fase-02-academia.md) |
| 03 | `USU` | [Configurações › Usuários e permissões](gestao/fase-03-usuarios-e-permissoes.md) |
| 04 | `PRO` | [Pessoas › Professores](gestao/fase-04-professores.md) |
| 05 | `PLA` | [Financeiro › Planos e benefícios › Planos](gestao/fase-05-planos.md) |
| 06 | `TUR` | [Operação › Turmas](gestao/fase-06-turmas.md) |
| 07 | `ALU` | [Pessoas › Alunos](gestao/fase-07-alunos.md) |
| 08 | `GRA` | [Operação › Graduações](gestao/fase-08-graduacoes.md) |
| 09 | `GRU` | [Comunicação › Grupos](gestao/fase-09-grupos.md) |
| 10 | `COM` | [Comunicação › Comunicados](gestao/fase-10-comunicados.md) |
| 11 | `AGE` | [Operação › Agenda de aulas](gestao/fase-11-agenda-de-aulas.md) |
| 12 | `EXP` | [Operação › Aulas experimentais](gestao/fase-12-aulas-experimentais.md) |
| 13 | `BEN` | [Financeiro › Planos e benefícios › Descontos e bolsas](gestao/fase-13-descontos-e-bolsas.md) |
| 14 | `MEN` | [Financeiro › Mensalidades](gestao/fase-14-mensalidades.md) |
| 15 | `DES` | [Financeiro › Despesas](gestao/fase-15-despesas.md) |
| 16 | `FIN` | [Financeiro › Visão geral](gestao/fase-16-visao-geral.md) |
| 17 | `INI` | [Início](gestao/fase-17-inicio.md) |
| 18 | `PRF` | [Visão do professor](gestao/fase-18-visao-do-professor.md) |
| 19 | `NOT` | [Notificações](gestao/fase-19-notificacoes.md) |
| 20 | `BUS` | [Busca no menu](gestao/fase-20-busca-no-menu.md) |
| 21 | `REL` | [Relatórios](gestao/fase-21-relatorios.md) |
| 22 | `HIS` | [Configurações › Histórico de alterações](gestao/fase-22-historico-de-alteracoes.md) |
| 23 | `IMP` | [Configurações › Importar e exportar dados](gestao/fase-23-importar-e-exportar-dados.md) |
| 24 | `INT` | [Configurações › Integrações](gestao/fase-24-integracoes.md) |
| 25 | `AJU` | [Ajuda](gestao/fase-25-ajuda.md) |

### Portal do aluno

| Fase | Código | Arquivo |
| --- | --- | --- |
| 01 | `POR` | [Base do portal: acesso, navegação e padrões](portal/fase-01-base-do-portal.md) |
| 02 | `RSP` | [Conta de responsável](portal/fase-02-conta-de-responsavel.md) |
| 03 | `MIN` | [Minhas informações](portal/fase-03-minhas-informacoes.md) |
| 04 | `AGP` | [Agenda](portal/fase-04-agenda.md) |
| 05 | `AVI` | [Avisos](portal/fase-05-avisos.md) |
| 06 | `FNP` | [Financeiro](portal/fase-06-financeiro.md) |
| 07 | `PGO` | [Pagamento online](portal/fase-07-pagamento-online.md) |
| 08 | `INP` | [Início](portal/fase-08-inicio.md) |

### Site e acesso

| Fase | Código | Arquivo |
| --- | --- | --- |
| 01 | `LGN` | [Acesso › Login e sessão](site-e-acesso/fase-01-login-e-sessao.md) |
| 02 | `PAC` | [Acesso › Primeiro acesso](site-e-acesso/fase-02-primeiro-acesso.md) |
| 03 | `SEN` | [Acesso › Recuperar senha](site-e-acesso/fase-03-recuperar-senha.md) |
| ~~04~~ | ~~`SIT`~~ | ~~[Site público › Página da academia](site-e-acesso/fase-04-pagina-da-academia.md)~~ _Removido do escopo (#14)._ |
| ~~05~~ | ~~`HEQ`~~ | ~~[Site público › Horários e equipe](site-e-acesso/fase-05-horarios-e-equipe.md)~~ _Removido do escopo (#14)._ |
| ~~06~~ | ~~`EXS`~~ | ~~[Site público › Pedido de aula experimental](site-e-acesso/fase-06-pedido-de-aula-experimental.md)~~ _Removido do escopo (#14)._ |

## Sobre a conversão

Estes arquivos foram convertidos dos quatro PDFs “Guia de desenvolvimento - Desktop”. O texto é o mesmo. Mudou só a forma:

- os sumários viraram índices com links;
- cada fase ganhou o seu arquivo;
- o diagrama “O sistema em uma página”, da visão geral, foi refeito em Mermaid;
- os cabeçalhos de tabela repetidos a cada página foram unidos.
