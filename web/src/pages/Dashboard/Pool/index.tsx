import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import EditIcon from '@material-ui/icons/Edit'

import { Container } from './styles'
import Stat from '../../../models/Stat'

interface PoolProps {
  data: Stat
  handleEdit: (data: Stat) => () => void
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

const Pool: React.FC<PoolProps> = ({ data, handleEdit }) => {
  return (
    <Container
      color={colors[data.label as Color] || '#b0bec5'}
      onClick={handleEdit(data)}
    >
      <LinearProgress
        variant="determinate"
        value={(data.current * 100) / (data.max as number)}
      />
      <div className="content">
        <p>
          {data.label}: {data.current} / {data.max}
        </p>
        <EditIcon fontSize="inherit" />
      </div>
    </Container>
  )
}

export default React.memo(Pool)
