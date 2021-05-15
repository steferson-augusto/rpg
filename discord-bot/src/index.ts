import { Client, Intents } from 'discord.js'

import { Interaction } from './discordjs'
import guildMemberUpdate from './hooks/guildMemberUpdate'
import interactionCreate from './hooks/interactionCreate'
import message from './hooks/message'

require('dotenv').config()

const intents = new Intents(Intents.NON_PRIVILEGED)
intents.add('GUILD_MEMBERS')

const client = new Client()

client.on('ready', () => console.log(`Logged in as ${client?.user?.tag}!`))

client.on('guildMemberUpdate', guildMemberUpdate)

client.on('message', message)

client.ws.on(
  'INTERACTION_CREATE' as 'READY',
  async (interaction: Interaction) => {
    interactionCreate(client, interaction)
  }
)

client.login(process.env.DISCORD_TOKEN)
