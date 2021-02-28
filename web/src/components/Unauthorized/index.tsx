import React from 'react'

import { Container } from './styles'
import image from '../../assets/images/unauthorized.png'

const Unauthorized: React.FC = () => {
  return (
    <Container>
      <img src={image} />
      <h3>Não foi possível se conectar a sua conta do Discord</h3>
    </Container>
  )
}

export default Unauthorized
