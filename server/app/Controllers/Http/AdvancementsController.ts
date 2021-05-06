import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Advancement from 'App/Models/Advancement'

export default class AdvancementsController {
  public async getByUser({ auth, params }: HttpContextContract) {
    const userId = auth.user?.isMaster ? params.id : auth.user?.id
    const advancements = await Advancement.query().where({ userId })

    return advancements
  }
}
