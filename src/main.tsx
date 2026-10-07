import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router'
import './index.css'
import { queryClient } from '@/shared/api/query'
import { USE_MOCKS } from '@/shared/api/env'
import { router } from './router'

// Mocks only with VITE_USE_MOCKS=true; dynamic import keeps MSW out otherwise.
if (USE_MOCKS) {
  const { worker } = await import('./mocks/browser')
  const { db } = await import('./mocks/db')
  await worker.start()
  // Browser starts as Administrador so lists load; Node starts with no session.
  db.profile = 'administrador'
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
