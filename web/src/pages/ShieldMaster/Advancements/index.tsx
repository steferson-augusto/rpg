import React, { useCallback, useRef, useState } from 'react'
import produce from 'immer'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import { Container } from './styles'
import useSwr from '../../../hooks/useSWR'
import Advancement from '../../../models/Advancement'
import Drawer, { DrawerHandles } from '../../../components/Drawer'
import AdvancementForm from './AdvancementForm'
import api from '../../../services/api'

const Advancements: React.FC = () => {
  const ref = useRef<DrawerHandles>(null)
  const [editing, setEditing] = useState<Advancement | undefined>()
  const { data, mutate } = useSwr<Advancement[]>('/advancements')

  const handleOpenDrawer = useCallback(() => {
    ref?.current?.open()
  }, [ref])

  const mutateAvancement = useCallback(
    (advancement: Advancement, editing: boolean) => {
      if (editing) {
        const updated = produce(data, draft => {
          const index = draft?.findIndex(old => old.id === advancement.id)
          if (index !== undefined && draft !== undefined) {
            draft[index].label = advancement.label
            draft[index].description = advancement.description
            draft[index].hindrance = advancement.hindrance
          }
        })
        mutate(updated, false)
        return
      }

      const newData = produce(data, draft => {
        draft?.unshift(advancement)
      })
      mutate(newData, true)
    },
    []
  )

  const handleEdit = useCallback(
    (advancement: Advancement) => () => {
      setEditing(advancement)
      ref.current?.open()
    },
    [ref]
  )

  const handleDelete = useCallback(
    (id: number) => async () => {
      try {
        await api.delete(`/advancements/${id}`)
        const newData = data?.filter(advancement => advancement.id !== id)
        mutate(newData, false)
      } catch {
        console.error('Falha ao apagar vantagem')
      }
    },
    [data]
  )

  return (
    <Container>
      {data?.length === 0 && (
        <p className="empty-state">Não há vantagens cadastradas</p>
      )}
      <div className="content">
        {data?.map(advancement => (
          <div key={advancement.id} className="advancement">
            <div className="list">
              <h3 className={advancement.hindrance ? 'hindrance' : undefined}>
                {advancement.label}
              </h3>
              <p>{advancement.description}</p>
            </div>
            <div className="actions">
              <IconButton onClick={handleEdit(advancement)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={handleDelete(advancement.id)}>
                <DeleteIcon color="error" />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
      <IconButton
        color="primary"
        className="discord-button"
        onClick={handleOpenDrawer}
      >
        <AddIcon />
      </IconButton>
      <Drawer ref={ref}>
        <AdvancementForm
          initialData={editing}
          handleCancel={ref.current?.close}
          mutate={mutateAvancement}
        />
      </Drawer>
    </Container>
  )
}

export default Advancements
