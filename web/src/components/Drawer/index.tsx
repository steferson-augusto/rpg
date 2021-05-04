import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState
} from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'

import { Container, DrawerForm as Form } from './styles'

export const DrawerForm = Form

export interface DrawerHandles {
  open: () => void
  close: () => void
  toggle: (status?: boolean) => () => void
}

interface DrawerProps {
  width?: number
  children: React.ReactNode
}

const Drawer: React.ForwardRefRenderFunction<DrawerHandles, DrawerProps> = (
  { children, width = 300 },
  ref
) => {
  const [open, setOpen] = useState(false)

  const toggleDrawer = useCallback(
    (status = !open) => () => {
      setOpen(status)
    },
    [open]
  )

  useImperativeHandle(ref, () => ({
    open: toggleDrawer(true),
    close: toggleDrawer(false),
    toggle: toggleDrawer
  }))

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <Container width={width}>{children}</Container>
    </SwipeableDrawer>
  )
}

export default forwardRef(Drawer)
