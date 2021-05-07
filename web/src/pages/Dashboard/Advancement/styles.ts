import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px;
  border-radius: 3px;
  transition: all 0.3s;

  p {
    font-size: 1.5rem;
    font-weight: 600;
    padding-right: 8px;
    color: var(--text-color);

    &.hindrance {
      color: var(--error);
    }

    &::first-letter {
      text-transform: uppercase;
    }
  }

  &:hover {
    background-color: var(--surface-2);
  }
`
