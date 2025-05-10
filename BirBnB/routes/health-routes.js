import SaludController from '../controllers/health.controller.js'

export default function registerHealthRoutes(app, getController) {
  app.get('/health', (req, res) => {
    getController(SaludController).health(req, res)
  })
}
