import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;

  .search {
    display: flex;
    align-items: center;
    padding: 4px 8px;
  }

  .content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding-top: 12px;

    .card {
      margin: 4px 6px;
      img {
        max-width: 130px;
        max-height: 130px;
      }
    }
  }
`
