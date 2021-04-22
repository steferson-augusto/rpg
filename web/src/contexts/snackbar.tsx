import React, { createContext, useCallback, useContext, useState } from 'react'
import { IconButton, Snackbar } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

interface SnackbarContextData {
  open: (message: string) => void
}

const SnackbarContext = createContext<SnackbarContextData>(
  {} as SnackbarContextData
)

export const SnackbarProvider: React.FC = ({ children }) => {
  const [message, setMessage] = useState('')

  const handleSetMessage = useCallback((text: string) => {
    setMessage(text)
  }, [])

  const handleClose = useCallback((_, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setMessage('')
  }, [])

  return (
    <SnackbarContext.Provider value={{ open: handleSetMessage }}>
      {children}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={Boolean(message)}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </SnackbarContext.Provider>
  )
}

export const useSnackbar = (): SnackbarContextData => {
  const context = useContext(SnackbarContext)

  return context
}
