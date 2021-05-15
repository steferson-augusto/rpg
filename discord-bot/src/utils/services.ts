import Discord, { Message, GuildChannel } from 'discord.js'

type User =
  | Discord.UserResolvable
  | Discord.FetchMemberOptions
  | (Discord.FetchMembersOptions & { user: Discord.UserResolvable })

type ContentMessage =
  | Discord.APIMessageContentResolvable
  | (Discord.MessageOptions & { split?: false | undefined })
  | Discord.MessageAdditions

type Roles = 'master' | 'player' | 'member'

interface Channel extends GuildChannel {
  send: (content: ContentMessage) => Promise<Message>
}

let msg: Message | null = null

export const setMessage = (message: Message) => (msg = message)

export const isMaster = () => msg?.member?.roles.cache.has('785276366610104371')

export const isPlayer = () => msg?.member?.roles.cache.has('784934956454772756')

export const isMember = async (user: User) => {
  try {
    await msg?.guild?.members.fetch(user)
    return true
  } catch {
    return false
  }
}

export const check = async (user: User, roles: Array<Roles>) => {
  const validate = {
    master: {
      value: isMaster(),
      error:
        '```diff\n- É necessário o cargo "Mestre" para executar este comando.\n```'
    },
    player: {
      value: isPlayer(),
      error:
        '```diff\n- É necessário o cargo "Player" para executar este comando.\n```'
    },
    member: {
      value: await isMember(user),
      error: '```diff\n- O usuário informado não é válido.\n```'
    }
  }

  const valid = roles.every(role => {
    const { value, error } = validate[role]
    if (!value) msg?.channel.send(error)
    return value || false
  })
  return valid
}

export const getChannel = (id: string) =>
  msg?.guild?.channels.cache.get(id) as Channel

export const isChannel = (id: string) => msg?.channel.id === id

export const emoji = (id: string) =>
  msg?.guild?.emojis.cache.get(id)?.toString()

export const getMemberAvatarURL = async (user: User) => {
  const member = await msg?.guild?.members.fetch(user)
  const avatarURL = await member?.user.displayAvatarURL({ format: 'jpg' })
  return avatarURL
}

export const getUsersMention = async () =>
  msg?.mentions.users.array().map(user => user.id)
