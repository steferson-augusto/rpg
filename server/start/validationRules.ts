import { validator } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

validator.rule('isPlayer', async (value, _, { pointer, arrayExpressionPointer, errorReporter }) => {
  if (typeof value !== 'number') {
    console.log('saiu aqui')
    return
  }

  try {
    const user = await User.findOrFail(value)
    if (!user?.isPlayer) {
      errorReporter.report(
        pointer,
        'isPlayer',
        'Este usuário não é jogador',
        arrayExpressionPointer
      )
    }
  } catch {
    errorReporter.report(pointer, 'isPlayer', 'Este usuário não existe', arrayExpressionPointer)
  }
})
