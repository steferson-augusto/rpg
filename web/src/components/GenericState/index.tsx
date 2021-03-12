import React from 'react'

import { Container } from './styles'
import Animation from '../Animation'
import ImageError from '../../assets/images/critical-fail.png'

interface GenericStateProps {
  loading: boolean
  error: boolean
}

const GenericState: React.FC<GenericStateProps> = ({ loading, error }) => {
  if (!loading && !error) return null

  return (
    <Container>
      {loading ? (
        <Animation />
      ) : (
        <div className="error">
          <img src={ImageError} />
          <h4>Falha crítica!</h4>
          <p>Tente novamente mais tarde...</p>
        </div>
      )}
    </Container>
  )
}

export default GenericState
