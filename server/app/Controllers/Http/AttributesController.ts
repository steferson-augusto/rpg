import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Attribute from 'App/Models/Attribute'
import { schema as Schema } from '@ioc:Adonis/Core/Validator'
import dices from 'App/Helpers/dices'

const schema = Schema.create({ dices: Schema.enumSet(dices) })

export default class AttributesController {
  public async show({ params, auth }: HttpContextContract) {
    const userId = Number(auth.user?.isMaster ? params.id : auth.user?.id)

    let attributes = await Attribute.query().where({ userId }).orderBy('label', 'asc')
    if (attributes.length === 0) {
      attributes = await Attribute.createMany([
        { userId, label: 'Agilidade', dices: ['d4'] },
        { userId, label: 'Astúcia', dices: ['d4'] },
        { userId, label: 'Espírito', dices: ['d4'] },
        { userId, label: 'Força', dices: ['d4'] },
        { userId, label: 'Vigor', dices: ['d4'] }
      ])
    }
    return attributes
  }

  public async update({ request, params, bouncer }: HttpContextContract) {
    const { dices } = await request.validate({
      schema,
      messages: { required: 'Campo obrigatório' }
    })

    const attribute = (await Attribute.find(params.id)) as Attribute
    await bouncer.authorize('update', attribute)

    attribute.dices = dices
    await attribute?.save()

    return attribute
  }

  // public async update({}: HttpContextContract) {}

  // public async destroy({}: HttpContextContract) {}
}
