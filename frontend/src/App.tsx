import React from 'react'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { restoreSession, selectUserLoading } from './store/userSlice'
import RootLayout from './layouts/RootLayout'
import AppRouter from './routes/AppRouter'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

/**
 * Main App Component
 * - Restores user session on mount
 * - Shows loading state during session restoration
 * - Wraps the app with root layout and router
 */
function App() {
  const dispatch = useAppDispatch()
  const loading = useAppSelector(selectUserLoading)

  React.useEffect(() => {
    dispatch(restoreSession())
  }, [dispatch])

  // Show loading spinner while restoring session
  if (loading) {
    return (
      <RootLayout>
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
      </RootLayout>
    )
  }

  return (
    <RootLayout>
      <AppRouter />
    </RootLayout>
  )
}

export default App