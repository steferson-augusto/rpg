import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Stat from 'App/Models/Stat'

export default class StatsController {
  public async getByUser({ auth, params, request }: HttpContextContract) {
    const userId = auth.user?.isMaster ? params.id : auth.user?.id
    const { energy } = request.get()
    const data = energy === undefined ? { userId } : { userId, energy: Number(energy) }
    const stats = await Stat.query()
      .where(data)
      .orderBy(energy === undefined ? 'label' : 'id', 'asc')

    return stats
  }
}
