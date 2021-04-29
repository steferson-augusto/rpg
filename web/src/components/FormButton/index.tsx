import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState
} from 'react'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

interface FormButtonProps {
  editing: boolean
}

export interface FormButtonHandles {
  startLoading: () => void
  stopLoading: () => void
}

const FormButton: React.ForwardRefRenderFunction<
  FormButtonHandles,
  FormButtonProps
> = ({ editing }, ref) => {
  const [loading, setLoading] = useState(false)

  const startLoading = useCallback(() => {
    setLoading(true)
  }, [])

  const stopLoading = useCallback(() => {
    setLoading(false)
  }, [])

  useImperativeHandle(ref, () => ({ startLoading, stopLoading }))

  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      disabled={loading}
      style={{ minWidth: 109 }}
    >
      {loading ? (
        <CircularProgress size={24} color="secondary" />
      ) : editing ? (
        'Salvar'
      ) : (
        'Adicionar'
      )}
    </Button>
  )
}

export default forwardRef(FormButton)
