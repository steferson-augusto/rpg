import test from 'japa'
import supertest from 'supertest'

import User from 'App/Models/User'
import Attribute from 'App/Models/Attribute'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

const usersData = [
  {
    discordId: '1',
    username: 'Username 1',
    avatar: 'avatar 1',
    isMaster: true,
    email: 'master@email.com',
    password: 'iYxSW261xCHA'
  },
  {
    discordId: '2',
    username: 'Username 2',
    avatar: 'avatar 2',
    isPlayer: true,
    email: 'player@email.com',
    password: 'iYxSW261xCHA'
  },
  {
    discordId: '3',
    username: 'Username 3',
    avatar: 'avatar 3',
    isBot: true,
    email: 'bot@email.com',
    password: 'iYxSW261xCHA'
  }
]

const auth = async (
  email: string,
  password: string,
  url = '/bot/login'
): Promise<string | undefined> => {
  const { body } = await supertest(BASE_URL).post(url).send({ email, password }).expect(200)
  return body.token
}

test.group('Atributos', (group) => {
  group.beforeEach(async () => {
    await User.query().delete()
    await Attribute.query().delete()
  })

  test('show', async (assert) => {
    const users = await User.createMany(usersData)
    let token = await auth(usersData[1].email as string, usersData[1].password as string)
    const userId = users[1].id

    // requisição como player
    let response = await supertest(BASE_URL)
      .get(`/attributes/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    assert.containSubset(response.body, [
      { userId, label: 'Agilidade', dices: ['d4'] },
      { userId, label: 'Astúcia', dices: ['d4'] },
      { userId, label: 'Espírito', dices: ['d4'] },
      { userId, label: 'Força', dices: ['d4'] },
      { userId, label: 'Vigor', dices: ['d4'] }
    ])

    const user = await User.create({
      discordId: '5',
      username: 'Username 5',
      avatar: 'avatar 5',
      isPlayer: true,
      email: 'player5@email.com',
      password: 'iYxSW261xCHA'
    })

    token = await auth(usersData[0].email as string, usersData[0].password as string)

    // requisição como mestre
    response = await supertest(BASE_URL)
      .get(`/attributes/${user.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    assert.containSubset(response.body, [
      { userId: user.id, label: 'Agilidade', dices: ['d4'] },
      { userId: user.id, label: 'Astúcia', dices: ['d4'] },
      { userId: user.id, label: 'Espírito', dices: ['d4'] },
      { userId: user.id, label: 'Força', dices: ['d4'] },
      { userId: user.id, label: 'Vigor', dices: ['d4'] }
    ])
  })

  test('show - validation', async (assert) => {
    const users = await User.createMany(usersData)
    const id = users[1].id
    let token = await auth(usersData[2].email, usersData[2].password)

    // sem login
    let response = await supertest(BASE_URL).get(`/attributes/${id}`).expect(401)
    assert.deepEqual(response.body, {
      errors: [{ message: 'E_UNAUTHORIZED_ACCESS: Unauthorized access' }]
    })

    // usuário não é membro
    response = await supertest(BASE_URL)
      .get(`/attributes/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(401)

    assert.deepEqual(response.body, [
      {
        field: 'general',
        message: 'Operação permitida apenas para membros'
      }
    ])

    const user = await User.create({
      discordId: '5',
      username: 'Username 6',
      avatar: 'avatar 6',
      isPlayer: true,
      email: 'player6@email.com',
      password: 'iYxSW261xCHA'
    })

    await Attribute.createMany([
      { userId: id, dices: ['d6'], label: 'Agilidade' },
      { userId: user.id, dices: ['d4'], label: 'Vigor' }
    ])

    token = await auth('player6@email.com', 'iYxSW261xCHA')

    // usuário não é proprietário
    response = await supertest(BASE_URL)
      .get(`/attributes/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    assert.containSubset(response.body, [{ dices: ['d4'], label: 'Vigor', userId: user.id }])
  })

  test('update', async (assert) => {
    const users = await User.createMany(usersData)
    const userId = users[1].id
    let token = await auth(usersData[1].email, usersData[1].password)
    const { id } = await Attribute.create({ userId, dices: ['d4'], label: 'Agilidade' })

    let response = await supertest(BASE_URL)
      .put(`/attributes/${id}`)
      .send({ dices: ['d6'] })
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    assert.containSubset(response.body, { userId, dices: ['d6'], label: 'Agilidade' })

    token = await auth(usersData[0].email, usersData[0].password)

    response = await supertest(BASE_URL)
      .put(`/attributes/${id}`)
      .send({ dices: ['d8'] })
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    assert.containSubset(response.body, { userId, dices: ['d8'], label: 'Agilidade' })
  })

  test('update - validation', async (assert) => {
    const users = await User.createMany(usersData)
    const userId = users[1].id
    let token = await auth(usersData[2].email, usersData[2].password)
    const { id } = await Attribute.create({ userId, dices: ['d4'], label: 'Agilidade' })

    // sem login
    let response = await supertest(BASE_URL).put(`/attributes/${id}`).expect(401)
    assert.deepEqual(response.body, {
      errors: [{ message: 'E_UNAUTHORIZED_ACCESS: Unauthorized access' }]
    })

    // usuário não é membro
    response = await supertest(BASE_URL)
      .put(`/attributes/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(401)

    assert.deepEqual(response.body, [
      { field: 'general', message: 'Operação permitida apenas para membros' }
    ])

    token = await auth(usersData[1].email, usersData[1].password)
    // requisição sem corpo
    response = await supertest(BASE_URL)
      .put(`/attributes/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(422)

    assert.deepEqual(response.body, {
      errors: [{ field: 'dices', message: 'Campo obrigatório', rule: 'required' }]
    })

    await User.create({
      discordId: '5',
      username: 'Username 6',
      avatar: 'avatar 6',
      isPlayer: true,
      email: 'player6@email.com',
      password: 'iYxSW261xCHA'
    })

    token = await auth('player6@email.com', 'iYxSW261xCHA')

    // usuário não é proprietário
    response = await supertest(BASE_URL)
      .put(`/attributes/${id}`)
      .send({ dices: ['d6'] })
      .set('Authorization', `Bearer ${token}`)
      .expect(401)

    assert.deepEqual(response.body, [
      { field: 'general', message: 'Operação permitida apenas para o mestre ou o próprio jogador' }
    ])
  })
})
