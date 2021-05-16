import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { schema as Schema } from '@ioc:Adonis/Core/Validator'
import Attribute from 'App/Models/Attribute'
import dices from 'App/Helpers/dices'

const schema = Schema.create({ dices: Schema.enumSet(dices) })

export default class AttributesController {
  public async getByDiscordId({ params, request }: HttpContextContract) {
    const data = request.qs()
    const attribute = await Database.rawQuery(
      `select users.id, users.discord_id, attributes.dices, attributes.label from users
      right join attributes on attributes.user_id = users.id
      where users.discord_id = ? and attributes.label = ?`,
      [params.discordId, data?.label || 'Vigor']
    )

    return attribute?.rows?.[0]?.dices || 'd4'
  }

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
