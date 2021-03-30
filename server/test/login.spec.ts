import test from 'japa'
import supertest from 'supertest'

import User from 'App/Models/User'
import { passportToValues } from '../app/Controllers/Http/LoginController'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

const user = {
  discordId: '1',
  username: 'Username',
  avatar: 'avatar',
  isBot: true,
  email: 'bot@email.com',
  password: 'iYxSW261xCHA'
}

test.group('Login', (group) => {
  group.beforeEach(async () => {
    await User.query().delete()
  })

  test('session', async (assert) => {
    await User.create(user)

    const { body } = await supertest(BASE_URL)
      .post('/bot/login')
      .send({ email: 'bot@email.com', password: 'iYxSW261xCHA' })
      .expect(200)

    assert.hasAllKeys(body, ['token', 'type'])
    assert.equal(body.type, 'bearer')
  })

  test('session - validation', async (assert) => {
    await User.create(user)

    const { body } = await supertest(BASE_URL).post('/bot/login').send().expect(422)

    assert.deepEqual(body, {
      errors: [
        { rule: 'required', field: 'email', message: 'Campo obrigatório' },
        {
          rule: 'required',
          field: 'password',
          message: 'Campo obrigatório'
        }
      ]
    })
  })

  test('passportToValues', (assert) => {
    const values = passportToValues({
      client_id: 'client id',
      code: 'code',
      expires_in: 123,
      guilds: [],
      options: {},
      redirect_uri: 'redirect uri',
      refresh_token: 'refresh token',
      scope: ['scope1', 'scope2'],
      state: 'state',
      token: 'token',
      token_type: 'type',
      user: {
        avatar: 'avatar',
        id: 'id',
        username: 'username',
        verified: false
      }
    })

    assert.hasAllKeys(values, ['discordUser', 'discordToken', 'guilds'])
    assert.deepEqual(values, {
      discordUser: {
        discordId: 'id',
        username: 'username',
        avatar: 'avatar'
      },
      discordToken: {
        refresh_token: 'refresh token',
        token: 'token',
        token_type: 'type',
        scope: 'scope1 scope2'
      },
      guilds: []
    })
  })
})
