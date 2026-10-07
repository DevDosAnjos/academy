import type { UseQueryResult } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { Loader2Icon } from 'lucide-react'
import { ApiError } from '@/shared/api/errors'
import { Button } from '@/shared/components/ui/button'

// Shows loading, empty, error (with retry) or the content of a query.
export function QueryState<T>({
  query,
  isEmpty,
  emptyMessage = 'Nada por aqui ainda.',
  children,
}: {
  query: UseQueryResult<T>
  isEmpty?: (data: T) => boolean
  emptyMessage?: string
  children: (data: T) => ReactNode
}) {
  if (query.isPending) {
    return (
      <p
        role="status"
        className="flex items-center gap-2 text-sm text-muted-foreground"
      >
        <Loader2Icon className="size-4 animate-spin" aria-hidden />
        Carregando…
      </p>
    )
  }
  if (query.isError) {
    const message =
      query.error instanceof ApiError
        ? query.error.message
        : 'Algo deu errado. Tente de novo.'
    return (
      <div role="alert" className="flex flex-col items-start gap-3">
        <p className="text-sm">{message}</p>
        <Button variant="outline" onClick={() => void query.refetch()}>
          Tentar de novo
        </Button>
      </div>
    )
  }
  if (isEmpty?.(query.data)) {
    return <p className="text-sm text-muted-foreground">{emptyMessage}</p>
  }
  return <>{children(query.data)}</>
}
