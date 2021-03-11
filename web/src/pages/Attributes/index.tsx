import React, { useCallback, useState } from 'react'

import { Container } from './styles'
import Attribute from '../../components/Attribute'
import useSwr from '../../hooks/useSWR'
import { AttributeData } from '../../models'
import { RollValues } from '../../utils/roll'
import DialogRoll from '../../components/DialogRoll'
import { usePlayer } from '../../contexts/player'

export interface ModalValues extends RollValues {
  title: string
  dices: string
}

const Attributes: React.FC = () => {
  const { selected } = usePlayer()
  const { data } = useSwr<AttributeData[]>(`/attributes/${selected?.id}`)
  const [open, setOpen] = useState(false)
  const [modal, setModal] = useState<ModalValues>({
    title: '',
    dices: '',
    fixed: 0,
    critical: 0,
    history: [],
    total: 0
  })

  const handleClickOpen = useCallback(
    (newModal: ModalValues) => {
      setModal(newModal)
      setOpen(true)
    },
    [open]
  )

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <Container>
      {data?.map(attribute => (
        <Attribute
          key={attribute.id}
          id={attribute.id as number}
          title={attribute.label}
          values={attribute.dices}
          onRoll={handleClickOpen}
        />
      ))}
      <DialogRoll open={open} onClose={handleClose} {...modal} />
    </Container>
  )
}

export default Attributes
