import React, { useCallback, useMemo, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import CasinoIcon from '@material-ui/icons/Casino'

import { Container } from './styles'
import { AttributeData } from '../../../models'
import resumeDices from '../../../utils/resumeDices'
import { useDiscord } from '../../../contexts/discord'
import { DialogValues } from '../../../components/DialogRoll'

interface DiceProps {
  data: AttributeData
  handleOpenDialog: (values: DialogValues) => void
}

const Dice: React.FC<DiceProps> = ({ data, handleOpenDialog }) => {
  const [loading, setLoading] = useState(false)
  const dices = useMemo(() => resumeDices(data.dices), [data.dices])
  const { rollAttribute } = useDiscord()

  const handleRoll = useCallback(async () => {
    setLoading(true)
    try {
      const roll = await rollAttribute(data.label, dices)
      setLoading(false)
      handleOpenDialog({ title: data.label, dices: dices, ...roll })
    } catch {
      setLoading(false)
      console.error('Falha ao realizar rolagem dos dados')
    }
  }, [dices, handleOpenDialog])

  return (
    <Container>
      <ul>
        <li>{data.label}</li>
        <li>{dices}</li>
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

export default Dice
