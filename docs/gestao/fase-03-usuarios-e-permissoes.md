# Fase 03 · Configurações › Usuários e permissões

> Guia: Gestão · Etapa A · Fundação · código `USU` · [índice do guia](README.md)

- **Objetivo:** Controlar quem entra na gestão e no portal e o que cada perfil pode fazer.
- **Depende de:** Fases 1 e 2.
- **Quem usa:** Administrador.

## Telas no canvas

- Configurações › Usuários e permissões, com as abas Equipe e Portal do aluno.
- A tela Primeiro acesso (criar senha) fica no arquivo “Site e acesso”.

## Dados

- Convite: e-mail, perfil, data de envio, situação.
- Conta do portal: tipo (Aluno ou Responsável), aluno ou alunos vinculados, último acesso, status.

## Passo a passo

1. Listar a equipe com perfil, último acesso e status.
2. Implementar “Convidar usuário”, que envia um e-mail com o link para criar a senha.
3. Implementar o reenvio do convite e a situação “Convite enviado”.
4. Montar o quadro “Perfis de acesso”, que mostra o que cada perfil alcança em cada área.
5. Montar a aba “Portal do aluno” com a lista de contas. Ela pode ficar com dados de teste até a Fase 7.
6. Implementar “Enviar acesso ao portal” e “Reenviar convites”. O portal em si é tratado no arquivo do Portal.

## Requisitos funcionais

| Código | Requisito |
| --- | --- |
| **RF-USU-01** | A aba Equipe lista os usuários da gestão com nome, e-mail, perfil, último acesso e status. |
| **RF-USU-02** | O administrador convida um usuário informando e-mail e perfil. O convidado cria a própria senha. |
| **RF-USU-03** | O administrador reenvia um convite que ainda não foi aceito. |
| **RF-USU-04** | A tela mostra o quadro de perfis: Administrador com acesso total; Professor com acesso às suas turmas e sem Financeiro, Configurações e importação ou exportação de dados. |
| **RF-USU-05** | A aba Portal do aluno lista as contas de alunos e responsáveis, com o aluno vinculado, o último acesso e o status. |
| **RF-USU-06** | A aba Portal mostra quantos alunos ativos já têm acesso e quantos convites aguardam o primeiro acesso. |
| **RF-USU-07** | O administrador envia ou reenvia o acesso ao portal, para uma conta ou para todos os convites pendentes. |

## Regras de negócio

| Código | Regra |
| --- | --- |
| **RN-USU-01** | Só existem dois perfis na gestão: Administrador e Professor. |
| **RN-USU-02** | O botão “Editar perfis” está no desenho, mas ainda não foi decidido se os perfis poderão ser alterados. **[A DEFINIR]** |
| **RN-USU-03** | O professor enxerga apenas alunos, turmas, aulas e comunicados das turmas em que dá aula. |
| **RN-USU-04** | A academia precisa ter sempre pelo menos um administrador ativo. _[sugestão]_ |
| **RN-USU-05** | O convite deve ter prazo de validade. **[A DEFINIR: quantos dias]** |
| **RN-USU-06** | Uma conta de responsável pode estar ligada a mais de um aluno. |

## Casos de uso

### UC-USU-01 · Convidar um usuário da equipe

**Quem:** Administrador. **Antes:** Sessão de administrador.

**Fluxo principal**

1. Abre Configurações › Usuários e permissões, na aba Equipe.
2. Clica em “Convidar usuário”.
3. Informa o e-mail e escolhe o perfil.
4. O sistema cria o usuário com status “Convite enviado” e envia o e-mail.
5. O convidado abre o link e cria a senha.
6. O status passa a “Ativo”.

**Variações**

- E-mail já cadastrado: o sistema avisa e não cria outro usuário.
- Convite não aceito: fica como “Convite enviado” e pode ser reenviado.

**Resultado**

Novo usuário com acesso de acordo com o perfil.

## Pronto quando

- Um convite de teste chega por e-mail e permite criar a senha.
- O quadro de perfis corresponde ao que o servidor realmente libera.
