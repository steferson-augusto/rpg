import { MessageEmbed } from 'discord.js'

import roll from '../utils/roll'

export interface RingData {
  quantidade: number
  dados: string
}

export default function ring({ quantidade, dados }: RingData) {
  const state = [
    {
      dice: 9,
      result: '100%',
      quantity: 0
    },
    {
      dice: 8,
      result: '80%',
      quantity: 0
    },
    {
      dice: 7,
      result: '60%',
      quantity: 0
    },
    {
      dice: 6,
      result: '50%',
      quantity: 0
    },
    {
      dice: 5,
      result: '30%',
      quantity: 0
    },
    {
      dice: 0,
      result: 'Falha',
      quantity: 0
    }
  ]

  const dices = dados.trim().split(' ')

  for (let i = 0; i < quantidade; i++) {
    const { total } = roll(dices)

    state.some(stage => {
      if (total >= stage.dice) {
        stage.quantity += 1
        return true
      }
      return false
    })
  }

  const fails = state.pop()
  const result = state
    .filter(dificuldade => dificuldade.quantity > 0)
    .map(({ result, quantity }) => ({
      name: result,
      value: quantity,
      inline: true
    }))

  const embed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Forja de anéis espaciais')
    .setThumbnail('https://i.imgur.com/nH9YiBt.png')
    .addFields(
      { name: 'Custo', value: quantidade * 575 },
      { name: '\u200B', value: '\u200B' },
      ...result
    )
    .addField('Falhas', fails?.quantity, true)

  return embed
}
