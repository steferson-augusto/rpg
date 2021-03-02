import { createMuiTheme } from '@material-ui/core/styles'

const primary = '#5e35b1'
const secondary = '#018786'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: primary
    },
    secondary: {
      main: secondary
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
    }
  },
  typography: {
    htmlFontSize: 10
  },
  overrides: {
    // MuiDrawer: {
    //   paper: {
    //     background: '#E5E5E5'
    //   }
    // }
  }
})

export default theme
