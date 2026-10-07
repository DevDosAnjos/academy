# 3 — [Preparação] Base visual do canvas em código: tokens e tema

Origem: issue #3 (DevDosAnjos/academy), Sprint 00. Branch: `item/3-base-visual-tokens-tema`.

## 1. Objetivo

Transformar a base visual do canvas em código: cores, fontes, raios e componentes base do shadcn ajustados ao desenho, mais o componente Faixa e a cor de destaque trocável com o app rodando. É a base visual que o item #16 e todas as telas seguintes usam.

Fora do escopo: ler a cor de destaque de Configurações › Academia (item #20; aqui só existe a função que aplica a cor), tema escuro (o desenho não tem), a lista configurável de faixas (itens #37 e #42; aqui o Faixa recebe cor e graus por propriedade), menu lateral e padrões de tela (item #16), rotas (#4).

## 2. Requisitos

- R1: o tema define como variáveis do shadcn as cores do canvas (texto `#1b1b1f` e `#6b675f`, bordas `#e3dfd6` e `#d9d4c9`, fundos `#ffffff`, `#f4f2ed`, `#f7f5f0` e `#faf8f4`, destaque `#b23c24` e `#c8462c`, sucesso `#1d5e34` sobre `#e2efe5`) e os raios 8, 10, 12 e 14 px e pílula (D1, D2).
- R2: títulos usam Barlow Condensed (500, 600, 700) e o texto usa IBM Plex Sans (400, 500, 600), ambas hospedadas no próprio projeto, sem pedido a servidor externo de fontes (D3).
- R3: a cor de destaque pode ser trocada com o app rodando, por uma função que recebe uma cor e atualiza o tema sem recarregar a página; cor inválida é ignorada (D4).
- R4: os componentes base do shadcn (botão, campo, seleção, janela, painel lateral, tabela, abas, etiqueta e dica) existem em `src/shared/components/ui` com o visual do canvas (D5).
- R5: existe o componente Faixa, que mostra a cor da faixa e de 0 a 4 graus, e aceita as faixas Branca, Azul, Roxa, Marrom, Preta, Cinza, Amarela, Laranja e Verde (D6).
- R6: os pares de cor de texto e fundo usados são conferidos contra o contraste AA (4,5:1 para texto normal); as cores do canvas não são alteradas: o par que não atinge é registrado e levado ao dono (D7).
- R7: as larguras de referência estão registradas no código como constantes: gestão a partir de 1280 px, portal e site em 1440 px e 390 px (D8).
- R8: uma página de exemplo montada só com os componentes base representa o artboard "Configurações › Academia" (D9).
- R9: build, lint, typecheck e format:check continuam passando.
- R10: o pacote `cn` do `package.json` (resíduo do item #2) deixa de ser dependência; o utilitário `cn` passa a vir de `clsx` e `tailwind-merge`, o padrão do shadcn (D10).

## 3. Critérios de aceite

- CA1 (R1): dado `src/index.css`, quando se leem as variáveis do tema, então cada cor e raio da tabela de R1 aparece como variável, e `background`, `foreground`, `border`, `primary` e `muted-foreground` resolvem para valores do canvas.
- CA2 (R2): dado o app em `pnpm dev`, quando se abre a página de exemplo, então o título é renderizado em Barlow Condensed e o texto em IBM Plex Sans, e nenhum pedido de rede vai a `fonts.googleapis.com` nem `fonts.gstatic.com`.
- CA3 (R2): dado `pnpm build`, quando se lista `dist/`, então os arquivos das fontes estão no pacote gerado.
- CA4 (R3): dado o app rodando, quando se chama `applyAccentColor('#1d4ed8')`, então `--primary` muda e o botão principal exibe a nova cor sem recarregar a página.
- CA5 (R3): dado o app rodando, quando se chama `applyAccentColor('azul')` (valor que não é cor hexadecimal), então o tema não muda.
- CA6 (R4): dado a página de exemplo, quando se abre, então botão, campo, seleção, janela, painel lateral, tabela, abas, etiqueta e dica aparecem com raios, bordas e cores do canvas, e cada um funciona só com teclado (foco visível, Esc fecha janela e painel).
- CA7 (R5): dado `<Faixa belt="roxa" degrees={2} />`, quando se renderiza, então aparece a faixa roxa com 2 graus marcados; com `degrees={5}` ou `-1`, então o valor é limitado a 0..4.
- CA8 (R5): dado o Faixa, quando se lê o DOM, então há um texto acessível com a faixa e o grau (por exemplo, "Faixa roxa, 2 graus").
- CA9 (R6): dado cada par de cor de texto e fundo listado na seção "Contraste" do plano, quando se calcula a razão de contraste, então todas as razões são calculadas e registradas em D7, nenhuma cor do canvas é alterada, e cada par abaixo de 4,5:1 fica listado para decisão do dono.
- CA10 (R7): dado `src/shared/lib/breakpoints.ts`, quando se lê, então `GESTAO_MIN_WIDTH` é 1280, `PORTAL_DESKTOP_WIDTH` e `SITE_DESKTOP_WIDTH` são 1440 e `PORTAL_MOBILE_WIDTH` e `SITE_MOBILE_WIDTH` são 390.
- CA11 (R8): dado a página de exemplo em 1280 px, quando comparada com o PNG `docs/gestao/telas/Configurações › Academia.png`, então cores, fontes, raios e componentes correspondem; diferenças de conteúdo (campos e textos de exemplo) são aceitas.
- CA12 (R9): dado o projeto, quando se rodam `pnpm build`, `pnpm lint`, `pnpm typecheck` e `pnpm format:check`, então todos terminam com código 0.
- CA13 (R10): dado o projeto, quando se lê `package.json` e se busca `from 'cn'` e `from "cn"` em `src`, então `cn` não está nas dependências, nenhum arquivo o importa, `cn()` em `src/shared/lib/utils.ts` usa `clsx` e `twMerge`, e `pnpm build` passa.

## 4. Plano técnico

- Dados e API: não mudam.
- Interface: tokens no `src/index.css` (variáveis do shadcn em `:root`, `@theme inline` para fontes e raios); bloco `.dark` e `@custom-variant dark` removidos (D1). Fontes por pacotes `@fontsource` (`barlow-condensed`, `ibm-plex-sans`), importando só os pesos usados; o `@fontsource-variable/geist` do init é removido. Componentes base adicionados com `pnpm dlx shadcn@latest add input select dialog sheet table tabs badge tooltip` (o `button` já existe) e ajustados nos tokens, sem reescrever a lógica Radix. Faixa em `src/shared/components/faixa.tsx` (a criar), com mapa belt → cor (RN-GRA-07, provisório até #42). Cor de destaque: `src/shared/lib/theme.ts` (a criar) com `applyAccentColor(hex)`, que valida `#rrggbb`, grava `--primary` e `--ring` e escolhe `--primary-foreground` (branco ou texto principal) pelo maior contraste. Estados de carregando, vazio e erro não se aplicam (sem dados).
- Segurança: não se aplica. A cor entra em `style.setProperty` só depois de validada como `#rrggbb`.
- Contraste (R6, D7): pares a conferir: `#1b1b1f` sobre `#ffffff`, `#f4f2ed`, `#f7f5f0`, `#faf8f4`; `#6b675f` sobre os mesmos quatro (risco apontado na issue); `#ffffff` sobre `#b23c24` e sobre `#c8462c`; `#b23c24` e `#c8462c` sobre `#ffffff` e `#faf8f4` (texto de destaque); `#1d5e34` sobre `#e2efe5`. Os que ficarem abaixo de 4,5:1 não são alterados: entram em D7 e na pendência ao dono.
- Pacote `cn` (R10, D10): o `package.json` tem `"cn": "^0.4.0"`, resíduo do item #2. Conferido no código: é importado por `src/shared/lib/utils.ts` (`export { cn } from 'cn'`) e por `src/shared/components/ui/button.tsx` (`import { cn } from "cn"`). Como há importadores, `utils.ts` passa a definir `cn` com `clsx` e `twMerge` (padrão do shadcn), o `button.tsx` passa a importar de `@/shared/lib/utils`, e o pacote `cn` é removido. `clsx` e `tailwind-merge` não estão no `package.json`: a instalar. Os componentes gerados em T5 já importam de `@/shared/lib/utils`; conferir.
- Arquivos a alterar (vistos): `src/index.css`, `src/App.tsx`, `src/shared/components/ui/button.tsx`, `src/shared/lib/utils.ts`, `package.json`, `pnpm-lock.yaml`, `eslint.config.js` e `.prettierignore` só se o lint acusar código gerado novo, `AGENTS.md` (linha de base e, se couber, uma linha sobre tokens).
- Arquivos a criar: `src/shared/components/ui/{input,select,dialog,sheet,table,tabs,badge,tooltip}.tsx` (gerados), `src/shared/components/faixa.tsx`, `src/shared/lib/theme.ts`, `src/shared/lib/breakpoints.ts`, `src/shared/lib/contrast.ts` (razão de contraste, usada por `theme.ts` e pela prova de CA9).
- Reuso: `cn` de `src/shared/lib/utils.ts` (reescrito em T9); `Button` existente; aliases do `components.json` (`@/shared/...`).
- Riscos: (a) o `shadcn add` pode gravar em `src/components` em vez de `src/shared`, como no item #2; conferir e mover. (b) o estilo `radix-nova` traz raios e tamanhos próprios; o ajuste é nos tokens primeiro e no componente só quando o token não basta. (c) o artboard é imagem: medidas lidas dele são aproximação, vale o token. (d) sem testes automatizados até o #8: a prova de contraste e do Faixa é por script `node` temporário, não entra no repositório. (e) o canvas do Claude não foi conferido (`AGENTS.md`); valem a tabela da issue e os PNGs.

## 5. Tarefas

- [x] T1: trocar as variáveis do tema em `src/index.css` pelas cores e raios do canvas, remover o modo escuro e a fonte Geist — cobre CA1 — prova: ler as variáveis e `pnpm build`
- [x] T2: instalar `@fontsource/barlow-condensed` e `@fontsource/ibm-plex-sans` só com os pesos usados, ligar `--font-heading` e `--font-sans` — cobre CA2, CA3 — prova: `pnpm dev` sem pedido a servidor de fontes; `ls dist/assets` com as fontes após `pnpm build`
- [x] T3: criar `src/shared/lib/contrast.ts` e conferir os pares do plano; não alterar nenhuma cor do canvas; registrar em D7 as razões e os pares abaixo de 4,5:1, e abrir pendência ao dono (uma pergunta, com a opção recomendada) se houver algum — cobre CA9 — prova: script `node` temporário que calcula as razões e imprime todas
- [x] T4: criar `src/shared/lib/theme.ts` com `applyAccentColor` — cobre CA4, CA5 — prova: no navegador ou em script temporário com DOM simulado, chamar com `#1d4ed8` e com `azul`
- [x] T5: adicionar os componentes base faltantes do shadcn e ajustar os nove ao canvas — cobre CA6 — prova: `pnpm build`; abrir cada um na página de exemplo e usar só o teclado
- [x] T6: criar `src/shared/components/faixa.tsx` — cobre CA7, CA8 — prova: renderizar na página de exemplo com `degrees` 2, 5 e -1; ler o texto acessível no DOM
- [x] T7: criar `src/shared/lib/breakpoints.ts` — cobre CA10 — prova: `pnpm typecheck` e leitura do arquivo
- [x] T8: montar a página de exemplo em `src/App.tsx` só com componentes base e Faixa, no desenho do artboard "Configurações › Academia", e rodar build, lint, typecheck e format:check; atualizar a linha de base do `AGENTS.md` — cobre CA11, CA12 — prova: comparação com o PNG a 1280 px e os quatro comandos com código 0
- [x] T9: tratar o pacote `cn`: buscar importações de `cn` em `src`; como `utils.ts` e `button.tsx` importam, instalar `clsx` e `tailwind-merge`, reescrever `cn` em `src/shared/lib/utils.ts` (`twMerge(clsx(inputs))`), trocar o import do `button.tsx` para `@/shared/lib/utils`, remover `cn` do `package.json` com `pnpm remove cn`, repetir a busca (se nenhum arquivo importar mais, ótimo; se aparecer outro, trocar também) — cobre CA13 — prova: busca sem resultado para `from 'cn'` e `from "cn"`, e `pnpm build`. Fazer antes de T5, para os componentes novos já usarem o utilitário correto.

## 6. Decisões

- D1: sem tema escuro. O desenho não tem (issue) e os guias só pedem as larguras declaradas; o bloco `.dark` e o `@custom-variant dark` saem. Alternativa: manter o `.dark` gerado pelo shadcn, com cores sem desenho.
- D2: mapeamento das cores do canvas para as variáveis do shadcn: `background` `#ffffff`; `muted`, `secondary` e `accent` em `#f4f2ed`; `card` `#ffffff`; fundo de página e do menu `#faf8f4` e `#f7f5f0` (variáveis `--surface` e `--sidebar`); `foreground` `#1b1b1f`; `muted-foreground` `#6b675f` (ver D7); `border` `#e3dfd6` e `input` `#d9d4c9`; `primary` `#b23c24` e `#c8462c` para hover; sucesso `#1d5e34` sobre `#e2efe5` em `--success` e `--success-foreground`; `destructive` mantém o valor do shadcn, pois o canvas não tem um vermelho de erro distinto do destaque (suposição abaixo). Alternativa: um único fundo; descartada porque a issue lista quatro.
- D3: fontes por `@fontsource` (npm), que empacota os arquivos no build e atende "hospedadas no próprio projeto". Alternativa: baixar `.woff2` para `public/fonts`, mais manual e sem ganho.
- D4: a função de cor de destaque aceita só `#rrggbb` e escolhe o texto sobre ela (branco ou `#1b1b1f`) pelo contraste, pois a cor virá da academia e pode ser clara. A leitura da cor vinda da API é do item #20. Alternativa: aceitar qualquer formato CSS; descartada pela validação simples.
- D5: "painel lateral" é o `Sheet`, "janela" é o `Dialog`, "seleção" é o `Select`, "dica" é o `Tooltip` e "etiqueta" é o `Badge`. Alternativa para etiqueta: `Badge` com variantes de status (sucesso, aviso, neutro); vão só as variantes que o canvas mostra, e `--success` entra aqui.
- D6: o Faixa recebe `belt` e `degrees` por propriedade e guarda o mapa de cores provisório de RN-GRA-07 (marcada [A DEFINIR], issue de decisão #42/P12): Branca, Azul, Roxa, Marrom, Preta, Cinza, Amarela, Laranja, Verde, graus 0 a 4. A lista configurável e vinda da API é dos itens #37 e #42. Alternativa: esperar o #42; descartada porque o P12 manda usar a proposta.
- D7 (muda o comportamento; ajuste do dono, substitui a versão anterior de ajustar pelo cálculo): as cores do canvas não são alteradas. O cinza `#6b675f` sobre os fundos claros e o destaque `#c8462c` sobre branco podem ficar abaixo de 4,5:1 (a issue já alerta). T3 calcula, registra aqui as razões e, se algum par falhar, o tema continua com a cor do canvas e a falha vira pendência ao dono, com pergunta única. Alternativa: escurecer pelo cálculo; descartada por ordem do dono.
- D10: o pacote `cn` é resíduo do item #2 (ajuste do dono). Havia importadores, então `cn` passa a ser definido com `clsx` e `tailwind-merge` e o pacote sai, como manda o ajuste. Alternativa: manter o pacote; descartada.
- D8: larguras como constantes em `src/shared/lib/breakpoints.ts`, sem criar layouts. Motivo: a issue pede "larguras de referência" e a gestão não ganha layout de celular. Alternativa: só documentar no `AGENTS.md`.
- D9: a "tela de exemplo" da issue é `src/App.tsx` (substitui a do item #2, sem rota, como no D6 do #2) e representa o artboard "Configurações › Academia", por usar campos, botão, abas e etiqueta. Será trocada no item #4. Alternativa: rota `/exemplo`; descartada, rotas são do #4.
- Suposição: o `destructive` do shadcn serve para erro e exclusão enquanto o canvas não mostrar outro vermelho. Se o desenho tiver um, só o token muda.
- Suposição: a tabela de valores da issue é o levantamento correto do canvas (o canvas não foi conferido por este agente, `AGENTS.md`). Se houver divergência com o artboard, valem os PNGs e muda só `src/index.css`.
- Suposição: espaçamentos usam a escala padrão do Tailwind; a issue pede para conferir espaçamentos, mas não lista valores. Se o canvas usar uma escala própria, entra como variável de tema depois.

## Construção

- T9 — arquivos: `src/shared/lib/utils.ts`, `src/shared/components/ui/button.tsx`, `package.json`, `pnpm-lock.yaml` (add clsx, tailwind-merge; remove cn) — prova: `grep -rnE "from ['\"]cn['\"]" src` → sem resultado; `pnpm build` → 0
- T1 — arquivos: `src/index.css` — prova: variáveis do canvas, sem `.dark`/Geist; `pnpm build` → 0
- T2 — arquivos: `src/index.css`, `package.json` (fontsource barlow-condensed e ibm-plex-sans, latin 500/600/700 e 400/500/600; Geist removido) — prova: `pnpm build` → 6 `.woff2` em `dist/assets`. Pedido de rede no `pnpm dev`: não rodou (sem navegador nesta máquina); as fontes vêm do pacote, sem URL externa no CSS.
- T3 — arquivos: `src/shared/lib/contrast.ts` — prova: script `node` temporário → todos os 15 pares >= 4,5:1: `#1b1b1f` sobre os 4 fundos 15,35 a 17,17; `#6b675f` 5,63 / 5,03 / 5,17 / 5,31 (branco, `#f4f2ed`, `#f7f5f0`, `#faf8f4`); branco sobre `#b23c24` 5,89 e sobre `#c8462c` 4,81; `#b23c24` sobre branco 5,89 e `#faf8f4` 5,55; `#c8462c` sobre branco 4,81 e `#faf8f4` 4,53; `#1d5e34` sobre `#e2efe5` 6,55. Nenhum par abaixo: sem pendência ao dono. Nenhuma cor alterada.
- T4 — arquivos: `src/shared/lib/theme.ts` — prova: script temporário com DOM simulado: `azul` → nada muda; `#1d4ed8` → `--primary`, `--ring` e `--primary-foreground` `#ffffff`; `#ffff00` → texto `#1b1b1f`
- T6 — arquivos: `src/shared/components/faixa.tsx` — prova: SSR via Vite: degrees 2 → "Faixa roxa, 2 graus" (2 marcas); 5 → 4 graus; -1 → 0 graus
- T7 — arquivos: `src/shared/lib/breakpoints.ts` — prova: `pnpm typecheck` → 0
- T5 — arquivos: `src/shared/components/ui/{input,select,dialog,sheet,table,tabs,badge,tooltip}.tsx` gerados (imports `cn` trocados; badge com `rounded-pill` e variante `success`; botão com hover `primary-hover`; classes `dark:` removidas, pois sem `@custom-variant` seguiam o modo escuro do sistema; input, select e botão com `rounded-sm`, campos brancos, altura 40 px) — prova: `pnpm build` → 0; Edge headless via CDP com `pnpm dev`: Tab+Enter abre e Esc fecha janela, painel e seleção; dica aparece com foco de teclado
- T8 — arquivos: `src/App.tsx` (título em caixa alta como no artboard), `AGENTS.md` — prova: build, lint, typecheck, format:check → 0; captura do Edge headless a 1280 px comparada ao PNG: fontes, cores, raios, campos e botões correspondem (menu lateral e blocos extras do artboard são do #16, conteúdo aceito); 0 pedidos a fonts.googleapis.com/gstatic; h1 em Barlow Condensed e corpo em IBM Plex Sans
Regressão: build, lint, typecheck, format:check → 0, igual à linha de base. Sem testes (item #8).
Desvios: `shadcn add` não gravou em `src/components`; gerou imports de `"cn"`, trocados. Os 10 arquivos de configuração aparecem com fim de linha CRLF no Git (`core.autocrlf=true`) e `pnpm format` os normaliza para LF sem mudar o conteúdo.
Não é do item: nenhum.

### Correção da rodada 1
- `cn` ainda listado em dependências (CA13, R10) — arquivos: `package.json`, `pnpm-lock.yaml` — prova: `pnpm remove cn` → removido; `grep -n '"cn"' package.json` e `grep -rnE "from ['\"]cn['\"]" src` → sem resultado (resta só `cn 0.2.6` transitivo do shadcn no lock, não é dependência do projeto); `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm format:check` → 0
Regressão: os quatro comandos → 0, igual à linha de base. Sem testes (item #8). CA2, CA4, CA6 e CA11 seguem sem prova nesta sessão (sem navegador aqui); a Construção original cita Edge headless.

## Verificação

### Rodada 1 — CORRIGIR_CODIGO — 2026-10-06, estado c15c05d8a7f912401f081024c0dfafcaacd3eb62

| Critério | Status | Evidência |
|---|---|---|
| CA1 | PASSOU | `src/index.css`: `--background #ffffff`, `--foreground #1b1b1f`, `--border #e3dfd6`, `--input #d9d4c9`, `--primary #b23c24`, `--primary-hover #c8462c`, `--muted-foreground #6b675f`, `--surface`, `--sidebar`, `--success*`, raios 8/10/12/14/pílula |
| CA2 | NÃO CONFERIDO | sem navegador nesta verificação; CSS e `index.html` não têm URL de googleapis/gstatic; fontes vêm de `@fontsource` |
| CA3 | PASSOU | `ls dist/assets`: 6 `.woff2` (barlow-condensed 500/600/700, ibm-plex-sans 400/500/600) |
| CA4 | NÃO CONFERIDO | leitura de `theme.ts`: grava `--primary`, `--ring`, `--primary-foreground`; não rodado no navegador |
| CA5 | PASSOU | `theme.ts`: regex `#rrggbb` retorna antes de gravar (por leitura) |
| CA6 | NÃO CONFERIDO | sem navegador; componentes existem em `src/shared/components/ui`, sem `dark:` |
| CA7 | PASSOU | `faixa.tsx`: 9 faixas, `Math.min(4, Math.max(0, trunc))` (por leitura) |
| CA8 | PASSOU | `aria-label` "Faixa {label}, {n} grau(s)" |
| CA9 | PASSOU | recalculado: 5,03 / 4,53 / 4,81 / 6,55 nos pares críticos, todos >= 4,5; `contrast.ts` presente |
| CA10 | PASSOU | `breakpoints.ts` com 1280, 1440, 390 |
| CA11 | NÃO CONFERIDO | sem navegador para captura a 1280 px |
| CA12 | PASSOU | build, lint, typecheck, format:check → 0 |
| CA13 | NÃO PASSOU | `package.json` linha 24 ainda tem `"cn": "^0.4.0"`; `pnpm-lock.yaml` linha 26 também; busca `from 'cn'`/`from "cn"` em `src` sem resultado; `utils.ts` usa clsx e twMerge |

Comandos: `pnpm build` 0; `pnpm lint` 0; `pnpm typecheck` 0; `pnpm format:check` 0; `grep -rnE "from ['\"]cn['\"]" src` sem resultado; `ls dist/assets` com 6 woff2; script node de contraste.
Achados:
- obrigatório, código, `package.json` (dependências, `"cn": "^0.4.0"`) e `pnpm-lock.yaml` (importers, `cn:`) — esperado: `cn` fora das dependências (CA13, R10, D10; T9 marcada feita); observado: pacote ainda listado; evidência: `grep -n '"cn"' package.json` → linha 24; corrigir: `pnpm remove cn` e reconfirmar `pnpm build`.
- sugestão, código, `specs/itens/...` Construção T9 diz remoção feita, mas o pacote segue; revisar o registro após corrigir.
- Observação: CA2, CA4, CA6 e CA11 não puderam ser exercitados sem navegador; a Construção cita captura Edge headless, não reproduzida aqui. "Limitações aceitas" do `AGENTS.md` não as cobre; se persistirem após a correção, o resultado pode virar NAO_CONFERIDO.

### Rodada 2 — NAO_CONFERIDO — 2026-10-06, estado 3f35e94437169f086934c1f56728a1d5a305fc7a

| Critério | Status | Evidência |
|---|---|---|
| CA1 | PASSOU | mantido da rodada 1 (`src/index.css` não mudou) |
| CA2 | NÃO CONFERIDO | sem navegador; sem URL de googleapis/gstatic no CSS e no `index.html` |
| CA3 | PASSOU | `ls dist/assets`: 6 `.woff2` após novo `pnpm build` |
| CA4 | NÃO CONFERIDO | não rodado no navegador; `theme.ts` não mudou |
| CA5 | PASSOU | mantido da rodada 1 |
| CA6 | NÃO CONFERIDO | sem navegador |
| CA7 | PASSOU | mantido da rodada 1 |
| CA8 | PASSOU | mantido da rodada 1 |
| CA9 | PASSOU | mantido da rodada 1 |
| CA10 | PASSOU | mantido da rodada 1 |
| CA11 | NÃO CONFERIDO | sem navegador para captura a 1280 px |
| CA12 | PASSOU | build, lint, typecheck, format:check → 0 |
| CA13 | PASSOU | `grep -n '"cn"' package.json` sem resultado; `grep -rnE "from ['\"]cn['\"]" src` sem resultado; `clsx` e `tailwind-merge` em `package.json`; lock só tem `cn: 0.2.6` transitivo (dependência do shadcn); build 0 |

Comandos: `pnpm build` 0; `pnpm lint` 0; `pnpm typecheck` 0; `pnpm format:check` 0; buscas de `cn` sem resultado; `git diff c15c05d... 3f35e94...` só `package.json`, `pnpm-lock.yaml` e este arquivo.
Achados:
- Achado obrigatório da rodada 1 (`cn` em `package.json`): corrigido.
- Pendência de conferência: CA2, CA4, CA6 e CA11 exigem navegador; "Limitações aceitas" do `AGENTS.md` está vazia. A Construção cita Edge headless, mas sem log que a verificação possa reproduzir. Para fechar: rodar `pnpm dev` com navegador e conferir os quatro, ou registrar a limitação em "Limitações aceitas" (decisão do dono).

### Rodada 3 — OK — 2026-10-06, estado 32cd966cf6c3045369d0ef4519360aeec8b104eb

| Critério | Status | Evidência |
|---|---|---|
| CA1 | PASSOU | mantido da rodada 1 |
| CA2 | NÃO CONFERIDO (limitação aceita) | `AGENTS.md` "Limitações aceitas", item #3 |
| CA3 | PASSOU | `ls dist/assets`: 6 `.woff2` após novo `pnpm build` |
| CA4 | NÃO CONFERIDO (limitação aceita) | idem |
| CA5 | PASSOU | mantido da rodada 1 |
| CA6 | NÃO CONFERIDO (limitação aceita) | idem |
| CA7 | PASSOU | mantido da rodada 1 |
| CA8 | PASSOU | mantido da rodada 1 |
| CA9 | PASSOU | mantido da rodada 1 |
| CA10 | PASSOU | mantido da rodada 1 |
| CA11 | NÃO CONFERIDO (limitação aceita) | idem |
| CA12 | PASSOU | build, lint, typecheck, format:check → 0 |
| CA13 | PASSOU | mantido da rodada 2; `"cn"` ausente de `package.json`; busca `from 'cn'` em `src` sem resultado |

Comandos: `pnpm build` 0; `pnpm lint` 0; `pnpm typecheck` 0; `pnpm format:check` 0; buscas de `cn` sem resultado; `git diff 3f35e94... 32cd966...` só `AGENTS.md` (limitação aceita registrada) e este arquivo.
Achados: nenhum obrigatório. Pendência da rodada 2 resolvida pelo registro em "Limitações aceitas".

## Entrega

- O que muda: tokens do canvas em `src/index.css` (cores, raios, fontes Barlow Condensed e IBM Plex Sans pelo pacote, sem URL externa), cor de destaque configurável por `applyAccentColor` (`src/shared/lib/theme.ts`) com cálculo de contraste, componente `Faixa`, breakpoints, componentes shadcn (input, select, dialog, sheet, table, tabs, badge, tooltip) e `cn` por `clsx` e `tailwind-merge`. Arquivos de preparação entram neste commit, como o `AGENTS.md` prevê.
- Verificação: rodada 3 `OK`; build, lint, typecheck e format:check retornam 0. Não há testes (item #8).
- Limitações: CA2, CA4, CA6 e CA11 (fontes no navegador, troca da cor de destaque, teclado e comparação visual) foram conferidos só na construção, em Edge headless; limitação aceita pelo dono (`AGENTS.md`).
- Decisões: `destructive` serve para erro e exclusão; espaçamentos na escala padrão do Tailwind.
