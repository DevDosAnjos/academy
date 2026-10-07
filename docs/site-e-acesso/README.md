# Guia de desenvolvimento · Desktop · Site e acesso

> Sistema de Gestão para Academia de Jiu-Jitsu · Versão 1.0 · 2 de outubro de 2026 · Arquivo 3 de 3 · os dois primeiros tratam da Gestão e do Portal do aluno

> **Atualização de escopo (07/10/2026, issue #14):** o site público de cada academia saiu do escopo; no lugar dele entra a landing page da plataforma (#96). O que estava escrito aparece riscado, com a atualização logo depois quando há.

Ordem de desenvolvimento, requisitos funcionais e não funcionais, regras de negócio e casos de uso do site público e das telas de entrada no sistema.

| **6** | **61** | **59** | **11** | **28** |
| :---: | :---: | :---: | :---: | :---: |
| fases, na ordem de execução | requisitos funcionais | regras de negócio | casos de uso | requisitos não funcionais |

[← Índice da documentação](../README.md)

## Sobre este guia

Este guia diz o que construir no site público e nas telas de acesso, e em que ordem. Ele fecha a série de três arquivos: Gestão, Portal do aluno e Site e acesso.

Ser o terceiro arquivo não quer dizer ser o último a ser feito. O login e o primeiro acesso são construídos no começo do projeto, junto com as primeiras fases da Gestão, como mostra a seção “Ordem de desenvolvimento”.

Quando o texto diz “Gestão, Fase 12”, a referência é à fase 12 do guia da Gestão. O mesmo vale para “Portal, Fase 3”. As telas citadas estão no canvas, nas páginas “Desktop · Site e acesso” e “Celular · Site e acesso”.

### Como cada fase está organizada

| Bloco | O que traz |
| --- | --- |
| Objetivo, Depende de, Quem usa | Para que serve a parte, quais fases precisam estar prontas antes (deste guia e da Gestão) e quem usa. |
| Telas no canvas | As telas desenhadas, no computador e no celular, e o que ainda não foi desenhado. |
| Dados | As informações que a parte guarda ou lê. |
| Passo a passo | A sequência de construção dentro da fase. |
| Requisitos funcionais | O que a tela precisa fazer. |
| Regras de negócio | O que vale sempre, por decisão da academia ou do projeto. |
| Casos de uso | Um roteiro de uso do começo ao fim, com as variações. |
| Pronto quando | O que conferir antes de passar para a fase seguinte. |

### Como ler os códigos

As siglas são diferentes das dos outros dois guias, para os três poderem ser usados juntos.

| Código | Significado | Exemplo |
| --- | --- | --- |
| RF | Requisito funcional | RF-LGN-03 é o terceiro requisito funcional do Login. |
| RN | Regra de negócio | RN-EXS-01 é a primeira regra do Pedido de aula experimental. |
| UC | Caso de uso | UC-PAC-01 é o primeiro caso de uso do Primeiro acesso. |
| RNF-S | Requisito não funcional do site e do acesso | RNF-S11 vale para todas as fases deste guia. |

### Marcações

- **[A DEFINIR]** marca um ponto que depende de decisão da academia. Não desenvolver por conta própria: usar a solução provisória indicada e voltar ao ponto quando houver decisão.
- _[sugestão]_ marca uma proposta de boa prática que não veio da academia nem das telas. Precisa de confirmação.
- _[não desenhado]_ marca uma tela ou um texto que o sistema precisa ter e que ainda não está no canvas.
- Nomes, números, horários e contatos das telas do canvas são dados de exemplo, não requisitos.

## Visão geral do Site e acesso

Esta parte reúne o que fica fora da gestão e do portal. De um lado, o site da academia, que qualquer pessoa abre sem login. Do outro, as telas por onde todos entram: login, primeiro acesso e recuperação de senha.

O site quase não tem dados próprios. O contato, o logo e a cor vêm de Configurações › Academia. Os horários vêm das turmas e da agenda. A equipe vem do cadastro de professores. O site devolve uma única coisa para a gestão: o pedido de aula experimental.

O acesso é um só para todo o sistema. A pessoa informa e-mail e senha, e o sistema decide para onde ela vai: a gestão ou o portal.

### Quem usa

| Quem | O que faz |
| --- | --- |
| Visitante | ~~Abre o site sem login, conhece a academia, tira dúvidas e pede uma aula experimental.~~ _Atualização:_ Abre a landing page da plataforma sem login e vai para o login. |
| Convidado | Recebeu o convite por e-mail e cria a própria senha. |
| Administrador e Professor | Entram pelo login e são levados à gestão. |
| Aluno e Responsável | Entram pelo mesmo login e são levados ao portal. |
| Administrador | ~~Decide, pela gestão, se o site está no ar e se mostra os horários e a equipe.~~ _Removido do escopo (#14)._ |

### Mapa das partes

| Parte | O que faz | Fase |
| --- | --- | --- |
| Acesso › Login | Entrar com e-mail e senha e ser levado à gestão ou ao portal | 1 |
| Acesso › Primeiro acesso | Criar a senha a partir do convite enviado pela gestão | 2 |
| Acesso › Recuperar senha | Pedir um link por e-mail e criar uma nova senha | 3 |
| ~~Site público › Página da academia~~ | ~~Apresentação, modalidades, dúvidas e contato~~ | ~~4~~ _Removido do escopo (#14)._ |
| ~~Site público › Horários e equipe~~ | ~~Grade de horários e professores, lidos da gestão~~ | ~~5~~ _Removido do escopo (#14)._ |
| ~~Site público › Pedido de aula experimental~~ | ~~Formulário que entrega o pedido à gestão~~ | ~~6~~ _Removido do escopo (#14)._ |

### O que não faz parte

- Cadastro aberto. Ninguém cria conta pelo site. A conta sempre nasce de um convite da gestão.
- Matrícula online, contrato e termo de responsabilidade.
- Marcar a aula experimental sozinho, escolhendo dia e horário. O site só recebe o pedido.
- Pagamento pelo site. O pagamento online fica no portal.
- Entrar com conta do Google, com rede social ou com código por SMS. O acesso é só com e-mail e senha.
- Loja, ranking e chat.
- Seções que não estão no desenho, como preços, notícias e galeria de fotos.
- As telas da gestão e do portal. Elas estão nos outros dois arquivos.

## Decisões em aberto

Estes pontos ainda não foram decididos. Nenhum deles impede começar, porque todos têm solução provisória. Os três primeiros e a política de privacidade precisam estar resolvidos antes de o site ser divulgado.

| O que falta decidir | O que afeta | Enquanto não decide |
| --- | --- | --- |
| ~~Textos que faltam: endereço, idade mínima, kimono, condições da aula experimental, segurança e o que levar~~ | ~~Página da academia e Pedido de aula experimental~~ | ~~O site não vai ao ar com esses espaços em branco.~~ _Removido do escopo (#14)._ |
| De onde vêm os números do topo (alunos, aulas realizadas, percentual e professores) | Página da academia | Só publicar o que a academia confirmar. Nada é calculado pelo sistema. |
| ~~Modalidades Kids e No-Gi, que não existem como tipo de turma na gestão~~ | ~~Página da academia, Horários e Pedido de aula experimental~~ | ~~Mostrar só Infantil, Juvenil e Adulto.~~ _Removido do escopo (#14)._ |
| ~~Onde o conteúdo do site é editado: textos, números, modalidades e dúvidas~~ | ~~Página da academia~~ | ~~Conteúdo fixo, guardado em um só lugar e trocado por quem desenvolve.~~ _Removido do escopo (#14)._ |
| ~~O que o visitante vê com o site desligado~~ | ~~Página da academia~~ | ~~Página simples com o nome da academia, o contato e o link “Entrar”.~~ _Removido do escopo (#14)._ |
| Como cada professor é apresentado, a ordem e o destaque | Horários e equipe | Função do cadastro e ordem alfabética, sem destaque. |
| Prazo do convite | Primeiro acesso | Valor provisório, a combinar. O mesmo ponto está no guia da Gestão. |
| Tempo de sessão e prazo do “Manter conectado” | Login e sessão | Valores provisórios, a combinar. |
| Exigências da senha e prazo do link de nova senha | Primeiro acesso e Recuperar senha | Senha como no desenho: 8 caracteres, com letra e número. Link com prazo curto. |
| Professor que também é aluno: uma conta ou duas | Login e sessão | Um e-mail para cada papel. |
| ~~Política de privacidade e por quanto tempo guardar os pedidos~~ | ~~Pedido de aula experimental~~ | ~~Guardar os pedidos e não apagar nada até a decisão.~~ _Removido do escopo (#14)._ |
| Telas não desenhadas: nova senha, convite vencido, Primeiro acesso e formulário de pedido no celular, e os e-mails | Acesso e Pedido de aula experimental | Seguir o padrão das telas existentes. |
| Endereço do site e das áreas (domínio) | Todo o arquivo | ~~Um endereço só, com o site na página inicial. Resolver na Fase 0.~~ _Atualização:_ Um endereço só para todas as academias, com login único. Decidido na #14. |

## Requisitos não funcionais

Valem para todas as fases deste guia. Os requisitos não funcionais da Gestão que tratam do servidor (auditoria, cópia de segurança e ambiente de teste) continuam valendo aqui.

| Código | Uso |
| --- | --- |
| **RNF-S01** | ~~O site e as telas de acesso~~ _Atualização:_ A landing page e as telas de acesso funcionam no computador e no celular, no navegador, sem instalar nada. |
| **RNF-S02** | As larguras de referência são 1440 px no computador e 390 px no celular. Entre as duas, a tela se ajusta. |
| **RNF-S03** | Todo o texto é em português do Brasil, em linguagem simples, pensada para quem nunca treinou e para pais de alunos. |
| **RNF-S04** | No celular, botões e links têm área de toque de pelo menos 44 px. |
| **RNF-S05** | As telas podem ser usadas só com o teclado, os textos têm contraste adequado (nível AA), os campos têm rótulo e os títulos da página seguem uma ordem que leitores de tela entendem. |
| **RNF-S06** | Os campos aceitam o preenchimento automático do navegador e dos guardadores de senha: nome, |

telefone, e-mail e senha.

| Código | Desempenho |
| --- | --- |
| **RNF-S07** | ~~A primeira parte do site~~ _Atualização:_ A primeira parte da landing page aparece em até 2,5 segundos em uma conexão comum de celular. _[sugestão: confirmar a meta]_ |
| **RNF-S08** | O login responde em até 2 segundos em uso normal. _[sugestão: confirmar a meta]_ |
| **RNF-S09** | ~~O site não carrega~~ _Atualização:_ A landing page não carrega nada da gestão nem do portal. A página do visitante é leve. |

| Código | Segurança e privacidade |
| --- | --- |
| **RNF-S10** | A conexão é sempre por HTTPS. A senha é guardada com hash próprio para senhas e nunca aparece em e-mail, tela ou registro. |
| **RNF-S11** | Os links de convite e de nova senha têm código longo e aleatório, valem uma única vez, têm prazo e são guardados com hash. |
| **RNF-S12** | As mensagens do login e da recuperação de senha não revelam se um e-mail está cadastrado. |
| **RNF-S13** | Login, recuperação de senha e formulário de pedido têm limite de tentativas por conta e por aparelho. _[sugestão]_ |
| **RNF-S14** | A sessão fica em um cookie protegido, que só trafega por HTTPS e não pode ser lido por scripts da página. Sair encerra a sessão no servidor. |
| **RNF-S15** | Os formulários são protegidos contra envio forjado por outro site. |
| **RNF-S16** | ~~A consulta usada pelo site público só devolve os campos que aparecem na página.~~ _Removido do escopo (#14)._ |
| **RNF-S17** | O tratamento de dados segue a LGPD. O formulário pede o mínimo, diz para que os dados servem e leva à política de privacidade. Os dados de criança são informados por um adulto. Validar com quem cuida do jurídico da academia. **[A DEFINIR: o texto da política]** |

| Código | Confiabilidade |
| --- | --- |
| **RNF-S18** | Clicar duas vezes em “Enviar pedido” ou em “Criar senha e entrar” não repete a ação. |
| **RNF-S19** | Se o envio de um e-mail de convite ou de nova senha falhar, o sistema tenta de novo e registra a falha. |
| **RNF-S20** | ~~Se a consulta de horários ou de equipe falhar, a seção some e o resto do site continua no ar.~~ _Removido do escopo (#14)._ |
| **RNF-S21** | As mensagens de erro dizem o que aconteceu e o que a pessoa pode fazer em seguida. |

| Código | Manutenção |
| --- | --- |
| **RNF-S22** | O acesso usa a mesma autenticação da gestão e do portal. Nenhuma regra é repetida no navegador. |
| **RNF-S23** | ~~O conteúdo do site fica separado do layout, para a academia poder trocar os textos sem refazer a página.~~ _Atualização:_ O conteúdo da landing page fica separado do layout, para ser trocado sem refazer a página. |
| **RNF-S24** | Cada regra de negócio deste guia tem um teste automatizado. |

| Código | Compatibilidade e divulgação |
| --- | --- |
| **RNF-S25** | As telas funcionam nas versões atuais de Chrome, Edge, Firefox e Safari, no computador e no celular. |
| **RNF-S26** | Os formatos são brasileiros: telefone com DDD, data dd/mm/aaaa e fuso de Brasília. |
| **RNF-S27** | ~~O site tem título~~ _Atualização:_ A landing page tem título, descrição e imagem para aparecer bem em buscadores e quando o link é compartilhado no WhatsApp. As telas de acesso não aparecem em buscadores. _[sugestão]_ |
| **RNF-S28** | Os e-mails de convite e de nova senha podem ser lidos sem dificuldade no celular. _[sugestão]_ |

## Ordem de desenvolvimento

São 6 fases, em duas etapas. As fases deste guia não são feitas todas de uma vez nem no fim do projeto. Cada uma entra logo depois da fase da Gestão que ela precisa.

### Onde cada fase se encaixa

| Fase | O que é construído | Fazer logo depois de | Por quê |
| --- | --- | --- | --- |
| **01** | Login e sessão | Gestão, Fase 1 | É a tela da autenticação da gestão. |
| **02** | Primeiro acesso | Gestão, Fase 3 | O convite precisa da tela de criar a senha. |
| **03** | Recuperar senha | Fase 2 deste guia | Reaproveita a tela de criar a senha. |
| **04** | Página da academia | Gestão, Fase 2 | Só precisa dos dados da academia. |
| **05** | Horários e equipe | Gestão, Fase 11 | Precisa de professores, turmas e agenda. |
| ~~**06**~~ | ~~Pedido de aula experimental~~ | ~~Gestão, Fase 12~~ | ~~O pedido chega em Aulas experimentais.~~ _Removido do escopo (#14)._ |

### Fase 0 · Antes de começar

- Usar as mesmas decisões técnicas da Gestão: a mesma API, o mesmo banco e a mesma base visual.
- Definir o endereço do site e como ficam os endereços do login, da gestão e do portal. _[sugestão: um endereço só, com o site na página inicial]_
- Preparar o serviço de e-mail para os convites e para a nova senha, com o domínio de envio configurado para as mensagens não caírem na caixa de spam.
- Pedir à academia os textos e as decisões da lista “Decisões em aberto”, começando pelo conteúdo do site.
- Fixar as larguras de referência das telas: 1440 px no computador e 390 px no celular.
- Preparar as contas de teste: uma de cada tipo (Administrador, Professor, Aluno e Responsável), uma inativa e uma com o convite ainda não aceito.

### Roteiro de toda fase

1. Reler a fase neste guia e abrir as telas dela no canvas, no computador e no celular.
2. Conferir se as fases citadas em “Depende de” estão prontas.
3. Abrir na API o que a fase precisa, com as regras conferidas no servidor.
4. Construir a tela no computador.
5. Ajustar a tela para o celular. Onde não houver desenho, seguir o padrão das telas existentes.
6. Ligar as mensagens de erro, os e-mails e o registro no histórico.
7. Testar com as contas de teste e também sem login, como visitante.
8. Conferir a lista “Pronto quando” e só então passar para a fase seguinte.

### As fases

**Etapa A · Acesso**

| Fase | O que é construído | Depende de |
| --- | --- | --- |
| **01** | Acesso › Login e sessão | Gestão, Fase 1 (autenticação, sessão e registro de auditoria). Esta fase é a tela dessa autenticação e é feita junto com ela. |
| **02** | Acesso › Primeiro acesso | Fase 1. Gestão, Fase 3 (convites da equipe e do portal) e Fase 1 (envio de e-mail). |
| **03** | Acesso › Recuperar senha | Fases 1 e 2 (reaproveita a tela e as exigências de criar senha). Gestão, Fase 1 (envio de e-mail). |

**Etapa B · Site público**

| Fase | O que é construído | Depende de |
| --- | --- | --- |
| ~~**04**~~ | ~~Site público › Página da academia~~ | ~~Gestão, Fase 2 (dados da academia e opção “Site publicado”). Fase 1 deste guia, para o botão “Entrar”.~~ _Removido do escopo (#14)._ |
| ~~**05**~~ | ~~Site público › Horários e equipe~~ | ~~Fase 4. Gestão, Fases 4 (professores), 6 (turmas) e 11 (agenda), além das opções “Mostrar horários” e “Mostrar equipe” da Fase 2.~~ _Removido do escopo (#14)._ |
| ~~**06**~~ | ~~Site público › Pedido de aula experimental~~ | ~~Fase 4. Gestão, Fase 12 (Aulas experimentais). A notificação é ligada na Gestão, Fase 19, e o registro no histórico usa o serviço da Gestão, Fase 1.~~ _Removido do escopo (#14)._ |

### O que pode mudar de lugar

- A Fase 4 pode ser a primeira coisa do projeto a ir ao ar. Ela só precisa dos dados da academia.
- As Fases 2 e 3 podem ser feitas juntas, porque usam a mesma tela de criar senha.
- A Fase 5 pode esperar sem travar o site. Com “Mostrar horários” e “Mostrar equipe” desligados, o site funciona sem essas seções.
- Enquanto a Fase 6 não existe, os botões de aula experimental levam ao WhatsApp. _[sugestão]_
- A Fase 6 pode ir ao ar antes das notificações da gestão. O pedido já aparece em Aulas experimentais.

### Os três arquivos juntos

Esta é uma ordem possível para o sistema inteiro, juntando os três guias. Ela respeita o que cada fase pede em “Depende de”. _[sugestão]_

| Passo | Gestão ou portal | Site e acesso | O que fica pronto |
| --- | --- | --- | --- |
| **1** | Gestão, Fase 1 | Site e acesso, Fase 1 | Entrar no sistema. |
| **2** | Gestão, Fase 2 | Site e acesso, Fase 4 | Dados da academia e site no ar, ainda sem horários e equipe. |
| **3** | Gestão, Fase 3 | Site e acesso, Fases 2 e 3 | Convites, primeiro acesso e recuperação de senha. |
| **4** | Gestão, Fases 4 a 7 | — | Professores, planos, turmas e alunos. |
| **5** | Gestão, Fases 8 a 12 | Site e acesso, Fases 5 e 6 | Operação e comunicação. O site ganha horários, equipe e pedido de aula. |
| **6** | Gestão, Fases 13 a 16 | — | Financeiro. |
| **7** | Portal, Fases 1 a 6 | — | Base do portal, consulta e financeiro do aluno. |
| **8** | Gestão, Fases 17 a 25 | Portal, Fases 7 e 8 | Acompanhamento, dados, pagamento online e Início do portal. |

## Fases

### Etapa A · Acesso

As telas por onde todos entram. Elas são feitas no começo do projeto, junto com a Etapa A da Gestão, porque sem elas ninguém usa a gestão nem o portal.

- [Fase 01 · Acesso › Login e sessão](fase-01-login-e-sessao.md) · `LGN`
- [Fase 02 · Acesso › Primeiro acesso](fase-02-primeiro-acesso.md) · `PAC`
- [Fase 03 · Acesso › Recuperar senha](fase-03-recuperar-senha.md) · `SEN`

### Etapa B · Site público

O que o visitante vê sem login. A página da academia pode ir ao ar cedo. Os horários, a equipe e o pedido de aula dependem de fases da Gestão.

- ~~[Fase 04 · Site público › Página da academia](fase-04-pagina-da-academia.md) · `SIT`~~ _Removido do escopo (#14)._
- ~~[Fase 05 · Site público › Horários e equipe](fase-05-horarios-e-equipe.md) · `HEQ`~~ _Removido do escopo (#14)._
- ~~[Fase 06 · Site público › Pedido de aula experimental](fase-06-pedido-de-aula-experimental.md) · `EXS`~~ _Removido do escopo (#14)._

## Revisão final

Depois da Fase 6, antes de divulgar o endereço do site:

1. Percorrer a lista “Pronto quando” de todas as fases mais uma vez, do começo.
2. Entrar com uma conta de cada tipo e conferir que cada uma cai na área certa.
3. Tentar entrar com senha errada, com conta inativa e com convite pendente. A mensagem tem de ser a mesma nos três casos.
4. Fazer o caminho completo com um e-mail de verdade: convite, criar a senha, sair, pedir nova senha e entrar de novo. Repetir no celular.
5. Abrir o site sem login, no computador e no celular, e clicar em todos os links e botões.
6. Conferir que não sobrou nenhum texto entre colchetes nem número de exemplo no site.
7. Enviar um pedido de aula experimental e seguir o pedido na gestão: Aulas experimentais, notificação e histórico.
8. Desligar, uma de cada vez, as opções “Site publicado”, “Mostrar horários” e “Mostrar equipe”, e conferir o site.
9. Conferir que o site não mostra dado de aluno, preço, vaga nem data de aula.
10. Compartilhar o endereço do site no WhatsApp e conferir o título e a imagem que aparecem. _[sugestão]_
11. Levar para a academia a lista de “Decisões em aberto” e registrar o que foi resolvido.

### Glossário

| Termo | O que significa |
| --- | --- |
| Conta | O acesso de uma pessoa ao sistema. Pode ser da gestão (Administrador ou Professor) ou do portal (Aluno ou Responsável). |
| Convite | E-mail enviado pela gestão com o link para a pessoa criar a própria senha. |
| Grade de horários | O quadro com os horários normais da semana, por tipo de turma e período. |
| Link de uso único | Link que funciona uma vez só e tem prazo. É usado no convite e na nova senha. |
| Manter conectado | Opção do login que faz a sessão durar mais tempo naquele aparelho. |
| Mensagem única de erro | A mesma resposta para qualquer falha de entrada, para não revelar se um e-mail está cadastrado. |
| ~~Página da academia (landing page)~~ | ~~A página única do site, com todas as seções, uma abaixo da outra.~~ _Removido do escopo (#14)._ |
| ~~Pedido de aula experimental~~ | ~~O que o visitante envia pelo formulário. A aula só é marcada depois, pela academia.~~ _Removido do escopo (#14)._ |
| Sessão | O período em que a pessoa fica dentro do sistema depois de entrar. |
| ~~Site publicado~~ | ~~Opção de Configurações › Academia que coloca o site no ar ou tira do ar.~~ _Removido do escopo (#14)._ |
| Visitante | Quem abre o site sem ter conta nem login. |

Este é o último dos três arquivos. Com ele, a Gestão, o Portal do aluno e o Site e acesso ficam descritos do começo ao fim.
