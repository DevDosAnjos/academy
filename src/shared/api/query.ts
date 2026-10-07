import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { signOut, subscribe } from '@/shared/lib/session'
import { ApiError } from './errors.ts'

// Retry only network failures and 5xx, at most 2 times (3 calls total). Never 4xx.
export function shouldRetry(failureCount: number, error: unknown) {
  return (
    failureCount < 3 - 1 &&
    error instanceof ApiError &&
    (error.kind === 'network' || error.kind === 'server')
  )
}

// 401 = invalid session: end it (RequireAccess sends to /entrar?voltar=).
// 403 only informs.
function onError(error: unknown) {
  if (error instanceof ApiError && error.kind === 'unauthorized') signOut()
}

export const queryClient: QueryClient = new QueryClient({
  queryCache: new QueryCache({ onError }),
  mutationCache: new MutationCache({ onError }),
  defaultOptions: {
    queries: { retry: shouldRetry },
    mutations: { retry: false },
  },
})

// Any sign-in or sign-out drops cached data so the next account never sees it.
subscribe(() => queryClient.clear())
