import { Navigate, Outlet, useLocation } from 'react-router'
import { decideAccess, type Requirement } from '@/shared/lib/access'
import { useSession } from '@/shared/lib/session'

// Screen-level convenience, not permission: the server refuses data and
// actions (RN-BAS-01). Must not import anything from gestao or portal.
export function RequireAccess({
  requirement,
  forbidden,
  children,
}: {
  requirement: Requirement
  forbidden?: React.ReactNode
  children?: React.ReactNode
}) {
  const { profile } = useSession()
  const location = useLocation()
  const decision = decideAccess(profile, requirement)
  switch (decision.type) {
    case 'login': {
      const back = encodeURIComponent(location.pathname + location.search)
      return <Navigate to={`/entrar?voltar=${back}`} replace />
    }
    case 'redirect':
      return <Navigate to={decision.to} replace />
    case 'forbidden':
      return <>{forbidden}</>
    default:
      return <>{children ?? <Outlet />}</>
  }
}
