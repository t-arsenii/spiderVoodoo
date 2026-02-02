import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useAppSelector } from '../../store/hooks'
import { selectUser } from '../../store/userSlice'
import MainLayout from '../../layouts/MainLayout'

export default function DashboardPage() {
  const user = useAppSelector(selectUser)

  return (
    <MainLayout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
        }}
      >
        <Typography component="h1" variant="h3" sx={{ mb: 2 }}>
          Welcome, {user?.username}!
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
          Email: {user?.email || 'Not provided'}
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Your dashboard content goes here
        </Typography>
      </Box>
    </MainLayout>
  )
}
