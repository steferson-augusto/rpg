import React from 'react'

import { Container } from './styles'
import image from '../../assets/images/empty-folder.png'

interface EmptyStateProps {
  label: string
}

const EmptyState: React.FC<EmptyStateProps> = ({ label }) => {
  return (
    <Container>
      <div className="image">
        <img src={image} />
      </div>
      <h3>{label}</h3>
    </Container>
  )
}

export default React.memo(EmptyState)
