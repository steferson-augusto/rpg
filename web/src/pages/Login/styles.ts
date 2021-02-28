import styled from 'styled-components'
import { Paper } from '@material-ui/core'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background: url('/img/wallpaper1.jpg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  @media (max-width: 600px) {
    justify-content: center;
    background: url('/img/wallpaper-mobile.jpg') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
`

export const Content = styled(Paper)`
  width: 300px;
  padding: 50px 16px;
  margin-left: 20vw;
  display: flex;
  flex-direction: column;
  background-color: #36393f;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0px 0px 87px 35px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 0px 87px 35px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 87px 35px rgba(0, 0, 0, 0.75);

  @media (max-width: 1000px) {
    margin-left: 12vw;
  }

  @media (max-width: 600px) {
    margin-left: 0;
  }

  h3 {
    color: #efefe1;
    font-size: 2.4rem;
    padding-top: 1.2rem;
    padding-bottom: 3rem;
  }

  .text-btn {
    &:before {
      content: '';
      height: 100%;
      border-right: solid 1px #888;
      padding: 0 4px;
      margin-right: 8px;
    }
  }
`

export const Image = styled.img`
  height: 120px;
  width: 120px;
  border-radius: 60px;
`
