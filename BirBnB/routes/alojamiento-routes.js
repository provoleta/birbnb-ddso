import AlojamientoController from '../controllers/alojamiento.controller.js'
import { verifyToken } from '../controllers/utils.js'

export default function registerAlojamientoRoutes(app, getController) {
  app.get('/alojamientos', async (req, res) =>
    getController(AlojamientoController).findAll(req, res),
  )

  app.get('/alojamientos/:id', async (req, res) =>
    getController(AlojamientoController).findById(req, res),
  )

  app.get('/ciudades', async (req, res) =>
    getController(AlojamientoController).findCiudades(req, res),
  )

  app.post('/alojamientos', verifyToken, (req, res) =>
    getController(AlojamientoController).create(req, res),
  )
}
