import '@testing-library/jest-dom/extend-expect'

import {
  getToken,
  getUser,
  storeData,
  logout,
  signin
} from '../../services/auth'

const user = {
  id: 1,
  discordId: 'id',
  username: 'username',
  avatar: 'avatar',
  isBot: false,
  isPlayer: true,
  isMaster: false,
  created_at: 'yesterday',
  updated_at: 'today'
}

describe('Funções de autenticação', () => {
  beforeEach(() => window.localStorage.clear())

  it('Deve obter token de autenticação', () => {
    let value = getToken()
    expect(value).toBeFalsy()

    window.localStorage.setItem('@RPG:token', 'access_token')
    value = getToken()
    expect(value).toBe('access_token')
  })

  it('Deve obter usuário salvo', () => {
    let data = getUser()
    expect(data).toBeFalsy()

    const storedUser = JSON.stringify(user)
    window.localStorage.setItem('@RPG:user', storedUser)
    data = getUser()
    expect(data).toStrictEqual(user)
  })

  it('Deve salvar token e usuário em local storage', () => {
    storeData('bearer token', user)

    const token = window.localStorage.getItem('@RPG:token')
    expect(token).toBe('bearer token')

    const userStored = window.localStorage.getItem('@RPG:user')
    expect(userStored).toBe(JSON.stringify(user))
  })

  it('Deve apagar token e usuário do local storage', () => {
    window.localStorage.setItem('@RPG:token', 'token')
    window.localStorage.setItem('@RPG:user', JSON.stringify(user))

    logout()
    const token = window.localStorage.getItem('@RPG:token')
    const userStoraged = window.localStorage.getItem('@RPG:user')
    expect(token).toBeFalsy()
    expect(userStoraged).toBeFalsy()
  })

  it('Deve realizar request de login e salvar informações em local storage', async () => {
    const response = await signin('discord_code')

    const token = window.localStorage.getItem('@RPG:token')
    expect(token).toBe(response.token.token)

    const user = window.localStorage.getItem('@RPG:user')
    expect(user).toBe(JSON.stringify(response.user))

    const data = {
      user: {
        id: 12345,
        discordId: '123456',
        username: 'username',
        avatar: 'avatar',
        isBot: false,
        isPlayer: true,
        isMaster: false,
        created_at: 'yesterday',
        updated_at: 'today'
      },
      token: {
        token: 'token test',
        type: 'bearer'
      },
      discord: {
        refresh_token: 'five minutes',
        scope: 'scope1 scope2',
        token: 'discord token test',
        token_type: 'bearer'
      }
    }
    expect(data).toStrictEqual(response)
  })
})
