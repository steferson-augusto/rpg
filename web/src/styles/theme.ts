import { createMuiTheme, darken } from '@material-ui/core/styles'

// #43B581
// const primary = '#5e35b1'
// const primary = '#BB86FC'
const primary = '#43B581'
const secondary = '#03DAC6'
// const secondary = '#03DAC6'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: primary,
      dark: primary,
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
      main: '#1F1F1F',
      dark: '#1F1F1F',
      light: '#f5f5f5'
    },
    write: {
      main: '#E1E1E6',
      dark: '#E1E1E6',
      light: '#333333'
    },
    surface1: {
      main: '#272727',
      dark: '#272727',
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
        background: '#272727'
      }
    },
    MuiPaper: {
      root: {
        backgroundColor: '#272727'
      }
    },
    MuiMenu: {
      paper: {
        backgroundColor: '#333333'
      }
    },
    MuiButton: {
      contained: {
        '&:hover': {
          backgroundColor: `${darken(primary, 0.15)} !important`
        }
      }
    }
  }
})

export default theme
