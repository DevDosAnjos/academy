# Fase 01 · Base do portal: acesso, navegação e padrões

> Guia: Portal do aluno · Etapa A · Base do portal · código `POR` · [índice do guia](README.md)

- **Objetivo:** Deixar pronto o que todas as telas do portal usam: a conta do aluno ou do responsável, a sessão, a barra de navegação e os padrões de tela, no computador e no celular.
- **Depende de:** Gestão, Fases 1 (acesso e histórico), 3 (contas e convites do portal) e 7 (alunos e responsáveis). As telas de Login e Primeiro acesso ficam no arquivo “Site e acesso”.
- **Quem usa:** Aluno e Responsável.

## Telas no canvas

- Portal › Navegação (componente): barra superior do portal no computador.
- No celular: Portal › Barra superior (componente) e Portal › Abas inferiores (componente).

## Dados

- Conta do portal: e-mail, senha (guardada com hash), tipo (Aluno ou Responsável), aluno ou alunos vinculados, status, último acesso e preferências de e-mail.

## Passo a passo

1. Reaproveitar a autenticação da gestão: o login é o mesmo, e o sistema leva cada conta para a sua área.
2. Implementar no servidor a regra “a conta só enxerga os alunos vinculados a ela”.
3. Construir o layout do portal. No computador, barra superior com as quatro abas, o sino de avisos e a identificação de quem está logado. No celular, barra superior e abas na parte de baixo da tela.
4. Construir os estados de tela: carregando, vazio e erro.
5. Implementar a saída do portal. Ela não foi desenhada.
6. Escrever os testes de acesso: conta sem sessão, conta tentando ver outro aluno e conta do portal tentando abrir a gestão.

## Requisitos funcionais

| Código | Requisito |
| --- | --- |
| **RF-POR-01** | Aluno e responsável entram com e-mail e senha no mesmo login da academia. O sistema leva a conta do portal para o portal e a conta da gestão para a gestão. |
| **RF-POR-02** | A barra do portal mostra o nome da academia, as abas Início, Agenda, Financeiro e Minhas informações, o sino de avisos com o número de não lidos e o nome e o papel de quem está logado (Aluno ou Responsável). A aba em uso fica destacada. |
| **RF-POR-03** | No celular, as abas ficam na parte de baixo da tela e o sino fica na barra superior. |
| **RF-POR-04** | Sair do portal. _[não desenhado]_ |
| **RF-POR-05** | Atualizar a data do último acesso da conta, que a gestão mostra em Usuários e permissões. |
| **RF-POR-06** | Toda tela tem os estados carregando, vazio e erro, este com a opção de tentar de novo. |
| **RF-POR-07** | Sem sessão válida, qualquer tela do portal leva ao login. |

## Regras de negócio

| Código | Regra |
| --- | --- |
| **RN-POR-01** | A conta do portal só vê os dados do aluno ou dos alunos vinculados a ela. O servidor confere isso em toda consulta. |
| **RN-POR-02** | O acesso nasce de um convite enviado pela gestão. Não existe cadastro aberto no portal, e a conta do portal não acessa a gestão. |
| **RN-POR-03** | Ainda não foi decidido como fica quem é professor e também é aluno: uma conta só ou duas. **[A DEFINIR]** |
| **RN-POR-04** | O portal é o mesmo no computador e no celular: as mesmas funções, com a disposição ajustada à tela. |
| **RN-POR-05** | O portal usa o nome, o logo e a cor de destaque definidos em Configurações › Academia. |
| **RN-POR-06** | Aluno pausado continua entrando no portal para ver o histórico e pagar o que ficou em aberto. |
| **RN-POR-07** | Ainda não foi decidido se o aluno inativo mantém o acesso e por quanto tempo. **[A DEFINIR]** |

## Casos de uso

### UC-POR-01 · Entrar no portal

**Quem:** Aluno ou Responsável. **Antes:** Conta ativa, com senha criada.

**Fluxo principal**

1. Abre o endereço da academia e clica em “Entrar”.
2. Informa e-mail e senha.
3. O sistema reconhece a conta do portal e abre o Início.

**Variações**

- Conta de responsável: o Início abre com o primeiro aluno vinculado selecionado.
- Convite ainda não aceito: o sistema orienta a usar o link do convite.
- E-mail ou senha errados: o sistema avisa sem dizer qual dos dois está errado.

**Resultado**

Sessão aberta e data do último acesso atualizada.

### UC-POR-02 · Tentar ver os dados de outro aluno

**Quem:** Aluno. **Antes:** Sessão aberta.

**Fluxo principal**

1. Altera o endereço da tela para o de outro aluno.
2. O servidor confere o vínculo e recusa.
3. O portal informa que a página não existe para aquela conta.

**Resultado**

Nenhum dado de outro aluno é enviado ao navegador.

## Pronto quando

- Uma conta de aluno não consegue ver dados de outro aluno, nem digitando o endereço.
- A mesma tela funciona no computador e no celular.
- Uma conta do portal não abre nenhuma tela da gestão.
