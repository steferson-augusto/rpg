import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Skill extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'user_id', serializeAs: 'userId' })
  public userId: number

  @column({ prepare: (value: string) => value.toLowerCase().replace(/\s+/g, ' ').trim() })
  public label: string

  @column({
    consume: (value: string) => value.split(' '),
    prepare: (value: string[]) => value.join(' ')
  })
  public dices: string[]

  @column({ columnName: 'power_points', serializeAs: 'powerPoints' })
  public powerPoints: number

  @column()
  public pinned: boolean

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
