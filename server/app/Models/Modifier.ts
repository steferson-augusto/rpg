import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Modifier extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'stat_id', serializeAs: 'statId' })
  public statId: number

  @column()
  public label: string

  @column()
  public value: number

  @column()
  public description: string
}
