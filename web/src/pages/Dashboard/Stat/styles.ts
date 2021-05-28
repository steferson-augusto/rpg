import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 3px;
  transition: all 0.3s;

  &:hover {
    background-color: var(--surface-2);
  }

  &.is-master {
    cursor: pointer;

    &:hover .visibility {
      display: block;
    }
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    list-style-type: none;
    color: var(--text-color);
    padding: 2px 4px;

    li:nth-child(1) {
      font-size: 1.5rem;
      font-weight: 600;
      padding-right: 8px;
      &::first-letter {
        text-transform: uppercase;
      }
    }

    li:nth-child(2) {
      padding-top: 2px;
      font-size: 1.2rem;
      font-weight: 400;
      color: var(--primary);
    }
  }

  .visibility {
    display: none;
  }

  .actions {
    display: flex;
    align-items: center;
  }
`

export const Modifier = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .label {
    padding-right: 6px;
  }

  .red {
    color: var(--error);
  }
`
