/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
  ChangeEvent
} from 'react'
import {
  CircularProgress,
  FormHelperText,
  TextField as TextInput
} from '@material-ui/core'
import {
  Autocomplete as MaterialAutocomplete,
  AutocompleteProps as BaseAutocompleteProps
} from '@material-ui/lab'
import { useField } from '@unform/core'

interface AutocompleteOption {
  label: string
  value: string | number
}

interface AutocompleteProps
  extends Omit<
    BaseAutocompleteProps<
      any,
      boolean | undefined,
      boolean | undefined,
      boolean | undefined
    >,
    'renderInput'
  > {
  name: string
  label: string
  options: AutocompleteOption[]
  required?: boolean
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  id,
  name,
  label,
  options,
  loading,
  defaultValue,
  value: valueProp,
  multiple,
  required = false,
  ...restProps
}) => {
  const {
    fieldName,
    registerField,
    defaultValue: defaultFieldValue,
    error
  } = useField(name)

  const inputRef = useRef(null)
  const defaultInputValue = useMemo(() => {
    if (multiple) {
      return defaultFieldValue || defaultValue || []
    }
    return defaultFieldValue || defaultValue || ''
  }, [defaultFieldValue, defaultValue, multiple])

  const [inputValue, setInputValue] = useState(defaultInputValue)

  const _handleChange = useCallback(
    (event, selectedOptions: AutocompleteOption | null) => {
      let value: number | number[] | string | string[]

      if (multiple && Array.isArray(selectedOptions)) {
        value = selectedOptions.map(item => String(item.value))
      } else {
        value = selectedOptions ? selectedOptions.value : ''
      }

      setInputValue(() => value)
    },
    [setInputValue, multiple]
  )

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }, [])

  useEffect(() => {
    if (fieldName) {
      registerField({
        name: fieldName,
        ref: inputRef.current,
        getValue() {
          return valueProp || inputValue
        }
      })
    }
  }, [fieldName, registerField, _handleChange, valueProp, inputValue])

  return (
    <>
      <MaterialAutocomplete
        {...restProps}
        id={id}
        options={options}
        // defaultValue={defaultInputValue || inputValue}
        loading={loading}
        freeSolo
        multiple={multiple}
        onChange={_handleChange}
        getOptionLabel={item => item?.label}
        getOptionSelected={(option, value) => option.value === value.value}
        renderInput={params => {
          return (
            <TextInput
              {...params}
              name={name}
              label={label}
              variant="outlined"
              required={required}
              fullWidth
              onChange={handleInputChange}
              inputRef={inputRef}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                )
              }}
            />
          )
        }}
      />

      {!!error && <FormHelperText>{error}</FormHelperText>}
    </>
  )
}

export default React.memo(Autocomplete)
