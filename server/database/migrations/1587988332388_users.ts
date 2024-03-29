import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('discord_id', 255).unique().notNullable()
      table.string('username', 255).notNullable()
      table.boolean('is_player').notNullable().defaultTo(false)
      table.boolean('is_master').notNullable().defaultTo(false)
      table.boolean('is_bot').notNullable().defaultTo(false)
      table.string('avatar', 255).nullable()
      table.string('email', 255).nullable()
      table.string('password', 180).nullable()
      table.string('remember_me_token').nullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
