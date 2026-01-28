import { createTheme } from '@mui/material/styles'
import { orange } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: orange[500],
      contrastText: '#ffffff',
    },
    background: {
      default: '#0b0b0b',
      paper: '#121212',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffffff',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
})

export default theme
