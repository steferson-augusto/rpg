import styled from 'styled-components'

export const Container = styled.div`
  max-width: 1200px;
  padding: 0 16px;
  margin: 16px auto;
  display: flex;
  flex-grow: 1;

  .column {
    flex: 1;
    min-width: 265px;
    padding-bottom: 16px;

    & + .column {
      margin-left: 16px;
    }

    @media screen and (max-width: 650px) {
      padding-bottom: 0;

      & + .column {
        margin-left: 0;
      }
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

  @media screen and (max-width: 1090px) {
    flex-wrap: wrap;
  }
`
