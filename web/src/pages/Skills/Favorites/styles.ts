import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));

  .skill {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 8px;
    margin: 4px;

    p {
      text-align: center;
      font-weight: bold;
      color: #ccc;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;

      &::first-letter {
        text-transform: uppercase;
      }
    }

    span.dices {
      font-size: 1.3rem;
      text-align: center;
      color: var(--primary);
    }

    .actions {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
`
