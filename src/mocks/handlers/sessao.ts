import { http, HttpResponse } from 'msw'
import { db } from '../db.ts'
import { scenario } from '../scenario.ts'
import type { Profile } from '../../shared/lib/session.ts'

const unauthorized = () =>
  HttpResponse.json(
    { code: 'unauthorized', message: 'Sem sessão.' },
    { status: 401 },
  )

// "*/" prefix: works with relative URLs in the browser and absolute in Node.
export const sessao = [
  http.get('*/sessao', async ({ request }) => {
    const early = await scenario(request)
    if (early) return early
    if (!db.profile) return unauthorized()
    return HttpResponse.json({
      profile: db.profile,
      ...(db.accountId && { accountId: db.accountId }),
    })
  }),
  // Mock only: picks the simulated session, by profile (#6) or account (#9).
  http.post('*/sessao/simulada', async ({ request }) => {
    const body = (await request.json()) as {
      profile?: Profile
      accountId?: string
    }
    if (body.accountId !== undefined) {
      const account = db.data.accounts.find((a) => a.id === body.accountId)
      if (!account || account.status !== 'ativa') {
        db.profile = null
        db.accountId = null
        return unauthorized()
      }
      db.profile = account.profile
      db.accountId = account.id
    } else {
      db.profile = body.profile ?? null
      db.accountId = null
    }
    return new HttpResponse(null, { status: 204 })
  }),
]
