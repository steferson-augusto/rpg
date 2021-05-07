import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px;
  border-radius: 3px;
  transition: all 0.3s;

  ul {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    list-style-type: none;
    color: var(--text-color);
    padding-right: 8px;

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

  &:hover {
    background-color: var(--surface-2);
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
