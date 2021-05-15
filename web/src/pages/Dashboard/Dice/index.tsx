import React, { useCallback, useMemo, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import CasinoIcon from '@material-ui/icons/Casino'

import { Container } from './styles'
import { AttributeData, AttributeLabel } from '../../../models'
import resumeDices from '../../../utils/resumeDices'
import { useDiscord } from '../../../contexts/discord'
import { DialogValues } from '../../../components/DialogRoll'
import Skill from '../../../models/Skill'
import withSign from '../../../utils/withSign'

interface DiceProps {
  data: AttributeData | Skill
  handleOpenDialog: (values: DialogValues) => void
}

const Dice: React.FC<DiceProps> = ({ data, handleOpenDialog }) => {
  const [loading, setLoading] = useState(false)
  const powerPoints = useMemo(() => {
    const value = withSign((data as Skill)?.powerPoints ?? 0)
    return value.length > 0 ? ` ${value}` : ''
  }, [])
  const dices = useMemo(() => {
    return resumeDices(data.dices)
  }, [data.dices])
  const { rollAttribute, rollSkill } = useDiscord()

  const handleRoll = useCallback(async () => {
    setLoading(true)
    try {
      const withPowerPoints = `${dices}${powerPoints}`
      const roll =
        (data as Skill)?.pinned !== undefined
          ? await rollSkill(data.label, withPowerPoints)
          : await rollAttribute(data.label as AttributeLabel, dices)
      setLoading(false)
      handleOpenDialog({ title: data.label, dices: withPowerPoints, ...roll })
    } catch {
      setLoading(false)
      console.error('Falha ao realizar rolagem dos dados')
    }
  }, [dices, powerPoints, handleOpenDialog])

  return (
    <Container>
      <ul>
        <li>{data.label}</li>
        <li>
          {dices}
          <span>{powerPoints}</span>
        </li>
      </ul>
      <IconButton size="small" onClick={handleRoll} disabled={loading}>
        {loading ? (
          <CircularProgress size={24} color="primary" />
        ) : (
          <CasinoIcon />
        )}
      </IconButton>
    </Container>
  )
}

export default React.memo(Dice)
