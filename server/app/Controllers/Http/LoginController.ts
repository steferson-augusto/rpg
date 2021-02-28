import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import Client from 'discord-oauth2-api'

// const client = new Client({
//   clientID: '783853712409231360',
//   clientSecret: 'WuyYadd8joZamtCpbPmg4hwh9jxUOy2l',
//   scopes: ['identify', 'email', 'connection', 'guilds'],
//   redirectURI: 'http://localhost:3333/login/callback'
// })

export default class LoginController {
  public async index({ request }: HttpContextContract) {
    try {
      const { code } = request.only(['code'])
      return { code }
    } catch (error) {
      console.log(error)
    }
  }
}
