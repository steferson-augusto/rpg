import { createGlobalStyle } from 'styled-components'
import { darken } from 'polished'

export default createGlobalStyle`
  :root {
    --bg-color: ${({ theme: { palette } }) => palette.bg[palette.type]};
    --text-color: ${({ theme: { palette } }) => palette.write[palette.type]};
    --primary: ${({ theme: { palette } }) => palette.primary[palette.type]};
    --secondary: ${({ theme: { palette } }) => palette.secondary[palette.type]};
    --error: ${({ theme: { palette } }) => palette.error[palette.type]};
    --surface-1: ${({ theme: { palette } }) => palette.surface1[palette.type]};
    --surface-2: ${({ theme: { palette } }) => palette.surface2[palette.type]};
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

  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background: var(--bg-sidebar);
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 10px 10px var(--bg-color);
  }

  &::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 10px 10px #444;
    border: solid 2px transparent;
    border-radius: 10px;
  }

  .without-sidebar {
    margin-left: 0;
  }

  .full-sidebar {
    margin-left: 230px;
  }

  .mini-sidebar {
    margin-left: 60px;
  }

  .discord-button {
    background-color: #444;
    color: var(--primary);
    margin-top: 4px;
    transition: all 0.2s ease;

    &:hover {
      background-color: var(--primary);
      color: #222;
      border-radius: 35%;
    }
  }

  .capitalize::first-letter {
    text-transform: uppercase;
  }

  .MuiAutocomplete-popper > div {
    background-color: var(--surface-2);
  }

  .PrivateSwipeArea-root-1 {
    @media screen and (min-width: 600px) {
      display: none;
    }
  }
`
