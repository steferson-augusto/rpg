import React from 'react'

import { Container } from './styles'
import image from '../../assets/images/critical-fail.png'

interface ErrorStateProps {
  label?: string
}

const ErrorState: React.FC<ErrorStateProps> = ({
  label = 'Tente novamente mais tarde'
}) => {
  return (
    <Container>
      <div className="image">
        <img src={image} />
      </div>
      <h3>{label}</h3>
    </Container>
  )
}

export default React.memo(ErrorState)
