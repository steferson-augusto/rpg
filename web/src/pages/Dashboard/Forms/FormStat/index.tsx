import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { FormHandles } from '@unform/core'
import Button from '@material-ui/core/Button'

import { DrawerForm } from '../../../../components/Drawer'
import FormButton, {
  FormButtonHandles
} from '../../../../components/FormButton'
import { usePlayer } from '../../../../contexts/player'
import api from '../../../../services/api'
import Input from '../../../../components/Input'
import Stat from '../../../../models/Stat'

interface FormValues {
  label: string
  current: number
}

interface StatFormProps {
  data: Stat | null | undefined
  handleCancel: (() => void) | undefined
  mutate: () => void
}

const StatForm: React.FC<StatFormProps> = ({ data, handleCancel, mutate }) => {
  const formRef = useRef<FormHandles>(null)
  const formButtonRef = useRef<FormButtonHandles>(null)
  const { selected } = usePlayer()

  const disabled = useMemo(
    () =>
      data?.label === 'aparar' ||
      data?.label === 'resistência' ||
      data?.label === 'movimentação',
    [data]
  )

  useEffect(() => {
    const labelRef = formRef.current?.getFieldRef('label')
    labelRef?.current?.focus()
  }, [])

  const create = useCallback(
    async (values: FormValues) => {
      try {
        await api.post<Stat>('/stats', {
          ...values,
          userId: selected?.id
        })
        mutate?.()
        handleCancel?.()
      } catch {
        console.error('Não foi possível adicionar este status')
      }
    },
    [handleCancel, mutate, selected]
  )

  const update = useCallback(
    async (values: FormValues) => {
      try {
        await api.put<Stat>(`/stats/${data?.id}`, values)
        mutate?.()
        handleCancel?.()
      } catch {
        console.error('Não foi possível editar este status')
      }
    },
    [data, handleCancel, mutate]
  )

  const handleSubmit = useCallback(
    async (values: FormValues) => {
      data?.id ? update(values) : create(values)
    },
    [create, update]
  )

  return (
    <DrawerForm ref={formRef} onSubmit={handleSubmit}>
      <div className="content">
        <h4>{data?.id ? 'EDITAR' : 'ADICIONAR'} STATUS</h4>
        <Input
          name="label"
          label="Nome"
          variant="outlined"
          defaultValue={data?.label}
          disabled={disabled}
          required
          fullWidth
        />
        <Input
          name="current"
          label="Valor"
          variant="outlined"
          type="number"
          defaultValue={data?.current}
          disabled={disabled}
          required
          fullWidth
        />
      </div>

      <div className="actions">
        <Button variant="outlined" color="primary" onClick={handleCancel}>
          Cancelar
        </Button>
        <FormButton
          ref={formButtonRef}
          editing={Boolean(data?.id)}
          disabled={disabled}
        />
      </div>
    </DrawerForm>
  )
}

export default React.memo(StatForm)
