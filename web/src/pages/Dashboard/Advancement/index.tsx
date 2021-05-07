import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'

import { Container } from './styles'
import AdvancementData from '../../../models/Advancement'
import InfoIcon from '@material-ui/icons/Info'

interface AdvancementProps {
  data: AdvancementData
}

const Advancement: React.FC<AdvancementProps> = ({ data }) => {
  return (
    <Container>
      <p className={data.hindrance ? 'hindrance' : undefined}>{data.label}</p>
      <Tooltip title={data.description}>
        <InfoIcon />
      </Tooltip>
    </Container>
  )
}

export default React.memo(Advancement)
