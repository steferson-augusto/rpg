import { DateTime } from 'luxon'
import { BaseModel, afterSave, column } from '@ioc:Adonis/Lucid/Orm'

import Stat from 'App/Models/Stat'
import dicesToValue from 'App/Helpers/dicesToValue'

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

  @afterSave()
  public static async updateEndurance(attribute: Attribute) {
    if (attribute.dices) {
      if (attribute.label === 'Vigor') {
        const userId = attribute.userId
        const value = dicesToValue(attribute.dices)
        const current = Math.floor(value / 2 + 2)
        const endurance = await Stat.firstOrNew(
          { userId: attribute.userId, label: 'resistência' },
          { userId: attribute.userId, current, label: 'resistência' }
        )

        endurance.current = current
        endurance.save()

        await Stat.firstOrNew(
          { userId, label: 'hp' },
          { label: 'hp', userId, energy: true, current: value, max: value }
        )

        await Stat.firstOrNew(
          { userId, label: 'fadiga' },
          { label: 'fadiga', userId, energy: true, current: value, max: value }
        )
      }

      const attributes = await Attribute.query().where({ userId: attribute.userId })
      const sum = attributes.reduce<number>((sum, attr) => {
        const value = dicesToValue(attr.dices)
        return sum + value
      }, 0)

      const current = Math.floor(sum / 12)

      const movement = await Stat.query()
        .where({ userId: attribute.userId, label: 'movimentação' })
        .first()

      movement?.merge({ current })
      movement?.save()
    }
  }
}
