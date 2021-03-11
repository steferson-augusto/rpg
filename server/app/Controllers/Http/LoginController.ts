/* eslint-disable camelcase */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import Passport from 'discord-passport'

import User from 'App/Models/User'
import DiscordToken from 'App/Models/DiscordToken'

interface UserResponse {
  avatar: string
  discriminator?: string
  email?: string
  flags?: 0
  id: string
  locale?: string
  mfa_enabled?: boolean
  public_flags?: number
  username: string
  verified: boolean
}

interface Options {
  [key: string]: string[]
}

interface Guild {
  features: string[]
  icon: string
  id: string
  name: string
  owner: boolean
  permissions: number
  permissions_new: string
}

interface PassportResponse {
  client_id: string
  code: string
  expires_in: number
  guilds: Guild[]
  options: Options
  redirect_uri: string
  refresh_token: string
  scope: string[]
  token: string
  token_type: string
  user: UserResponse
  state: unknown
}
export default class LoginController {
  private passportToValues(passport: PassportResponse) {
    const { guilds, user, options, client_id, code, redirect_uri, state, ...token } = passport

    const {
      id: discordId,
      discriminator,
      flags,
      locale,
      mfa_enabled,
      public_flags,
      verified,
      ...discord
    } = user

    const discordUser = { ...discord, discordId }

    const { expires_in, scope, ...restToken } = token
    const discordToken = { ...restToken, scope: scope.join(' ') }

    return { discordUser, discordToken, guilds }
  }

  public async index({ auth, request }: HttpContextContract) {
    try {
      const { code } = request.only(['code'])
      const passport = new Passport({
        code,
        client_id: Env.get('DISCORD_CLIENT_ID'),
        client_secret: Env.get('DISCORD_CLIENT_SECRET'),
        redirect_uri: 'http://localhost:3000/login/callback',
        scope: ['identify', 'email', 'guilds']
      })

      await passport.open()
      const { discordToken, discordUser, guilds } = this.passportToValues(passport)

      const isMember = guilds.some((guild) => guild.id === Env.get('GUILD_ID'))
      if (!isMember) throw new Error('E_DISCORD_NOT_MEMBER')

      const user = await User.updateOrCreate({ discordId: discordUser.discordId }, discordUser)

      const storeDiscordToken = await DiscordToken.firstOrNew({ userId: user.id })
      storeDiscordToken.merge(discordToken)
      await storeDiscordToken.save()

      const token = await auth.use('api').loginViaId(user.id)

      return { user, token, discord: discordToken }
    } catch (error) {
      throw new Error('E_DISCORD_UNAUTHORIZED')
    }
  }

  public async session({ auth, request }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])
    const token = await auth.use('api').attempt(email, password)
    return token.toJSON()
  }
}
