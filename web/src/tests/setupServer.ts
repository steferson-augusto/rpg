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
