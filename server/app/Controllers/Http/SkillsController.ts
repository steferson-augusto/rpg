import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema as Schema, rules } from '@ioc:Adonis/Core/Validator'
import Skill from 'App/Models/Skill'
import dices from 'App/Helpers/dices'

const schema = Schema.create({
  label: Schema.string({}, [rules.minLength(3), rules.maxLength(30)]),
  dices: Schema.enumSet(dices),
  powerPoints: Schema.number.optional(),
  pinned: Schema.boolean.optional(),
  userId: Schema.number.optional([rules.exists({ table: 'users', column: 'id' })])
})

const schemaUpdate = Schema.create({
  label: Schema.string.optional({}, [rules.minLength(3), rules.maxLength(30)]),
  pinned: Schema.boolean.optional(),
  dices: Schema.enumSet.optional(dices)
})

const schemaPowerPoints = Schema.create({
  powerPoints: Schema.number()
})

const messages = {
  required: 'Campo obrigatório',
  enumSet: 'Insira um dado válido',
  minLength: 'Deve haver pelo menos {{ options.minLength }} caracteres',
  requiredIfNotExists: 'Insira um nome ou dados válidos',
  exists: 'Este usuário não existe'
}

export default class SkillsController {
  public async index() {
    const skills = await Skill.query().select('label').distinct().orderBy('label')
    return skills
  }

  public async getSkillsByUser({ params, auth, request }: HttpContextContract) {
    const userId = Number(auth.user?.isMaster ? params.id : auth.user?.id)
    // const user = await User.find(userId)
    // if (!user?.isPlayer) {
    //   return response
    //     .status(422)
    //     .send([{ field: 'general', message: 'Este usuário não é um player' }])
    // }

    const { favorites } = request.qs()
    const data = favorites === undefined ? { userId } : { userId, pinned: Number(favorites) }

    const skills = await Skill.query().where(data).orderBy('label', 'asc')
    return skills
  }

  public async store({ request, auth }: HttpContextContract) {
    const data = await request.validate({ schema, messages })
    const values = auth.user?.isMaster
      ? {
          ...data,
          userId: request.input('userId')
        }
      : {
          ...data,
          userId: auth.user?.id,
          powerPoints: 0
        }
    const skill = await Skill.create(values)
    return skill
  }

  public async update({ request, params, bouncer }: HttpContextContract) {
    const data = await request.validate({ schema: schemaUpdate, messages })
    const skill = await Skill.find(params.id)

    await bouncer.authorize('update', skill)

    skill?.merge(data)
    await skill?.save()
    return skill
  }

  public async updatePowerPoints({ request, params, bouncer }: HttpContextContract) {
    const { powerPoints } = await request.validate({ schema: schemaPowerPoints, messages })
    const skill = (await Skill.find(params.id)) as Skill

    await bouncer.authorize('founded', skill)

    skill.powerPoints = powerPoints
    await skill.save()
    return skill
  }

  public async destroy({ bouncer, params, response }: HttpContextContract) {
    const skill = await Skill.find(params.id)

    await bouncer.authorize('update', skill)

    await skill?.delete()
    return response.status(204)
  }
}
