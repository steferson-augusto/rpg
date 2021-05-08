import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema as Schema, rules } from '@ioc:Adonis/Core/Validator'
import Advancement from 'App/Models/Advancement'

const schema = Schema.create({
  label: Schema.string({}, [rules.minLength(3), rules.maxLength(24)]),
  description: Schema.string({}, [rules.minLength(4), rules.maxLength(264)]),
  hindrance: Schema.boolean()
})

const messages = {
  required: 'Campo obrigatório',
  minLength: 'Deve haver pelo menos {{ options.minLength }} caracteres',
  maxLength: 'Deve haver pelo menos {{ options.maxLength }} caracteres'
}

export default class AdvancementsController {
  public async getByUser({ auth, params }: HttpContextContract) {
    const userId = auth.user?.isMaster ? params.id : auth.user?.id
    const advancements = await Advancement.query().where({ userId }).orderBy('label', 'asc')

    return advancements
  }

  public async index() {
    const advancements = await Advancement.query().orderBy('label', 'asc')
    return advancements
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate({ schema, messages })

    const advancement = await Advancement.create(data)
    return advancement
  }

  public async update({ request, params, response }: HttpContextContract) {
    const data = await request.validate({ schema, messages })

    const advancement = await Advancement.find(params.id)

    if (!advancement) {
      return response.status(422).send([
        {
          field: 'general',
          message: 'Esta vantagem não existe'
        }
      ])
    }

    advancement.merge(data)
    await advancement.save()
    return advancement
  }

  public async destroy({ params, response }: HttpContextContract) {
    const advancement = await Advancement.find(params.id)

    if (!advancement) {
      return response.status(422).send([
        {
          field: 'general',
          message: 'Esta vantagem não existe'
        }
      ])
    }

    await advancement.delete()
    return response.send(204)
  }
}
