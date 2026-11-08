import { lazy, Suspense } from 'react'
import { createBrowserRouter, type RouteObject } from 'react-router'
import { RootLayout } from '@/components/layout/RootLayout'
import { RouteError } from '@/components/layout/RouteError'
import { RouteLoading } from '@/components/layout/RouteLoading'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'

// A página de detalhes é carregada sob demanda (code splitting).
const ProjectDetailPage = lazy(() =>
  import('@/pages/ProjectDetailPage').then((m) => ({ default: m.ProjectDetailPage })),
)

export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'projects/:slug',
        element: (
          <Suspense fallback={<RouteLoading />}>
            <ProjectDetailPage />
          </Suspense>
        ),
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]

export function createRouter() {
  return createBrowserRouter(routes)
}
