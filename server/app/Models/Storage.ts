import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Item from 'App/Models/Item'

export default class Storage extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'user_id', serializeAs: 'userId' })
  public userId: number

  @column()
  public label: string

  @column()
  public verify: boolean

  @column()
  public order: number

  @hasMany(() => Item)
  public items: HasMany<typeof Item>
}
