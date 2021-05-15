import { MessageEmbed } from 'discord.js'

import roll from '../utils/roll'

interface MRollData {
  quantidade: number
  dificuldade: number
  dados: string
}

export default function mroll({
  quantidade,
  dificuldade: difficulty,
  dados
}: MRollData) {
  const quantity = quantidade >= 1 ? quantidade : 1
  const dices = dados.trim().split(' ')

  let success = 0
  for (let index = 0; index < quantity; index++) {
    const { total } = roll(dices)
    if (total >= difficulty) {
      success = success + 1
    }
  }

  const embed = new MessageEmbed()
    .setColor('#d84315')
    .setTitle('Multi Roll')
    .setThumbnail('https://i.imgur.com/hyJZ1sl.jpg')
    .addField('Tentativas', quantity, true)
    .addField('Dificuldade', difficulty, true)
    .addField('Dados', dices, false)
    .addField('Acertos', success, true)

  return embed
}
