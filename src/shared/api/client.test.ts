import { http, HttpResponse } from 'msw'
import { expect, test } from 'vitest'
import { server } from '@/mocks/node'
import { createApiClient } from './client'
import { ApiError, type ApiErrorKind } from './errors'

const api = createApiClient({ baseUrl: 'http://api.test' })

const kindOf = async (path: string) => {
  const e = await api.get(path).catch((x: unknown) => x)
  expect(e).toBeInstanceOf(ApiError)
  return e as ApiError
}

test.each<[number, ApiErrorKind]>([
  [401, 'unauthorized'],
  [403, 'forbidden'],
  [404, 'not-found'],
  [422, 'invalid'],
  [500, 'server'],
])('status %i becomes ApiError %s', async (status, kind) => {
  server.use(
    http.get('http://api.test/x', () =>
      HttpResponse.json({ code: 'c', message: 'm' }, { status }),
    ),
  )
  const e = await kindOf('/x')
  expect(e.kind).toBe(kind)
  expect(e.status).toBe(status)
})

test('422 keeps the field errors', async () => {
  server.use(
    http.get('http://api.test/x', () =>
      HttpResponse.json(
        { code: 'invalid', message: 'Dados inválidos.', fields: { a: 'ruim' } },
        { status: 422 },
      ),
    ),
  )
  expect((await kindOf('/x')).fields).toEqual({ a: 'ruim' })
})

test('network failure becomes ApiError network', async () => {
  server.use(http.get('http://api.test/x', () => HttpResponse.error()))
  expect((await kindOf('/x')).kind).toBe('network')
})

test('success returns the JSON body', async () => {
  server.use(http.get('http://api.test/x', () => HttpResponse.json({ ok: 1 })))
  expect(await api.get('/x')).toEqual({ ok: 1 })
})
