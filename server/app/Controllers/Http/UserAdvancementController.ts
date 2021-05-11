import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema as Schema, rules } from '@ioc:Adonis/Core/Validator'
import UserAdvancement from 'App/Models/UserAdvancement'

const schema = Schema.create({
  advancements: Schema.array([rules.minLength(1)]).members(
    Schema.object().members({
      advancementId: Schema.number([rules.exists({ table: 'advancements', column: 'id' })]),
      userId: Schema.number([rules.exists({ table: 'users', column: 'id' })])
    })
  )
})

const schemaDestroy = Schema.create({
  userId: Schema.number([rules.exists({ table: 'users', column: 'id' })])
})

const messages = {
  required: 'Campo obrigatório',
  minLength: 'Deve haver pelo menos {{ options.minLength }} vantagem',
  exists: 'Este item não existe'
}

export default class AdvancementsController {
  public async store({ request }: HttpContextContract) {
    const { advancements } = await request.validate({ schema, messages })

    const list = await UserAdvancement.createMany(advancements)
    return list
  }

  public async destroy({ request, params, response }: HttpContextContract) {
    const { userId } = await request.validate({ schema: schemaDestroy, messages })
    const userAdvancement = await UserAdvancement.query()
      .where({
        userId,
        advancementId: params.id
      })
      .first()

    await userAdvancement?.delete()
    UserAdvancement.query().where({ userId, advancementId: params.id }).delete()
    return response.send(204)
  }
}
