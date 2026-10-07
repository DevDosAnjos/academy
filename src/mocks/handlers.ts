import { exemplo } from './handlers/exemplo.ts'
import { exemploFormulario } from './handlers/exemplo-formulario.ts'
import { sessao } from './handlers/sessao.ts'

// One registry: add each subject's handlers here.
export const handlers = [...sessao, ...exemplo, ...exemploFormulario]
