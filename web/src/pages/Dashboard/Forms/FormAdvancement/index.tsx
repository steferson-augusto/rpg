import React, { useCallback, useMemo, useRef } from 'react'
import { FormHandles } from '@unform/core'
import Button from '@material-ui/core/Button'

import { Container } from './style'
import { DrawerForm } from '../../../../components/Drawer'
import FormButton, {
  FormButtonHandles
} from '../../../../components/FormButton'
import useSwr from '../../../../hooks/useSWR'
import Advancement from '../../../../models/Advancement'
import Animation from '../../../../components/Animation'
import SelectMultiple from '../../../../components/SelectMultiple'
import ErrorState from '../../../../components/ErrorState'
import { usePlayer } from '../../../../contexts/player'
import api from '../../../../services/api'

interface FormValues {
  advancements: number[]
}

interface AdvancementFormProps {
  handleCancel: (() => void) | undefined
  mutate: () => void
}

const AdvancementForm: React.FC<AdvancementFormProps> = ({
  handleCancel,
  mutate
}) => {
  const formRef = useRef<FormHandles>(null)
  const formButtonRef = useRef<FormButtonHandles>(null)
  const { selected } = usePlayer()

  const { data, loading, error } = useSwr<Advancement[]>('/advancements')

  const advancements = useMemo(
    () =>
      data?.map(advancement => ({
        value: advancement.id,
        label: advancement.label
      })) || [],
    [data]
  )

  const handleSubmit = useCallback(
    async (values: FormValues) => {
      try {
        const data = values.advancements.map(advancementId => ({
          userId: selected?.id,
          advancementId
        }))

        await api.post('/user/advancements', { advancements: data })
        mutate()
        handleCancel?.()
      } catch {
        console.error(
          'Não foi possível adicionar nenhuma vantagem ou complicação'
        )
      }
    },
    [handleCancel, mutate, selected]
  )

  if (loading) {
    return (
      <Container>
        <Animation height="280px" />
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <ErrorState />
      </Container>
    )
  }

  return (
    <DrawerForm ref={formRef} onSubmit={handleSubmit}>
      <div className="content">
        <h4>ADICIONAR VANTAGEM</h4>
        <SelectMultiple
          name="advancements"
          label="Vantagens"
          variant="outlined"
          options={advancements}
          fullWidth
        />
      </div>

      <div className="actions">
        <Button variant="outlined" color="primary" onClick={handleCancel}>
          Cancelar
        </Button>
        <FormButton ref={formButtonRef} editing={false} />
      </div>
    </DrawerForm>
  )
}

export default React.memo(AdvancementForm)
