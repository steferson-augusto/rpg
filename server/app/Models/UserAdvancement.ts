import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class UserAdvancement extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'user_id', serializeAs: 'userId' })
  public userId: number

  @column({ columnName: 'advancement_id', serializeAs: 'advancementId' })
  public advancementId: number
}
