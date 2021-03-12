import styled from 'styled-components'

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  h3 {
    font-size: 4.2rem;
    color: var(--primary);
  }

  h4 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  p {
    font-size: 1.5rem;
    font-weight: 400;
    color: #ddd;
  }

  .row {
    padding: 0 24px;
    padding-bottom: 16px;
  }

  .inline {
    display: flex;
    justify-content: space-between;

    div:nth-child(even) {
      padding-left: 16px;
    }

    div {
      display: flex;
      flex-direction: column;
    }
  }
`
