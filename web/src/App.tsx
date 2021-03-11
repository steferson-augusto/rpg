import React from 'react'
import { ThemeProvider } from 'styled-components'
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider
} from '@material-ui/core/styles'

import GlobalStyles from './styles/global'
import theme from './styles/theme'
import Routes from './routes'
import { AuthProvider } from './contexts/auth'
import { DiscordProvider } from './contexts/discord'
import { PlayerProvider } from './contexts/player'

const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <GlobalStyles />
          <AuthProvider>
            <DiscordProvider>
              <PlayerProvider>
                <Routes />
              </PlayerProvider>
            </DiscordProvider>
          </AuthProvider>
        </StylesProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  )
}

export default App
