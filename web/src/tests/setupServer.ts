import 'whatwg-fetch'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { baseURL } from '../services/api'

const server = setupServer(
  rest.get(`${baseURL}/attributes/undefined`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          userId: 1,
          label: 'Agilidade',
          dices: ['d6']
        }
      ])
    )
  }),
  rest.put(`${baseURL}/attributes/undefined`, (req, res, ctx) => {
    return res(ctx.status(200))
  }),
  rest.post(`${baseURL}/login`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        user: {
          id: 12345,
          discordId: '123456',
          username: 'username',
          avatar: 'avatar',
          isBot: false,
          isPlayer: true,
          isMaster: false,
          created_at: 'yesterday',
          updated_at: 'today'
        },
        token: {
          token: 'token test',
          type: 'bearer'
        },
        discord: {
          refresh_token: 'five minutes',
          scope: 'scope1 scope2',
          token: 'discord token test',
          token_type: 'bearer'
        }
      })
    )
  }),
  rest.get('*', (req, res, ctx) => {
    console.error(`Please add request handler for ${req.url.toString()}`)
    return res(
      ctx.status(500),
      ctx.json({ error: 'You must add request handler.' })
    )
  })
)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

export { server, rest }
