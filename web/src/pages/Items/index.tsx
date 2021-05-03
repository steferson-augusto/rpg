/* eslint-disable indent */
import React, { useCallback, useRef, useState } from 'react'
import produce from 'immer'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { Button, MenuItem } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

import { Container } from './styles'
import { ItemData, StorageData } from '../../models/Item'
import Storage from './Storage'
import Menu, { MenuHandles } from '../../components/Menu'
import Drawer, { DrawerHandles } from '../../components/Drawer'
import FormItem from './FormItem'
import FormStorage from './FormStorage'
import useSwr from '../../hooks/useSWR'
import { usePlayer } from '../../contexts/player'
import GenericState from '../../components/GenericState'
import api from '../../services/api'

const getOrder = (
  container: StorageData[] | ItemData[],
  source: number,
  destination: number,
  same: boolean
): number => {
  if (container.length === 0) return 1000

  if (destination === 0) {
    return container[0].order - 10
  }

  if (destination >= container.length) {
    return container[container.length - 1].order + 10
  }

  const destiny = container[destination].order

  if (destination < source || !same) {
    const previous = container?.[destination - 1]?.order ?? destiny - 20
    return (previous + destiny) / 2
  }
  const next = container?.[destination + 1]?.order ?? destiny + 20
  return (destiny + next) / 2
}

const Items: React.FC = () => {
  const [drawerType, setDrawerType] = useState<'storage' | 'item'>('storage')
  const [selectedItem, setSelectedItem] = useState<ItemData | null>(null)
  const [selectedStorage, setSelectedStorage] = useState<StorageData | null>(
    null
  )
  const menuRef = useRef<MenuHandles>(null)
  const drawerRef = useRef<DrawerHandles>(null)
  const { selected } = usePlayer()

  const { data, loading, error, mutate } = useSwr<StorageData[]>(
    `/storages/user/${selected?.id}`
  )

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source, type } = result

      if (!destination || !data) return

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return
      }

      if (type === 'storage') {
        const order = getOrder(data, source.index, destination.index, true)
        const id = data?.[source.index]?.id
        api.put(`/storages/${id}/order`, { order })
        const newData = produce(data, draft => {
          const [storage] = draft.splice(source.index, 1)
          draft.splice(destination.index, 0, storage)
        })
        mutate(newData, false)
        return
      }

      const [, sourceId] = source.droppableId.split('item-')
      const [, destinationId] = destination.droppableId.split('item-')

      if (!sourceId || !destinationId) return

      const sourceItem = data.find(storage => storage.id === Number(sourceId))
        ?.items?.[source.index]

      const storage = (data.find(
        storage => storage.id === Number(destinationId)
      ) as unknown) as StorageData

      const order = getOrder(
        storage.items,
        source.index,
        destination.index,
        sourceId === destinationId
      )

      api.put(`/items/${sourceItem?.id}/order`, {
        order,
        storageId: destinationId
      })
      const newData = produce(data, draft => {
        const sourceIndex = draft.findIndex(
          storage => storage.id === Number(sourceId)
        )

        const destinationIndex =
          sourceId === destinationId
            ? sourceIndex
            : draft.findIndex(storage => storage.id === Number(destinationId))

        if (sourceIndex >= 0 && destinationIndex >= 0) {
          const [item] = draft[sourceIndex].items.splice(source.index, 1)
          draft[destinationIndex].items.splice(destination.index, 0, item)
        }
      })
      mutate(newData, false)
    },
    [data]
  )

  const handleAddStorage = useCallback(() => {
    setDrawerType('storage')
    setSelectedStorage(null)
    drawerRef.current?.open()
  }, [drawerRef.current])

  const handleOpenMenu = useCallback(
    (
      e: React.MouseEvent<HTMLElement>,
      value: StorageData | ItemData,
      type: 'item' | 'storage' = 'item'
    ) => {
      setDrawerType(type)
      type === 'storage'
        ? setSelectedStorage(value as StorageData)
        : setSelectedItem(value as ItemData)
      menuRef.current?.open(e)
    },
    [menuRef.current]
  )

  const handleCreateItem = useCallback(
    (storage: StorageData) => {
      setDrawerType('item')
      setSelectedStorage(storage)
      setSelectedItem(null)
      drawerRef.current?.open()
    },
    [drawerRef.current]
  )

  const handleMenuEdit = useCallback(() => {
    menuRef.current?.close()
    drawerRef.current?.open()
  }, [drawerRef.current, menuRef.current])

  const deleteStorage = useCallback(async () => {
    try {
      await api.delete(`/storages/${selectedStorage?.id}`)
      const newData = produce(data, draft => {
        const index = draft?.findIndex(
          storage => storage.id === selectedStorage?.id
        )

        if (draft && index !== undefined && index >= 0) {
          draft?.splice(index, 1)
        }
      })
      mutate(newData, false)
    } catch {
      console.error('Não foi possível apagar este armazém')
    }
  }, [selectedStorage, data])

  const deleteItem = useCallback(async () => {
    try {
      await api.delete(`/items/${selectedItem?.id}`)
      const newData = produce(data, draft => {
        const storageIndex = draft?.findIndex(
          storage => storage.id === selectedItem?.storageId
        )

        if (draft && storageIndex !== undefined && storageIndex >= 0) {
          const index = draft[storageIndex].items.findIndex(
            item => item.id === selectedItem?.id
          )
          draft?.[storageIndex].items.splice(index, 1)
        }
      })
      mutate(newData, false)
    } catch {
      console.error('Não foi possível apagar este item')
    }
  }, [selectedItem, data, selectedStorage])

  const handleMenuDelete = useCallback(() => {
    menuRef.current?.close()
    drawerType === 'storage' ? deleteStorage() : deleteItem()
  }, [menuRef.current, drawerType])

  const mutateStorage = useCallback(
    (values: StorageData, create: boolean) => {
      if (create) {
        const newData = produce(data, draft => {
          draft?.push(values)
        })
        mutate(newData, false)
        return
      }

      const newData = produce(data, draft => {
        const index = draft?.findIndex(storage => storage.id === values.id)

        if (draft && index !== undefined && index >= 0) {
          draft[index].label = values.label
          draft[index].verify = values.verify
        }
      })
      mutate(newData, false)
    },
    [data]
  )

  const mutateItem = useCallback(
    (values: ItemData, create: boolean) => {
      if (create) {
        const newData = produce(data, draft => {
          const index = draft?.findIndex(
            storage => storage.id === values.storageId
          )
          draft?.[index as number]?.items.push(values)
        })
        mutate(newData, false)
        return
      }

      const newData = produce(data, draft => {
        const storageIndex = draft?.findIndex(
          storage => storage.id === values.storageId
        )

        if (draft && storageIndex !== undefined && storageIndex >= 0) {
          const index = draft[storageIndex].items.findIndex(
            item => item.id === values.id
          )
          if (index >= 0) {
            draft[storageIndex].items[index].label = values.label
            draft[storageIndex].items[index].quantity = values.quantity
            draft[storageIndex].items[index].weight = values.weight
          }
        }
      })
      mutate(newData, false)
    },
    [data]
  )

  if (loading || error) return <GenericState loading={loading} error={error} />

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="storages" direction="horizontal" type="storage">
        {provided => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {data?.map((storage, index) => {
              return (
                <Storage
                  key={storage.id}
                  storage={storage}
                  index={index}
                  openMenu={handleOpenMenu}
                  createItem={handleCreateItem}
                />
              )
            })}
            <Button
              variant="contained"
              color="secondary"
              style={{ minWidth: 290, maxHeight: 48, margin: 12 }}
              onClick={handleAddStorage}
            >
              <AddIcon />
            </Button>
            {provided.placeholder}
          </Container>
        )}
      </Droppable>

      <Menu ref={menuRef}>
        <MenuItem onClick={handleMenuEdit}>Editar</MenuItem>
        <MenuItem onClick={handleMenuDelete}>Remover</MenuItem>
      </Menu>

      <Drawer ref={drawerRef}>
        {drawerType === 'item' ? (
          <FormItem
            data={selectedItem}
            storageId={selectedStorage?.id}
            mutateItem={mutateItem}
            closeDrawer={drawerRef.current?.close}
          />
        ) : (
          <FormStorage
            data={selectedStorage}
            mutateStorage={mutateStorage}
            closeDrawer={drawerRef.current?.close}
          />
        )}
      </Drawer>
    </DragDropContext>
  )
}

export default Items
