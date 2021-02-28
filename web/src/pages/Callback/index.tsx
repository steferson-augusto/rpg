import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Animation from '../../components/Animation'
import { useAuth } from '../../contexts/auth'
import { Container } from './styles'

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const Callback: React.FC = () => {
  const query = useQuery()
  const { signin } = useAuth()

  useEffect(() => {
    const code = query.get('code')
    if (code) {
      signin(code)
        .then(response => console.log(response))
        .catch(error => console.log(error))
    } else {
      console.log('código inválido')
    }
  }, [])

  return (
    <Container>
      <Animation width="50vh" height="50vh" />
    </Container>
  )
}

export default Callback
