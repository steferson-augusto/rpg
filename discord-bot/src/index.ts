import Discord from 'discord.js'
require('dotenv').config()

const client = new Discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client?.user?.tag}!`)
})

client.login(process.env.TOKEN)