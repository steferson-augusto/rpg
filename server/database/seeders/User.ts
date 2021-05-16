import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Env from '@ioc:Adonis/Core/Env'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    const [count] = await User.query().count('id as total')
    if (count?.$extras?.total === 0) {
      await User.create({
        discordId: '783853712409231360',
        username: 'Dadinho',
        email: 'bot@rpg.com',
        avatar: '0e7fa617eff7fc1b832dd5047c2b0f7d',
        isBot: true,
        password: Env.get('BOT_PASSWORD')
      })
    }
  }
}
