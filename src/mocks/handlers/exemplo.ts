import { http, HttpResponse } from 'msw'
import { db } from '../db.ts'
import { scenario } from '../scenario.ts'

export const exemplo = [
  http.get('*/exemplo', async ({ request }) => {
    const early = await scenario(request, { list: true })
    if (early) return early
    if (!db.profile)
      return HttpResponse.json(
        { code: 'unauthorized', message: 'Sem sessão.' },
        { status: 401 },
      )
    if (db.profile === 'aluno' || db.profile === 'responsavel')
      return HttpResponse.json(
        { code: 'forbidden', message: 'Sem permissão.' },
        { status: 403 },
      )
    return HttpResponse.json({
      items: db.examples,
      total: db.examples.length,
      page: 1,
      pageSize: 20,
    })
  }),
  http.post('*/exemplo', async ({ request }) => {
    const early = await scenario(request)
    if (early) return early
    const { name } = (await request.json()) as { name: string }
    const item = { id: String(db.examples.length + 1), name }
    db.examples.push(item)
    return HttpResponse.json(item, { status: 201 })
  }),
]
