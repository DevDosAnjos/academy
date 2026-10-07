import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import { QueryState } from '@/shared/components/query-state'
import { createApiClient } from './client'
import type { Page } from './types'

// DEV-only example (item #5, D7). A fake fetch stands in for MSW (item #6).
// Remove when the first real list exists.
const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status })

const fakeFetch: typeof fetch = async (input) => {
  await new Promise((r) => setTimeout(r, 600))
  const estado = new URL(String(input), location.origin).searchParams.get(
    'estado',
  )
  if (estado === 'erro') return json(500, {})
  if (estado === '401') return json(401, {})
  if (estado === '403') return json(403, {})
  const items =
    estado === 'vazio'
      ? []
      : [
          { id: '1', name: 'Exemplo A' },
          { id: '2', name: 'Exemplo B' },
        ]
  return json(200, { items, total: items.length, page: 1, pageSize: 20 })
}

const client = createApiClient({ fetchImpl: fakeFetch })

type Item = { id: string; name: string }

export default function ExampleList() {
  const [params] = useSearchParams()
  const estado = params.get('estado') ?? ''
  const query = useQuery({
    queryKey: ['api-exemplo', estado],
    queryFn: () =>
      client.get<Page<Item>>(`/exemplo?page=1&pageSize=20&estado=${estado}`),
  })

  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-3xl font-semibold uppercase">API (exemplo)</h1>
      <QueryState
        query={query}
        isEmpty={(d) => d.items.length === 0}
        emptyMessage="Nenhum item para mostrar."
      >
        {(d) => (
          <ul className="list-disc pl-5 text-sm">
            {d.items.map((i) => (
              <li key={i.id}>{i.name}</li>
            ))}
          </ul>
        )}
      </QueryState>
    </div>
  )
}
