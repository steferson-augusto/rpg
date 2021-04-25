import React, { useEffect, useRef } from 'react'
import { useField } from '@unform/core'
import { StandardTextFieldProps, TextField } from '@material-ui/core'

type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N

type InputProps = Merge<
  StandardTextFieldProps,
  {
    name: string
    variant?: 'standard' | 'filled' | 'outlined'
    maxWidth?: number
    minWidth?: number
    min?: number
    max?: number
  }
>

const Input: React.FC<InputProps> = ({
  name,
  min,
  max,
  maxWidth,
  minWidth,
  ...rest
}) => {
  const inputRef = useRef(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return rest?.type === 'number'
          ? Number(ref.current.value)
          : ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: ref => {
        ref.current.value = ''
      }
    })
  }, [fieldName, registerField])

  return (
    <TextField
      name={name}
      defaultValue={defaultValue}
      error={Boolean(error)}
      style={{
        maxWidth: maxWidth ?? '100%',
        minWidth: minWidth ?? maxWidth ?? 150
      }}
      inputProps={{ min, max }}
      {...rest}
      inputRef={inputRef}
    />
  )
}

export default React.memo(Input)
