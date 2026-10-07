import { beforeEach, describe, expect, it } from 'vitest'
import { db } from '../db.ts'
import { areaOf } from '../../shared/lib/session.ts'

beforeEach(() => db.reset())

const enter = (body: object) =>
  fetch('http://localhost/sessao/simulada', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
const current = () => fetch('http://localhost/sessao')

describe('POST /sessao/simulada', () => {
  it.each([
    ['c-admin', 'administrador', 'gestao'],
    ['c-prof', 'professor', 'gestao'],
    ['c-aluno', 'aluno', 'portal'],
    ['c-resp', 'responsavel', 'portal'],
  ] as const)('CA8: %s enters as %s', async (accountId, profile, area) => {
    expect((await enter({ accountId })).status).toBe(204)
    expect(await (await current()).json()).toEqual({ profile, accountId })
    expect(areaOf(profile)).toBe(area)
  })

  it.each(['c-inativa', 'c-convite', 'nao-existe'])(
    'CA9: %s is refused',
    async (accountId) => {
      expect((await enter({ accountId })).status).toBe(401)
      expect((await current()).status).toBe(401)
    },
  )

  it('CA10: profile form still works', async () => {
    expect((await enter({ profile: 'aluno' })).status).toBe(204)
    expect(await (await current()).json()).toEqual({ profile: 'aluno' })
  })
})
