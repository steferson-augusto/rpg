import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Advancement extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'user_id', serializeAs: 'userId' })
  public userId: number

  @column()
  public label: string

  @column()
  public description: string

  @column()
  public hindrance: boolean
}
