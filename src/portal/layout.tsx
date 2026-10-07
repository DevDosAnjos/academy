import { NavLink, Outlet, useNavigate } from 'react-router'
import { RequireAccess } from '@/shared/components/require-access'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'

const link = ({ isActive }: { isActive: boolean }) =>
  cn(
    'rounded-md px-3 py-2 text-sm font-medium',
    isActive ? 'bg-accent text-accent-foreground' : 'hover:bg-accent',
  )

function Shell() {
  const navigate = useNavigate()
  return (
    <div className="min-h-svh bg-surface pb-16 md:pb-0">
      <header className="flex items-center justify-between border-b bg-card px-4 py-3">
        <span className="font-semibold uppercase">Academy</span>
        <nav aria-label="Portal" className="hidden md:flex">
          <NavLink to="/portal" end className={link}>
            Início
          </NavLink>
        </nav>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/entrar', { state: { signOut: true } })}
        >
          Sair
        </Button>
      </header>
      <main>
        <Outlet />
      </main>
      <nav
        aria-label="Portal (abas)"
        className="fixed inset-x-0 bottom-0 flex justify-around border-t bg-card p-2 md:hidden"
      >
        <NavLink to="/portal" end className={link}>
          Início
        </NavLink>
      </nav>
    </div>
  )
}

export default function PortalLayout() {
  return (
    <RequireAccess requirement="portal">
      <Shell />
    </RequireAccess>
  )
}
