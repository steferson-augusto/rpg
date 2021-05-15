import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useField } from '@unform/core'
import {
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Chip
} from '@material-ui/core'

import { Chips } from './styles'

interface Options {
  value: number | string
  label: string
}

interface SelectMultipleProps {
  name: string
  label: string
  options: Options[]
  variant?: 'standard' | 'filled' | 'outlined'
  fullWidth?: boolean
  className?: string
  defaultValue?: Array<string | number>
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

const SelectMultiple: React.FC<SelectMultipleProps> = ({
  name,
  label,
  options,
  variant = 'outlined',
  fullWidth = true,
  className,
  defaultValue
}) => {
  const [values, setValues] = useState<Array<string | number>>(
    defaultValue || []
  )
  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, registerField } = useField(name)

  const renderValue = useCallback(() => {
    const renderValues = options.filter(option => values.includes(option.value))

    return (
      <Chips>
        {renderValues.map((value, index) => (
          <Chip key={index} className="chip" label={value.label} />
        ))}
      </Chips>
    )
  }, [values.length, options])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: () => {
        return values ?? []
      },
      setValue: (_, values) => {
        setValues(values)
      },
      clearValue: () => {
        setValues([])
      }
    })
  }, [fieldName, registerField, values])

  const handleChange = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      setValues(event.target.value as string[])
    },
    []
  )

  return (
    <FormControl className={className} variant={variant} fullWidth={fullWidth}>
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        multiple
        value={values}
        label={label}
        onChange={handleChange}
        renderValue={renderValue}
        MenuProps={MenuProps}
        inputProps={{ ref: inputRef }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            <ListItemText primary={option.label} className="capitalize" />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default React.memo(SelectMultiple)
