import styled from 'styled-components'
import { Form } from '@unform/web'

export const Container = styled(Form)`
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
