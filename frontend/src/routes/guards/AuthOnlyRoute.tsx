import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import { selectIsAuthenticated } from '../../store/userSlice'
import { ROUTES } from '../routeConstants'

interface AuthOnlyRouteProps {
  children: React.ReactNode
}

/**
 * Route guard for non-authenticated users only (login, register pages)
 * Redirects authenticated users to dashboard or their intended destination
 */
export default function AuthOnlyRoute({ children }: AuthOnlyRouteProps) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const location = useLocation()

  if (isAuthenticated) {
    // Redirect to the page they were trying to access, or dashboard
    const from = (location.state as any)?.from?.pathname || ROUTES.DASHBOARD
    return <Navigate to={from} replace />
  }

  return <>{children}</>
}
