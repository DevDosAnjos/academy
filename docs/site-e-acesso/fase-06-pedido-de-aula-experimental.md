# Fase 06 · Site público › Pedido de aula experimental

> Guia: Site e acesso · Etapa B · Site público · código `EXS` · [índice do guia](README.md)

- **Objetivo:** Receber pelo site o pedido de quem quer fazer uma aula e entregar esse pedido à gestão.
- **Depende de:** Fase 4. Gestão, Fase 12 (Aulas experimentais). A notificação é ligada na Gestão, Fase 19, e o registro no histórico usa o serviço da Gestão, Fase 1.
- **Quem usa:** Visitante. O administrador recebe o pedido na gestão.

## Telas no canvas

- Site público › Pedido de aula experimental: formulário e estado “Pedido enviado”.
- No celular a tela não foi desenhada. Seguir o mesmo formulário, em uma coluna. _[não desenhado]_

## Dados

- Pedido de aula experimental com origem “site”: nome, WhatsApp, para quem é a aula, nome e idade da criança, modalidade, períodos preferidos, mensagem, data e hora.
- O pedido entra na Aula experimental da Gestão, Fase 12, ainda sem aula marcada.

## Passo a passo

1. Construir a página: os três passos à esquerda e o formulário à direita.
2. Implementar os campos e a escolha entre “Para mim” e “Para meu filho ou filha”.
3. Validar os campos no navegador e de novo no servidor.
4. Gravar o pedido na gestão com a origem “site” e registrar no histórico como “Site público”.
5. Mostrar o estado “Pedido enviado”.
6. Proteger o formulário contra envios automáticos.
7. Ligar a notificação quando a Fase 19 da Gestão estiver pronta.
8. Ajustar para o celular.

## Requisitos funcionais

| Código | Requisito |
| --- | --- |
| **RF-EXS-01** | A página tem o cabeçalho com “Voltar ao site” e “Entrar”. |
| **RF-EXS-02** | A página explica o pedido em três passos: a pessoa envia, a academia confirma pelo WhatsApp e é só chegar para treinar. |
| **RF-EXS-03** | O formulário pede “Seu nome” e “WhatsApp”. |
| **RF-EXS-04** | Em “Para quem é a aula?”, a pessoa escolhe “Para mim” ou “Para meu filho ou filha”. Na segunda opção aparecem “Nome da criança” e “Idade”. |
| **RF-EXS-05** | A pessoa escolhe a modalidade em uma lista, que inclui “Ainda não sei”. |
| **RF-EXS-06** | A pessoa marca o melhor período: Manhã, Tarde ou Noite. Pode marcar mais de um. |
| **RF-EXS-07** | O campo “Mensagem” é opcional. |
| **RF-EXS-08** | “Enviar pedido” confere os campos e grava o pedido. |
| **RF-EXS-09** | Depois do envio, a página mostra “Pedido enviado”, avisa que a academia vai chamar no WhatsApp e oferece “Enviar outro pedido”. |
| **RF-EXS-10** | A página informa que os dados são usados só para combinar a aula. |
| **RF-EXS-11** | A página oferece o WhatsApp para quem prefere falar direto. |
| **RF-EXS-12** | O pedido aparece em Operação › Aulas experimentais como pedido novo pelo site, com o que a pessoa escreveu. |
| **RF-EXS-13** | O pedido gera uma notificação na gestão e fica no histórico com a origem “Site público”. |
| **RF-EXS-14** | Se o envio falhar, a página avisa, mantém o que foi preenchido e oferece o WhatsApp. |

## Regras de negócio

| Código | Regra |
| --- | --- |
| **RN-EXS-01** | O pedido não marca a aula. Quem marca é a academia, na gestão, depois de falar com a pessoa. |
| **RN-EXS-02** | O site não mostra vagas nem datas, e não confirma nada sozinho. |
| **RN-EXS-03** | A confirmação é feita pela academia no WhatsApp. O sistema não envia mensagem automática ao visitante. |
| **RN-EXS-04** | Quem pede uma aula não vira aluno e não ganha conta. O caminho da matrícula ainda não foi definido. |
| **RN-EXS-05** | Nome e WhatsApp são obrigatórios. Para criança, também o nome e a idade. _[sugestão: confirmar]_ |
| **RN-EXS-06** | As opções de modalidade seguem as modalidades do site, que dependem da decisão sobre Kids e No-Gi. **[A DEFINIR]** |
| **RN-EXS-07** | O pedido para criança é feito por um adulto. O formulário guarda só o nome e a idade da criança. |
| **RN-EXS-08** | O formulário pede só o necessário para combinar a aula. Não pede e-mail, documento nem endereço. |
| **RN-EXS-09** | Ainda não foi decidido por quanto tempo ficam guardados os pedidos que não viraram aula. **[A DEFINIR]** |
| **RN-EXS-10** | O contato feito pelo botão de WhatsApp não passa pelo sistema. Nesse caso, a academia lança a aula direto na gestão. |
| **RN-EXS-11** | Com o site desligado, o formulário também sai do ar. |
| **RN-EXS-12** | Envios automáticos são barrados com um limite por aparelho e com um campo escondido que só robôs preenchem. _[sugestão]_ |

## Casos de uso

### UC-EXS-01 · Pedir uma aula experimental para o filho

**Quem:** Visitante. **Antes:** Site publicado.

**Fluxo principal**

1. No site, clica em “Pedir pelo formulário”.
2. Informa o nome e o WhatsApp.
3. Escolhe “Para meu filho ou filha” e informa o nome e a idade da criança.
4. Escolhe a modalidade e o período.
5. Clica em “Enviar pedido”.
6. O site mostra “Pedido enviado”.
7. Na gestão, o pedido aparece em Aulas experimentais e gera uma notificação.

**Variações**

- Campo obrigatório vazio: a página aponta o campo e não envia.
- Falha no envio: a página avisa, mantém os dados e oferece o WhatsApp.
- Aula para a própria pessoa: os campos da criança não aparecem.

**Resultado**

Pedido gravado com a origem “site”, pronto para a academia agendar (Gestão, Fase 12).

### UC-EXS-02 · Pedir a aula pelo WhatsApp

**Quem:** Visitante. **Antes:** Site publicado.

**Fluxo principal**

1. Clica em “Agendar pelo WhatsApp”.
2. O aparelho abre a conversa com o número da academia.
3. A pessoa combina a aula direto com a academia.
4. A academia lança a aula experimental na gestão.

**Resultado**

Nenhum pedido é gravado pelo site.

## Pronto quando

- Um pedido de teste aparece em Aulas experimentais com tudo o que foi preenchido, gera notificação e fica no histórico como “Site público”.
- O formulário não envia sem nome e WhatsApp.
- Nenhum aluno e nenhuma conta são criados pelo pedido.
- Clicar duas vezes em “Enviar pedido” grava um pedido só.
