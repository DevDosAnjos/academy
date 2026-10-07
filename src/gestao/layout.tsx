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
    <div className="flex min-h-svh bg-surface">
      <aside className="flex w-60 shrink-0 flex-col gap-4 border-r bg-card p-4">
        <span className="font-semibold uppercase">Academy</span>
        <nav aria-label="Gestão" className="flex flex-1 flex-col gap-1">
          <NavLink to="/gestao" end className={link}>
            Início
          </NavLink>
          <NavLink to="/gestao/configuracoes" className={link}>
            Configurações
          </NavLink>
        </nav>
        <Button
          variant="outline"
          onClick={() => navigate('/entrar', { state: { signOut: true } })}
        >
          Sair
        </Button>
      </aside>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export default function GestaoLayout() {
  return (
    <RequireAccess requirement="gestao">
      <Shell />
    </RequireAccess>
  )
}
