import { MessageEmbed } from 'discord.js'

import random from '../utils/roll'

interface RollData {
  dados: string
}

export default function roll({ dados }: RollData) {
  const dices = dados.trim().split(' ')

  const result = random(dices)

  const embed = new MessageEmbed()
    .setColor('#e64a19')
    .setTitle('Roll')
    .setThumbnail('https://i.imgur.com/1ZvRrFR.jpg')
    .addField('Dados', dados, false)
    .addField('Rolagem', result.history.join(' '), true)
    .addField('Crítico', result.critical, true)
    .addField('Fixo', result.fixed, true)
    .addField('Total', result.total, false)

  return embed
}
