import styled from 'styled-components'
import { Paper } from '@material-ui/core'

export const Dice = styled(Paper)`
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--surface-2);
  padding: 2px;
  margin: 4px 4px;
  margin-top: 0;

  h4 {
    font-size: 2.6rem;
  }
`

interface ContainerProps {
  editing: number
}

export const Container = styled(Paper)<ContainerProps>`
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 0px 12px;
  margin-top: 10px;
  background-color: var(--surface-1);

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      color: ${({ theme: { palette } }) => palette.primary[palette.type]};

      span {
        font-size: 1.5rem;
        font-weight: 500;
        color: var(--text-color);
      }
    }

    .MuiIconButton-root {
      max-width: 30px;
      max-height: 30px;
    }
  }

  .content {
    display: flex;
    align-items: center;

    & > .MuiIconButton-root {
      width: 56px;
      height: 56px;
    }

    .dices {
      display: flex;
      flex: 1;
      flex-wrap: nowrap;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;

      ${Dice} {
        ${props =>
          !props.editing &&
          `
            padding: 0 12px;
          `}
      }

      &::-webkit-scrollbar {
        width: 10px;
        height: 10px;
        background: var(--bg-sidebar);
      }

      &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 10px 10px var(--surface-1);
      }

      &::-webkit-scrollbar-thumb {
        box-shadow: inset 0 0 10px 10px var(--surface-2);
        border: solid 2px transparent;
        border-radius: 10px;
      }
    }
  }
`
