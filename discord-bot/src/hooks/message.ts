import { Message } from 'discord.js'

import { setMessage } from '../utils/services'
// import commands from '../commands'

function validate(msg: Message): boolean {
  if (msg.author.id === '346873158097174538') msg.react('👃')
  if (msg.author.id === '352166582899834900') msg.react('🌩')
  if (msg.author.bot) return false
  if (msg.channel.type === 'dm') return false
  if (!msg.content.toLowerCase().startsWith('/')) {
    return false
  }
  if (
    msg.content.startsWith(`<@!${msg.client.user?.id}>`) ||
    msg.content.startsWith(`<@${msg.client.user?.id}>`)
  ) {
    return false
  }

  return true
}

export default async function message(msg: Message) {
  if (!validate(msg)) return
  setMessage(msg)

  await msg.client.channels.fetch('681342318334443569')

  // const args = msg.content.trim().slice(1).split(' ')

  // const command = args.shift()?.toLowerCase() || 'error'
  // const run = commands?.[command as 'roll']

  // if (!run) {
  //   const newMessage = await msg.channel.send('Este comando não existe')
  //   setTimeout(newMessage.delete, 5000)
  // }

  // run?.(msg, args)
}
