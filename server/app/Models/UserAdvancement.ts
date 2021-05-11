import { DateTime } from 'luxon'
import { BaseModel, column, afterCreate, beforeDelete } from '@ioc:Adonis/Lucid/Orm'
import { addModifier, removeModifier } from 'App/Helpers/updateModifier'

export default class UserAdvancement extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'user_id', serializeAs: 'userId' })
  public userId: number

  @column({ columnName: 'advancement_id', serializeAs: 'advancementId' })
  public advancementId: number

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @afterCreate()
  public static addModifier = addModifier

  @beforeDelete()
  public static removeModifier = removeModifier
}
