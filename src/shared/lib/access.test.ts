import { expect, test } from 'vitest'
import { decideAccess, safeReturnPath, type Requirement } from './access'
import type { Profile } from './session'

const profiles: Profile[] = [
  'administrador',
  'professor',
  'aluno',
  'responsavel',
]
const requirements: Requirement[] = ['gestao', 'admin', 'portal']

test('decideAccess for every profile and requirement', () => {
  const expected = {
    administrador: ['allow', 'allow', 'redirect'],
    professor: ['allow', 'forbidden', 'redirect'],
    aluno: ['redirect', 'redirect', 'allow'],
    responsavel: ['redirect', 'redirect', 'allow'],
  }
  for (const p of profiles)
    requirements.forEach((r, i) =>
      expect(decideAccess(p, r).type, `${p} ${r}`).toBe(expected[p][i]),
    )
  for (const r of requirements)
    expect(decideAccess(null, r)).toEqual({ type: 'login' })
  expect(decideAccess('aluno', 'gestao')).toEqual({
    type: 'redirect',
    to: '/portal',
  })
  expect(decideAccess('professor', 'portal')).toEqual({
    type: 'redirect',
    to: '/gestao',
  })
})

test('safeReturnPath only accepts internal paths', () => {
  expect(safeReturnPath('/gestao')).toBe('/gestao')
  for (const bad of ['//evil.com', '/\\evil', 'https://x', '', null, undefined])
    expect(safeReturnPath(bad)).toBeNull()
})
