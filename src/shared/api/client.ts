import { API_URL } from './env.ts'
import { ApiError, kindFromStatus } from './errors.ts'

const TIMEOUT_MS = 15_000
const MUTATING = new Set(['POST', 'PUT', 'PATCH', 'DELETE'])

// Anti-forgery token (D2): readable cookie XSRF-TOKEN -> header X-XSRF-TOKEN.
function xsrfToken(): string | null {
  if (typeof document === 'undefined') return null
  const m = document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]*)/)
  return m ? decodeURIComponent(m[1]) : null
}

export type ApiClient = ReturnType<typeof createApiClient>

export function createApiClient({
  baseUrl = '',
  fetchImpl,
  timeoutMs = TIMEOUT_MS,
}: {
  baseUrl?: string
  fetchImpl?: typeof fetch
  timeoutMs?: number
} = {}) {
  async function request<T>(
    method: string,
    path: string,
    body?: unknown,
  ): Promise<T> {
    const headers: Record<string, string> = { Accept: 'application/json' }
    if (body !== undefined) headers['Content-Type'] = 'application/json'
    if (MUTATING.has(method)) {
      const token = xsrfToken()
      if (token) headers['X-XSRF-TOKEN'] = token
    }

    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeoutMs)
    let res: Response
    try {
      res = await (fetchImpl ?? fetch)(baseUrl + path, {
        method,
        headers,
        credentials: 'include',
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: controller.signal,
      })
    } catch {
      throw new ApiError('network')
    } finally {
      clearTimeout(timer)
    }

    if (!res.ok) {
      const parsed: unknown = await res.json().catch(() => null)
      throw new ApiError(kindFromStatus(res.status), {
        status: res.status,
        body: parsed && typeof parsed === 'object' ? parsed : undefined,
      })
    }
    if (res.status === 204) return undefined as T
    return (await res.json().catch(() => undefined)) as T
  }

  return {
    get: <T>(path: string) => request<T>('GET', path),
    post: <T>(path: string, body?: unknown) => request<T>('POST', path, body),
    put: <T>(path: string, body?: unknown) => request<T>('PUT', path, body),
    patch: <T>(path: string, body?: unknown) => request<T>('PATCH', path, body),
    delete: <T>(path: string) => request<T>('DELETE', path),
  }
}

export const api = createApiClient({ baseUrl: API_URL })
