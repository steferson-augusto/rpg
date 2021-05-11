import React, { useCallback, useMemo } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import InfoIcon from '@material-ui/icons/Info'

import { Container, Modifier } from './styles'
import StatData from '../../../models/Stat'
import withSign from '../../../utils/withSign'
import Conditional from '../../../components/Conditional'
import EditIcon from '@material-ui/icons/Edit'
import api from '../../../services/api'

interface StatProps {
  data: StatData
  canDelete: boolean
  handleEdit: (data: StatData) => () => void
  mutate: () => void
}

const Stat: React.FC<StatProps> = ({ data, canDelete, handleEdit, mutate }) => {
  const value = useMemo(
    () =>
      data.current +
      (data.modifiers?.reduce((sum, modifier) => sum + modifier.value, 0) ?? 0),
    [data]
  )

  const handleDelete = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      try {
        await api.delete(`/stats/${data.id}`)
        mutate()
      } catch {
        console.error('Não foi posível apagar este status')
      }
    },
    [data]
  )

  return (
    <Container onClick={handleEdit(data)}>
      <ul>
        <li>{data.label}</li>
        <li>{value}</li>
      </ul>
      <div className="actions">
        <EditIcon color="disabled" className="visibility" fontSize="small" />
        <Conditional visible={(data.modifiers?.length ?? 0) > 0}>
          <Tooltip
            title={
              <>
                {data.modifiers?.map(modifier => (
                  <Modifier key={modifier.id}>
                    <p className="label">{modifier.label}</p>
                    <p className={modifier.value < 0 ? 'red' : undefined}>
                      {withSign(modifier.value)}
                    </p>
                  </Modifier>
                ))}
              </>
            }
          >
            <InfoIcon />
          </Tooltip>
        </Conditional>
        <Conditional visible={canDelete}>
          <IconButton size="small" onClick={handleDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </Conditional>
      </div>
    </Container>
  )
}

export default React.memo(Stat)
