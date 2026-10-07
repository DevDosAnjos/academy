import { http, HttpResponse } from 'msw'
import { db } from '../db.ts'
import { scenario } from '../scenario.ts'
import type { Profile } from '../../shared/lib/session.ts'

// "*/" prefix: works with relative URLs in the browser and absolute in Node.
export const sessao = [
  http.get('*/sessao', async ({ request }) => {
    const early = await scenario(request)
    if (early) return early
    if (!db.profile)
      return HttpResponse.json(
        { code: 'unauthorized', message: 'Sem sessão.' },
        { status: 401 },
      )
    return HttpResponse.json({ profile: db.profile })
  }),
  // Mock only: picks the profile of the simulated session.
  http.post('*/sessao/simulada', async ({ request }) => {
    const body = (await request.json()) as { profile?: Profile }
    db.profile = body.profile ?? null
    return new HttpResponse(null, { status: 204 })
  }),
]
