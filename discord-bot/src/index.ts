import { Client, Intents } from 'discord.js'
import api from './services/api'
require('dotenv').config()

const intents = new Intents(Intents.NON_PRIVILEGED)
intents.add('GUILD_MEMBERS')

const client = new Client({ ws: { intents } })

client.on('ready', async () => {
  const guild = client.guilds.cache.get(process.env.GUILD_ID as string)
  const members = await guild?.members.fetch()
  if (members) {
    for (const member of members) {
      const [id, user] = member
      const isPlayer = user.roles.cache.has(
        process.env.PLAYER_ROLE_ID as string
      )
      const isMaster = user.roles.cache.has(
        process.env.MASTER_ROLE_ID as string
      )
      const data = {
        discordId: id,
        username: user.user.username,
        avatar: user.user.avatar,
        isPlayer,
        isMaster
      }

      if (isPlayer || isMaster) {
        try {
          await api.post('/users', data)
        } catch (error) {
          console.log(error.response.data)
        }
      }
    }
  }

  console.log(`Logged in as ${client?.user?.tag}!`)
})

client.login(process.env.DISCORD_TOKEN)
