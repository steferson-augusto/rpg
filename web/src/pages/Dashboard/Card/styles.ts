import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'

export const Container = styled(Paper)`
  margin-bottom: 16px;
  padding: 8px;
  position: relative;

  .title {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -9px;
    left: 0;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 1.4rem;
    color: #999;

    &.with-action {
      top: -15px;
    }

    button {
      margin-left: 4px;
      color: var(--primary);
    }

    h3 > span {
      color: var(--error);
    }
  }

  .failed {
    width: 100%;
    font-size: 1.6rem;
    color: var(--error);
    text-align: center;
    padding: 8px 4px;
  }

  .empty {
    width: 100%;
    font-size: 1.6rem;
    color: #ccc;
    text-align: center;
    padding: 8px 4px;
    font-style: italic;
  }
`
