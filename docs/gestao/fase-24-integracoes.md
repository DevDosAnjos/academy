# Fase 24 · Configurações › Integrações

> Guia: Gestão · Etapa F · Dados e fechamento · código `INT` · [índice do guia](README.md)

- **Objetivo:** Mostrar e configurar as ligações com serviços de fora.
- **Depende de:** Fases 10 e 14. A integração de pagamento é feita junto com o portal.
- **Quem usa:** Administrador.

## Telas no canvas

- Configurações › Integrações.

## Dados

- Integração: tipo (pagamentos, WhatsApp ou e-mail), situação e configuração.

## Passo a passo

1. Montar a tela com os três cartões.
2. Implementar a configuração do e-mail (remetente).
3. Mostrar a situação do WhatsApp a partir dos grupos vinculados.
4. Mostrar o cartão de pagamentos online como “não configurado”.
5. Quando o provedor for escolhido: credenciais, teste e recebimento das confirmações de pagamento.

## Requisitos funcionais

| Código | Requisito |
| --- | --- |
| **RF-INT-01** | Mostrar três integrações, Pagamentos online, WhatsApp e E-mail, cada uma com a situação. |
| **RF-INT-02** | E-mail: informar o remetente dos avisos e dos lembretes. |
| **RF-INT-03** | WhatsApp: mostrar quantas turmas têm grupo vinculado, com atalho para Grupos. |
| **RF-INT-04** | Pagamentos online: mostrar que não está configurado e, depois da decisão, permitir escolher e configurar o provedor. |
| **RF-INT-05** | Com o pagamento online ativo: botão “Pagar” no portal, status da mensalidade atualizado sozinho e comprovante no histórico. |

## Regras de negócio

| Código | Regra |
| --- | --- |
| **RN-INT-01** | O provedor de pagamento ainda não foi escolhido. **[A DEFINIR]** |
| **RN-INT-02** | O código de pagamento fica isolado atrás de uma interface, para o provedor poder ser trocado sem mexer em Mensalidades. |
| **RN-INT-03** | Sem integração de envio no WhatsApp, o envio é manual: o sistema abre a conversa com a mensagem pronta. |
| **RN-INT-04** | As credenciais das integrações ficam protegidas e não aparecem na tela depois de salvas. _[sugestão]_ |

## Casos de uso

### UC-INT-01 · Definir o remetente dos e-mails

**Quem:** Administrador. **Antes:** Serviço de e-mail funcionando.

**Fluxo principal**

1. Abre Configurações › Integrações.
2. Abre o cartão de E-mail.
3. Informa o remetente e salva.

**Resultado**

Avisos e lembretes passam a sair com o novo remetente.

## Pronto quando

- A tela mostra a situação real de cada integração.
- Trocar o provedor de pagamento não exige mudar a tela de Mensalidades.
