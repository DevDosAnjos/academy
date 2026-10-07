import { AxeBuilder } from '@axe-core/playwright'
import { expect, type Page } from '@playwright/test'

export type Profile = 'administrador' | 'professor' | 'aluno' | 'responsavel'

// Simulated session (item #4): same sessionStorage key as src/shared/lib/session.ts.
export async function signInAs(page: Page, profile: Profile) {
  await page.addInitScript((p) => {
    sessionStorage.setItem('academy.simulated-session', p)
  }, profile)
}

export async function expectNoViolations(page: Page) {
  const { violations } = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze()
  expect(
    violations.map(
      (v) => `${v.id}: ${v.nodes.map((n) => n.target).join(' | ')}`,
    ),
  ).toEqual([])
}
