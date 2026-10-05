# Guia de desenvolvimento · Desktop · Gestão

> Sistema de Gestão para Academia de Jiu-Jitsu · Versão 1.0 · 2 de outubro de 2026 · Arquivo 1 de 3 · os outros dois tratam do Portal do aluno e do Site e acesso

Ordem de desenvolvimento, requisitos funcionais e não funcionais, regras de negócio e casos de uso, módulo por módulo.

| **25** | **183** | **144** | **37** | **26** |
| :---: | :---: | :---: | :---: | :---: |
| fases, na ordem de execução | requisitos funcionais | regras de negócio | casos de uso | requisitos não funcionais |

[← Índice da documentação](../README.md)

## Sobre este guia

Este guia diz o que construir na parte de Gestão do sistema e em que ordem. Ele foi feito para ser seguido do começo ao fim: cada fase usa o que as fases anteriores entregaram.

As informações vêm de três lugares: o documento de contexto do projeto (de 01/10/2026), as decisões tomadas depois dele e as telas desenhadas no canvas, na página “Desktop · Gestão”. Quando o guia cita uma tela, usa o mesmo nome que ela tem no canvas.

### Como cada fase está organizada

| Bloco | O que traz |
| --- | --- |
| Objetivo, Depende de, Quem usa | Para que serve o módulo, quais fases precisam estar prontas antes e quais perfis usam. |
| Telas no canvas | As telas desenhadas que pertencem ao módulo. |
| Dados | As informações que o módulo guarda. |
| Passo a passo | A sequência de construção dentro da fase. |
| Requisitos funcionais | O que o sistema precisa fazer. |
| Regras de negócio | O que vale sempre, por decisão da academia ou do projeto. |
| Casos de uso | Um roteiro de uso do começo ao fim, com as variações. |
| Pronto quando | O que conferir antes de passar para a fase seguinte. |

### Como ler os códigos

| Código | Significado | Exemplo |
| --- | --- | --- |
| RF | Requisito funcional | RF-ALU-03 é o terceiro requisito funcional do módulo Alunos. |
| RN | Regra de negócio | RN-MEN-02 é a segunda regra de Mensalidades. |
| UC | Caso de uso | UC-GRA-01 é o primeiro caso de uso de Graduações. |
| RNF | Requisito não funcional | RNF-10 vale para o sistema inteiro. |

### Marcações

- **[A DEFINIR]** marca um ponto que depende de decisão da academia. Não desenvolver por conta própria: usar a solução provisória indicada e voltar ao ponto quando houver decisão.
- _[sugestão]_ marca uma proposta de boa prática que não veio da academia nem das telas. Precisa de confirmação.
- Os nomes, valores e datas que aparecem nas telas do canvas são dados de exemplo. Eles não são requisitos.

## Visão geral da Gestão

A Gestão é a área administrativa do sistema. É usada no computador por quem toca a academia. Ela reúne o cadastro de pessoas, a operação das aulas, o financeiro, a comunicação com as turmas e as configurações.

A ideia central do projeto é que o usuário consiga olhar, entender a situação e agir no mesmo lugar. Por isso a interface é organizada pelo trabalho real da academia, e não pela estrutura interna do software.

### Quem usa

| Perfil | O que faz |
| --- | --- |
| Administrador | Acesso total. Cuida de cadastros, financeiro, configurações, importação e exportação. |
| Professor | Vê só as turmas em que dá aula: seus alunos, suas aulas, graduações e avisos. Não acessa Financeiro, Relatórios nem Configurações. |

### Mapa dos módulos

| Módulo | Submódulos | Fases |
| --- | --- | --- |
| Base do sistema | Acesso, menu lateral e padrões de tela | 1 |
| Início | Painel do dia | 17 |
| Pessoas | Alunos · Professores | 7 · 4 |
| Operação | Agenda de aulas · Turmas · Aulas experimentais · Graduações | 11 · 6 · 12 · 8 |
| Financeiro | Visão geral · Mensalidades · Despesas · Planos e benefícios | 16 · 14 · 15 · 5 e 13 |
| Comunicação | Comunicados · Grupos | 10 · 9 |
| Relatórios | Relatórios | 21 |
| Configurações | Academia · Usuários e permissões · Integrações · Histórico de alterações · Importar e exportar dados | 2 · 3 · 24 · 22 · 23 |
| Menu | Notificações · Busca · Ajuda | 19 · 20 · 25 |
| Visão do professor | Início do professor · Meus alunos | 18 |

### O que não faz parte

- Frequência e presença. Não há chamada, percentual de presença nem qualquer regra baseada em número de aulas.
- Graduação automática. O sistema não sugere, não calcula e não avisa quem está perto de graduar.
- Desconto por faixa.
- Matrícula, contrato e termo de responsabilidade. O fluxo ainda não foi levantado com a academia.
- Resultado da aula experimental.
- Loja, ranking e chat.
- Gestão no celular e gestão de várias unidades.
- Portal do aluno e site público. Cada um tem o seu arquivo.

### Padrões de tela

| Padrão | Quando usar |
| --- | --- |
| Consulta | Filtros e tabela. É a tela principal de quase todos os submódulos. |
| Painel lateral | Abre ao selecionar uma linha. Mostra o resumo e as ações do item, sem trocar de página. |
| Janela | Para editar, ver dados completos ou confirmar uma ação. |
| Etapas | Só para processos longos, como a importação de planilha. |
| Cartões | Para escolher o tipo de coisa a gerenciar, como em Planos e benefícios. |

## Decisões em aberto

Estes pontos ainda não foram decididos. Nenhum deles impede o início do desenvolvimento, desde que se use a solução provisória. Vale levar a lista para a academia o quanto antes.

| O que falta decidir | O que afeta | Enquanto não decide |
| --- | --- | --- |
| Fluxo de matrícula: quando alguém vira aluno, contrato e pagamento inicial | Alunos (“Novo aluno”), Aulas experimentais (“Registrar como aluno”) e a primeira cobrança | Cadastro simples de aluno e importação. Os dois botões ficam sem fluxo próprio. |
| Como combinar benefícios quando o aluno tem mais de um | Descontos e bolsas, Mensalidades | O sistema pede a decisão caso a caso ao gerar as cobranças. |
| Provedor de pagamento online | Integrações, Mensalidades e Portal | Pagamento lançado à mão. O código de pagamento fica isolado. |
| Envio automático pelo WhatsApp | Comunicados e lembretes | Portal e e-mail são automáticos. O WhatsApp abre com a mensagem pronta. |
| Mais de uma turma para o mesmo tipo e período | Turmas e Agenda | O banco não impede. A tela mostra uma turma por combinação. |
| Aluno treinar em vários horários (quase certo) | Alunos e Comunicados | Turma principal mais outros horários, como desenhado. |
| Perfis de acesso editáveis | Usuários e permissões | Dois perfis fixos: Administrador e Professor. |
| Pagamento parcial, juros e multa | Mensalidades | Só pagamento do valor inteiro, sem juros nem multa. |
| Lista de faixas e graus de crianças e jovens | Graduações | Usar as faixas do desenho, em lista configurável. |
| Prazo do convite, tempo de sessão e contato de suporte das telas de erro | Base e Usuários | Valores e texto provisórios, a combinar. |
| Categorias de despesa fixas ou editáveis | Despesas | Quatro categorias fixas. |
| Decisões técnicas: linguagem, banco, hospedagem e serviço de e-mail | Todo o sistema | Resolver na Fase 0, antes de começar. |

## Requisitos não funcionais

Valem para todas as fases. Convém relê-los ao terminar cada módulo.

| Código | Uso |
| --- | --- |
| **RNF-01** | A gestão é feita para computador, em navegador, com largura a partir de 1280 px. Não há versão da gestão para celular. |
| **RNF-02** | Todo o texto é em português do Brasil, em linguagem simples e sem termos técnicos. |
| **RNF-03** | As tarefas comuns são resolvidas na própria tela, com lista, painel lateral e janela, sem passar por várias páginas. |
| **RNF-04** | Todas as telas usam os mesmos padrões de filtro, tabela, painel, janela e botão. |
| **RNF-05** | O sistema pode ser usado só com o teclado, os textos têm contraste adequado (nível AA), os campos têm rótulo e os botões que só têm ícone têm nome para leitores de tela. |
| **RNF-06** | Toda ação que não pode ser desfeita pede confirmação e diz o que vai acontecer, como cancelar |

aula, encerrar aluno e gerar cobranças.

| Código | Desempenho |
| --- | --- |
| **RNF-07** | Listas e painéis respondem em até 2 segundos em uso normal. _[sugestão: confirmar a meta]_ |
| **RNF-08** | A busca do menu responde enquanto o usuário digita. |
| **RNF-09** | As listas são paginadas. Nenhuma tela carrega todos os registros de uma vez. |

| Código | Segurança e privacidade |
| --- | --- |
| **RNF-10** | O acesso é só com login. A senha é guardada com hash e a conexão é sempre por HTTPS. |
| **RNF-11** | A permissão é conferida no servidor em toda rota e em toda ação. |
| **RNF-12** | A sessão expira depois de um tempo sem uso. **[A DEFINIR: quanto tempo]** |
| **RNF-13** | O registro de auditoria é imutável e cobre toda alteração e toda exportação. |
| **RNF-14** | Os dados pessoais (telefone, e-mail, nascimento e responsável) só saem em exportação quando marcados, e a cópia completa pede a senha de novo. |
| **RNF-15** | O tratamento de dados segue a LGPD, com atenção aos dados de menores e ao direito de o titular receber cópia dos próprios dados. Validar com quem cuida do jurídico da academia. |
| **RNF-16** | Há cópia de segurança diária do banco, com restauração testada. _[sugestão]_ |

| Código | Confiabilidade |
| --- | --- |
| **RNF-17** | As operações financeiras não se repetem por engano: gerar cobranças duas vezes não duplica, e registrar o mesmo pagamento duas vezes também não. |
| **RNF-18** | As operações em lote (gerar cobranças, graduar vários alunos, importar) ou gravam tudo ou não gravam nada, e informam o resultado. |
| **RNF-19** | A falha de um serviço externo (e-mail, WhatsApp ou pagamento) não perde a operação: o sistema registra, avisa e permite tentar de novo. |
| **RNF-20** | As mensagens de erro dizem o que aconteceu, o que foi ou não alterado e o que fazer. |

| Código | Manutenção |
| --- | --- |
| **RNF-21** | Cada regra de negócio deste guia tem um teste automatizado. |
| **RNF-22** | A API não espelha as telas uma a uma. Uma tela pode usar vários recursos. |
| **RNF-23** | O código fica preparado para a regra de combinação de benefícios, a matrícula e o provedor de pagamento entrarem depois sem grande retrabalho. |
| **RNF-24** | Existe um ambiente de teste separado do de produção, com dados fictícios. |

| Código | Compatibilidade |
| --- | --- |
| **RNF-25** | O sistema funciona nas versões atuais de Chrome, Edge, Firefox e Safari. |
| **RNF-26** | Os formatos são brasileiros: data dd/mm/aaaa, moeda R$, telefone com DDD e fuso de Brasília. |

## Ordem de desenvolvimento

São 25 fases, agrupadas em seis etapas. A ordem segue as dependências: nada é construído antes daquilo de que precisa.

### Fase 0 · Antes de começar

- Escolher a linguagem e o framework do servidor e do navegador e o banco de dados.
- Escolher a hospedagem, o serviço de e-mail e onde ficam os arquivos enviados (logo, boletos e planilhas).
- Criar o repositório, o ambiente de teste e a publicação automática.
- Transformar a base visual do canvas em código: cores, tipos, espaçamentos e componentes.
- Combinar o padrão da API: nomes, erros, paginação e datas. A lista de endpoints do documento de contexto serve de ponto de partida, sem os de frequência.
- Preparar dados fictícios para desenvolver e testar.

### Roteiro de toda fase

1. Reler o módulo neste guia e abrir as telas dele no canvas.
2. Modelar os dados e criar as tabelas.
3. Escrever as regras de negócio no servidor, com testes.
4. Abrir a API, já com a verificação de perfil.
5. Construir a tela principal: lista, filtros e painel.
6. Construir as janelas e os formulários.
7. Ligar o registro de auditoria, os estados de tela e as mensagens de erro.
8. Conferir a lista “Pronto quando” e só então passar para a fase seguinte.

### As fases

**Etapa A · Fundação**

| Fase | O que é construído | Depende de |
| --- | --- | --- |
| **01** | Base do sistema: acesso, menu e padrões de tela | Fase 0 (decisões técnicas e ambiente). |
| **02** | Configurações › Academia | Fase 1. |
| **03** | Configurações › Usuários e permissões | Fases 1 e 2. |

**Etapa B · Cadastros básicos**

| Fase | O que é construído | Depende de |
| --- | --- | --- |
| **04** | Pessoas › Professores | Fases 1 e 3 (o cadastro pode dar acesso ao sistema). |
| **05** | Financeiro › Planos e benefícios › Planos | Fase 1. |
| **06** | Operação › Turmas | Fases 4 e 5. |
| **07** | Pessoas › Alunos | Fases 5 e 6. Algumas ações do painel só ficam completas depois: graduação na Fase 8 e financeiro na Fase 14. |

**Etapa C · Operação e comunicação**

| Fase | O que é construído | Depende de |
| --- | --- | --- |
| **08** | Operação › Graduações | Fases 4 e 7. |
| **09** | Comunicação › Grupos | Fase 6. |
| **10** | Comunicação › Comunicados | Fases 7 e 9 e o serviço de e-mail da Fase 1. |
| **11** | Operação › Agenda de aulas | Fases 4, 6 e 10. |
| **12** | Operação › Aulas experimentais | Fases 6 e 11. O pedido pelo site depende do arquivo “Site e acesso”. |

**Etapa D · Financeiro**

| Fase | O que é construído | Depende de |
| --- | --- | --- |
| **13** | Financeiro › Planos e benefícios › Descontos e bolsas | Fases 5 e 7. |
| **14** | Financeiro › Mensalidades | Fases 7 e 13. O pagamento online depende do arquivo do Portal e do provedor de pagamento. |
| **15** | Financeiro › Despesas | Fase 1. |
| **16** | Financeiro › Visão geral | Fases 14 e 15. |

**Etapa E · Acompanhamento**

| Fase | O que é construído | Depende de |
| --- | --- | --- |
| **17** | Início | Fases 7, 11, 12 e 14. |
| **18** | Visão do professor | Fases 7, 8, 10, 11 e 17. |
| **19** | Notificações | Fases 12 e 14. Parte dos avisos vem do portal e do site. |
| **20** | Busca no menu | Fase 17, quando a maior parte das telas já existe. |
| **21** | Relatórios | Fases 7 e 14. Para ter meses antigos, também a Fase 23. |
| **22** | Configurações › Histórico de alterações | Fase 1. O registro existe desde o começo. Esta fase entrega a tela. |

**Etapa F · Dados e fechamento**

| Fase | O que é construído | Depende de |
| --- | --- | --- |
| **23** | Configurações › Importar e exportar dados | Fases 7, 8, 14, 15, 21 e 22. |
| **24** | Configurações › Integrações | Fases 10 e 14. A integração de pagamento é feita junto com o portal. |
| **25** | Ajuda | Todas as fases anteriores, porque os textos descrevem telas prontas. |

### O que pode mudar de lugar

- As Etapas C e D não dependem uma da outra. Com mais de uma pessoa no projeto, podem andar ao mesmo tempo.
- A importação de alunos (parte da Fase 23) pode ser antecipada para logo depois da Fase 7, se a academia quiser começar a usar o sistema mais cedo. _[sugestão]_
- A tela de Histórico (Fase 22) pode vir antes, porque o registro existe desde a Fase 1. Ela ficou depois para já mostrar registros de todos os módulos.
- Login e Primeiro acesso são telas do arquivo “Site e acesso”, mas a autenticação precisa existir na Fase 1.

## Fases

### Etapa A · Fundação

Tudo o que as outras fases reaproveitam: acesso, permissões, menu, padrões de tela e os dados da academia. Fazer isto depois obrigaria a refazer telas prontas.

- [Fase 01 · Base do sistema: acesso, menu e padrões de tela](fase-01-base-do-sistema.md) · `BAS`
- [Fase 02 · Configurações › Academia](fase-02-academia.md) · `ACA`
- [Fase 03 · Configurações › Usuários e permissões](fase-03-usuarios-e-permissoes.md) · `USU`

### Etapa B · Cadastros básicos

Os cadastros dos quais o resto depende. A turma precisa de professor e de plano; o aluno precisa de turma e de plano.

- [Fase 04 · Pessoas › Professores](fase-04-professores.md) · `PRO`
- [Fase 05 · Financeiro › Planos e benefícios › Planos](fase-05-planos.md) · `PLA`
- [Fase 06 · Operação › Turmas](fase-06-turmas.md) · `TUR`
- [Fase 07 · Pessoas › Alunos](fase-07-alunos.md) · `ALU`

### Etapa C · Operação e comunicação

O dia a dia do tatame. A comunicação vem antes da agenda porque cancelar uma aula ou trocar um professor termina em um comunicado.

- [Fase 08 · Operação › Graduações](fase-08-graduacoes.md) · `GRA`
- [Fase 09 · Comunicação › Grupos](fase-09-grupos.md) · `GRU`
- [Fase 10 · Comunicação › Comunicados](fase-10-comunicados.md) · `COM`
- [Fase 11 · Operação › Agenda de aulas](fase-11-agenda-de-aulas.md) · `AGE`
- [Fase 12 · Operação › Aulas experimentais](fase-12-aulas-experimentais.md) · `EXP`

### Etapa D · Financeiro

Benefícios antes das mensalidades, porque a cobrança é o resultado do plano e dos benefícios. Esta etapa não depende da Etapa C e pode ser feita em paralelo.

- [Fase 13 · Financeiro › Planos e benefícios › Descontos e bolsas](fase-13-descontos-e-bolsas.md) · `BEN`
- [Fase 14 · Financeiro › Mensalidades](fase-14-mensalidades.md) · `MEN`
- [Fase 15 · Financeiro › Despesas](fase-15-despesas.md) · `DES`
- [Fase 16 · Financeiro › Visão geral](fase-16-visao-geral.md) · `FIN`

### Etapa E · Acompanhamento

Telas que só leem e somam os outros módulos: o Início, a visão do professor, as notificações, a busca, os relatórios e o histórico.

- [Fase 17 · Início](fase-17-inicio.md) · `INI`
- [Fase 18 · Visão do professor](fase-18-visao-do-professor.md) · `PRF`
- [Fase 19 · Notificações](fase-19-notificacoes.md) · `NOT`
- [Fase 20 · Busca no menu](fase-20-busca-no-menu.md) · `BUS`
- [Fase 21 · Relatórios](fase-21-relatorios.md) · `REL`
- [Fase 22 · Configurações › Histórico de alterações](fase-22-historico-de-alteracoes.md) · `HIS`

### Etapa F · Dados e fechamento

Entrada e saída de dados em massa, integrações com serviços de fora e a Ajuda, que descreve as telas prontas.

- [Fase 23 · Configurações › Importar e exportar dados](fase-23-importar-e-exportar-dados.md) · `IMP`
- [Fase 24 · Configurações › Integrações](fase-24-integracoes.md) · `INT`
- [Fase 25 · Ajuda](fase-25-ajuda.md) · `AJU`

## Revisão final

Depois da Fase 25, antes de entregar a Gestão para uso:

1. Percorrer a lista “Pronto quando” de todas as fases mais uma vez, do começo.
2. Entrar com um usuário de professor e tentar abrir cada tela do administrador, pelo menu e pelo endereço.
3. Conferir que não existe em nenhuma tela: frequência, desconto por faixa, matrícula ou sugestão automática de graduação.
4. Conferir no Histórico de alterações se cada tipo de operação e cada exportação estão sendo registrados.
5. Rodar o mês inteiro com dados de teste: gerar as cobranças, registrar pagamentos, deixar atrasar, enviar lembretes e conferir Visão geral, Início e Relatórios.
6. Importar as planilhas reais da academia em ambiente de teste e corrigir as linhas com problema.
7. Testar a cópia de segurança e a restauração.
8. Levar para a academia a lista de “Decisões em aberto” e registrar o que foi resolvido.
9. Reler os requisitos não funcionais e anotar o que ficou para depois.

### Glossário

| Termo | O que significa |
| --- | --- |
| Aula | Um encontro de uma turma em um dia e horário. Nasce dos dias e horários da turma. |
| Benefício | Redução da mensalidade de um aluno. Pode ser desconto individual ou bolsa. |
| Bolsa | Benefício em percentual: 30%, 50% ou integral. |
| Cobrança | A mensalidade de um aluno em um mês, com valor, vencimento e situação. |
| Comunicado | Aviso enviado a uma turma ou a todas, pelo portal, por e-mail e pelo WhatsApp. |
| Desconto individual | Benefício em reais por mês, concedido a um aluno por decisão do professor ou do dono. |
| Graduação | Faixa e grau do aluno. É decidida pelo mestre e registrada no sistema. |
| Grupo | O grupo de WhatsApp de uma turma. |
| Histórico de alterações | Registro de quem fez o quê e quando. Também chamado de auditoria. |
| Janela | Caixa que abre por cima da tela para editar ou ver detalhes, sem trocar de página. |
| Mês de referência | O mês a que a mensalidade se refere. |
| Painel lateral | Área à direita da lista, com o resumo e as ações do item selecionado. |
| Plano | Regra que dá o valor base da mensalidade. |
| Responsável | Adulto ligado a um aluno menor de idade. Recebe os avisos e as cobranças. |
| Turma | Combinação de tipo (Infantil, Juvenil ou Adulto) e período (Manhã, Tarde ou Noite), com dias e horário. |
