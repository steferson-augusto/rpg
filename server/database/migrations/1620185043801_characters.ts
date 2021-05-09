import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Characters extends BaseSchema {
  protected tableName = 'characters'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .unique()
      table.string('name', 20).notNullable()
      table.string('race', 20)
      table.integer('xp')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
