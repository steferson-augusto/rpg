import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Member {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    const isMember = auth.user?.isMaster || auth.user?.isPlayer
    if (!isMember) {
      return response
        .status(401)
        .send([{ field: 'general', message: 'Operação permitida apenas para membros' }])
    }
    await next()
  }
}
