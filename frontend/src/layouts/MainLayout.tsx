import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

interface MainLayoutProps {
  children: React.ReactNode
}

/**
 * Layout for authenticated pages
 * Can be extended with navbar, sidebar, footer, etc.
 */
export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Future: Add AppBar/Navigation here */}
      
      <Container component="main" maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        {children}
      </Container>

      {/* Future: Add Footer here */}
    </Box>
  )
}
