import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Attribute extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'user_id', serializeAs: 'userId' })
  public userId: number

  @column()
  public label: 'Força' | 'Agilidade' | 'Vigor' | 'Espírito' | 'Astúcia'

  @column({
    consume: (value: string) => value.split(' '),
    prepare: (value: string[]) => value.join(' ')
  })
  public dices: string[]

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
