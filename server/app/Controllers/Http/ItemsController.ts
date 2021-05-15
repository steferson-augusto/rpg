/* eslint-disable quote-props */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema as Schema, rules } from '@ioc:Adonis/Core/Validator'
import Storage from 'App/Models/Storage'
import Item from 'App/Models/Item'

const genericSchema = {
  label: Schema.string({}, [rules.minLength(3), rules.maxLength(48)]),
  quantity: Schema.number([rules.range(0, 999999999999)]),
  weight: Schema.number([rules.range(0, 999999999999)])
}

const schema = Schema.create({
  ...genericSchema,
  storageId: Schema.number([rules.exists({ table: 'storages', column: 'id' })])
})

const schemaUpdate = Schema.create(genericSchema)

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
  public async store({ request, bouncer }: HttpContextContract) {
    const data = await request.validate({ schema, messages })

    const storage = await Storage.find(data.storageId)
    await bouncer.authorize('update', storage)

    const [{ max }] = ((await Item.query()
      .where({ storageId: data.storageId })
      .max('order')) as unknown) as Array<{ max: number }>
    const order = max ? Math.floor(max + 10) : 1000

    const values = { ...data, order }

    const item = await Item.create(values)
    return item
  }

  public async update({ request, params, bouncer }: HttpContextContract) {
    const data = await request.validate({ schema: schemaUpdate, messages })

    const item = await Item.find(params.id)
    await bouncer.authorize('founded', item)

    const storage = await Storage.find(item?.storageId)
    await bouncer.authorize('update', storage)

    item?.merge({ label: data.label, weight: data.weight, quantity: data.quantity })
    await item?.save()
    return item
  }

  public async changeOrder({ request, bouncer, response, params }: HttpContextContract) {
    const data = await request.validate({
      schema: schemaOrder,
      messages: { required: 'Campo obrigatório', exists: 'Este armazém não existe' }
    })

    const item = await Item.find(params.id)
    await bouncer.authorize('founded', item)

    const storage = (await Storage.find(data.storageId)) as Storage
    await bouncer.authorize('update', storage)

    item?.merge(data)
    item?.save()
    return response.send(204)
  }

  public async destroy({ params, response, bouncer }: HttpContextContract) {
    const item = await Item.find(params.id)
    await bouncer.authorize('founded', item)

    const storage = await Storage.find(item?.storageId)
    await bouncer.authorize('update', storage)

    await item?.delete()
    return response.status(204)
  }
}
