import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Stats extends BaseSchema {
  protected tableName = 'stats'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('label', 24).notNullable()
      table.integer('max').nullable()
      table.integer('current').notNullable()
      table.boolean('energy').defaultTo(false)
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
