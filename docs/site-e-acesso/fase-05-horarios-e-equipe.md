# Fase 05 · Site público › Horários e equipe

> Guia: Site e acesso · Etapa B · Site público · código `HEQ` · [índice do guia](README.md)

- **Objetivo:** Mostrar no site a grade de horários e a equipe a partir do que já está na gestão, sem digitar nada duas vezes.
- **Depende de:** Fase 4. Gestão, Fases 4 (professores), 6 (turmas) e 11 (agenda), além das opções “Mostrar horários” e “Mostrar equipe” da Fase 2.
- **Quem usa:** Visitante. O administrador liga e desliga cada seção pela gestão.

## Telas no canvas

- Site público › Landing page (visitantes): seções “Horários” e “Equipe”.
- No celular: Site público › Landing page, com os horários separados por período (Manhã, Tarde e Noite).

## Dados

- Lidos das turmas e da agenda: tipo de turma, período, dias da semana e horário.
- Lidos de Professores: nome, função, faixa e grau, e status.
- Opções de Configurações › Academia: “Mostrar horários das turmas” e “Mostrar equipe”.

## Passo a passo

1. Abrir na API uma consulta pública, só de leitura, que devolve apenas os campos mostrados no site.
2. Montar a seção “Horários”: quadro por tipo de turma e período no computador, e escolha do período no celular.
3. Montar a seção “Equipe”, com o desenho da faixa de cada professor.
4. Ligar as duas opções da gestão. Com a opção desligada, a seção e o link do menu somem.
5. Tratar os casos sem dados: célula sem turma e equipe vazia.
6. Testar: mudar um horário e a faixa de um professor na gestão e conferir o site.

## Requisitos funcionais

| Código | Requisito |
| --- | --- |
| **RF-HEQ-01** | A seção “Horários” mostra um quadro com os tipos de turma nas linhas e os períodos Manhã, Tarde e Noite nas colunas. Cada célula mostra o horário e os dias. |
| **RF-HEQ-02** | No celular, o visitante escolhe o período e vê os horários daquele período. |
| **RF-HEQ-03** | A seção informa que a grade é atualizada pela própria academia. |
| **RF-HEQ-04** | A seção “Equipe” mostra um cartão por professor ou instrutor, com as iniciais, o nome, a função e a faixa com os graus. |
| **RF-HEQ-05** | Uma mudança de horário, de professor ou de faixa na gestão aparece no site sem nenhuma outra ação. |
| **RF-HEQ-06** | Com “Mostrar horários” desligado, a seção e o link “Horários” do menu não aparecem. O mesmo vale para “Mostrar equipe”. |
| **RF-HEQ-07** | Quando não há turma em um tipo e período, a célula fica vazia, sem mensagem de erro. |

## Regras de negócio

| Código | Regra |
| --- | --- |
| **RN-HEQ-01** | Os horários vêm das turmas e da agenda, e a equipe vem do cadastro de professores. O site não tem cadastro próprio. |
| **RN-HEQ-02** | O site mostra a grade normal da semana. Aula cancelada, troca de professor em um dia e dia sem aula não aparecem nele. _[sugestão: confirmar]_ |
| **RN-HEQ-03** | Só aparecem turmas ativas e professores ativos. |
| **RN-HEQ-04** | Se houver mais de uma turma do mesmo tipo e período, todas aparecem na célula. |
| **RN-HEQ-05** | A faixa mostrada é a atual do cadastro do professor. |
| **RN-HEQ-06** | O desenho mostra textos como “Head Coach” e “Educador físico”, que não existem no cadastro. Enquanto isso, o site mostra a função do cadastro: Professor ou Instrutor auxiliar. **[A DEFINIR]** |
| **RN-HEQ-07** | A ordem dos professores e quem aparece em destaque ainda não foram decididos. **[A DEFINIR]** |
| **RN-HEQ-08** | O site não mostra telefone, e-mail nem outro dado pessoal do professor. |
| **RN-HEQ-09** | Cada professor precisa concordar em aparecer no site. _[sugestão: confirmar com a academia]_ |
| **RN-HEQ-10** | O site não mostra nomes de alunos nem quantos alunos há em cada turma. |

## Casos de uso

### UC-HEQ-01 · Mudar um horário e ver no site

**Quem:** Administrador. **Antes:** Site publicado, com “Mostrar horários” ligado.

**Fluxo principal**

1. Altera o horário de uma turma na gestão.
2. O sistema grava a mudança.
3. O visitante abre o site e vê o horário novo na grade.

**Variações**

- “Mostrar horários” desligado: a seção não aparece, e nada muda no site.

**Resultado**

Site e gestão mostram o mesmo horário.

### UC-HEQ-02 · Esconder a equipe do site

**Quem:** Administrador. **Antes:** Sessão de administrador.

**Fluxo principal**

1. Abre Configurações › Academia.
2. Desliga “Mostrar equipe” e salva.
3. O site deixa de mostrar a seção “Equipe” e o link do menu.

**Resultado**

O resto do site continua igual.

## Pronto quando

- Mudar o horário de uma turma na gestão muda a grade do site.
- Um professor inativo não aparece na equipe.
- Desligar cada opção esconde a seção e o link do menu.
- A consulta pública não devolve telefone nem e-mail de professor.
