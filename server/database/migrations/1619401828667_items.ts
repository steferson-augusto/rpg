import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Items extends BaseSchema {
  protected tableName = 'items'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('storage_id')
        .unsigned()
        .references('id')
        .inTable('storages')
        .onDelete('CASCADE')
      table.string('label', 48).notNullable()
      table.integer('quantity').notNullable()
      table.float('weight', 4).defaultTo(0)
      table.float('order', 4).unsigned().notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
