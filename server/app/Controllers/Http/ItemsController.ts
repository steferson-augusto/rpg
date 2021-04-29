/* eslint-disable quote-props */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema as Schema, rules } from '@ioc:Adonis/Core/Validator'
import Storage from 'App/Models/Storage'
import Item from 'App/Models/Item'

const schema = Schema.create({
  label: Schema.string({}, [rules.minLength(3), rules.maxLength(48)]),
  quantity: Schema.number([rules.range(0, 999999999999)]),
  weight: Schema.number([rules.range(0, 999999999999)]),
  storageId: Schema.number([rules.exists({ table: 'storages', column: 'id' })])
})

const schemaOrder = Schema.create({
  order: Schema.number(),
  storageId: Schema.number([rules.exists({ table: 'storages', column: 'id' })])
})

const messages = {
  'required': 'Campo obrigatório',
  'minLength': 'Deve haver pelo menos {{ options.minLength }} caracteres',
  'maxLength': 'Deve haver pelo menos {{ options.maxLength }} caracteres',
  'range': 'O valor mínmo é 0',
  'userId.exists': 'Este usuário não existe',
  'storageId.exists': 'Este armazém não existe'
}

export default class ItemsController {
  public async store({ auth, request, response }: HttpContextContract) {
    const data = await request.validate({ schema, messages })

    const storage = (await Storage.find(data.storageId)) as Storage

    if (!auth.user?.isMaster && storage.userId !== auth.user?.id) {
      return response.status(401).send([
        {
          field: 'general',
          message: 'Você pode adicionar item apenas em seus armazéns'
        }
      ])
    }

    const [{ max }] = await Item.query().where({ storageId: data.storageId }).max('order')
    const order = max ? Math.floor(max + 10) : 1000

    const values = { ...data, order }

    const item = await Item.create(values)
    return item
  }

  public async update({ auth, request, response, params }: HttpContextContract) {
    const data = await request.validate({ schema, messages })
    const item = await Item.find(params.id)

    if (!item) {
      return response.status(422).send([
        {
          field: 'general',
          message: 'Este item não existe'
        }
      ])
    }
    const storage = await Storage.find(item?.id)

    if (!auth.user?.isMaster && storage?.userId !== auth.user?.id) {
      return response.status(401).send([
        {
          field: 'general',
          message: 'Você pode alterar apenas seus itens'
        }
      ])
    }

    item.merge({ label: data.label, weight: data.weight, quantity: data.quantity })
    await item.save()
    return item
  }

  public async changeOrder({ request, auth, response, params }: HttpContextContract) {
    const data = await request.validate({
      schema: schemaOrder,
      messages: { required: 'Campo obrigatório', exists: 'Este armazém não existe' }
    })

    const item = (await Item.find(params.id)) as Item

    const storage = (await Storage.find(data.storageId)) as Storage

    if (!auth.user?.isMaster && storage?.userId !== auth.user?.id) {
      return response.status(401).send([
        {
          field: 'general',
          message: 'Você pode alterar apenas os seus itens'
        }
      ])
    }

    item.merge(data)
    item.save()
    return response.send(204)
  }

  public async destroy({ params, auth, response }: HttpContextContract) {
    const item = await Item.find(params.id)

    if (!item) {
      return response.status(422).send([
        {
          field: 'general',
          message: 'Este item não existe'
        }
      ])
    }

    const storage = await Storage.find(item.id)

    if (!auth.user?.isMaster && storage?.userId !== auth.user?.id) {
      return response.status(401).send([
        {
          field: 'general',
          message: 'Você pode apagar apenas os seus item'
        }
      ])
    }

    await item.delete()
    return response.status(204)
  }
}
