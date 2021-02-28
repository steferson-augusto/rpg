import React, { createContext, useState, useEffect, useContext } from 'react'
import api from '../services/api'
import * as auth from '../services/auth'

interface UserData {
  email: string
  id?: number
  name: string
  status?: number
}

interface Response {
  token: string
  user: UserData
}

interface AuthContextData {
  signed: boolean
  user: UserData | null
  signin: (code: string) => Promise<Response>
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

  const signin = async (code: string): Promise<Response> => {
    const response = await auth.signin(code)
    api.defaults.headers.Authorization = `Bearer ${response?.token}`
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
