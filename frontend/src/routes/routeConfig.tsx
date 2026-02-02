import React from 'react'
import { Navigate } from 'react-router-dom'
import { ROUTES } from './routeConstants'

// Lazy load pages for better code splitting
const DashboardPage = React.lazy(() => import('../pages/dashboard/DashboardPage'))
const LoginPage = React.lazy(() => import('../pages/auth/LoginPage'))
const RegisterPage = React.lazy(() => import('../pages/auth/RegisterPage'))
const NotFoundPage = React.lazy(() => import('../pages/NotFoundPage'))

export type RouteType = 'public' | 'protected' | 'auth-only'

export interface RouteConfig {
  path: string
  element: React.ReactNode
  type: RouteType
  title?: string
}

/**
 * Centralized route configuration
 * - public: accessible to everyone
 * - protected: requires authentication
 * - auth-only: only for non-authenticated users (login, register)
 */
export const routeConfig: RouteConfig[] = [
  {
    path: ROUTES.HOME,
    element: <Navigate to={ROUTES.DASHBOARD} replace />,
    type: 'public',
    title: 'Home',
  },
  {
    path: ROUTES.DASHBOARD,
    element: <DashboardPage />,
    type: 'protected',
    title: 'Dashboard',
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
    type: 'auth-only',
    title: 'Login',
  },
  {
    path: ROUTES.REGISTER,
    element: <RegisterPage />,
    type: 'auth-only',
    title: 'Register',
  },
  {
    path: '*',
    element: <NotFoundPage />,
    type: 'public',
    title: 'Not Found',
  },
]
