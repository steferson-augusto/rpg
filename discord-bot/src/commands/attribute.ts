import { MessageEmbed } from 'discord.js'

import { Interaction } from '../discordjs'
import api from '../services/api'
import resumeDices from '../utils/resumeDices'
import roll from '../utils/roll'

type Attribute = 'Agilidade' | 'Astúcia' | 'Espírito' | 'Força' | 'Vigor'

export interface AttributeData {
  titulo: Attribute
  dados?: string
}

const getDices = async (attribute: Attribute, id: string) => {
  try {
    const { data } = await api.get<string>(
      `/attributes/discord/${id}?label=${attribute}`
    )

    return resumeDices(data.split(' ') || ['d4'])
  } catch {
    return 'd4'
  }
}

const images = {
  Força: 'https://i.imgur.com/liM8ATZ.png',
  Agilidade: 'https://i.imgur.com/LbaQVxs.png',
  Espírito: 'https://i.imgur.com/UNM91V8.png',
  Astúcia: 'https://i.imgur.com/zpFV4uW.png',
  Vigor: 'https://i.imgur.com/v0dkkLR.png'
}

export default async function attribute(
  { titulo, dados }: AttributeData,
  interaction: Interaction
) {
  const label = dados || (await getDices(titulo, interaction.member.user.id))
  const dices = label.split(' ')

  const result = roll(dices)

  const embed = new MessageEmbed()
    .setColor('#aabbcc')
    .setTitle(titulo)
    .setThumbnail(images[titulo])
    .addField('Dados', label, false)
    .addField('Rolagem', result.history.join(' '), true)
    .addField('Crítico', result.critical, true)
    .addField('Fixo', result.fixed, true)
    .addField('Total', result.total, false)

  return embed
}
