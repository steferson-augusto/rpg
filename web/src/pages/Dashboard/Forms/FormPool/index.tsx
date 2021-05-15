import React, { useCallback, useEffect, useRef } from 'react'
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
import { useAuth } from '../../../../contexts/auth'
import Conditional from '../../../../components/Conditional'

interface FormValues {
  label: string
  current: number
  max?: number
}

interface FormPoolProps {
  data: Stat | null | undefined
  mutate: {
    create: (pool: Stat) => void
    update: (pool: Stat) => void
  }
  handleCancel: (() => void) | undefined
}

const FormPool: React.FC<FormPoolProps> = ({ data, mutate, handleCancel }) => {
  const formRef = useRef<FormHandles>(null)
  const formButtonRef = useRef<FormButtonHandles>(null)
  const { user } = useAuth()
  const { selected } = usePlayer()

  useEffect(() => {
    const name = data?.id ? 'current' : 'label'
    const ref = formRef.current?.getFieldRef(name)
    ref?.current?.focus()
  }, [])

  const create = useCallback(
    async (values: FormValues) => {
      try {
        const { data } = await api.post<Stat>('/stats', {
          ...values,
          userId: selected?.id,
          energy: true
        })
        mutate.create?.(data)
        formButtonRef.current?.stopLoading()
        handleCancel?.()
      } catch {
        formButtonRef.current?.stopLoading()
        console.error('Não foi possível adicionar este status')
      }
    },
    [handleCancel, mutate, selected]
  )

  const update = useCallback(
    async (values: FormValues) => {
      try {
        const response = await api.put<Stat>(`/stats/${data?.id}/pool`, values)
        mutate.update(response.data)
        formButtonRef.current?.stopLoading()
        handleCancel?.()
      } catch {
        formButtonRef.current?.stopLoading()
        console.error('Não foi possível editar este status')
      }
    },
    [data, handleCancel, mutate]
  )

  const handleSubmit = useCallback(
    (values: FormValues) => {
      formButtonRef.current?.startLoading()
      data?.id ? update(values) : create(values)
    },
    [create, update, formButtonRef]
  )

  return (
    <DrawerForm ref={formRef} onSubmit={handleSubmit}>
      <div className="content">
        <h4>{data?.id ? 'EDITAR' : 'ADICIONAR'} POOL</h4>
        <Input
          name="label"
          label="Nome"
          variant="outlined"
          defaultValue={data?.label}
          disabled={!user?.isMaster}
          required
          fullWidth
        />
        <Conditional visible={user?.isMaster}>
          <Input
            name="max"
            label="Tamanho máximo"
            variant="outlined"
            defaultValue={data?.max}
            type="number"
            min={2}
            required
            fullWidth
          />
        </Conditional>
        <Input
          name="current"
          label="Valor atual"
          variant="outlined"
          defaultValue={data?.current}
          type="number"
          min={0}
          max={data?.max ?? undefined}
          required
          fullWidth
        />
      </div>

      <div className="actions">
        <Button variant="outlined" color="primary" onClick={handleCancel}>
          Cancelar
        </Button>
        <FormButton ref={formButtonRef} editing={Boolean(data?.id)} />
      </div>
    </DrawerForm>
  )
}

export default React.memo(FormPool)
