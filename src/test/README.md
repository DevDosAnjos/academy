# Testes

- Unidade e componente: `pnpm test` (Vitest, jsdom, Testing Library). Arquivo `*.test.ts(x)` ao lado do código. `src/test/setup.ts` liga o jest-dom, o `vitest-axe` e o servidor MSW de `src/mocks/node.ts` (requisição sem handler falha o teste; use `server.use(...)` no teste para respostas próprias).
- Acessibilidade em componente: `expect(await axe(container, { runOnly: ['wcag2a', 'wcag2aa'] })).toHaveNoViolations()`.
- Ponta a ponta: `pnpm test:e2e` (Playwright, sobe `pnpm dev` com mocks sozinho). Arquivos em `e2e/*.spec.ts`. Primeira vez: `pnpm exec playwright install`. Um projeto só: `pnpm test:e2e --project=chromium`.
- Sessão simulada no e2e: `signInAs(page, 'professor')` de `e2e/helpers.ts`; axe nas páginas: `expectNoViolations(page)`.
- Rotas lazy e navegação ficam no Playwright; em jsdom, teste o componente fora do roteador completo (`MemoryRouter`).
- Regra de negócio é do servidor: o front só testa o que a tela faz com ela.
