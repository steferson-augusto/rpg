import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserAdvancements extends BaseSchema {
  protected tableName = 'user_advancements'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table
        .integer('advancement_id')
        .unsigned()
        .references('id')
        .inTable('advancements')
        .onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
