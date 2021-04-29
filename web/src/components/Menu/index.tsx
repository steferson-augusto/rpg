import React, {
  forwardRef,
  MouseEvent,
  useCallback,
  useImperativeHandle,
  useState
} from 'react'
import MenuMui from '@material-ui/core/Menu'

export interface MenuHandles {
  open: (e: MouseEvent<HTMLElement>) => void
  close: () => void
}

interface MenuProps {
  children: React.ReactNode
}

const Menu: React.ForwardRefRenderFunction<MenuHandles, MenuProps> = (
  { children },
  ref
) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleOpen = useCallback((e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
  }, [])

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  useImperativeHandle(ref, () => ({
    open: handleOpen,
    close: handleClose
  }))

  return (
    <MenuMui
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {children}
    </MenuMui>
  )
}

export default forwardRef(Menu)
