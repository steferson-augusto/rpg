import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, afterCreate, BaseModel } from '@ioc:Adonis/Lucid/Orm'
import Attribute from 'App/Models/Attribute'
import Skill from 'App/Models/Skill'
import Stat from './Stat'
import Character from './Character'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'discord_id', serializeAs: 'discordId' })
  public discordId: string

  @column()
  public username: string

  @column()
  public avatar: string

  @column({ columnName: 'is_player', serializeAs: 'isPlayer' })
  public isPlayer: boolean

  @column({ columnName: 'is_master', serializeAs: 'isMaster' })
  public isMaster: boolean

  @column({ columnName: 'is_bot', serializeAs: 'isBot' })
  public isBot: boolean

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column({ serializeAs: null })
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @afterCreate()
  public static async createAttributes(user: User) {
    const userId = user.id
    Attribute.createMany([
      { userId, label: 'Agilidade', dices: ['d4'] },
      { userId, label: 'Astúcia', dices: ['d4'] },
      { userId, label: 'Espírito', dices: ['d4'] },
      { userId, label: 'Força', dices: ['d4'] },
      { userId, label: 'Vigor', dices: ['d4'] }
    ])

    Skill.create({
      label: 'lutar',
      userId,
      powerPoints: 0,
      pinned: false,
      dices: ['d4']
    })

    Stat.createMany([
      { userId, label: 'hp', max: 4, current: 4, energy: true },
      { userId, label: 'fadiga', max: 4, current: 4, energy: true },
      { userId, label: 'mana', max: 4, current: 4, energy: true },
      { userId, label: 'ki', max: 10, current: 10, energy: true },
      { userId, label: 'movimentação', current: 0 }
    ])

    Character.create({ userId, name: 'Sem nome', race: 'Anão', xp: 0 })
  }
}
