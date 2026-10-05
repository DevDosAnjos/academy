# Fase 01 · Acesso › Login e sessão

> Guia: Site e acesso · Etapa A · Acesso · código `LGN` · [índice do guia](README.md)

- **Objetivo:** Dar uma única porta de entrada para todas as contas e levar cada uma para a sua área: a gestão ou o portal.
- **Depende de:** Gestão, Fase 1 (autenticação, sessão e registro de auditoria). Esta fase é a tela dessa autenticação e é feita junto com ela.
- **Quem usa:** Administrador, Professor, Aluno e Responsável.

## Telas no canvas

- Acesso › Login: o formulário de entrada, ao lado do painel “Um acesso. Cada um na sua área.”
- No celular: Acesso › Login.

## Dados

- Conta: e-mail, senha (guardada com hash), tipo (da gestão: Administrador ou Professor; do portal: Aluno ou Responsável), status e último acesso. Esses dados vêm da Gestão, Fases 1 e 3.
- Sessão: conta, início, validade e se “Manter conectado” foi marcado.
- Tentativas de entrada com erro, usadas no bloqueio temporário. _[sugestão]_

## Passo a passo

1. Construir a tela no computador: painel de apresentação à esquerda e formulário à direita.
2. Ligar o formulário à autenticação da Gestão, Fase 1.
3. Implementar o encaminhamento pelo tipo da conta. Enquanto o portal não existir, a conta do portal vê uma página simples de “em breve”. _[sugestão]_
4. Implementar “Manter conectado” e os dois prazos de sessão.
5. Implementar a mensagem única de erro e o bloqueio temporário depois de várias tentativas.
6. Fazer toda tela protegida levar ao login quando não houver sessão e voltar à tela pedida depois da entrada.
7. Ajustar a tela para o celular.
8. Escrever os testes: cada tipo de conta, senha errada, conta inativa, convite pendente e sessão vencida.

## Requisitos funcionais

| Código | Requisito |
| --- | --- |
| **RF-LGN-01** | A tela tem os campos E-mail e Senha, a opção “Manter conectado” e o botão “Entrar”. |
| **RF-LGN-02** | O botão “Mostrar” exibe a senha digitada e passa a se chamar “Ocultar”. |
| **RF-LGN-03** | Depois de validar, o sistema leva a conta da gestão ao Início da gestão e a conta do portal ao Início do portal. A pessoa não escolhe a área. |
| **RF-LGN-04** | Quando a sessão não pode ser aberta, o sistema mostra sempre a mesma mensagem, sem dizer se o erro está no e-mail ou na senha, e mantém a pessoa no login. |
| **RF-LGN-05** | “Esqueci minha senha” abre a recuperação de senha (Fase 3). |
| **RF-LGN-06** | A tela informa que, no primeiro acesso, a academia envia um convite por e-mail. No computador há o link “Criar minha senha”. No celular há só a orientação de usar o convite. |
| **RF-LGN-07** | “Voltar ao site da academia” abre o site público. No celular o link se chama “Conhecer a academia”. |
| **RF-LGN-08** | Sem sessão válida, qualquer tela da gestão ou do portal leva ao login. Depois de entrar, a pessoa volta para a tela que tinha pedido. _[sugestão]_ |
| **RF-LGN-09** | Quem já tem sessão válida e abre o login vai direto para a sua área. _[sugestão]_ |
| **RF-LGN-10** | A entrada atualiza a data do último acesso, mostrada em Configurações › Usuários e permissões. |

## Regras de negócio

| Código | Regra |
| --- | --- |
| **RN-LGN-01** | Existe um único login para a gestão e para o portal. |
| **RN-LGN-02** | Não existe cadastro aberto. Toda conta nasce de um convite enviado pela gestão. |
| **RN-LGN-03** | A área é definida pelo tipo da conta. A conta do portal não abre a gestão, e a conta da gestão não abre o portal. |
| **RN-LGN-04** | O e-mail identifica a conta e não se repete no sistema. Letras maiúsculas e minúsculas não fazem diferença. |
| **RN-LGN-05** | Ainda não foi decidido como fica quem é professor e também é aluno. Enquanto isso, a pessoa usa um e-mail para cada papel. **[A DEFINIR]** |
| **RN-LGN-06** | Conta inativa e conta com convite ainda não aceito não entram. A mensagem é a mesma do erro de senha e orienta a usar o link do convite no primeiro acesso ou a procurar a academia. |
| **RN-LGN-07** | A sessão termina depois de um tempo sem uso. Com “Manter conectado”, o prazo é maior. **[A DEFINIR: os dois prazos]** |
| **RN-LGN-08** | Depois de várias tentativas seguidas com erro, a entrada daquela conta fica bloqueada por alguns minutos. _[sugestão: 5 tentativas e 15 minutos]_ |
| **RN-LGN-09** | O link “Criar minha senha” só funciona com um convite. Aberta sem o link do convite, a tela orienta a procurar o e-mail do convite ou a pedir outro à academia. **[A DEFINIR]** |
| **RN-LGN-10** | Aluno pausado continua entrando. O acesso do aluno inativo segue o que for decidido no guia do Portal. |

## Casos de uso

### UC-LGN-01 · Entrar e ser levado à área certa

**Quem:** Administrador, Professor, Aluno ou Responsável. **Antes:** Conta ativa, com senha criada.

**Fluxo principal**

1. Abre o site da academia e clica em “Entrar”.
2. Informa o e-mail e a senha.
3. Clica em “Entrar”.
4. O sistema valida, abre a sessão e leva a conta para a gestão ou para o portal.

**Variações**

- E-mail ou senha errados: o sistema mostra a mensagem única de erro e mantém a pessoa no login.
- Conta inativa ou convite ainda não aceito: a sessão não abre, e a mensagem é a mesma.
- Várias tentativas seguidas com erro: a entrada fica bloqueada por alguns minutos.

**Resultado**

Sessão aberta e data do último acesso atualizada.

### UC-LGN-02 · Voltar ao sistema depois que a sessão venceu

**Quem:** Qualquer conta. **Antes:** Sessão vencida.

**Fluxo principal**

1. Abre uma tela da gestão ou do portal.
2. O sistema vê que não há sessão válida e mostra o login.
3. A pessoa entra de novo.
4. O sistema abre a tela que ela tinha pedido.

**Variações**

- “Manter conectado” marcado e ainda dentro do prazo: a tela abre direto, sem passar pelo login.

**Resultado**

Nenhum dado é mostrado sem sessão válida.

## Pronto quando

- A mesma tela leva um administrador à gestão e um aluno ao portal.
- A mensagem de erro é igual para e-mail que não existe, senha errada e conta inativa.
- Marcar “Manter conectado” muda o prazo da sessão.
- O login funciona no computador e no celular.
