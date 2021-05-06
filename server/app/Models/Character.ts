import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Character extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'user_id', serializeAs: 'userId' })
  public userId: number

  @column()
  public name: string

  @column()
  public race: string

  @column()
  public xp: number
}
