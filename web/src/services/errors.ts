export interface Error {
  message: string
  field: string
  validation?: string
}

export const hasError = (field: string, errors: Error[]): boolean => {
  console.log('hasError')
  let has = false
  errors.every(err => {
    has = err.field === field
    return !has
  })
  return has
}

export const getError = (field: string, errors: Error[]): string => {
  console.log('getError')
  let message = ''
  let has = false
  errors.every(err => {
    has = err.field === field
    if (has) message = err.message
    return !has
  })
  return message
}
