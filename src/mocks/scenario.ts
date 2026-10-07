import { delay, HttpResponse } from 'msw'

// Simulated scenarios by URL (item #6, D6): ?mock=demora|erro|vazio|401|403.
// Returns a response to short-circuit the handler, or undefined to go on.
// "vazio" only acts on list routes (pass { list: true }).
export async function scenario(
  request: Request,
  { list = false }: { list?: boolean } = {},
): Promise<Response | undefined> {
  const mock = new URL(request.url).searchParams.get('mock')
  if (mock === 'demora') await delay(2000)
  if (mock === 'erro')
    return HttpResponse.json(
      { code: 'server', message: 'Erro simulado.' },
      { status: 500 },
    )
  if (mock === '401')
    return HttpResponse.json(
      { code: 'unauthorized', message: 'Sem sessão.' },
      { status: 401 },
    )
  if (mock === '403')
    return HttpResponse.json(
      { code: 'forbidden', message: 'Sem permissão.' },
      { status: 403 },
    )
  if (mock === 'vazio' && list)
    return HttpResponse.json({ items: [], total: 0, page: 1, pageSize: 20 })
}
