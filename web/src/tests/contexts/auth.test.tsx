import React from 'react'
import { render, screen } from '@testing-library/react'
import { fireEvent, waitFor } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'

import { AuthProvider, useAuth } from '../../contexts/auth'

const Consumer: React.FC = () => {
  const { signed, user, signin, signout } = useAuth()

  const handleLogout = () => {
    signout()
  }

  const handleLogin = async () => {
    try {
      await signin('discord code')
    } catch {
      console.log('login error')
    }
  }

  return (
    <div>
      <span aria-label="signed">signed: {signed.toString()}</span>
      <span aria-label="id">id: {user?.id ?? 'null'}</span>
      <span aria-label="discord">discord: {user?.discordId ?? 'null'}</span>
      <span aria-label="avatar">avatar: {user?.avatar ?? 'null'}</span>
      <span aria-label="player">player: {String(user?.isPlayer)}</span>

      <button aria-label="logout" onClick={handleLogout}>
        Logout
      </button>
      <button aria-label="login" onClick={handleLogin}>
        Login
      </button>
    </div>
  )
}

describe('Context - auth', () => {
  test('deve realizar login e logout', async () => {
    const { container, findByLabelText } = render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>
    )

    expect(container).toBeInTheDocument()

    let signed = await findByLabelText('signed')
    const id = await findByLabelText('id')
    const discord = await findByLabelText('discord')
    const avatar = await findByLabelText('avatar')
    const player = await findByLabelText('player')

    const verify = (
      signedValue = 'false',
      idValue = 'null',
      discordValue = 'null',
      avatarValue = 'null',
      playerValue = 'undefined'
    ) => {
      expect(signed.textContent).toBe(`signed: ${signedValue}`)
      expect(id.textContent).toBe(`id: ${idValue}`)
      expect(discord.textContent).toBe(`discord: ${discordValue}`)
      expect(avatar.textContent).toBe(`avatar: ${avatarValue}`)
      expect(player.textContent).toBe(`player: ${playerValue}`)
    }

    verify()

    const btnLogin = screen.getByLabelText('login')
    fireEvent.click(btnLogin)

    await waitFor(async () => {
      signed = await findByLabelText('signed')
      expect(signed.textContent).toBe('signed: true')
    })

    verify('true', '12345', '123456', 'avatar', 'true')

    const btnLogout = screen.getByLabelText('logout')
    fireEvent.click(btnLogout)

    verify()
  })
})
