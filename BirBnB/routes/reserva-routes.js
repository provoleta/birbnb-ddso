import ReservaController from '../controllers/reserva.controller.js'

// TODO ¿Que rutas son tipo /usuarios/reservas? ¿Que rutas son tipo /reservas?
export default function registerReservaRoutes(app, getController) {
  app.post('/reservas', (req, res) => getController(ReservaController).create(req, res))

  app.delete('/reservas/:id', (req, res) =>
    getController(ReservaController).delete(req, res),
  )

  app.put('/reservas', (req, res) => getController(ReservaController).update(req, res))
}
