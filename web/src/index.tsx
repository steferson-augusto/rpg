import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider
} from '@material-ui/core/styles'

import App from './App'
import GlobalStyles from './styles/global'
import theme from './styles/theme'

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <GlobalStyles />
          <App />
        </StylesProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
