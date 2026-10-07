import { expect, test } from '@playwright/test'
import { signInAs } from './helpers.ts'

test('visitor without a session is sent to login with ?voltar=', async ({
  page,
}) => {
  await page.goto('/gestao')
  await expect(page).toHaveURL(/\/entrar\?voltar=(\/gestao|%2Fgestao)$/)
})

for (const [profile, area] of [
  ['administrador', '/gestao'],
  ['professor', '/gestao'],
  ['aluno', '/portal'],
  ['responsavel', '/portal'],
] as const) {
  test(`${profile} opening /gestao lands in ${area}`, async ({ page }) => {
    await signInAs(page, profile)
    await page.goto('/gestao')
    await expect(page).toHaveURL(new RegExp(`${area}$`))
    await expect(page.getByRole('heading', { name: 'Início' })).toBeVisible()
  })
}

test('professor is blocked at /gestao/configuracoes', async ({ page }) => {
  await signInAs(page, 'professor')
  await page.goto('/gestao/configuracoes')
  await expect(
    page.getByRole('heading', { name: 'Esta área é da administração' }),
  ).toBeVisible()
})

test('administrador sees /gestao/configuracoes', async ({ page }) => {
  await signInAs(page, 'administrador')
  await page.goto('/gestao/configuracoes')
  await expect(
    page.getByRole('heading', { name: 'Configurações' }),
  ).toBeVisible()
})
