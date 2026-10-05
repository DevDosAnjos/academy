# Fase 04 · Site público › Página da academia

> Guia: Site e acesso · Etapa B · Site público · código `SIT` · [índice do guia](README.md)

- **Objetivo:** Apresentar a academia a quem ainda não é aluno e levar a pessoa ao pedido de aula experimental, ao WhatsApp e ao login.
- **Depende de:** Gestão, Fase 2 (dados da academia e opção “Site publicado”). Fase 1 deste guia, para o botão “Entrar”.
- **Quem usa:** Visitante, sem login. O administrador controla a publicação pela gestão.

## Telas no canvas

- Site público › Landing page (visitantes).
- No celular: Site público › Landing page.

## Dados

- Lidos de Configurações › Academia: nome, equipe ou filiação, WhatsApp, Instagram, endereço, logo, cor de destaque e a opção “Site publicado”.
- Conteúdo da página: frase e texto do topo, números, “Sobre nós”, modalidades e perguntas com respostas. Não existe tela na gestão para editar esse conteúdo. **[A DEFINIR: onde ele é editado]**

## Passo a passo

1. Reunir com a academia os textos que faltam. A lista está em “Decisões em aberto”.
2. Montar a página com as seções na ordem do desenho. Horários e Equipe ficam para a Fase 5.
3. Ligar nome, logo, cor de destaque, WhatsApp, Instagram e endereço aos dados de Configurações › Academia.
4. Guardar o conteúdo da página em um só lugar, separado do layout, para ser trocado sem mexer nas telas.
5. Implementar a opção “Site publicado” e o botão “Ver site” da gestão.
6. Ligar os botões: o menu que rola até a seção, “Entrar”, WhatsApp e o caminho para o formulário da Fase 6.
7. Ajustar a página para o celular.
8. Preencher o título, a descrição e a imagem que aparecem quando o link é compartilhado. _[sugestão]_

## Requisitos funcionais

| Código | Requisito |
| --- | --- |
| **RF-SIT-01** | O site abre sem login, no endereço da academia. |
| **RF-SIT-02** | O cabeçalho mostra o nome da academia, os links Modalidades, Horários, Equipe e Dúvidas, o link “Entrar” e o botão “Aula experimental”. Cada link do menu rola a página até a seção. |
| **RF-SIT-03** | O topo mostra a frase principal, um texto de apoio e os botões “Agendar aula experimental” e “Conhecer as modalidades”. No celular, o segundo botão é “Ver horários”. |
| **RF-SIT-04** | A faixa de números mostra alunos ativos, aulas realizadas, alunos que relatam mais confiança e professores e instrutores. |
| **RF-SIT-05** | A seção “Sobre nós” apresenta a academia em quatro pontos. |
| **RF-SIT-06** | A seção “Modalidades” mostra um cartão por modalidade, com o público e três destaques. |
| **RF-SIT-07** | A seção “Dúvidas” mostra as perguntas. Cada uma abre e fecha a resposta, e só uma fica aberta por vez. |
| **RF-SIT-08** | Abaixo das dúvidas, o site oferece falar pelo WhatsApp. |
| **RF-SIT-09** | A chamada final “Quero fazer uma aula” tem os botões “Agendar pelo WhatsApp” e “Pedir pelo formulário”. |
| **RF-SIT-10** | O rodapé mostra o WhatsApp, o Instagram, o endereço e o link “Área do aluno”, que leva ao login. |
| **RF-SIT-11** | Os botões de WhatsApp abrem a conversa com o número da academia. |
| **RF-SIT-12** | Com “Site publicado” desligado, o visitante não vê a página. **[A DEFINIR: o que aparece no lugar]** |
| **RF-SIT-13** | O botão “Ver site”, em Configurações › Academia, abre o site. |

## Regras de negócio

| Código | Regra |
| --- | --- |
| **RN-SIT-01** | O site é público. Ele não mostra dado de aluno, valor de mensalidade nem informação interna. |
| **RN-SIT-02** | Nome, contato, endereço, logo e cor vêm de Configurações › Academia. Nada é digitado duas vezes. |
| **RN-SIT-03** | Os números do topo ainda não têm origem definida. O sistema não registra presença nem pesquisa com alunos, então “aulas realizadas” e o percentual não saem dele. **[A DEFINIR]** |
| **RN-SIT-04** | Só entram no site números e textos confirmados pela academia. Os números do desenho são exemplos. |
| **RN-SIT-05** | O desenho mostra cinco modalidades: Adulto, Kids, Infantil, Juvenil e No-Gi. A gestão tem três tipos de turma: Infantil, Juvenil e Adulto. **[A DEFINIR: o que são Kids e No-Gi]** |
| **RN-SIT-06** | Os textos entre colchetes no desenho são espaços para a academia preencher: endereço, idade mínima, kimono, condições da aula experimental e segurança. O site não vai ao ar com eles em branco. |
| **RN-SIT-07** | “Entrar” e “Área do aluno” levam ao mesmo login. |
| **RN-SIT-08** | Com o site desligado, o login, a gestão e o portal continuam funcionando. |
| **RN-SIT-09** | O desenho não usa fotos. A identidade vem do desenho das faixas, das cores e das letras. |

## Casos de uso

### UC-SIT-01 · Conhecer a academia

**Quem:** Visitante. **Antes:** Site publicado.

**Fluxo principal**

1. Abre o endereço da academia.
2. Lê o topo e rola a página, ou usa o menu para ir direto a uma seção.
3. Abre uma dúvida e lê a resposta.
4. Clica em “Agendar aula experimental”.
5. O site abre o formulário de pedido (Fase 6).

**Variações**

- Já é aluno: clica em “Entrar” ou em “Área do aluno” e vai para o login.
- Prefere conversar: clica no botão de WhatsApp e fala direto com a academia.

**Resultado**

O visitante chega ao pedido de aula experimental ou ao contato da academia.

### UC-SIT-02 · Tirar o site do ar

**Quem:** Administrador. **Antes:** Sessão de administrador.

**Fluxo principal**

1. Abre Configurações › Academia.
2. Desliga “Site publicado” e salva.
3. Quem abre o endereço do site deixa de ver a página.
4. O login continua funcionando como antes.

**Variações**

- O administrador liga a opção de novo: o site volta com os dados atuais.

**Resultado**

Site fora do ar, e a mudança registrada no histórico.

## Pronto quando

- Trocar o WhatsApp em Configurações › Academia muda todos os botões de WhatsApp do site.
- Desligar “Site publicado” tira a página do ar sem afetar o login.
- Nenhum texto entre colchetes aparece no site publicado.
- A página funciona no celular, com o menu e os botões em tamanho de toque.
