import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#f5f5f5'
    },
    primary: {
      main: '#5e35b1'
    },
    secondary: {
      main: '#018786'
    },
    text: {
      primary: '#333'
    }
  },
  typography: {
    htmlFontSize: 10
  },
  overrides: {
    MuiDrawer: {
      paper: {
        background: '#E5E5E5'
      }
    }
  }
})

export default theme
