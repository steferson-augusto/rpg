import { createGlobalStyle } from 'styled-components'
import { darken } from 'polished'

export default createGlobalStyle`
  :root {
    --bg-color: ${({ theme: { palette } }) => palette.bg[palette.type]};
    --text-color: ${props => props.theme.palette.text.primary};
    --primary: ${props => props.theme.palette.primary.main};
    --secondary: ${props => props.theme.palette.secondary.main};
    --bg-header: ${({ theme: { palette } }) => palette.header[palette.type]};
    --bg-sidebar: ${({ theme: { palette } }) => palette.sidebar[palette.type]};
    --sidebar-hover: ${({ theme: { palette } }) => {
      const value = palette.type === 'dark' ? 0.03 : 0.06
      return darken(value, palette.sidebar[palette.type])
    }};
    --sidebar-active: ${({ theme: { palette } }) => {
      const value = palette.type === 'dark' ? 0.05 : 0.12
      return darken(value, palette.sidebar[palette.type])
    }};
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  html {
    font-size: 62.5%;
  }

  body {
    background-color: var(--bg-color);
    font-size: 1.6rem;
    color: var(--text-color);
    font-family: sans-serif;
  }
`
