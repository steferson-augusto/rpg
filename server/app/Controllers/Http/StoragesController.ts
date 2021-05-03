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

    const userId =
      auth.user?.isMaster && request.input('userId') ? request.input('userId') : auth.user?.id
    const [{ max }] = await Storage.query().where({ userId }).max('order')
    const order = max ? Math.floor(max + 10) : 100

    const values = { ...data, userId, order }

    const storage = await Storage.create(values)
    return storage
  }

  public async update({ request, params, auth, response }: HttpContextContract) {
    const data = await request.validate({ schema, messages })
    delete data.userId
    const storage = await Storage.find(params.id)

    if (!storage) {
      return response.status(422).send([
        {
          field: 'general',
          message: 'Este armazém não existe'
        }
      ])
    }

    if (!auth.user?.isMaster && storage.userId !== auth.user?.id) {
      return response.status(401).send([
        {
          field: 'general',
          message: 'Você pode alterar apenas os seus armazéns'
        }
      ])
    }

    storage.merge(data)
    await storage.save()
    return storage
  }

  public async changeOrder({ request, auth, response, params }: HttpContextContract) {
    const data = await request.validate({
      schema: schemaOrder,
      messages: { required: 'Campo obrigatório' }
    })

    const storage = (await Storage.find(params.id)) as Storage

    if (!auth.user?.isMaster && storage?.userId !== auth.user?.id) {
      return response.status(401).send([
        {
          field: 'general',
          message: 'Você pode alterar apenas os seus itens'
        }
      ])
    }

    storage.order = data.order
    storage.save()
    return response.send(204)
  }

  public async destroy({ params, auth, response }: HttpContextContract) {
    const storage = await Storage.find(params.id)

    if (!storage) {
      return response.status(422).send([
        {
          field: 'general',
          message: 'Este armazém não existe'
        }
      ])
    }

    if (!auth.user?.isMaster && storage.userId !== auth.user?.id) {
      return response.status(401).send([
        {
          field: 'general',
          message: 'Você pode apagar apenas os seus armazéns'
        }
      ])
    }

    await storage.delete()
    return response.status(204)
  }
}
