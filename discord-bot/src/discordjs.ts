/* eslint-disable camelcase */
import { GuildMember } from 'discord.js'

export interface InteractionDataOption {
  name: string
  value: string | number
  type: number
}

export interface InteractionData {
  id: number
  name: string
  options: InteractionDataOption[]
}

export interface Interaction {
  id: string
  guild_id: string
  version: number
  type: number
  token: string
  member: GuildMember
  data: InteractionData
  channel_id: string
  application_id: string
}
