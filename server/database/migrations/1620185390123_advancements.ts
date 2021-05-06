import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Advancements extends BaseSchema {
  protected tableName = 'advancements'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('label', 24).notNullable()
      table.text('description').notNullable()
      table.boolean('hindrance').defaultTo(false)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
