import React, { useEffect, useRef } from 'react'
import { useField } from '@unform/core'
import {
  Checkbox as CheckboxMUI,
  FormControlLabel,
  CheckboxProps
} from '@material-ui/core'

type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N

type InputProps = Merge<
  CheckboxProps,
  {
    name: string
    label: string
    fullWidth?: boolean
  }
>

const Checkbox: React.FC<InputProps> = ({
  name,
  label,
  fullWidth,
  ...rest
}) => {
  const inputRef = useRef(null)
  const { fieldName, defaultValue, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => ref.current.checked,
      setValue: (ref, value) => {
        ref.current.checked = value
      },
      clearValue: ref => {
        ref.current.checked = false
      }
    })
  }, [fieldName, registerField])

  return (
    <FormControlLabel
      control={
        <CheckboxMUI
          name={name}
          defaultChecked={defaultValue}
          inputRef={inputRef}
          {...rest}
        />
      }
      label={label}
      style={fullWidth ? { width: '100%' } : {}}
    />
  )
}

export default React.memo(Checkbox)
