import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Storages extends BaseSchema {
  protected tableName = 'storages'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.boolean('verify').defaultTo(true)
      table.string('label', 20).notNullable()
      table.float('order', 4).unsigned().notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
