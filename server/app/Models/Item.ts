import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Item extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'storage_id', serializeAs: 'storageId' })
  public storageId: number

  @column()
  public label: string

  @column()
  public quantity: number

  @column()
  public weight: number

  @column()
  public order: number

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
