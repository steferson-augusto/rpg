import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DiscordTokens extends BaseSchema {
  protected tableName = 'discord_tokens'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('refresh_token').notNullable()
      table.string('token', 64).notNullable()
      table.string('token_type').notNullable()
      table.string('scope').nullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
