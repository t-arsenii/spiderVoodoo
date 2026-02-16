import RootLayout from '../layouts/RootLayout'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
export default function Loading() {
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