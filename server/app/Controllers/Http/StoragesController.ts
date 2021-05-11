import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema as Schema, rules } from '@ioc:Adonis/Core/Validator'
import Storage from 'App/Models/Storage'

const schema = Schema.create({
  label: Schema.string({}, [rules.minLength(3), rules.maxLength(20)]),
  verify: Schema.boolean(),
  userId: Schema.number.optional([rules.exists({ table: 'users', column: 'id' })])
})

const schemaOrder = Schema.create({
  order: Schema.number()
})

const messages = {
  required: 'Campo obrigatório',
  minLength: 'Deve haver pelo menos {{ options.minLength }} caracteres',
  maxLength: 'Deve haver pelo menos {{ options.maxLength }} caracteres',
  exists: 'Este usuário não existe'
}

export default class StoragesController {
  public async index({ auth, params }: HttpContextContract) {
    const userId = auth.user?.isMaster ? params.userId : auth.user?.id
    const storages = await Storage.query()
      .where({ userId })
      .orderBy('order', 'asc')
      .preload('items', (query) => {
        query.orderBy('order', 'asc')
      })
    return storages
  }

  public async store({ request, auth }: HttpContextContract) {
    const data = await request.validate({ schema, messages })

    const inputUser = request.input('userId')
    const userId = auth.user?.isMaster && inputUser ? inputUser : auth.user?.id
    const [{ max }] = ((await Storage.query().where({ userId }).max('order')) as unknown) as Array<{
      max: number
    }>
    const order = max ? Math.floor(max + 10) : 100

    const values = { ...data, userId, order }

    const storage = await Storage.create(values)
    return storage
  }

  public async update({ request, params, bouncer }: HttpContextContract) {
    const data = await request.validate({ schema, messages })
    delete data.userId
    const storage = await Storage.find(params.id)

    await bouncer.authorize('update', storage)

    storage?.merge(data)
    await storage?.save()
    return storage
  }

  public async changeOrder({ request, bouncer, response, params }: HttpContextContract) {
    const data = await request.validate({
      schema: schemaOrder,
      messages: { required: 'Campo obrigatório' }
    })

    const storage = (await Storage.find(params.id)) as Storage

    await bouncer.authorize('update', storage)

    storage.order = data.order
    storage.save()
    return response.send(204)
  }

  public async destroy({ params, bouncer, response }: HttpContextContract) {
    const storage = await Storage.find(params.id)

    await bouncer.authorize('update', storage)

    await storage?.delete()
    return response.status(204)
  }
}
