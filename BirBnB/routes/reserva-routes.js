import ReservaController from '../controllers/reserva.controller.js'

export default function registerReservaRoutes(app, getController) {
  app.post('/reservas', (req, res, next) =>
    getController(ReservaController).create(req, res, next),
  )

  app.delete('/reservas/:id', (req, res, next) =>
    getController(ReservaController).delete(req, res, next),
  )

  app.get('/reservas/:userId', (req, res, next) =>
    getController(ReservaController).findByUserId(req, res, next),
  )

  app.put('/reservas', (req, res, next) =>
    getController(ReservaController).update(req, res, next),
  )
}
