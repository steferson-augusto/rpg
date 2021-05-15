import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Stat from 'App/Models/Stat'
import { schema as Schema, rules } from '@ioc:Adonis/Core/Validator'

const schema = {
  create: Schema.create({
    label: Schema.string({}, [rules.minLength(2), rules.maxLength(24)]),
    current: Schema.number(),
    userId: Schema.number([rules.exists({ table: 'users', column: 'id' })]),
    max: Schema.number.optional(),
    energy: Schema.boolean.optional()
  }),
  update: Schema.create({
    label: Schema.string({}, [rules.minLength(2), rules.maxLength(24)]),
    current: Schema.number()
  }),
  updatePool: Schema.create({
    current: Schema.number()
  }),
  updatePoolMaster: Schema.create({
    label: Schema.string({}, [rules.minLength(2), rules.maxLength(24)]),
    current: Schema.number(),
    max: Schema.number()
  })
}

const messages = {
  required: 'Campo obrigatório',
  existis: 'Este usuário não existe',
  minLength: 'Deve haver pelo menos {{ options.minLength }} caracteres',
  maxLength: 'Támanho máximo é {{ options.minLength }} caracteres'
}
export default class StatsController {
  public async getByUser({ auth, params, request }: HttpContextContract) {
    const userId = auth.user?.isMaster ? params.id : auth.user?.id
    const { energy } = request.qs()
    const data = energy === undefined ? { userId } : { userId, energy: Number(energy) }
    const stats = await Stat.query()
      .where(data)
      .preload('modifiers')
      .orderBy(energy === undefined ? 'label' : 'id', 'asc')

    return stats
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate({ schema: schema.create, messages })

    const stat = await Stat.create(data)
    return stat
  }

  public async update({ request, params, bouncer }: HttpContextContract) {
    const data = await request.validate({ schema: schema.update, messages })

    const stat = await Stat.find(params.id)
    await bouncer.authorize('founded', stat)

    stat?.merge(data)
    await stat?.save()

    return stat
  }

  public async updatePool({ request, params, bouncer, auth }: HttpContextContract) {
    const schemaUpdate = auth.user?.isMaster ? schema.updatePoolMaster : schema.updatePool
    const data = await request.validate({ schema: schemaUpdate, messages })

    const stat = await Stat.find(params.id)
    await bouncer.with('StatPolicy').authorize('updatePool', stat)

    stat?.merge(data)
    await stat?.save()

    return stat
  }

  public async destroy({ params, response, bouncer }: HttpContextContract) {
    const stat = await Stat.find(params.id)

    await bouncer.authorize('founded', stat)

    await stat?.delete()
    return response.status(204)
  }
}
