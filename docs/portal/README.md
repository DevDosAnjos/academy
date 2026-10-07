# Guia de desenvolvimento · Desktop · Portal do aluno

> Sistema de Gestão para Academia de Jiu-Jitsu · Versão 1.0 · 2 de outubro de 2026 · Arquivo 2 de 3 · o primeiro trata da Gestão e o terceiro, do Site e acesso

> **Atualização de escopo (07/10/2026, issue #14):** o site público de cada academia saiu do escopo; no lugar dele entra a landing page da plataforma (#96). O que estava escrito aparece riscado, com a atualização logo depois quando há.

Ordem de desenvolvimento, requisitos funcionais e não funcionais, regras de negócio e casos de uso do portal usado por alunos e responsáveis.

| **8** | **57** | **56** | **13** | **23** |
| :---: | :---: | :---: | :---: | :---: |
| fases, na ordem de execução | requisitos funcionais | regras de negócio | casos de uso | requisitos não funcionais |

[← Índice da documentação](../README.md)

## Sobre este guia

Este guia diz o que construir no Portal do aluno e em que ordem. Ele continua o guia da Gestão: o portal mostra ao aluno e ao responsável o que a gestão registrou, e quase tudo aqui depende de alguma fase de lá.

Quando o texto diz “Gestão, Fase 14”, a referência é à fase 14 do arquivo “Guia de desenvolvimento - Desktop - Gestão”. Quando cita uma tela, usa o nome que ela tem no canvas, na página “Desktop · Portal do aluno”. As telas do celular ficam na página “Celular · Portal do aluno”.

### Como cada fase está organizada

| Bloco | O que traz |
| --- | --- |
| Objetivo, Depende de, Quem usa | Para que serve a parte, quais fases precisam estar prontas antes (deste guia e da Gestão) e quem usa. |
| Telas no canvas | As telas desenhadas, no computador e no celular. |
| Dados | As informações que a parte guarda ou lê. |
| Passo a passo | A sequência de construção dentro da fase. |
| Requisitos funcionais | O que o portal precisa fazer. |
| Regras de negócio | O que vale sempre, por decisão da academia ou do projeto. |
| Casos de uso | Um roteiro de uso do começo ao fim, com as variações. |
| Pronto quando | O que conferir antes de passar para a fase seguinte. |

### Como ler os códigos

Os códigos deste guia usam siglas diferentes das do guia da Gestão, para os dois poderem ser usados juntos sem confusão.

| Código | Significado | Exemplo |
| --- | --- | --- |
| RF | Requisito funcional | RF-PGO-03 é o terceiro requisito funcional do Pagamento online. |
| RN | Regra de negócio | RN-FNP-02 é a segunda regra do Financeiro do portal. |
| UC | Caso de uso | UC-AVI-01 é o primeiro caso de uso de Avisos. |
| RNF-P | Requisito não funcional do portal | RNF-P10 vale para o portal inteiro. |

### Marcações

- **[A DEFINIR]** marca um ponto que depende de decisão da academia. Não desenvolver por conta própria: usar a solução provisória indicada e voltar ao ponto quando houver decisão.
- _[sugestão]_ marca uma proposta de boa prática que não veio da academia nem das telas. Precisa de confirmação.
- Os nomes, valores e datas que aparecem nas telas do canvas são dados de exemplo. Eles não são requisitos.

## Visão geral do Portal

O Portal é a área do aluno e do responsável. Nele a pessoa vê os horários em que pode treinar, os avisos da academia, a própria graduação e as mensalidades, e paga online.

O portal quase não tem dados próprios. Turma, aula, cobrança, comunicado e graduação nascem na gestão. O portal mostra esses dados para a pessoa certa e recebe duas coisas de volta: o pagamento e as preferências de aviso.

Ele é usado no computador e no celular. Este guia segue as telas do computador e indica, em cada fase, a tela correspondente do celular.

### Quem usa

| Perfil | O que faz |
| --- | --- |
| Aluno | Vê os próprios dados, horários, avisos e mensalidades, e paga online. |
| Responsável | Faz o mesmo por um ou mais alunos menores ligados à conta, escolhendo qual deles está vendo. |

### Mapa das abas

| Aba | O que mostra | Fases |
| --- | --- | --- |
| Estrutura | Acesso, navegação e conta de responsável | 1 e 2 |
| Início | Próxima aula, mensalidade, avisos recentes e graduação | 8 |
| Agenda | Horários em que o aluno pode treinar na semana | 4 |
| Financeiro | Mensalidade, composição do valor, histórico e pagamento online | 6 e 7 |
| Minhas informações | Dados, treinos, plano e benefícios, graduação e preferências de e-mail | 3 |
| Avisos (sino) | Comunicados da academia | 5 |

### O que não faz parte

- Frequência e presença. O aluno não marca presença, não faz check-in e não vê percentual de aulas.
- Reserva de vaga ou confirmação de aula.
- Progresso de graduação, aulas que faltam ou previsão da próxima faixa.
- Chat ou mensagens do aluno para a academia.
- Loja e ranking.
- Matrícula online, contrato e termo de responsabilidade.
- Cadastro aberto. A conta sempre nasce de um convite da gestão.
- Aplicativo instalado. O portal abre no navegador.
- ~~Login, Primeiro acesso e site público. Eles estão no arquivo “Site e acesso”.~~ _Atualização:_ Login e Primeiro acesso estão no arquivo “Site e acesso”. O site público saiu do escopo.

## Decisões em aberto

Estes pontos ainda não foram decididos. Só o primeiro impede uma fase inteira (a do pagamento online). Os demais têm solução provisória.

| O que falta decidir | O que afeta | Enquanto não decide |
| --- | --- | --- |
| Provedor de pagamento online | Pagamento online | O portal mostra as cobranças, e o pagamento é feito na academia. A Fase 7 fica por último. |
| Pagamento parcial, juros, multa e quem arca com as taxas do provedor | Financeiro e Pagamento online | Só pagamento do valor inteiro, sem juros nem multa. |
| Quais dados o aluno pode editar sozinho | Minhas informações | Só telefone e e-mail. |
| Aluno menor com conta própria além da do responsável | Base do portal e Conta de responsável | Só o responsável tem conta. |
| Mais de um responsável com acesso ao mesmo aluno | Conta de responsável | O banco permite. O convite vai para um responsável. |
| Acesso do aluno inativo | Base do portal | Mantém o acesso só para consultar o histórico. |
| Professor que também é aluno: uma conta ou duas | Base do portal | E-mails diferentes para cada papel. |
| Tempo de sessão e prazo do “Manter conectado” | Base do portal | Valores padrão, a combinar. |
| Quando um aviso passa a lido | Avisos | Ao clicar no aviso ou usar “Marcar todos como lidos”. |
| Aluno treinar em vários horários (quase certo) | Agenda e Avisos | Turma principal mais outros horários, como desenhado. |
| Como a aula cancelada e o dia sem aula aparecem na agenda | Agenda | A aula fica na grade com o rótulo “Cancelada”. |
| Telas não desenhadas: sair do portal e editar meus dados | Base do portal e Minhas informações | Seguir o padrão das telas existentes. |

## Requisitos não funcionais

Valem para todas as fases do portal. Os requisitos não funcionais da Gestão que tratam do servidor (auditoria, cópia de segurança, ambiente de teste) continuam valendo aqui.

| Código | Uso |
| --- | --- |
| **RNF-P01** | O portal funciona no computador e no celular, no navegador, sem instalar aplicativo. As mesmas funções existem nos dois. |
| **RNF-P02** | As larguras de referência são 1440 px no computador e 390 px no celular. Entre as duas, a tela se ajusta. |
| **RNF-P03** | Todo o texto é em português do Brasil, em linguagem simples, pensada para alunos e pais que não são da área. |
| **RNF-P04** | No celular, botões e links têm área de toque de pelo menos 44 px. |
| **RNF-P05** | O portal pode ser usado só com o teclado, os textos têm contraste adequado (nível AA), os campos têm rótulo e os botões que só têm ícone têm nome para leitores de tela. |
| **RNF-P06** | As diferenças na agenda e nos status não dependem só de cor. |

| Código | Desempenho |
| --- | --- |
| **RNF-P07** | Cada tela abre em até 2 segundos em uma conexão comum de celular. _[sugestão: confirmar a meta]_ |
| **RNF-P08** | A confirmação do Pix aparece sem o usuário recarregar a página. |

| Código | Segurança e privacidade |
| --- | --- |
| **RNF-P09** | O acesso é só com login. A senha é guardada com hash e a conexão é sempre por HTTPS. |
| **RNF-P10** | A conta só vê os alunos vinculados a ela, e isso é conferido no servidor em toda consulta. |
| **RNF-P11** | Os dados de cartão não passam pelo servidor da academia nem são guardados. O pagamento segue as exigências de segurança do provedor. |
| **RNF-P12** | A sessão expira depois de um tempo sem uso. A opção “Manter conectado” do login define um prazo maior. **[A DEFINIR: os dois prazos]** |
| **RNF-P13** | O tratamento de dados segue a LGPD. Os dados de menores são acessados pelo responsável, e o titular pode pedir cópia dos próprios dados. Validar com quem cuida do jurídico da academia. |
| **RNF-P14** | Toda ação do portal que altera dados fica no histórico de alterações da gestão, com a origem |

“portal”.

| Código | Confiabilidade |
| --- | --- |
| **RNF-P15** | O pagamento não se repete por engano: clicar duas vezes ou receber a mesma confirmação duas vezes não gera dois pagamentos. |
| **RNF-P16** | Se o provedor de pagamento estiver fora do ar, o portal avisa, e as outras telas continuam funcionando. |
| **RNF-P17** | As mensagens de erro dizem o que aconteceu e, no pagamento, se algo foi ou não cobrado. |

| Código | Manutenção |
| --- | --- |
| **RNF-P18** | O portal usa a mesma API e as mesmas regras da gestão. Nenhuma regra de negócio é repetida no navegador. |
| **RNF-P19** | Cada regra de negócio deste guia tem um teste automatizado. |
| **RNF-P20** | O código de pagamento fica isolado, para o provedor poder ser trocado sem mexer nas telas. |

| Código | Compatibilidade |
| --- | --- |
| **RNF-P21** | O portal funciona nas versões atuais de Chrome, Edge, Firefox e Safari, no computador e no celular. |
| **RNF-P22** | Os formatos são brasileiros: data dd/mm/aaaa, moeda R$, telefone com DDD e fuso de Brasília. |
| **RNF-P23** | Os e-mails enviados pelo sistema podem ser lidos sem dificuldade no celular. _[sugestão]_ |

## Ordem de desenvolvimento

São 8 fases, em quatro etapas. O portal só pode começar quando a gestão já tiver o que ele precisa mostrar. Por isso cada fase diz, em “Depende de”, quais fases da Gestão precisam estar prontas.

### Quando o portal pode começar

| Etapa do portal | A gestão precisa ter pronto |
| --- | --- |
| Etapa A · Base do portal | Fases 1, 3 e 7: acesso, contas do portal e alunos com responsáveis. |
| Etapa B · Consulta | Fases 6, 8, 9, 10, 11 e 13: turmas, graduações, grupos, comunicados, agenda e benefícios. |
| Etapa C · Financeiro e pagamento | Fases 14 e 24: mensalidades e integrações. E o provedor de pagamento escolhido. |
| Etapa D · Início | Nada além do que as etapas anteriores já pediram. |

### Fase 0 · Antes de começar

- Usar as mesmas decisões técnicas da Gestão: a mesma API, o mesmo banco e a mesma base visual.
- Decidir o provedor de pagamento, ou assumir que a Fase 7 fica por último.
- Fixar as larguras de referência das telas: 1440 px no computador e 390 px no celular.
- Preparar as contas de teste: um aluno adulto, um responsável com dois alunos, um aluno com mensalidade em atraso e um aluno com tudo pago.

### Roteiro de toda fase

1. Reler a fase neste guia e abrir as telas dela no canvas, no computador e no celular.
2. Conferir se as fases da Gestão citadas em “Depende de” estão prontas.
3. Abrir na API as consultas do portal, com a regra de vínculo conferida no servidor.
4. Construir a tela no computador.
5. Ajustar a tela para o celular.
6. Ligar os estados de tela, as mensagens de erro e o registro no histórico.
7. Testar com as contas de teste: aluno, responsável e conta sem vínculo com o aluno.
8. Conferir a lista “Pronto quando” e só então passar para a fase seguinte.

### As fases

**Etapa A · Base do portal**

| Fase | O que é construído | Depende de |
| --- | --- | --- |
| **01** | Base do portal: acesso, navegação e padrões | Gestão, Fases 1 (acesso e histórico), 3 (contas e convites do portal) e 7 (alunos e responsáveis). As telas de Login e Primeiro acesso ficam no arquivo “Site e acesso”. |
| **02** | Conta de responsável | Fase 1 deste guia. Gestão, Fase 7 (vínculo entre responsável e aluno). |

**Etapa B · Consulta**

| Fase | O que é construído | Depende de |
| --- | --- | --- |
| **03** | Minhas informações | Fases 1 e 2. Gestão, Fases 7 (cadastro do aluno), 8 (graduações) e 13 (descontos e bolsas). |
| **04** | Agenda | Fases 1 e 2. Gestão, Fases 6 (turmas), 7 (turma principal e outros horários) e 11 (agenda de aulas). |
| **05** | Avisos | Fases 1 e 2. Gestão, Fases 9 (grupos) e 10 (comunicados). |

**Etapa C · Financeiro e pagamento**

| Fase | O que é construído | Depende de |
| --- | --- | --- |
| **06** | Financeiro | Fases 1 e 2. Gestão, Fases 13 (descontos e bolsas) e 14 (mensalidades). |
| **07** | Pagamento online | Fase 6. Gestão, Fases 14 (mensalidades) e 24 (integrações). Depende da escolha do provedor de pagamento. |

**Etapa D · Início**

| Fase | O que é construído | Depende de |
| --- | --- | --- |
| **08** | Início | Fases 2 a 7 deste guia. |

### O que pode mudar de lugar

- As Fases 3, 4 e 5 não dependem uma da outra. Podem ser feitas em qualquer ordem ou ao mesmo tempo.
- A Fase 6 (Financeiro) pode vir antes da Etapa B, se a prioridade da academia for mostrar as mensalidades.
- A Fase 7 (Pagamento online) pode ficar por último sem travar as outras. Sem ela, o portal mostra as cobranças e o pagamento continua sendo feito na academia.
- O Início pode ser montado aos poucos, um cartão a cada aba concluída, em vez de esperar a Fase 8. _[sugestão]_

## Fases

### Etapa A · Base do portal

A conta, a navegação e a regra de quem vê o quê. A conta de responsável vem logo no começo porque todas as telas dependem de saber qual aluno está sendo mostrado.

- [Fase 01 · Base do portal: acesso, navegação e padrões](fase-01-base-do-portal.md) · `POR`
- [Fase 02 · Conta de responsável](fase-02-conta-de-responsavel.md) · `RSP`

### Etapa B · Consulta

Três abas que só leem o que a gestão registrou. Elas não dependem uma da outra e podem ser feitas em paralelo.

- [Fase 03 · Minhas informações](fase-03-minhas-informacoes.md) · `MIN`
- [Fase 04 · Agenda](fase-04-agenda.md) · `AGP`
- [Fase 05 · Avisos](fase-05-avisos.md) · `AVI`

### Etapa C · Financeiro e pagamento

Primeiro mostrar as cobranças, depois receber. O pagamento online é a parte de maior risco e depende da escolha do provedor.

- [Fase 06 · Financeiro](fase-06-financeiro.md) · `FNP`
- [Fase 07 · Pagamento online](fase-07-pagamento-online.md) · `PGO`

### Etapa D · Início

A tela de entrada vem por último porque só reúne o que as outras abas já mostram.

- [Fase 08 · Início](fase-08-inicio.md) · `INP`

## Revisão final

Depois da Fase 8, antes de liberar o portal para os alunos:

1. Percorrer a lista “Pronto quando” de todas as fases mais uma vez, do começo.
2. Entrar com cada conta de teste e tentar abrir os dados de outro aluno e as telas da gestão.
3. Repetir no celular tudo o que foi feito no computador.
4. Fazer o pagamento de ponta a ponta no ambiente de teste do provedor: Pix, cartão aprovado, cartão recusado e boleto. Conferir a baixa na gestão, a notificação e o histórico.
5. Conferir que não existe em nenhuma tela: presença, frequência, reserva de aula, progresso de graduação ou chat.
6. Enviar um comunicado pela gestão e conferir o portal, o e-mail e o sino.
7. Trocar o professor de uma aula na gestão e conferir a agenda do aluno.
8. Desligar os e-mails em “Minhas informações” e conferir que os envios param.
9. Levar para a academia a lista de “Decisões em aberto” e registrar o que foi resolvido.

### Glossário

| Termo | O que significa |
| --- | --- |
| Aviso | Comunicado enviado pela gestão, que o aluno lê no portal e recebe por e-mail. |
| Cobrança | A mensalidade do aluno em um mês, com valor, vencimento e situação. É gerada na gestão. |
| Composição do valor | O plano e os benefícios que formam o valor da mensalidade. |
| Comprovante | Documento de um pagamento feito, que o aluno pode baixar. |
| Conta do portal | O acesso de um aluno ou de um responsável. Nasce de um convite da gestão. |
| Convite | E-mail enviado pela gestão com o link para criar a senha. |
| Outros horários | Turmas além da principal em que o aluno pode treinar. |
| Pix copia e cola | Código de texto do Pix, para colar no aplicativo do banco. |
| Provedor de pagamento | Empresa que processa Pix, cartão e boleto. Ainda não foi escolhida. |
| Responsável | Adulto ligado a um ou mais alunos menores. Vê os dados deles e paga por eles. |
| Turma principal | A turma em que o aluno está matriculado. |
