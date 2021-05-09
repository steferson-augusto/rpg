import styled from 'styled-components'

export const Container = styled.div`
  width: 800px;
  padding: 0 16px;
  margin: 16px auto;
  display: flex;
  flex-grow: 1;

  .column {
    flex: 1;
    padding-bottom: 16px;

    & + .column {
      margin-left: 16px;
    }
  }

  .spacer {
    width: 100%;
    height: 1px;
  }

  .character {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

    ul {
      list-style-type: none;
      color: var(--text-color);
      padding-right: 8px;
      padding-top: 8px;

      & li:nth-child(1) {
        font-size: 1.8rem;
        font-weight: 600;
      }
    }

    p {
      font-size: 2rem;
      font-weight: 800;
      letter-spacing: 1px;
      color: var(--primary);
    }
  }

  .pools {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`
