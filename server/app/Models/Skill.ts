import { DateTime } from 'luxon'
import { afterSave, BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

import Stat from 'App/Models/Stat'
import dicesToValue from 'App/Helpers/dicesToValue'

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

  @afterSave()
  public static async updateParry(skill: Skill) {
    if (skill.dices && skill.label === 'lutar') {
      const current = Math.floor(dicesToValue(skill.dices) / 2 + 2)
      const parry = await Stat.firstOrNew(
        { userId: skill.userId, label: 'aparar' },
        { userId: skill.userId, current, label: 'aparar' }
      )

      parry.current = current
      parry.save()
    }
  }

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
