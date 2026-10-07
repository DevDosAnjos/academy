import type { ApiErrorBody } from './types.ts'

export type ApiErrorKind =
  'unauthorized' | 'forbidden' | 'not-found' | 'invalid' | 'server' | 'network'

const DEFAULT_MESSAGE: Record<ApiErrorKind, string> = {
  unauthorized: 'Sua sessão terminou. Entre de novo.',
  forbidden: 'Você não tem permissão para isso.',
  'not-found': 'Não encontramos o que você procurou.',
  invalid: 'Alguns dados não são válidos. Confira e tente de novo.',
  server: 'O sistema teve um problema. Tente de novo em instantes.',
  network: 'Não foi possível conectar. Confira sua internet e tente de novo.',
}

export class ApiError extends Error {
  kind: ApiErrorKind
  status?: number
  code?: string
  fields?: Record<string, string>

  constructor(
    kind: ApiErrorKind,
    opts: { status?: number; body?: Partial<ApiErrorBody> } = {},
  ) {
    const { body } = opts
    super(
      typeof body?.message === 'string' && body.message
        ? body.message
        : DEFAULT_MESSAGE[kind],
    )
    this.name = 'ApiError'
    this.kind = kind
    this.status = opts.status
    this.code = typeof body?.code === 'string' ? body.code : undefined
    this.fields =
      body?.fields && typeof body.fields === 'object' ? body.fields : undefined
  }
}

export function kindFromStatus(status: number): ApiErrorKind {
  if (status === 401) return 'unauthorized'
  if (status === 403) return 'forbidden'
  if (status === 404) return 'not-found'
  if (status >= 500) return 'server'
  return 'invalid' // other 4xx (400, 422...)
}
