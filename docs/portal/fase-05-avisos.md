# Fase 05 · Avisos

> Guia: Portal do aluno · Etapa B · Consulta · código `AVI` · [índice do guia](README.md)

- **Objetivo:** Reunir os comunicados da academia que dizem respeito ao aluno e mostrar por onde ele os recebe.
- **Depende de:** Fases 1 e 2. Gestão, Fases 9 (grupos) e 10 (comunicados).
- **Quem usa:** Aluno e Responsável.

## Telas no canvas

- Portal › Avisos, aberta pelo sino da barra.
- No celular: Portal › Avisos.

## Dados

- Leitura do aviso: para cada conta, se o aviso foi lido ou não.
- Preferências de e-mail, as mesmas de “Minhas informações”.

## Passo a passo

1. Buscar os comunicados enviados às turmas do aluno e os enviados a todas as turmas.
2. Guardar, por conta, quais avisos foram lidos.
3. Montar o contador de não lidos no sino.
4. Montar a lista com os filtros.
5. Montar o bloco “Como você recebe avisos”.
6. Ligar o atalho “Ver aviso” da agenda e o bloco “Avisos recentes” do Início.

## Requisitos funcionais

| Código | Requisito |
| --- | --- |
| **RF-AVI-01** | Listar os avisos com tipo, turma de destino, data, título, texto, por quais outros canais foi enviado e quem enviou. |
| **RF-AVI-02** | Destacar os avisos não lidos e mostrar a contagem no sino da barra. |
| **RF-AVI-03** | Filtrar por Todos, Não lidos, Minha turma, Outros horários e Gerais, cada filtro com a contagem. |
| **RF-AVI-04** | Marcar todos como lidos. |
| **RF-AVI-05** | Mostrar como o aluno recebe avisos: pelo portal (sempre ativo), por e-mail (ativado ou não, com o endereço e o atalho para alterar) e pelo WhatsApp (o grupo da turma). |
| **RF-AVI-06** | Abrir um aviso a partir do atalho da agenda ou do Início. |

## Regras de negócio

| Código | Regra |
| --- | --- |
| **RN-AVI-01** | O aluno recebe os comunicados da turma principal, dos outros horários em que treina e os enviados a todas as turmas. |
| **RN-AVI-02** | O portal recebe sempre. O e-mail depende da preferência da conta. O WhatsApp é o grupo da turma, que fica fora do sistema. |
| **RN-AVI-03** | O aluno não responde nem envia avisos pelo portal. Não há chat. |
| **RN-AVI-04** | O aluno não apaga avisos. O aviso só passa de não lido para lido. |
| **RN-AVI-05** | O aviso passa a lido quando o aluno clica nele ou usa “Marcar todos como lidos”. _[sugestão]_ |
| **RN-AVI-06** | Para o aluno menor, quem lê e marca como lido é o responsável. |

## Casos de uso

### UC-AVI-01 · Ler os avisos não lidos

**Quem:** Aluno ou Responsável. **Antes:** Existe aviso não lido.

**Fluxo principal**

1. Vê o número no sino da barra.
2. Clica no sino.
3. Filtra por “Não lidos”.
4. Lê o aviso.
5. O sistema marca o aviso como lido e atualiza o contador.

**Variações**

- Nenhum aviso: a tela informa que os comunicados aparecem ali e no e-mail.

**Resultado**

Contador do sino zerado.

## Pronto quando

- Um comunicado enviado na gestão para a turma do aluno aparece na lista e no sino.
- Um comunicado de outra turma não aparece.
- O contador diminui ao ler.
