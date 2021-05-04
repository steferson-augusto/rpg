import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'

export const Container = styled(Paper)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  margin-bottom: 8px;

  &.is-dragging {
    background-color: var(--surface-2);
  }

  .content {
    display: flex;
    flex: 1;
    flex-direction: column;

    h4 span {
      font-size: 1.1rem;
      font-weight: 500;
      color: var(--primary);
      padding-left: 8px;
    }

    p {
      font-size: 1.3rem;
      color: #bbb;
    }
  }
`
