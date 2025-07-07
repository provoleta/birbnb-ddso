import ReservaController from '../controllers/reserva.controller.js'
import { verifyToken } from '../controllers/utils.js'

// TODO ¿Que rutas son tipo /usuarios/reservas? ¿Que rutas son tipo /reservas?
export default function registerReservaRoutes(app, getController) {
  app.post('/reservas', verifyToken, (req, res) =>
    getController(ReservaController).create(req, res),
  )

  app.delete('/reservas/:id', verifyToken, (req, res) =>
    getController(ReservaController).delete(req, res),
  )

  // Actualiza fecha
  app.patch('/reservas/:id', verifyToken, (req, res) =>
    getController(ReservaController).update(req, res),
  )
}
