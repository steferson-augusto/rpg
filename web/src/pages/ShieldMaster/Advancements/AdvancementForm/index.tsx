import React, { useCallback, useEffect, useRef } from 'react'
import { FormHandles } from '@unform/core'
import Button from '@material-ui/core/Button'

import { DrawerForm } from '../../../../components/Drawer'
import Input from '../../../../components/Input'
import FormButton, {
  FormButtonHandles
} from '../../../../components/FormButton'
import api from '../../../../services/api'
import Advancement from '../../../../models/Advancement'
import Checkbox from '../../../../components/Checkbox'

interface FormValues {
  label: string
  description: string
}

interface AdvancementFormProps {
  initialData: Advancement | undefined
  handleCancel: (() => void) | undefined
  mutate: (advancement: Advancement, editing: boolean) => void
}

const AdvancementForm: React.FC<AdvancementFormProps> = ({
  initialData,
  handleCancel,
  mutate
}) => {
  const formRef = useRef<FormHandles>(null)
  const formButtonRef = useRef<FormButtonHandles>(null)

  useEffect(() => {
    const labelRef = formRef.current?.getFieldRef('label')
    labelRef?.current?.focus()
  }, [])

  const create = useCallback(async (values: FormValues) => {
    try {
      formButtonRef.current?.startLoading()
      const { data } = await api.post<Advancement>('/advancements', values)
      mutate(data, false)
      handleCancel?.()
    } catch {
      formButtonRef.current?.stopLoading()
      console.error('Não foi possível adicionar esta vantagem')
    }
  }, [])

  const update = useCallback(async (values: FormValues) => {
    try {
      formButtonRef.current?.startLoading()
      const { data } = await api.put<Advancement>(
        `/advancements/${initialData?.id}`,
        values
      )
      mutate(data, true)
      handleCancel?.()
    } catch {
      formButtonRef.current?.stopLoading()
      console.error('Não foi possível editar esta vantagem')
    }
  }, [])

  const handleSubmit = useCallback(
    (values: FormValues) => {
      initialData?.id ? update(values) : create(values)
    },
    [initialData, handleCancel, mutate]
  )

  return (
    <DrawerForm ref={formRef} onSubmit={handleSubmit}>
      <div className="content">
        <h4>{initialData?.id ? 'Editar' : 'Adicionar'} Vantagem</h4>
        <Input
          name="label"
          label="Nome"
          variant="outlined"
          defaultValue={initialData?.label}
          min={3}
          max={24}
          fullWidth
          required
        />
        <Input
          name="description"
          label="Descrição"
          variant="outlined"
          defaultValue={initialData?.description}
          multiline
          rows={8}
          min={4}
          max={200}
          fullWidth
          required
        />
        <Checkbox
          name="hindrance"
          label="Desvantagem"
          color="primary"
          defaultChecked={initialData?.hindrance}
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
