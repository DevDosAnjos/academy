import { http, HttpResponse } from 'msw'
import { scenario } from '../scenario.ts'

// No rules: echoes the body. ?mock=invalido -> 422 with a field error;
// ?mock=invalido-geral -> 422 without fields (plus the scenarios of scenario.ts).
export const exemploFormulario = [
  http.post('*/exemplo-formulario', async ({ request }) => {
    const early = await scenario(request)
    if (early) return early
    const mock = new URL(request.url).searchParams.get('mock')
    if (mock === 'invalido')
      return HttpResponse.json(
        {
          code: 'invalid',
          message: 'Dados inválidos.',
          fields: { email: 'Este e-mail já está em uso.' },
        },
        { status: 422 },
      )
    if (mock === 'invalido-geral')
      return HttpResponse.json(
        {
          code: 'invalid',
          message: 'Não foi possível salvar. Confira os dados.',
        },
        { status: 422 },
      )
    return HttpResponse.json(await request.json(), { status: 201 })
  }),
]
