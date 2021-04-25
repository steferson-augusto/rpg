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

  .power-points {
    color: var(--primary);
  }
`

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  ${Dice} {
    padding: 0 12px;
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
`

export const AccordionBody = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .responsive-actions {
    @media screen and (min-width: 640px) {
      display: none;
    }
  }
`
