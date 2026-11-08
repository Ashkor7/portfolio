import type { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { createMemoryRouter, RouterProvider, type RouteObject } from 'react-router'

/** Renderiza um elemento dentro de um roteador em memória. */
export function renderWithRouter(ui: ReactElement, route = '/') {
  return renderRoutes([{ path: '*', element: ui }], route)
}

export function renderRoutes(routes: RouteObject[], route = '/') {
  const router = createMemoryRouter(routes, { initialEntries: [route] })
  return { router, ...render(<RouterProvider router={router} />) }
}
