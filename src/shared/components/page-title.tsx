import { useEffect } from 'react'
import { Outlet, useMatches } from 'react-router'

export type RouteHandle = { title?: string }

// Title format: "Screen · Area · Academy", most specific first (RNF-S05).
export function PageTitle() {
  const parts = useMatches()
    .map((m) => (m.handle as RouteHandle | undefined)?.title)
    .filter((t): t is string => Boolean(t))
    .reverse()
  const title = [...parts, 'Academy'].join(' · ')
  useEffect(() => {
    document.title = title
  }, [title])
  return <Outlet />
}
