import React from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'

import { RollValues } from '../../utils/roll'
import { Content } from './styles'

interface DialogRollProps extends RollValues {
  open: boolean
  title: string
  dices: string
  onClose: () => void
}

const DialogRoll: React.FC<DialogRollProps> = props => {
  const { onClose, open, title, dices, fixed, critical, history, total } = props

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="dialog-title" open={open}>
      <DialogTitle id="dialog-title">{title}</DialogTitle>

      <Content>
        <div className="row">
          <h4>Dados</h4>
          <p>{dices}</p>
        </div>
        <div className="row">
          <h4>Rolagem</h4>
          <p>{`[${history.join(', ')}]`}</p>
        </div>
        <div className="row inline">
          <div>
            <h4>Crítico</h4>
            <p>{critical}</p>
          </div>
          <div>
            <h4>Fixo</h4>
            <p>{fixed}</p>
          </div>
        </div>
        <div className="row">
          <h4>Resultado</h4>
          <h3>{total}</h3>
        </div>
      </Content>
    </Dialog>
  )
}

export default DialogRoll
