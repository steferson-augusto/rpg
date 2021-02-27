import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  :root {
      --bg-color: ${props => props.theme.palette.background.default};
      --text-color: ${props => props.theme.palette.text.primary};
      --primary: ${props => props.theme.palette.primary.main};
      --secondary: ${props => props.theme.palette.secondary.main};
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
