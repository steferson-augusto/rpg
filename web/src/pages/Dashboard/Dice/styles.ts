import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  padding: 2px 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 3px;
  transition: all 0.3s;

  &:hover {
    background-color: var(--surface-2);
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    list-style-type: none;
    color: var(--text-color);
    padding-right: 8px;

    & li:nth-child(1) {
      font-size: 1.5rem;
      font-weight: 600;
      padding-right: 6px;
      &::first-letter {
        text-transform: uppercase;
      }
    }

    & li:nth-child(2) {
      font-size: 1.1rem;
      font-weight: 400;
      color: #aaa;

      span {
        color: var(--primary);
      }
    }
  }
`
