# Fase 04 · Pessoas › Professores

> Guia: Gestão · Etapa B · Cadastros básicos · código `PRO` · [índice do guia](README.md)

- **Objetivo:** Cadastrar quem dá aula, com faixa, contato e turmas.
- **Depende de:** Fases 1 e 3 (o cadastro pode dar acesso ao sistema).
- **Quem usa:** Administrador. O professor não acessa esta tela.

## Telas no canvas

- Pessoas › Professores: lista e painel.
- Novo professor (janela). A mesma janela serve para editar.

## Dados

- Professor: nome completo, telefone ou WhatsApp, e-mail, função (Professor ou Instrutor auxiliar), faixa e grau, status (Ativo ou Inativo) e usuário vinculado, quando houver.

## Passo a passo

1. Criar a entidade Professor, separada do Usuário, com vínculo opcional entre os dois.
2. Montar a lista com filtros por nome, status e turma.
3. Montar o painel lateral com faixa, contato, turmas e ações.
4. Montar a janela de cadastro e edição.
5. Implementar a opção “Dar acesso ao sistema”, que dispara o convite da Fase 3.
6. Implementar ativar e inativar.
7. Voltar aqui depois da Fase 6, para mostrar as turmas reais, e da Fase 11, para o atalho “Ver aulas do professor”.

## Requisitos funcionais

| Código | Requisito |
| --- | --- |
| **RF-PRO-01** | Listar professores e instrutores com função, faixa, turmas e status. |
| **RF-PRO-02** | Filtrar por nome, status e tipo de turma. |
| **RF-PRO-03** | O painel mostra faixa, telefone, e-mail, situação do acesso ao sistema e as turmas com dias e horário. |
| **RF-PRO-04** | Cadastrar e editar: nome, telefone, e-mail, faixa e grau e as turmas em que dá aula. |
| **RF-PRO-05** | No cadastro, o administrador pode marcar “Dar acesso ao sistema” e escolher o perfil. O sistema envia o convite por e-mail. |
| **RF-PRO-06** | Ativar e inativar um professor. |
| **RF-PRO-07** | Atalhos do painel: abrir a conversa no WhatsApp e ver as aulas do professor na agenda. |

## Regras de negócio

| Código | Regra |
| --- | --- |
| **RN-PRO-01** | Professor é um cadastro de pessoa. Ter acesso ao sistema é opcional e separado. |
| **RN-PRO-02** | Para dar acesso, o e-mail é obrigatório. |
| **RN-PRO-03** | Um administrador também pode ser professor. |
| **RN-PRO-04** | Professor inativo deixa de aparecer nas escolhas de professor de turma e de aula, e as turmas dele precisam de um novo responsável. _[sugestão]_ |
| **RN-PRO-05** | A faixa do professor é informada no cadastro e não passa pelo registro de graduações dos alunos. |

## Casos de uso

### UC-PRO-01 · Cadastrar um professor com acesso ao sistema

**Quem:** Administrador. **Antes:** Sessão de administrador.

**Fluxo principal**

1. Abre Pessoas › Professores e clica em “Novo professor”.
2. Preenche nome, telefone, e-mail, faixa e grau e marca as turmas.
3. Marca “Dar acesso ao sistema” e escolhe o perfil.
4. Salva.
5. O sistema grava o professor, cria o usuário com status “Convite enviado” e envia o e-mail.

**Variações**

- Acesso marcado sem e-mail: o sistema pede o e-mail.
- Acesso não marcado: o sistema grava só o cadastro.

**Resultado**

Professor disponível para turmas e aulas, com o convite pendente em Usuários e permissões.

## Pronto quando

- O professor cadastrado aparece na escolha de professor da turma (Fase 6).
- O convite gerado pelo cadastro aparece na aba Equipe.
