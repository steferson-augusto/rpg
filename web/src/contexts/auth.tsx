/* eslint-disable camelcase */
import React, { createContext, useState, useEffect, useContext } from 'react'
import api from '../services/api'
import * as auth from '../services/auth'

export interface UserData {
  id: number
  discordId: string
  username: string
  email?: string
  avatar: string
  isBot: boolean
  isPlayer: boolean
  isMaster: boolean
  created_at: string
  updated_at: string
  remember_me_token?: string | null
}

export interface TokenData {
  token: string
  type: string
}

interface DiscordData {
  refresh_token: string
  scope: string
  token: string
  token_type: string
}

export interface ResponseLogin {
  discord: DiscordData
  token: TokenData
  user: UserData
}

interface AuthContextData {
  signed: boolean
  user: UserData | null
  signin: (code: string) => Promise<ResponseLogin>
  signout: () => void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null)

  useEffect(() => {
    const localUser = auth.getUser()
    const localToken = auth.getToken()
    if (localUser && localToken) {
      api.defaults.headers.Authorization = `Bearer ${localToken}`
      setUser(localUser)
    }
  }, [])

  const signin = async (code: string): Promise<ResponseLogin> => {
    const response = await auth.signin(code)
    api.defaults.headers.Authorization = `Bearer ${response?.token.token}`
    setUser(response?.user)
    return response
  }

  const signout = () => {
    auth.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext)

  return context
}
