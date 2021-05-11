/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error, ctx: HttpContextContract) {
    if (error.code === 'E_VALIDATION_FAILURE') {
      return ctx.response.status(422).send(error.messages)
    } else if (error.message === 'E_DISCORD_UNAUTHORIZED') {
      return ctx.response.status(401).json([
        {
          field: 'general',
          message: 'Não foi possível se conectar ao seu Discord'
        }
      ])
    } else if (error.message === 'E_DISCORD_NOT_MEMBER') {
      return ctx.response.status(401).json([
        {
          field: 'general',
          message: 'Você não é membro de nosso servidor'
        }
      ])
    } else if (error.code === 'E_AUTHORIZATION_FAILURE') {
      // const [, message] = error.message.split('E_AUTHORIZATION_FAILURE: ')
      return ctx.response.json([
        { field: 'general', message: 'Você não possui permissão para executar esta ação' }
      ])
    }

    return super.handle(error, ctx)
  }
}
