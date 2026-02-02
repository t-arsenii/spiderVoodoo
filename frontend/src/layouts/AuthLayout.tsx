import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

interface AuthLayoutProps {
  children: React.ReactNode
}

/**
 * Layout for authentication pages (Login, Register)
 * Centered content with max width
 */
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
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
        {children}
      </Box>
    </Container>
  )
}
