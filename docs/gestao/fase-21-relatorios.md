# Fase 21 · Relatórios

> Guia: Gestão · Etapa E · Acompanhamento · código `REL` · [índice do guia](README.md)

- **Objetivo:** Mostrar o andamento da academia ao longo dos meses.
- **Depende de:** Fases 7 e 14. Para ter meses antigos, também a Fase 23.
- **Quem usa:** Administrador.

## Telas no canvas

- Relatórios.
- Exportar é feito na Fase 23.

## Dados

- Nenhum dado próprio. São séries mensais calculadas.

## Passo a passo

1. Calcular no servidor as séries mensais: recebido e previsto, alunos ativos com entradas e saídas, e mensalidades em atraso no fim do mês.
2. Montar o filtro de período.
3. Montar os três gráficos.
4. Montar a visão em tabela.
5. Implementar a leitura dos números do mês ao apontar ou focar.

## Requisitos funcionais

| Código | Requisito |
| --- | --- |
| **RF-REL-01** | Mostrar três relatórios: quanto entrou por mês comparado ao previsto, quantos alunos ativos no fim de cada mês e quantas mensalidades ficaram em atraso. |
| **RF-REL-02** | Escolher o período: 3 meses, 6 meses, 12 meses, este ano ou personalizado, com mês inicial e mês final. |
| **RF-REL-03** | Alternar todos os relatórios entre gráfico e tabela. |
| **RF-REL-04** | Ao apontar um mês, mostrar os números daquele mês por extenso. |
| **RF-REL-05** | Marcar o mês em andamento, para não ser lido como mês fechado. |
| **RF-REL-06** | Informar desde quando há dados e oferecer o caminho para importar meses anteriores. |

## Regras de negócio

| Código | Regra |
| --- | --- |
| **RN-REL-01** | Os relatórios são mensais e só de leitura. |
| **RN-REL-02** | “Em atraso” conta as mensalidades não pagas no fim de cada mês. |
| **RN-REL-03** | “Alunos ativos” conta os ativos no último dia do mês. A tabela mostra também quantos entraram e quantos saíram. |
| **RN-REL-04** | Os relatórios mostram só números somados, sem nenhum dado pessoal. |
| **RN-REL-05** | Só o administrador acessa. |
| **RN-REL-06** | Os gráficos precisam ser legíveis sem depender de cor, e a mesma informação precisa existir em tabela. |

## Casos de uso

### UC-REL-01 · Comparar os últimos três meses

**Quem:** Administrador. **Antes:** Pelo menos três meses de dados.

**Fluxo principal**

1. Abre Relatórios.
2. Escolhe “3 meses”.
3. Lê os gráficos.
4. Troca para “Tabela” para ver os valores exatos.

**Variações**

- Período personalizado com o mês inicial depois do final: o sistema inverte os dois.

**Resultado**

O administrador vê a evolução do período escolhido.

## Pronto quando

- Os números de um mês batem com Mensalidades e Alunos.
- Todos os períodos funcionam, inclusive o personalizado.
