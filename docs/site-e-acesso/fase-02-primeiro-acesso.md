# Fase 02 · Acesso › Primeiro acesso

> Guia: Site e acesso · Etapa A · Acesso · código `PAC` · [índice do guia](README.md)

- **Objetivo:** Permitir que quem recebeu o convite crie a própria senha e entre no sistema.
- **Depende de:** Fase 1. Gestão, Fase 3 (convites da equipe e do portal) e Fase 1 (envio de e-mail).
- **Quem usa:** Quem foi convidado: Administrador, Professor, Aluno ou Responsável.

## Telas no canvas

- Acesso › Primeiro acesso (criar senha).
- No celular a tela não foi desenhada. Seguir o padrão do Login no celular. _[não desenhado]_
- O e-mail do convite e a tela de convite vencido também não foram desenhados. _[não desenhado]_

## Dados

- Convite: e-mail, tipo de conta, data de envio, validade, situação (enviado, aceito ou vencido) e o código do link, guardado com hash. O convite é criado na Gestão, Fase 3.
- Preferência “Receber os avisos da academia por e-mail”, da conta do portal.

## Passo a passo

1. Escrever o e-mail do convite, com o nome da academia, o que a pessoa vai encontrar e o link.
2. Gerar o link de uso único, com validade, e conferir o código no servidor.
3. Construir a tela: o painel “Tudo da academia em um só lugar” e o formulário.
4. Implementar as exigências da senha, conferidas enquanto a pessoa digita e de novo no servidor.
5. Gravar a senha, marcar o convite como aceito, ativar a conta e abrir a sessão.
6. Construir a tela de convite vencido, já usado ou inválido.
7. Ajustar para o celular.
8. Conferir na gestão: o status passa a “Ativo” e o convite sai da lista de pendentes.

## Requisitos funcionais

| Código | Requisito |
| --- | --- |
| **RF-PAC-01** | O link do convite abre a tela com o nome da pessoa, o e-mail já preenchido e a data até quando o convite vale. |
| **RF-PAC-02** | A tela tem os campos Nova senha e Confirmar senha. |
| **RF-PAC-03** | As exigências da senha aparecem na tela e vão sendo marcadas enquanto a pessoa digita. |
| **RF-PAC-04** | Se as duas senhas forem diferentes, a tela avisa: “As senhas não são iguais.” |
| **RF-PAC-05** | O botão “Criar senha e entrar” só fica disponível quando a senha atende às exigências e as duas são iguais. |
| **RF-PAC-06** | A opção “Receber os avisos da academia por e-mail” vem marcada e pode ser desmarcada. |
| **RF-PAC-07** | Ao concluir, o sistema grava a senha, ativa a conta, abre a sessão e leva a pessoa para a sua área. |
| **RF-PAC-08** | “Já tenho senha” leva ao login. |
| **RF-PAC-09** | Com convite vencido, já usado ou inválido, a tela explica o que houve e orienta a pedir um novo convite à academia. _[não desenhado]_ |
| **RF-PAC-10** | O painel ao lado resume o que a pessoa encontra: agenda, mensalidades e comprovantes, avisos e graduação. |

## Regras de negócio

| Código | Regra |
| --- | --- |
| **RN-PAC-01** | A senha tem 8 caracteres ou mais, com pelo menos uma letra e um número, como no desenho. **[A DEFINIR: confirmar a regra]** |
| **RN-PAC-02** | O link do convite funciona uma única vez e tem prazo de validade. **[A DEFINIR: quantos dias]** |
| **RN-PAC-03** | Reenviar o convite pela gestão cancela o link anterior. _[sugestão]_ |
| **RN-PAC-04** | O e-mail não pode ser trocado nesta tela. Para corrigir, a academia altera o cadastro e reenvia o convite. |
| **RN-PAC-05** | A senha é escolhida pela pessoa. A academia não define nem vê a senha de ninguém. |
| **RN-PAC-06** | A opção de avisos por e-mail e o painel ao lado falam do portal. Para as contas da gestão, a tela mostra um texto próprio, sem essa opção. _[não desenhado]_ |
| **RN-PAC-07** | A escolha sobre os avisos pode ser mudada depois, em Minhas informações (Portal, Fase 3). O lembrete de vencimento começa ligado. _[sugestão]_ |
| **RN-PAC-08** | Aceitar o convite muda o status da conta para “Ativo” em Usuários e permissões. |
| **RN-PAC-09** | A conta de responsável cria uma senha só e passa a ver todos os alunos ligados a ela. |

## Casos de uso

### UC-PAC-01 · Criar a senha pelo convite

**Quem:** Convidado. **Antes:** Convite válido, recebido por e-mail.

**Fluxo principal**

1. Abre o e-mail e clica no link do convite.
2. O sistema confere o código e mostra a tela com o nome e o e-mail da pessoa.
3. A pessoa digita a senha duas vezes.
4. Decide se quer receber os avisos por e-mail.
5. Clica em “Criar senha e entrar”.
6. O sistema grava a senha, ativa a conta e abre a área da pessoa.

**Variações**

- Senha fora das exigências ou senhas diferentes: o botão continua indisponível, e a tela mostra o que falta.
- A pessoa já criou a senha antes: clica em “Já tenho senha” e vai para o login.

**Resultado**

Conta ativa, convite aceito e sessão aberta.

### UC-PAC-02 · Abrir um convite vencido

**Quem:** Convidado. **Antes:** Convite fora do prazo ou já usado.

**Fluxo principal**

1. Clica no link do convite.
2. O sistema confere o código e vê que ele não vale mais.
3. A tela explica e orienta a pedir um novo convite à academia.
4. A academia reenvia o convite pela gestão.

**Resultado**

Nenhuma senha é criada com um link que não vale mais.

## Pronto quando

- Um convite de teste permite criar a senha e entrar, com uma conta da gestão e com uma conta do portal.
- O mesmo link não funciona uma segunda vez.
- Um convite vencido não cria senha.
- A conta passa a “Ativo” em Usuários e permissões.
