import { Link, Outlet } from 'react-router'

export default function SiteLayout() {
  return (
    <div className="min-h-svh bg-surface">
      <header className="flex items-center justify-between border-b bg-card px-6 py-4">
        <Link to="/" className="font-semibold uppercase">
          Academy
        </Link>
        <Link to="/entrar" className="text-sm font-medium underline">
          Entrar
        </Link>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
