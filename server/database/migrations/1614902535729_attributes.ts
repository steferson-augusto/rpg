import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Attributes extends BaseSchema {
  protected tableName = 'attributes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.enu('label', ['Força', 'Agilidade', 'Vigor', 'Astúcia', 'Espírito']).notNullable()
      table.text('dices').notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
