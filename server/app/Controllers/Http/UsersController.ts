import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index() {
    const users = await User.all()
    return users
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['discordId', 'username', 'avatar', 'isPlayer', 'isMaster'])
    const user = await User.updateOrCreate({ discordId: data.discordId }, data)
    return user
  }
}
