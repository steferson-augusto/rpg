import Bouncer, { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Stat from 'App/Models/Stat'

export default class StatPolicy extends BasePolicy {
  public async updatePool(user: User, stat: Stat | null) {
    if (!stat) return Bouncer.deny('Esta pool não existe', 422)

    if (!user.isMaster && stat.userId !== user.id) {
      return Bouncer.deny('Você não tem permissão para executar esta ação', 403)
    }

    return Boolean(stat.energy)
  }
}
