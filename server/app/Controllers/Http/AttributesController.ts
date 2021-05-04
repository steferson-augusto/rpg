import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Attribute from 'App/Models/Attribute'
import { schema as Schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

const schema = Schema.create({
  dices: Schema.enumSet([
    'd4',
    'd6',
    'd8',
    'd10',
    'd12',
    'd12+1',
    'd12+2',
    'd12+3',
    'd12+4',
    'd12+5',
    'd12+6'
  ])
})

export default class AttributesController {
  public async show({ params, auth, response }: HttpContextContract) {
    const userId = Number(auth.user?.isMaster ? params.id : auth.user?.id)

    const user = await User.find(userId)

    if (!user?.isPlayer) {
      return response
        .status(422)
        .send([{ field: 'general', message: 'Este usuário não é um player' }])
    }

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

  public async update({ request, params, auth, response }: HttpContextContract) {
    const { dices } = await request.validate({
      schema,
      messages: { required: 'Campo obrigatório' }
    })
    const attribute = await Attribute.findOrFail(params.id)

    const { id: userId, isMaster } = auth.user as User
    if (!isMaster && attribute.userId !== userId) {
      return response.status(401).send([
        {
          field: 'general',
          message: 'Operação permitida apenas para o mestre ou o próprio jogador'
        }
      ])
    }

    attribute.dices = dices
    await attribute.save()

    return attribute
  }

  // public async update({}: HttpContextContract) {}

  // public async destroy({}: HttpContextContract) {}
}
