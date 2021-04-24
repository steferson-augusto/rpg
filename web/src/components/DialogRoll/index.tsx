import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState
} from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'

import { RollValues } from '../../utils/roll'
import { Content } from './styles'

export interface DialogValues extends RollValues {
  title: string
  dices: string
}

export interface DialogRollHandles {
  open: (values: DialogValues) => void
  close: () => void
}

const DialogRoll: React.ForwardRefRenderFunction<DialogRollHandles> = (
  props,
  ref
) => {
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState<DialogValues>({
    title: '',
    dices: '',
    fixed: 0,
    critical: 0,
    history: [],
    total: 0
  })

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  useImperativeHandle(ref, () => ({
    open: values => {
      setValues(values)
      setOpen(true)
    },
    close: handleClose
  }))

  return (
    <Dialog onClose={handleClose} aria-labelledby="dialog-title" open={open}>
      <DialogTitle id="dialog-title">{values.title}</DialogTitle>

      <Content>
        <div className="row">
          <h4>Dados</h4>
          <p>{values.dices}</p>
        </div>
        <div className="row">
          <h4>Rolagem</h4>
          <p>{`[${values.history.join(', ')}]`}</p>
        </div>
        <div className="row inline">
          <div>
            <h4>Crítico</h4>
            <p>{values.critical}</p>
          </div>
          <div>
            <h4>Fixo</h4>
            <p>{values.fixed}</p>
          </div>
        </div>
        <div className="row">
          <h4>Resultado</h4>
          <h3>{values.total}</h3>
        </div>
      </Content>
    </Dialog>
  )
}

export default forwardRef(DialogRoll)
