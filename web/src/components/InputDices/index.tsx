import React, { useCallback, useEffect, useRef } from 'react'
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
    grouped?: boolean
  }
>

const Input: React.FC<InputProps> = ({
  name,
  maxWidth,
  minWidth,
  grouped = true,
  ...rest
}) => {
  const inputRef = useRef(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)

  const getValue = useCallback((value: string) => {
    if (value.length === 0) return []
    if (grouped) return value.split(' ')
    const list = value.split(' ').reduce<string[]>((result, dice) => {
      if (!dice.includes('d')) {
        result.push(dice)
        return result
      }

      const [quantityDirty, face] = dice.split('d')

      const quantity = Number(quantityDirty) || 1
      for (let i = 0; i < quantity; i++) {
        result.push(`d${face}`)
      }
      return result
    }, [])
    return list
  }, [])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => getValue(ref.current.value),
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: ref => {
        ref.current.value = ''
      }
    })
  }, [fieldName, registerField])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleKeyUp = useCallback((e: any) => {
    e.target.value = e.target.value.replaceAll(/[d]+/g, 'd')
    e.target.value = e.target.value.replaceAll(/([^d (0-9)+-])+/g, '')
  }, [])

  return (
    <TextField
      name={name}
      defaultValue={defaultValue}
      error={Boolean(error)}
      style={{
        maxWidth: maxWidth ?? '100%',
        minWidth: minWidth ?? maxWidth ?? 150
      }}
      {...rest}
      inputRef={inputRef}
      onKeyUp={handleKeyUp}
    />
  )
}

export default React.memo(Input)
