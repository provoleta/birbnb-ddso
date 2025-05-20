import ReservaController from '../controllers/reserva.controller.js'

export default function registerReservaRoutes(app, getController) {
  app.post('/reserva', (req, res, next) =>
    getController(ReservaController).create(req, res, next),
  )

  app.delete('/reserva/:id', (req, res, next) =>
    getController(ReservaController).delete(req, res, next),
  )

  app.get('/reserva/:userId', (req, res, next) =>
    getController(ReservaController).findByUserId(req, res, next),
  )

  app.put('/reserva', (req, res, next) =>
    getController(ReservaController).update(req, res, next),
  )
}
