import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Character from 'App/Models/Character'

export default class CharactersController {
  public async getByUser({ auth, params }: HttpContextContract) {
    const userId = auth.user?.isMaster ? params.id : auth.user?.id
    const character = await Character.firstOrCreate(
      { userId },
      { name: '', race: 'Anão', xp: 64, userId }
    )

    return character
  }
}
