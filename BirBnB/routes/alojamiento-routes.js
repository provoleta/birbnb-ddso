import AlojamientoController from '../controllers/alojamiento.controller.js'

export default function registerAlojamientoRoutes(app, getController) {
  app.get('/alojamientos', async (req, res, next) =>
    getController(AlojamientoController).findAll(req, res, next),
  )
}
