import { test } from '@playwright/test'
import { expectNoViolations, signInAs } from './helpers.ts'

const pages: [string, string, 'administrador' | 'aluno' | null][] = [
  ['/', 'home', null],
  ['/entrar', 'login', null],
  ['/gestao', 'gestão', 'administrador'],
  ['/portal', 'portal', 'aluno'],
  ['/dev/api-exemplo-formulario', 'formulário de exemplo', null],
]

for (const [path, name, profile] of pages) {
  test(`${name} has no WCAG A/AA violations`, async ({ page }) => {
    if (profile) await signInAs(page, profile)
    await page.goto(path)
    await page.waitForLoadState('networkidle')
    await expectNoViolations(page)
  })
}
