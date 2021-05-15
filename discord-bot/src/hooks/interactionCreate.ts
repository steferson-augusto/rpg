import { APIMessage, Client, MessageEmbed, MessageTarget } from 'discord.js'

import commands from '../commands'
import { RingData } from '../commands/ring'
import { Interaction } from '../discordjs'

const createAPIMessage = async (
  client: Client,
  interaction: Interaction,
  content: any
) => {
  const { data, files } = await APIMessage.create(
    client.channels.resolve(interaction.channel_id) as MessageTarget,
    content
  )
    .resolveData()
    .resolveFiles()

  return { ...data, files }
}

const reply = async (
  client: Client,
  interaction: Interaction,
  response: MessageEmbed | string
) => {
  let data: any = { content: response }

  // verifica se é embed
  if (typeof response === 'object') {
    data = await createAPIMessage(client, interaction, response)
  }

  const cli = client as any

  cli.api.interactions(interaction.id, interaction.token).callback.post({
    data: {
      type: 4,
      data
    }
  })
}

export default async function interactionCreate(
  client: Client,
  interaction: Interaction
) {
  const { name, options } = interaction.data
  const command = name.toLowerCase()

  const data = options.reduce(
    (result, current) => ({
      ...result,
      [current.name]: current.value
    }),
    {}
  )
  const handler = commands?.[command as 'anel']

  if (!handler) {
    reply(client, interaction, '```diff\n- Este comando não existe\n```')
    return
  }

  const embed = handler(data as RingData)
  reply(client, interaction, embed)
}
