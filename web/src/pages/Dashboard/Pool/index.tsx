import React from 'react'

import { Container } from './styles'
import Stat from '../../../models/Stat'
import { LinearProgress } from '@material-ui/core'

interface PoolProps {
  data: Stat
}

const colors = {
  hp: '#e57373',
  mana: '#80deea',
  fadiga: '#a5d6a7',
  ki: '#90caf9',
  'energia corporal': '#ffcc80',
  'energia mental': '#b39ddb'
}

type Color = keyof typeof colors

const Pool: React.FC<PoolProps> = ({ data }) => {
  return (
    <Container color={colors[data.label as Color] || '#b0bec5'}>
      <LinearProgress
        variant="determinate"
        value={(data.current * 100) / (data.max as number)}
      />
      <p>
        {data.label}: {data.current} / {data.max}
      </p>
    </Container>
  )
}

export default React.memo(Pool)
