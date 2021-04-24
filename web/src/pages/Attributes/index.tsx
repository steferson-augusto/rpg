import React, { useCallback, useRef } from 'react'

import { Container } from './styles'
import Attribute from '../../components/Attribute'
import useSwr from '../../hooks/useSWR'
import { AttributeData } from '../../models'
import DialogRoll, {
  DialogRollHandles,
  DialogValues
} from '../../components/DialogRoll'
import { usePlayer } from '../../contexts/player'
import GenericState from '../../components/GenericState'

const Attributes: React.FC = () => {
  const dialogRef = useRef<DialogRollHandles>(null)
  const { selected } = usePlayer()
  const { data, loading, error } = useSwr<AttributeData[]>(
    `/attributes/${selected?.id}`
  )

  const handleClickOpen = useCallback(
    (newModal: DialogValues) => {
      dialogRef?.current?.open(newModal)
    },
    [open, dialogRef.current]
  )

  if (loading || error) return <GenericState loading={loading} error={error} />

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
      <DialogRoll ref={dialogRef} />
    </Container>
  )
}

export default Attributes
