import { createMuiTheme } from '@material-ui/core/styles'

// const primary = '#5e35b1'
const primary = '#BB86FC'
const secondary = '#03DAC6'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: primary,
      dark: '#BB86FC',
      light: '#5e35b1'
    },
    secondary: {
      main: secondary,
      dark: '#03DAC6',
      light: '#018786'
      // light: '#018786'
    },
    error: {
      main: '#CF6679',
      dark: '#CF6679',
      light: '#CF6679'
    },
    header: {
      main: '#1F1F1F',
      dark: '#1F1F1F',
      light: primary
    },
    sidebar: {
      main: '#333333',
      dark: '#333333',
      light: '#E5E5E5'
    },
    bg: {
      main: '#121212',
      dark: '#121212',
      light: '#f5f5f5'
    },
    write: {
      main: '#E1E1E6',
      dark: '#E1E1E6',
      light: '#333333'
    },
    surface1: {
      main: '#222222',
      dark: '#222222',
      light: '#fff'
    },
    surface2: {
      main: '#333333',
      dark: '#333333',
      light: '#f5f5f5'
    }
  },
  typography: {
    htmlFontSize: 10
  },
  overrides: {
    MuiDrawer: {
      paper: {
        background: '#222222'
      }
    },
    MuiPaper: {
      root: {
        backgroundColor: '#222222'
      }
    },
    MuiMenu: {
      paper: {
        backgroundColor: '#333333'
      }
    }
  }
})

export default theme
