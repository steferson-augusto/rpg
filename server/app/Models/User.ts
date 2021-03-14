import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'

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
}
