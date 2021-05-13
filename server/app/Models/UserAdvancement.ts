import { BaseModel, column, afterCreate, beforeDelete } from '@ioc:Adonis/Lucid/Orm'
import { addModifier, removeModifier } from 'App/Helpers/updateModifier'

export default class UserAdvancement extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'user_id', serializeAs: 'userId' })
  public userId: number

  @column({ columnName: 'advancement_id', serializeAs: 'advancementId' })
  public advancementId: number

  @afterCreate()
  public static addModifier = addModifier

  @beforeDelete()
  public static removeModifier = removeModifier
}
