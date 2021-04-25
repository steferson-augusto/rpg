import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('/login', 'LoginController.index')
Route.post('/bot/login', 'LoginController.session')

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})

Route.group(() => {
  Route.group(() => {
    Route.resource('attributes', 'AttributesController').only(['show', 'update'])

    Route.get('/skills/user/:id', 'SkillsController.getSkillsByUser')
    Route.resource('skills', 'SkillsController').only(['index', 'store', 'update'])
  }).middleware('member')

  Route.group(() => {
    Route.resource('skills', 'SkillsController').only(['destroy'])
  }).middleware('player')

  Route.group(() => {
    Route.resource('users', 'UsersController').only(['store'])
  }).middleware('bot')

  Route.group(() => {
    Route.resource('users', 'UsersController').only(['index'])
    Route.put('/skills/:id/power-points', 'SkillsController.updatePowerPoints')
  }).middleware('master')
}).middleware('auth')
