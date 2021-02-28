import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#5e35b1'
    },
    secondary: {
      main: '#018786'
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
