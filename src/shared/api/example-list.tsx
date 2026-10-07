import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import { QueryState } from '@/shared/components/query-state'
import { api } from './client'
import type { Page } from './types'

// DEV-only example (item #5, D7); answered by MSW (item #6).
// Remove when the first real list exists.
type Item = { id: string; name: string }

export default function ExampleList() {
  const [params] = useSearchParams()
  const estado = params.get('estado') ?? ''
  const query = useQuery({
    queryKey: ['api-exemplo', estado],
    queryFn: () =>
      api.get<Page<Item>>(`/exemplo?page=1&pageSize=20&mock=${estado}`),
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
