import { exemplo } from './handlers/exemplo.ts'
import { sessao } from './handlers/sessao.ts'

// One registry: add each subject's handlers here.
export const handlers = [...sessao, ...exemplo]
