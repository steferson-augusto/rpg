import React from 'react'

import { Container } from './styles'
import Attribute from '../../components/Attribute'

const dices = [
  { title: 'Força', value: 'd12+6 d12+5 d12 d4 d4' },
  { title: 'Vigor', value: 'd12+6 d12+5 d12 d4 d4' },
  { title: 'Agilidade', value: 'd12+6 d12+5 d12 d4 d4' },
  { title: 'Astúcia', value: 'd12+6 d12+5 d12 d4 d4' },
  { title: 'Espírito', value: 'd12+6 d12+5 d12 d4 d4' }
]

const Attributes: React.FC = () => {
  return (
    <Container>
      {dices.map((dice, index) => (
        <Attribute key={index} title={dice.title} value={dice.value} />
      ))}
    </Container>
  )
}

export default Attributes
