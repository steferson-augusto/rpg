import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .error {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      width: 45vh;
      height: 45vh;
    }

    h4 {
      font-size: 2.4rem;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #cf6679;
    }

    p {
      font-size: 1.5rem;
      color: #ccc;
      font-weight: 600;
    }
  }
`
