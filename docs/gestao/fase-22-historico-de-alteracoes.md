# Fase 22 · Configurações › Histórico de alterações

> Guia: Gestão · Etapa E · Acompanhamento · código `HIS` · [índice do guia](README.md)

- **Objetivo:** Permitir consultar quem fez o quê e quando.
- **Depende de:** Fase 1. O registro existe desde o começo. Esta fase entrega a tela.
- **Quem usa:** Administrador.

## Telas no canvas

- Configurações › Histórico de alterações.

## Dados

- Registro de auditoria, criado na Fase 1.

## Passo a passo

1. Conferir se todos os módulos estão gravando o registro de auditoria.
2. Montar a lista com os filtros por período, usuário e área.
3. Montar o painel com o valor antes e depois.
4. Implementar “Exportar”.
5. Implementar “Carregar mais antigos”.

## Requisitos funcionais

| Código | Requisito |
| --- | --- |
| **RF-HIS-01** | Listar os registros com quando, quem (nome e perfil), o que aconteceu e onde. |
| **RF-HIS-02** | Filtrar por período, por usuário e por área: Alunos, Financeiro, Agenda, Comunicação e Configurações. |
| **RF-HIS-03** | O painel mostra data e hora, autor, área, o que mudou com o valor antes e depois, e o atalho para a tela do registro. |
| **RF-HIS-04** | Em graduações, mostrar a faixa antes e depois. |
| **RF-HIS-05** | Registrar também ações vindas de fora da gestão: pedido pelo site e pagamento pelo portal. |
| **RF-HIS-06** | Exportar o histórico. |
| **RF-HIS-07** | Carregar registros mais antigos sob demanda. |

## Regras de negócio

| Código | Regra |
| --- | --- |
| **RN-HIS-01** | O histórico não pode ser editado nem apagado. |
| **RN-HIS-02** | Toda exportação de dados gera um registro, com o que saiu do sistema. |
| **RN-HIS-03** | Só o administrador consulta o histórico. |
| **RN-HIS-04** | Cada registro diz se a ação foi feita por um usuário da gestão, pelo portal ou pelo site. |

## Casos de uso

### UC-HIS-01 · Descobrir quem alterou uma cobrança

**Quem:** Administrador. **Antes:** Sessão de administrador.

**Fluxo principal**

1. Abre Configurações › Histórico de alterações.
2. Filtra a área “Financeiro”.
3. Seleciona o registro.
4. Lê o valor antes e depois e quem fez.

**Resultado**

A dúvida é resolvida sem consultar o banco de dados.

## Pronto quando

- Cada tipo de alteração das fases anteriores aparece no histórico.
- Não existe botão de editar ou excluir registro.
