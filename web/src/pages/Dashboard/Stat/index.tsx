import React, { useMemo } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import InfoIcon from '@material-ui/icons/Info'

import { Container, Modifier } from './styles'
import StatData from '../../../models/Stat'
import withSign from '../../../utils/withSign'

interface StatProps {
  data: StatData
}

const Stat: React.FC<StatProps> = ({ data }) => {
  const value = useMemo(
    () =>
      data.current +
      (data.modifiers?.reduce((sum, modifier) => sum + modifier.value, 0) ?? 0),
    [data]
  )

  return (
    <Container>
      <ul>
        <li>{data.label}</li>
        <li>{value}</li>
      </ul>
      {(data.modifiers?.length ?? 0) > 0 && (
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
      )}
    </Container>
  )
}

export default React.memo(Stat)
