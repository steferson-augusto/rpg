import React, { useCallback, useEffect, useRef } from 'react'
import { FormHandles } from '@unform/core'
import Button from '@material-ui/core/Button'

import { StorageData } from '../../../models/Item'
import { DrawerForm } from '../../../components/Drawer/styles'
import Input from '../../../components/Input'
import Checkbox from '../../../components/Checkbox'
import FormButton, { FormButtonHandles } from '../../../components/FormButton'
import api from '../../../services/api'

interface FormValues {
  label: string
  verify: boolean
}

interface FormStorageProps {
  data: StorageData | null
  mutateStorage: (values: StorageData, create: boolean) => void
  closeDrawer: (() => void) | undefined
}

const FormStorage: React.FC<FormStorageProps> = ({
  data,
  mutateStorage,
  closeDrawer
}) => {
  const formRef = useRef<FormHandles>(null)
  const formButtonRef = useRef<FormButtonHandles>(null)

  useEffect(() => {
    const labelRef = formRef.current?.getFieldRef('label')
    labelRef?.current?.focus()
  }, [])

  const create = useCallback(
    async (values: FormValues) => {
      try {
        const { data } = await api.post<StorageData>('/storages', values)
        mutateStorage({ ...data, items: [] }, true)
        formButtonRef.current?.stopLoading()
        closeDrawer?.()
      } catch {
        formButtonRef.current?.stopLoading()
        console.error('Falha ao criar armazém')
      }
    },
    [formButtonRef.current, closeDrawer]
  )

  const update = useCallback(
    async (values: FormValues) => {
      try {
        const response = await api.put<StorageData>(
          `/storages/${data?.id}`,
          values
        )
        mutateStorage({ ...data, ...response.data }, false)
        formButtonRef.current?.stopLoading()
        closeDrawer?.()
      } catch {
        formButtonRef.current?.stopLoading()
        console.error('Falha ao editar armazém')
      }
    },
    [data, formButtonRef.current, closeDrawer]
  )

  const handleSubmit = useCallback(
    (values: FormValues) => {
      formButtonRef.current?.startLoading()
      data?.id ? update(values) : create(values)
    },
    [formButtonRef.current, closeDrawer]
  )

  return (
    <DrawerForm ref={formRef} onSubmit={handleSubmit}>
      <div className="content">
        <h4>{data?.id ? 'Editar' : 'Adicionar'} armazém</h4>

        <Input
          name="label"
          label="Nome"
          variant="outlined"
          defaultValue={data?.label}
          fullWidth
          minLength={3}
          required
        />
        <Checkbox
          name="verify"
          label="Verificar peso"
          defaultChecked={data?.verify}
          color="primary"
          fullWidth
        />
      </div>
      <div className="actions">
        <Button variant="outlined" color="primary" onClick={closeDrawer}>
          Cancelar
        </Button>
        <FormButton ref={formButtonRef} editing={Boolean(data?.id)} />
      </div>
    </DrawerForm>
  )
}

export default React.memo(FormStorage)
