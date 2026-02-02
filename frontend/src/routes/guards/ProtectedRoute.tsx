import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import { selectIsAuthenticated } from '../../store/userSlice'
import { ROUTES } from '../routeConstants'

interface ProtectedRouteProps {
  children: React.ReactNode
}

/**
 * Route guard for authenticated users only
 * Redirects to login with return URL if not authenticated
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    // Save the location user was trying to access
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  }

  return <>{children}</>
}
