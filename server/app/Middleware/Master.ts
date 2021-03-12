import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Master {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    const isMaster = auth.user?.isMaster
    if (!isMaster) {
      return response
        .status(401)
        .send([{ field: 'general', message: 'Operação permitida apenas para mestre' }])
    }
    await next()
  }
}
