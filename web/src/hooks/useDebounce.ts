/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useState, useEffect } from 'react'

const useDebounce = <T = any>(value: T, delay = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }

    /* eslint-disable */
    }, [value])
    return debouncedValue
}

export default useDebounce
