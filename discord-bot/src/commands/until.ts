import { MessageEmbed } from 'discord.js'

import roll from '../utils/roll'

interface UntilData {
  dificuldade: number
  dados: string
  'decremento-dados': number
  'decremento-pool': number
  pool: number
}

export default function until(params: UntilData) {
  const dices = params.dados.trim().split(' ')
  const decPool = params['decremento-pool']

  let pool = params.pool
  let { total: sum } = roll(dices)
  // const history: number[] = []

  let count = 0
  while (pool > decPool + 1 && sum < params.dificuldade) {
    const { total } = roll(dices)
    // history.push(total)
    sum -= (sum * params['decremento-dados']) / 100
    sum += total
    pool -= decPool
    count++
  }

  const embed = new MessageEmbed()
    .setColor('#e64a19')
    .setTitle('Até conseguir')
    .setThumbnail('https://i.imgur.com/1ZvRrFR.jpg')
    .addField('Dados', params.dados, true)
    .addField('Tentativas', count, true)
    .addField('Dificuldade', params.dificuldade, true)
    .addField('Total', Math.floor(sum), false)
  // .addField('Rolagem', history.join(' '), false)

  return embed
}
