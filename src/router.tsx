import { createBrowserRouter, type RouteObject } from 'react-router'
import { NotFound } from '@/shared/components/not-found'
import { PageTitle } from '@/shared/components/page-title'

// Each area is loaded on demand, so opening "/" never downloads gestao/portal.
const page = (load: () => Promise<{ default: React.ComponentType }>) => ({
  lazy: async () => ({ Component: (await load()).default }),
})

const routes: RouteObject[] = [
  {
    Component: PageTitle,
    children: [
      {
        path: '/',
        ...page(() => import('@/site/layout')),
        children: [{ index: true, ...page(() => import('@/site/home')) }],
      },
      {
        ...page(() => import('@/acesso/layout')),
        children: [
          {
            path: '/entrar',
            handle: { title: 'Entrar' },
            ...page(() => import('@/acesso/login')),
          },
          {
            path: '/primeiro-acesso',
            handle: { title: 'Primeiro acesso' },
            ...page(() => import('@/acesso/first-access')),
          },
          {
            path: '/nova-senha',
            handle: { title: 'Nova senha' },
            ...page(() => import('@/acesso/new-password')),
          },
        ],
      },
      {
        path: '/gestao',
        handle: { title: 'Gestão' },
        ...page(() => import('@/gestao/layout')),
        children: [
          {
            index: true,
            handle: { title: 'Início' },
            ...page(() => import('@/gestao/home')),
          },
          {
            path: 'configuracoes',
            handle: { title: 'Configurações' },
            ...page(() => import('@/gestao/settings')),
          },
          {
            path: '*',
            handle: { title: 'Página não encontrada' },
            Component: NotFound,
          },
        ],
      },
      {
        path: '/portal',
        handle: { title: 'Portal' },
        ...page(() => import('@/portal/layout')),
        children: [
          {
            index: true,
            handle: { title: 'Início' },
            ...page(() => import('@/portal/home')),
          },
          {
            path: '*',
            handle: { title: 'Página não encontrada' },
            Component: NotFound,
          },
        ],
      },
      {
        path: '*',
        handle: { title: 'Página não encontrada' },
        Component: NotFound,
      },
    ],
  },
]

// Example list, development only (item #5); not part of the production build.
if (import.meta.env.DEV) {
  routes[0].children!.push({
    path: '/dev/api-exemplo',
    handle: { title: 'API (exemplo)' },
    ...page(() => import('@/shared/api/example-list')),
  })
}

export const router = createBrowserRouter(routes)
