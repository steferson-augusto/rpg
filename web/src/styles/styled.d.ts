/* eslint-disable @typescript-eslint/no-empty-interface */
import 'styled-components'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    header: Palette['primary']
    sidebar: Palette['primary']
    bg: Palette['primary']
    write: Palette['primary']
    surface1: Palette['primary']
    surface2: Palette['primary']
  }
  interface PaletteOptions {
    header: PaletteOptions['primary']
    sidebar: PaletteOptions['primary']
    bg: PaletteOptions['primary']
    write: PaletteOptions['primary']
    surface1: PaletteOptions['primary']
    surface2: PaletteOptions['primary']
  }
}
