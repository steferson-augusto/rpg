import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Skills extends BaseSchema {
  protected tableName = 'skills'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('label').notNullable()
      table.text('dices').notNullable()
      table.integer('power_points').notNullable().defaultTo(0)
      table.boolean('pinned').defaultTo(false)
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
