# Fase 02 · Configurações › Academia

> Guia: Gestão · Etapa A · Fundação · código `ACA` · [índice do guia](README.md)

> **Atualização de escopo (07/10/2026, issue #14):** o site público de cada academia saiu do escopo; no lugar dele entra a landing page da plataforma (#96). O que estava escrito aparece riscado, com a atualização logo depois quando há.

- ~~**Objetivo:** Guardar os dados da academia em um só lugar, de onde o portal, os comunicados e o site público leem.~~ _Atualização:_ **Objetivo:** Guardar os dados da academia em um só lugar, de onde o portal e os comunicados leem.
- **Depende de:** Fase 1.
- **Quem usa:** Administrador.

## Telas no canvas

- Configurações › Academia.

## Dados

- ~~Academia: nome, equipe ou filiação, WhatsApp, e-mail de contato, Instagram, endereço (CEP, rua, número, bairro, cidade, UF), logo, cor de destaque e opções do site (publicado, mostrar horários, mostrar equipe).~~ _Atualização:_ Academia: nome, equipe ou filiação, WhatsApp, e-mail de contato, Instagram, endereço (CEP, rua, número, bairro, cidade, UF), logo e cor de destaque.

## Passo a passo

1. Criar o registro único da academia e a API de leitura e gravação.
2. ~~Montar o formulário em quatro blocos: Dados gerais, Endereço, Identidade visual e Site público.~~ _Atualização:_ Montar o formulário em três blocos: Dados gerais, Endereço e Identidade visual.
3. Implementar o envio do logo (PNG ou SVG) e a escolha da cor de destaque.
4. Implementar “Descartar” e “Salvar alterações”, com a linha “Última alteração em ... por ...”.
5. Ligar o registro de auditoria, com o valor antes e depois de cada campo alterado.

## Requisitos funcionais

| Código | Requisito |
| --- | --- |
| **RF-ACA-01** | O administrador edita nome, equipe ou filiação, WhatsApp, e-mail de contato e Instagram. |
| **RF-ACA-02** | O administrador edita o endereço completo. |
| **RF-ACA-03** | O administrador envia o logo e escolhe a cor de destaque ~~usada nos botões do portal e do site~~ _Atualização:_ usada nos botões do portal. |
| **RF-ACA-04** | ~~O administrador decide se o site público está publicado, se mostra os horários das turmas e se mostra a equipe.~~ _Removido do escopo (#14)._ |
| **RF-ACA-05** | A tela mostra quando e por quem os dados foram alterados pela última vez. |
| **RF-ACA-06** | “Descartar” volta os campos ao último valor salvo. |

## Regras de negócio

| Código | Regra |
| --- | --- |
| **RN-ACA-01** | Existe uma única academia no sistema. Não há cadastro de várias unidades. |
| **RN-ACA-02** | O nome da academia é obrigatório. |
| **RN-ACA-03** | ~~Os horários mostrados no site vêm da agenda e a equipe vem do cadastro de professores. Nada é digitado duas vezes.~~ _Removido do escopo (#14)._ |
| **RN-ACA-04** | Cada alteração fica no histórico com o valor anterior e o novo. |

## Casos de uso

### UC-ACA-01 · Atualizar os dados da academia

**Quem:** Administrador. **Antes:** Sessão de administrador.

**Fluxo principal**

1. Abre Configurações › Academia.
2. Altera um ou mais campos.
3. Clica em “Salvar alterações”.
4. O sistema valida, grava, registra no histórico e atualiza a linha de última alteração.

**Variações**

- Campo obrigatório vazio: o sistema aponta o campo e não grava.
- O administrador clica em “Descartar”: os campos voltam ao valor salvo.

**Resultado**

~~Portal, comunicados e site passam a usar os dados novos.~~ _Atualização:_ Portal e comunicados passam a usar os dados novos.

## Pronto quando

- Trocar o e-mail de contato aparece no histórico com o valor antes e depois.
- Um professor não consegue abrir a tela.
