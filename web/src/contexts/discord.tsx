/* eslint-disable camelcase */
import React, { createContext, useContext } from 'react'
import Webhook from 'webhook-discord'

import { useAuth } from './auth'
import roll, { RollValues } from '../utils/roll'
import { AttributeLabel } from '../models'

export interface UserData {
  id: number
  discordId: string
  username: string
  email?: string
  avatar: string
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

interface DiscordContextData {
  rollAttribute: (
    attribute: AttributeLabel,
    label: string
  ) => Promise<RollValues>
}

const DiscordContext = createContext<DiscordContextData>(
  {} as DiscordContextData
)

const attributeImage = {
  Força: 'https://i.imgur.com/liM8ATZ.png',
  Agilidade: 'https://i.imgur.com/LbaQVxs.png',
  Espírito: 'https://i.imgur.com/UNM91V8.png',
  Astúcia: 'https://i.imgur.com/zpFV4uW.png',
  Vigor: 'https://i.imgur.com/v0dkkLR.png'
}

export const DiscordProvider: React.FC = ({ children }) => {
  const { user } = useAuth()

  const rollAttribute = async (attribute: AttributeLabel, label: string) => {
    const result = roll(label.split(' '))
    const { total, fixed, critical, history } = result
    const avatarUrl = `https://cdn.discordapp.com/avatars/${user?.discordId}/${user?.avatar}.png`

    const hook = new Webhook.Webhook(
      process.env.REACT_APP_DISCORD_WEBHOOK as string
    )

    const msg = new Webhook.MessageBuilder()
      .setName(user?.username ?? '')
      .setAvatar(avatarUrl)
      .setThumbnail(attributeImage[attribute])
      .setColor('#aabbcc')
      .setTitle(attribute)
      .addField('Dados', label, false)
      .addField('Rolagem', `[${history.join(' ')}]`, true)
      .addField('Critico', String(critical), true)
      .addField('Fixo', String(fixed), true)
      .addField('Total', String(total), false)
      .setTime()

    await hook.send(msg)
    return result
  }

  return (
    <DiscordContext.Provider value={{ rollAttribute }}>
      {children}
    </DiscordContext.Provider>
  )
}

export const useDiscord = (): DiscordContextData => {
  const context = useContext(DiscordContext)

  return context
}
