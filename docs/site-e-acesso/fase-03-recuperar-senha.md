# Fase 03 · Acesso › Recuperar senha

> Guia: Site e acesso · Etapa A · Acesso · código `SEN` · [índice do guia](README.md)

- **Objetivo:** Permitir que a pessoa crie uma nova senha sozinha, sem depender da academia.
- **Depende de:** Fases 1 e 2 (reaproveita a tela e as exigências de criar senha). Gestão, Fase 1 (envio de e-mail).
- **Quem usa:** Administrador, Professor, Aluno e Responsável.

## Telas no canvas

- Acesso › Login, nos estados “Recuperar senha” e “Confira seu e-mail”.
- No celular: Acesso › Login, pelo link “Esqueci minha senha”.
- A tela de criar a nova senha e o e-mail com o link não foram desenhados. Reaproveitar a tela de Primeiro acesso. _[não desenhado]_

## Dados

- Pedido de nova senha: conta, código do link (guardado com hash), data, validade e se já foi usado.

## Passo a passo

1. Implementar os dois estados do login: pedir o link e “Confira seu e-mail”.
2. Gerar o link de uso único e enviar o e-mail.
3. Montar a tela de nova senha a partir da tela de Primeiro acesso, sem a opção de avisos.
4. Gravar a nova senha e encerrar as outras sessões da conta.
5. Limitar a quantidade de pedidos.
6. Escrever os testes: e-mail cadastrado, e-mail não cadastrado, link vencido e link usado duas vezes.

## Requisitos funcionais

| Código | Requisito |
| --- | --- |
| **RF-SEN-01** | “Esqueci minha senha” troca o formulário de entrada pelo de recuperação, com o campo E-mail e o botão “Enviar link”. |
| **RF-SEN-02** | “Voltar para o login” desfaz a troca. |
| **RF-SEN-03** | Depois do envio, a tela mostra “Confira seu e-mail” e explica que, se o e-mail estiver cadastrado, a pessoa recebe um link para criar uma nova senha. |
| **RF-SEN-04** | O e-mail traz um link que abre a tela de nova senha, com as mesmas exigências do primeiro acesso. |
| **RF-SEN-05** | Depois de criar a nova senha, a pessoa entra direto na sua área, como no primeiro acesso. _[sugestão]_ |
| **RF-SEN-06** | A conta recebe um e-mail avisando que a senha foi alterada. _[sugestão]_ |
| **RF-SEN-07** | Com link vencido ou já usado, a tela explica e oferece pedir um novo link. |

## Regras de negócio

| Código | Regra |
| --- | --- |
| **RN-SEN-01** | A resposta da tela é sempre a mesma, exista ou não uma conta com aquele e-mail. |
| **RN-SEN-02** | O link funciona uma única vez e vale por pouco tempo. **[A DEFINIR: o prazo]** |
| **RN-SEN-03** | Um novo pedido cancela o link anterior. |
| **RN-SEN-04** | Trocar a senha encerra as sessões abertas da conta em outros aparelhos. _[sugestão]_ |
| **RN-SEN-05** | Conta inativa não recebe o link. Conta com convite ainda não aceito recebe o convite de novo. _[sugestão]_ |
| **RN-SEN-06** | Há um limite de pedidos por conta e por aparelho em um mesmo período. _[sugestão]_ |
| **RN-SEN-07** | A academia não redefine a senha de ninguém. Quem esquece a senha usa esta tela. |
| **RN-SEN-08** | A troca de senha fica no histórico de alterações, sem a senha. _[sugestão]_ |
| **RN-SEN-09** | Trocar a senha estando dentro do sistema não foi desenhado. Enquanto isso, o caminho é “Esqueci minha senha”. **[A DEFINIR]** |

## Casos de uso

### UC-SEN-01 · Recuperar a senha

**Quem:** Administrador, Professor, Aluno ou Responsável. **Antes:** Conta ativa.

**Fluxo principal**

1. No login, clica em “Esqueci minha senha”.
2. Informa o e-mail e clica em “Enviar link”.
3. O sistema mostra “Confira seu e-mail”.
4. A pessoa abre o e-mail e clica no link.
5. Digita a nova senha duas vezes e confirma.
6. O sistema grava a senha e abre a área da pessoa.

**Variações**

- E-mail não cadastrado: a tela mostra a mesma mensagem, e nenhum e-mail é enviado.
- Link vencido ou já usado: a tela explica e oferece pedir outro.

**Resultado**

Senha nova gravada, e o link deixa de valer.

## Pronto quando

- A tela responde igual para e-mail cadastrado e para e-mail não cadastrado.
- O link funciona uma única vez.
- Depois da troca, a senha antiga não entra mais.
