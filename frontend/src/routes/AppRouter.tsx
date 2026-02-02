import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { routeConfig } from './routeConfig'
import ProtectedRoute from './guards/ProtectedRoute'
import AuthOnlyRoute from './guards/AuthOnlyRoute'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

/**
 * Loading fallback component for lazy-loaded pages
 */
function LoadingFallback() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  )
}

/**
 * Main application router
 * Handles route rendering with appropriate guards based on route type
 */
export default function AppRouter() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {routeConfig.map((route) => {
          let element = route.element

          // Apply appropriate guard based on route type
          if (route.type === 'protected') {
            element = <ProtectedRoute>{element}</ProtectedRoute>
          } else if (route.type === 'auth-only') {
            element = <AuthOnlyRoute>{element}</AuthOnlyRoute>
          }

          return <Route key={route.path} path={route.path} element={element} />
        })}
      </Routes>
    </Suspense>
  )
}
