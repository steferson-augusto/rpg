import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema as Schema, rules } from '@ioc:Adonis/Core/Validator'
import Skill from 'App/Models/Skill'
import User from 'App/Models/User'

const schema = Schema.create({
  label: Schema.string({}, [rules.minLength(3), rules.maxLength(30)]),
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
  ]),
  powerPoints: Schema.number.optional(),
  pinned: Schema.boolean.optional()
})

const schemaUpdate = Schema.create({
  label: Schema.string.optional({}, [rules.minLength(3), rules.maxLength(30)]),
  pinned: Schema.boolean.optional(),
  dices: Schema.enumSet.optional([
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

const messagesStore = {
  required: 'Campo obrigatório',
  enumSet: 'Insira um dado válido',
  minLength: 'Deve haver pelo menos {{ options.minLength }} caracteres',
  requiredIfNotExists: 'Insira um nome ou dados válidos'
}

export default class SkillsController {
  public async getSkillsByUser({ params, auth, response }: HttpContextContract) {
    const userId = Number(auth.user?.isMaster ? params.id : auth.user?.id)
    const user = await User.find(userId)
    if (!user?.isPlayer) {
      return response
        .status(422)
        .send([{ field: 'general', message: 'Este usuário não é um player' }])
    }

    const skills = await Skill.query().where({ userId }).orderBy('label', 'asc')
    return skills
  }

  public async store({ request, auth }: HttpContextContract) {
    const data = await request.validate({ schema, messages: messagesStore })
    const skill = await Skill.create({ ...data, userId: auth.user?.id })
    return skill
  }

  public async update({ request, auth, params, response }: HttpContextContract) {
    const data = await request.validate({ schema: schemaUpdate, messages: messagesStore })
    const skill = await Skill.find(params.id)

    if (!skill) {
      return response.status(422).send([
        {
          field: 'general',
          message: 'Esta perícia não existe'
        }
      ])
    }

    if (skill.userId !== auth.user?.id) {
      return response.status(401).send([
        {
          field: 'general',
          message: 'Você pode alterar apenas as suas perícias'
        }
      ])
    }

    skill.merge(data)
    await skill.save()
    return skill
  }

  public async destroy({ auth, params, response }: HttpContextContract) {
    const skill = await Skill.find(params.id)

    if (!skill) {
      return response.status(422).send([
        {
          field: 'general',
          message: 'Esta perícia não existe'
        }
      ])
    }

    if (skill.userId !== auth.user?.id) {
      return response.status(401).send([
        {
          field: 'general',
          message: 'Você pode alterar apenas as suas perícias'
        }
      ])
    }

    await skill.delete()
    return response.status(204)
  }
}
