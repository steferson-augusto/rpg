import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Player {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    const isPlayer = auth.user?.isPlayer

    if (!isPlayer) {
      return response
        .status(401)
        .send([{ field: 'general', message: 'Operação permitida apenas para players' }])
    }
    await next()
  }
}
