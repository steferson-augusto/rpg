import { DateTime } from 'luxon'
import { BaseModel, column, afterCreate, beforeDelete } from '@ioc:Adonis/Lucid/Orm'
import Advancement from 'App/Models/Advancement'
import Modifier from 'App/Models/Modifier'
import Stat from 'App/Models/Stat'

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
  public static async addModifier(ua: UserAdvancement) {
    const advancement = await Advancement.find(ua.advancementId)
    const label = advancement?.label?.toLowerCase()
    const userId = ua.userId
    if (label === 'bloquear') {
      const stat = await Stat.firstOrCreate(
        { userId, label: 'aparar' },
        {
          userId,
          label: 'aparar',
          current: 0
        }
      )
      Modifier.create({ statId: stat.id, label: 'Vantagem (bloquear)', value: 1 })
      return
    }
    if (label === 'bloquear aprimorado') {
      const stat = await Stat.firstOrCreate(
        { userId, label: 'aparar' },
        {
          userId,
          label: 'aparar',
          current: 0
        }
      )
      Modifier.create({ statId: stat.id, label: 'Vantagem (bloquear aprimorado)', value: 2 })
      return
    }
    if (label === 'feio') {
      const stat = await Stat.firstOrCreate(
        { userId, label: 'carisma' },
        {
          userId,
          label: 'carisma',
          current: 0
        }
      )
      Modifier.create({ statId: stat.id, label: 'Complicação (feio)', value: -2 })
    }
  }

  @beforeDelete()
  public static async removeModifier(ua: UserAdvancement) {
    const advancement = await Advancement.find(ua.advancementId)
    const label = advancement?.label?.toLowerCase()
    const userId = ua.userId
    if (label === 'bloquear') {
      const stat = await Stat.query().where({ userId, label: 'aparar' }).firstOrFail()
      Modifier.query().where({ statId: stat?.id, label: 'Vantagem (bloquear)' }).delete()
      return
    }
    if (label === 'bloquear aprimorado') {
      const stat = await Stat.query().where({ userId, label: 'aparar' }).firstOrFail()
      Modifier.query().where({ statId: stat?.id, label: 'Vantagem (bloquear aprimorado)' }).delete()
      return
    }
    if (label === 'feio') {
      const stat = await Stat.query().where({ userId, label: 'carisma' }).firstOrFail()
      Modifier.query().where({ statId: stat?.id, label: 'Complicação (feio)' }).delete()
    }
  }
}
