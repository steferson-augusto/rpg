/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import api from './api'

export const TOKEN_KEY = '@RPG'

export const getToken = () => localStorage.getItem(`${TOKEN_KEY}:token`)

export const getUser = () =>
  JSON.parse(localStorage.getItem(`${TOKEN_KEY}:user`) as string) ?? null

const login = (data: any): void => {
  console.log(data)
  localStorage.setItem(`${TOKEN_KEY}:token`, data?.token)
  localStorage.setItem(`${TOKEN_KEY}:user`, JSON.stringify(data?.user))
}

export const logout = (): void => {
  localStorage.removeItem(`${TOKEN_KEY}:token`)
  localStorage.removeItem(`${TOKEN_KEY}:user`)
}

export const signin = async (code: string) => {
  const response = await api.post('/login', { code })
  login(response?.data)
  return response?.data
}
