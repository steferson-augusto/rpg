import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Bot {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    const isBot = auth.user?.isBot

    if (!isBot) {
      return response
        .status(401)
        .send([{ field: 'general', message: 'Operação permitida apenas para bot' }])
    }
    await next()
  }
}
