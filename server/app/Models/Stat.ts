import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Stat extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'user_id', serializeAs: 'userId' })
  public userId: number

  @column()
  public label: string

  @column()
  public max: number

  @column()
  public current: number

  @column()
  public energy: boolean
}
