/* eslint-disable indent */
import { MessageEmbed } from 'discord.js'

import roll from '../utils/roll'

interface WeaponSmithyData {
  quantidade: number
  grau: number
  peso: number
  empenho: number
  dados: string
}

export default function weaponSmithy({
  quantidade,
  grau,
  peso,
  empenho,
  dados
}: WeaponSmithyData) {
  const dices = dados.trim().split(' ')

  const quantity = quantidade || 1
  const grade = grau || 1
  const weight = peso || 1
  const relativeTime = empenho || 0

  const minTime = grade * (120 + 15 * grade * 1.1 * (weight - 1))
  const percent =
    relativeTime < 0
      ? 1 - relativeTime * 0.1
      : relativeTime > 0
      ? 1 + relativeTime * 0.25
      : 1
  const difficulty =
    (grade * 15 + (weight + (grade * 0.15 * minTime) / 60)) * percent

  let success = 0
  for (let i = 0; i < quantity; i++) {
    const { total } = roll(dices)
    if (total > difficulty) success++
  }

  const embed = new MessageEmbed()
    .setColor('#FFFA99')
    .setTitle('Forja de armas')
    .setThumbnail('https://i.imgur.com/eeuZhZy.png')
    .addField('Tentativas', quantity, true)
    .addField('Grau', grade, true)
    .addField('Peso', weight, true)
    .addField('Dados', dices.join(' '), false)
    .addField('Dificuldade extra', `${percent * 100 - 100}%`, true)
    .addField('Dificuldade', difficulty, true)
    .addField('Acertos', success, false)

  return embed
}
