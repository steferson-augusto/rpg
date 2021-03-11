import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Attribute from 'App/Models/Attribute'

type Dice =
  | 'd4'
  | 'd6'
  | 'd8'
  | 'd10'
  | 'd12'
  | 'd12+1'
  | 'd12+2'
  | 'd12+3'
  | 'd12+4'
  | 'd12+5'
  | 'd12+6'

export default class AttributesController {
  public async show({ params, auth }: HttpContextContract) {
    let attributes = await Attribute.query().where({ userId: params.id ?? auth.user?.id })
    if (attributes.length === 0) {
      attributes = await Attribute.createMany([
        { userId: params.id, label: 'Agilidade', dices: ['d4'] },
        { userId: params.id, label: 'Astúcia', dices: ['d4'] },
        { userId: params.id, label: 'Espírito', dices: ['d4'] },
        { userId: params.id, label: 'Força', dices: ['d4'] },
        { userId: params.id, label: 'Vigor', dices: ['d4'] }
      ])
    }
    return attributes
  }

  public async update({ request, params }: HttpContextContract) {
    const { dices } = request.only<any, { dices: Dice[] }>(['dices'])
    const attribute = await Attribute.findOrFail(params.id)
    attribute.dices = dices
    await attribute.save()

    return attribute
  }

  // public async update({}: HttpContextContract) {}

  // public async destroy({}: HttpContextContract) {}
}
