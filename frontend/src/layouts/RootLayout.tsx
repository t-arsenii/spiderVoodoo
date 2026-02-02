import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../theme'

interface RootLayoutProps {
  children: React.ReactNode
}

/**
 * Root layout - provides theme and baseline styles to entire app
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
