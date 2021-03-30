import test from 'japa'
import supertest from 'supertest'

import User from 'App/Models/User'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

const usersData = [
  {
    discordId: '1',
    username: 'Username 1',
    avatar: 'avatar 1',
    isMaster: true,
    email: 'rpg@email.com',
    password: 'iYxSW261xCHA'
  },
  { discordId: '2', username: 'Username 2', avatar: 'avatar 2', isPlayer: true },
  { discordId: '3', username: 'Username 3', avatar: 'avatar 3', isPlayer: true },
  { discordId: '4', username: 'Username 4', avatar: 'avatar 4', isPlayer: true },
  { discordId: '5', username: 'Username 5', avatar: 'avatar 5', isPlayer: true },
  { discordId: '6', username: 'Username 6', avatar: 'avatar 6', isBot: true }
]

const auth = async (
  email: string,
  password: string,
  url = '/bot/login'
): Promise<string | undefined> => {
  const { body } = await supertest(BASE_URL).post(url).send({ email, password }).expect(200)
  return body.token
}

test.group('Usuários', (group) => {
  group.beforeEach(async () => {
    await User.query().delete()
  })

  test('index', async (assert) => {
    await User.createMany(usersData)
    const players = usersData.filter((user) => user.isPlayer)

    const token = await auth(usersData[0].email as string, usersData[0].password as string)

    const { body } = await supertest(BASE_URL)
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    assert.containSubset(body, players)
  })

  test('index - validation', async (assert) => {
    const email = 'user@email.com'
    const password = 'iYxSW261xCHA'
    await User.createMany([
      ...usersData,
      {
        discordId: '7',
        username: 'Username 7',
        avatar: 'avatar 7',
        isPlayer: true,
        email,
        password
      }
    ])

    const token = await auth(email, password)

    // sem login
    let response = await supertest(BASE_URL).get('/users').expect(401)
    assert.deepEqual(response.body, {
      errors: [{ message: 'E_UNAUTHORIZED_ACCESS: Unauthorized access' }]
    })

    // usuário não é mestre
    response = await supertest(BASE_URL)
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(401)

    assert.deepEqual(response.body, [
      {
        field: 'general',
        message: 'Operação permitida apenas para mestre'
      }
    ])
  })

  test('store', async (assert) => {
    const email = 'user@email.com'
    const password = 'iYxSW261xCHA'
    await User.create({ ...usersData[5], email, password })

    const token = await auth(email, password)

    // cria usuário
    let response = await supertest(BASE_URL)
      .post('/users')
      .send(usersData[1])
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    assert.containSubset(response.body, usersData[1])

    // atualiza papéis do usuário
    const user = { ...usersData[1], isPlayer: false, isMaster: true }
    response = await supertest(BASE_URL)
      .post('/users')
      .send(user)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    assert.containSubset(response.body, user)
  })

  test('store - validation', async (assert) => {
    const email = 'user@email.com'
    const password = 'iYxSW261xCHA'
    await User.create({ ...usersData[4], email, password })

    let token = await auth(email, password)

    // sem login
    let response = await supertest(BASE_URL).post('/users').expect(401)
    assert.deepEqual(response.body, {
      errors: [{ message: 'E_UNAUTHORIZED_ACCESS: Unauthorized access' }]
    })

    // usuário não é bot
    response = await supertest(BASE_URL)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(401)

    assert.deepEqual(response.body, [
      { field: 'general', message: 'Operação permitida apenas para bot' }
    ])

    // requisição sem corpo
    await User.create({ ...usersData[5], email: 'valid@email.com', password })
    token = await auth('valid@email.com', password)
    response = await supertest(BASE_URL)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(422)

    assert.containSubset(response.body, {
      errors: [
        {
          rule: 'required',
          field: 'discordId',
          message: 'Campo obrigatório'
        },
        {
          rule: 'required',
          field: 'username',
          message: 'Campo obrigatório'
        }
      ]
    })
  })
})
