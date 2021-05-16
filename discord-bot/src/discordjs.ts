/* eslint-disable camelcase */
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
  member: {
    user: {
      username: string
      public_flags: number
      id: string
      discriminator: string
      avatar: string
    }
    roles: string[]
    premium_since: any
    permissions: string
    pending: boolean
    nick: string
    mute: boolean
    joined_at: string
    is_pending: boolean
    deaf: boolean
    avatar: any
  }
  data: InteractionData
  channel_id: string
  application_id: string
}
