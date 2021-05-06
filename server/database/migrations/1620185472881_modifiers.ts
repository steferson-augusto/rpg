import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Modifiers extends BaseSchema {
  protected tableName = 'modifiers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('stat_id').unsigned().references('id').inTable('stats').onDelete('CASCADE')
      table.string('label', 24).notNullable()
      table.integer('value').notNullable()
      table.integer('description').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
