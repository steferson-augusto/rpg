import React, { MouseEvent, useCallback, useMemo } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import Fab from '@material-ui/core/Fab'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import { Container } from './styles'
import { StorageData, OpenMenu } from '../../../models/Item'
import Item from '../Item'

interface StorageProps {
  storage: StorageData
  index: number
  openMenu: OpenMenu
  createItem: (storage: StorageData) => void
}

const Storage: React.FC<StorageProps> = ({
  storage,
  index,
  openMenu,
  createItem
}) => {
  const weight = useMemo(
    () =>
      storage.items.reduce((sum, item) => sum + item.quantity * item.weight, 0),
    [storage.items]
  )

  const handleAddItem = useCallback(() => {
    createItem(storage)
  }, [storage])

  const handleOpenMenuStorage = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      openMenu(e, storage, 'storage')
    },
    [storage]
  )

  return (
    <Draggable draggableId={`storage-${storage.id}`} index={index}>
      {provided => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <div className="header" {...provided.dragHandleProps}>
            <h3>
              {storage.label}
              {weight > 0 && <span>{weight} kg</span>}
            </h3>
            <IconButton onClick={handleOpenMenuStorage}>
              <MoreVertIcon />
            </IconButton>
          </div>

          <Droppable droppableId={`item-${storage.id}`} type="item">
            {(provided, snapshot) => (
              <div
                className={`items ${
                  snapshot.isDraggingOver ? 'is-dragging' : ''
                }`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {storage.items.map((item, index) => (
                  <Item
                    key={item.id}
                    item={item}
                    index={index}
                    openMenu={openMenu}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Fab color="primary" aria-label="adicionar" onClick={handleAddItem}>
            <AddIcon />
          </Fab>
        </Container>
      )}
    </Draggable>
  )
}

export default React.memo(Storage)
