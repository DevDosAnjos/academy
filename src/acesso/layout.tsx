import { Outlet } from 'react-router'

export default function AcessoLayout() {
  return (
    <main className="grid min-h-svh place-items-center bg-surface p-6">
      <div className="w-full max-w-md rounded-xl border bg-card">
        <Outlet />
      </div>
    </main>
  )
}
