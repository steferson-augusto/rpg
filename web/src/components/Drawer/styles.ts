import styled from 'styled-components'

interface ContainerProps {
  width: number
}

export const Container = styled.div<ContainerProps>`
  width: ${props => props.width}px;
  min-height: 100vh;

  @media screen and (max-width: ${props => props.width + 50}px) {
    width: 100vw;
  }

  .MuiMobileStepper-root {
    background-color: transparent;
  }

  .MuiTextField-root,
  .MuiFormControl-root {
    padding-bottom: 12px;
  }
`
