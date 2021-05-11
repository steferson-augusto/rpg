import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Character from 'App/Models/Character'
import { schema as Schema, rules } from '@ioc:Adonis/Core/Validator'

const schema = {
  update: Schema.create({
    name: Schema.string({}, [rules.minLength(3), rules.maxLength(20)]),
    race: Schema.enum(['Anão', 'Atlante', 'Elfo', 'Humano', 'Pequenino', 'Rakashano'])
  })
}

const messages = {
  required: 'Campo obrigatório',
  minLength: 'Deve haver pelo menos {{ options.minLength }} caracteres',
  maxLength: 'Deve {{ options.maxLength }} caracteres no máximo'
}

export default class CharactersController {
  public async getByUser({ auth, params }: HttpContextContract) {
    const userId = auth.user?.isMaster ? params.id : auth.user?.id
    const character = await Character.firstOrCreate(
      { userId },
      { name: 'Nome do personagem', race: 'Sem raça', xp: 64, userId }
    )

    return character
  }

  public async update({ params, request, bouncer }: HttpContextContract) {
    const data = await request.validate({ schema: schema.update, messages })

    const character = await Character.find(params.id)
    await bouncer.authorize('update', character)

    character?.merge(data)
    await character?.save()

    return character
  }
}
