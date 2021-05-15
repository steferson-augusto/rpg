import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema as Schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

const schema = Schema.create({
  discordId: Schema.string(),
  username: Schema.string(),
  avatar: Schema.string.optional(),
  isPlayer: Schema.boolean.optional(),
  isMaster: Schema.boolean.optional()
})

const messages = { required: 'Campo obrigatório' }

export default class UsersController {
  public async index() {
    const users = await User.query().where({ isPlayer: true })
    return users
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate({ schema, messages, existsStrict: false })
    const user = await User.updateOrCreate({ discordId: data.discordId }, data)
    return user
  }

  public async updateRoles({ request, response, params }: HttpContextContract) {
    const data = request.only(['isPlayer', 'isMaster', 'username', 'avatar'])
    await User.updateOrCreate({ discordId: params.discordId }, data)

    return response.status(204)
  }
}
