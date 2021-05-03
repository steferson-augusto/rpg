import styled from 'styled-components'
import { lighten } from '@material-ui/core/styles'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 300px;
  align-items: center;
  background-color: var(--bg-color);
  border-right: 1px solid rgba(50, 50, 50, 0.5);
  padding-bottom: 4px;

  & > .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px;

    h3 {
      padding-left: 8px;

      span {
        font-size: 1.1rem;
        font-weight: 500;
        color: var(--primary);
        padding-left: 4px;
      }
    }
  }

  & > .items {
    width: 100%;
    padding: 8px;
    transition: background-color 0.2s ease;
    flex-grow: 1;
    background-color: inherit;

    &.is-dragging {
      background-color: rgba(38, 38, 38, 0.7);
    }
  }

  & > button {
    background-color: #444;
    color: ${props => lighten(props.theme.palette.primary.main, 0.3)};
    margin-top: 4px;
    transition: all 0.2s ease;

    &:hover {
      background-color: var(--primary);
      color: #222;
      border-radius: 35%;
    }
  }
`
