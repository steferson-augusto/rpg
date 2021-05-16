import { GuildMember, PartialGuildMember } from 'discord.js'

import api from '../services/api'

export default async function guildMemberUpdate(
  _member: GuildMember | PartialGuildMember,
  newMember: GuildMember
) {
  const isPlayer = newMember.roles.cache.has(
    process.env.PLAYER_ROLE_ID as string
  )
  const isMaster = newMember.roles.cache.has(
    process.env.MASTER_ROLE_ID as string
  )

  const data = {
    username: newMember.displayName,
    avatar: newMember.user.avatar || undefined,
    isMaster,
    isPlayer
  }

  try {
    await api.put(`/users/${newMember.id}/roles`, data)
    console.info('Usuário atualizado com sucesso')
  } catch {
    console.error('Falha ao atualizar permissões do usuário')
  }
}
