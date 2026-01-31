import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './Layout'
import LoginForm from './Login'
import RegisterForm from './Register'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { restoreSession, selectIsAuthenticated, selectUser, selectUserLoading } from './store/userSlice'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

// Protected Route component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

// Home/Dashboard page
function Dashboard() {
  const user = useAppSelector(selectUser)

  return (
    <Layout>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
            Welcome, {user?.username}!
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Email: {user?.email}
          </Typography>
        </Box>
      </Container>
    </Layout>
  )
}

function App() {
  const dispatch = useAppDispatch()
  const loading = useAppSelector(selectUserLoading)

  React.useEffect(() => {
    dispatch(restoreSession())
  }, [dispatch])

  if (loading) {
    return (
      <Layout>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        </Container>
      </Layout>
    )
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <Layout>
            <LoginForm />
          </Layout>
        }
      />
      <Route
        path="/register"
        element={
          <Layout>
            <RegisterForm />
          </Layout>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App