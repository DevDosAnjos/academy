import type { Profile } from './session'

export type Requirement = 'gestao' | 'admin' | 'portal'

export type Decision =
  | { type: 'allow' }
  | { type: 'login' }
  | { type: 'redirect'; to: '/gestao' | '/portal' }
  | { type: 'forbidden' }

// Screen-level convenience only: the server is what refuses data and actions.
export function decideAccess(
  profile: Profile | null,
  requirement: Requirement,
): Decision {
  if (!profile) return { type: 'login' }
  const inGestao = profile === 'administrador' || profile === 'professor'
  if (requirement === 'portal') {
    return inGestao ? { type: 'redirect', to: '/gestao' } : { type: 'allow' }
  }
  if (!inGestao) return { type: 'redirect', to: '/portal' }
  if (requirement === 'admin' && profile !== 'administrador') {
    return { type: 'forbidden' }
  }
  return { type: 'allow' }
}

// Accepts only internal paths, so ?voltar= can't become an open redirect.
export function safeReturnPath(
  value: string | null | undefined,
): string | null {
  if (!value || !value.startsWith('/')) return null
  if (value.startsWith('//') || value[1] === '\\') return null
  return value
}
