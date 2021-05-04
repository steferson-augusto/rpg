import styled from 'styled-components'
import { Form } from '@unform/web'

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

export const DrawerForm = styled(Form)`
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  padding: 12px;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: space-between;

  .content {
    width: 100%;
    display: flex;
    flex-flow: column wrap;
    align-items: center;

    h4 {
      padding-bottom: 16px;
    }
  }

  .actions {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`
