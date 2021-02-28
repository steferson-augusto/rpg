import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class DiscordToken extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'user_id', serializeAs: 'userId' })
  public userId: number

  @column()
  public token: string

  @column({ columnName: 'refresh_token', serializeAs: 'refreshToken' })
  public refreshToken: string

  @column({ columnName: 'token_type', serializeAs: 'tokenType' })
  public tokenType: string

  @column()
  public scope: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
