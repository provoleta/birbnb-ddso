import ReservaController from '../controllers/reserva.controller.js'

export default function registerReservaRoutes(app, getController) {
  app.post('/reserva', (req, res) => getController(ReservaController).create(req, res))

  app.delete('/reserva/:id', (req, res) =>
    getController(ReservaController).delete(req, res),
  )

  app.get('/reserva/:userId', (req, res) =>
    getController(ReservaController).findByUserId(req, res),
  )

  app.put('/reserva', (req, res) => getController(ReservaController).update(req, res))
}
