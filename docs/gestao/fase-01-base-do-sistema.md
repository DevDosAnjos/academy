# Fase 01 · Base do sistema: acesso, menu e padrões de tela

> Guia: Gestão · Etapa A · Fundação · código `BAS` · [índice do guia](README.md)

- **Objetivo:** Deixar pronto tudo o que as outras fases reaproveitam: entrar no sistema, saber quem é o usuário e o que ele pode fazer, o menu lateral, os padrões de tela e o registro do que foi alterado.
- **Depende de:** Fase 0 (decisões técnicas e ambiente).
- **Quem usa:** Todos os usuários da gestão.

## Telas no canvas

- Menu lateral (componente): menu expandido e recolhido, usado por todas as telas.
- Visão do professor › Área sem acesso, Alunos › Estado: busca sem resultados, Aulas experimentais › Estado: lista vazia e Mensalidades › Estado: erro ao carregar: os quatro modelos de estado de tela.
- Login e Primeiro acesso ficam no arquivo “Site e acesso”. Aqui entra só o que a gestão precisa deles: autenticação e sessão.

## Dados

- Usuário: nome, e-mail, senha (guardada com hash), perfil (Administrador ou Professor), status (Convite enviado, Ativo, Inativo), último acesso.
- Registro de auditoria: data e hora, quem fez (usuário da gestão, portal ou site público), ação, onde (tela e registro), valor antes e depois.

## Passo a passo

1. Criar o projeto, o banco de dados e a estrutura de pastas conforme as decisões da Fase 0.
2. Implementar a autenticação por e-mail e senha, a sessão e a saída do sistema.
3. Implementar os dois perfis e a verificação de permissão no servidor para cada rota e cada ação.
4. Montar o serviço de envio de e-mail. Ele já será usado nos convites da Fase 3.
5. Criar o registro de auditoria como um serviço único, chamado por toda operação que altera dados.
6. Construir o layout padrão: menu lateral, cabeçalho com a trilha e área de conteúdo.
7. Construir os componentes de consulta: filtros, tabela, paginação, painel lateral e janela.
8. Construir os quatro estados de tela e o estado “carregando”.
9. Escrever os testes de acesso: usuário sem sessão e professor tentando abrir uma área do administrador.

## Requisitos funcionais

| Código | Requisito |
| --- | --- |
| **RF-BAS-01** | O usuário entra com e-mail e senha e sai quando quiser. Sem sessão válida, qualquer tela da gestão leva ao login. |
| **RF-BAS-02** | O sistema reconhece dois perfis, Administrador e Professor, e confere a permissão no servidor em cada tela e em cada ação. |
| **RF-BAS-03** | O menu lateral mostra Início, Pessoas, Operação, Financeiro, Comunicação, Relatórios e Configurações, e no rodapé Ajuda e Notificações. |
| **RF-BAS-04** | O menu pode ser expandido ou recolhido. Recolhido, mostra só os ícones dos grupos. |
| **RF-BAS-05** | O grupo do item em uso abre sozinho e o item fica destacado. |
| **RF-BAS-06** | O menu mostra apenas o que o perfil pode acessar. |
| **RF-BAS-07** | Toda tela tem um cabeçalho com a trilha (módulo › submódulo) e o nome do usuário logado. |
| **RF-BAS-08** | Toda operação que cria, altera, cancela ou exporta dados gera um registro de auditoria com quem, quando, o quê, onde e o valor antes e depois. |
| **RF-BAS-09** | Toda lista tem os estados carregando, vazia, busca sem resultados e erro ao carregar, este com o botão “Tentar de novo”. |
| **RF-BAS-10** | Quem tenta abrir uma área sem permissão vê a tela “Esta área é da administração”, com atalhos para voltar. |
| **RF-BAS-11** | Listas longas são paginadas e mostram a contagem, por exemplo “Mostrando 1–10 de 142”. |
| **RF-BAS-12** | Selecionar uma linha de uma lista abre o painel lateral com o resumo e as ações daquele item, sem trocar de tela. |

## Regras de negócio

| Código | Regra |
| --- | --- |
| **RN-BAS-01** | Esconder um item do menu não basta: o servidor recusa a ação se o perfil não tiver permissão. |
| **RN-BAS-02** | O registro de auditoria não pode ser editado nem apagado por ninguém. |
| **RN-BAS-03** | Datas aparecem como dd/mm/aaaa, valores em reais (R$) e horários no fuso de Brasília. |
| **RN-BAS-04** | A interface é organizada pelo trabalho da academia, não pelas tabelas do banco. Uma tela pode usar vários recursos da API. |
| **RN-BAS-05** | Ações ligadas a um item (editar, registrar graduação, WhatsApp, histórico) ficam no painel ou na janela do item e não viram item de menu. |
| **RN-BAS-06** | Em caso de erro ao carregar, a tela informa que nada foi alterado. |

## Casos de uso

### UC-BAS-01 · Entrar na gestão

**Quem:** Administrador ou Professor. **Antes:** Usuário ativo, com senha criada.

**Fluxo principal**

1. O usuário abre o endereço da gestão.
2. O sistema mostra o login.
3. O usuário informa e-mail e senha.
4. O sistema valida, abre a sessão e leva ao Início do perfil.

**Variações**

- E-mail ou senha errados: o sistema avisa sem dizer qual dos dois está errado e mantém o usuário no login.
- Usuário inativo ou com convite ainda não aceito: o sistema não abre a sessão e orienta a procurar um administrador.

**Resultado**

Sessão aberta e data do último acesso atualizada.

### UC-BAS-02 · Tentar abrir uma área sem permissão

**Quem:** Professor. **Antes:** Sessão aberta.

**Fluxo principal**

1. O professor acessa o endereço de uma tela do Financeiro.
2. O servidor confere o perfil e recusa.
3. O sistema mostra “Esta área é da administração”, com os atalhos “Voltar ao início” e “Ver meus alunos” e o nome dos administradores.

**Resultado**

Nenhum dado financeiro é enviado ao navegador.

## Pronto quando

- Um professor não consegue ver nem alterar dados do Financeiro, de Relatórios ou de Configurações, nem digitando o endereço da tela.
- Uma alteração de teste aparece no registro de auditoria com o valor antes e depois.
- Os quatro estados de tela funcionam em uma lista de exemplo.
