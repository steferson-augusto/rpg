import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Advancements extends BaseSchema {
  protected tableName = 'advancements'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('label', 36).notNullable()
      table.text('description').notNullable()
      table.boolean('hindrance').defaultTo(false)
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
