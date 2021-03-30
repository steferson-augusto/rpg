import { ResponseLogin, UserData } from '../contexts/auth'
import api from './api'

export const TOKEN_KEY = '@RPG'

export const getToken = (): string =>
  localStorage.getItem(`${TOKEN_KEY}:token`) as string

export const getUser = (): UserData =>
  JSON.parse(localStorage.getItem(`${TOKEN_KEY}:user`) as string)

export const storeData = (token: string, user: UserData): void => {
  localStorage.setItem(`${TOKEN_KEY}:token`, token)
  localStorage.setItem(`${TOKEN_KEY}:user`, JSON.stringify(user))
}

export const logout = (): void => {
  localStorage.removeItem(`${TOKEN_KEY}:token`)
  localStorage.removeItem(`${TOKEN_KEY}:user`)
}

export const signin = async (code: string): Promise<ResponseLogin> => {
  const { data } = await api.post<ResponseLogin>('/login', { code })
  storeData(data.token.token, data.user)
  return data
}
