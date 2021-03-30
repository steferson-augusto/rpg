import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { SWRConfig } from 'swr'

import theme from '../styles/theme'

const Providers: React.FC = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <SWRConfig value={{ dedupingInterval: 0 }}>{children}</SWRConfig>
      </ThemeProvider>
    </MuiThemeProvider>
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) => render(ui, { wrapper: Providers, ...options })

export * from '@testing-library/react'

export { customRender as render }
