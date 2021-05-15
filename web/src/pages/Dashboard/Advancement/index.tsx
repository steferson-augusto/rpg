import React from 'react'
import { Tooltip, IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import InfoIcon from '@material-ui/icons/Info'

import { Container } from './styles'
import AdvancementData from '../../../models/Advancement'
import { useAuth } from '../../../contexts/auth'

interface AdvancementProps {
  data: AdvancementData
  handleDelete: (id: number) => () => void
}

const Advancement: React.FC<AdvancementProps> = ({ data, handleDelete }) => {
  const { user } = useAuth()

  return (
    <Container>
      <p className={data.hindrance ? 'hindrance' : undefined}>{data.label}</p>
      <div className="actions">
        <Tooltip title={data.description}>
          <InfoIcon />
        </Tooltip>
        {user?.isMaster && (
          <IconButton size="small" onClick={handleDelete(data.id)}>
            <DeleteIcon color="error" />
          </IconButton>
        )}
      </div>
    </Container>
  )
}

export default React.memo(Advancement)
