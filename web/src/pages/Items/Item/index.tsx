import React, { MouseEvent, useCallback } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import { Container } from './styles'
import { ItemData, OpenMenu } from '../../../models/Item'

interface ItemProps {
  item: ItemData
  index: number
  openMenu: OpenMenu
}

const Item: React.FC<ItemProps> = ({ item, index, openMenu }) => {
  const handleOpenMenuItem = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      openMenu(e, item, 'item')
    },
    [item]
  )

  return (
    <Draggable draggableId={`item-${item.id}`} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={snapshot.isDragging ? 'is-dragging' : undefined}
          elevation={2}
        >
          <div className="content">
            <h4>
              {item.label}
              <span>{item.quantity * item.weight} kg</span>
            </h4>
            <p>
              {item.quantity.toLocaleString()}{' '}
              {item.quantity > 1 ? 'unidades' : 'unidade'}
            </p>
          </div>
          <IconButton onClick={handleOpenMenuItem}>
            <MoreVertIcon />
          </IconButton>
        </Container>
      )}
    </Draggable>
  )
}

export default React.memo(Item)
