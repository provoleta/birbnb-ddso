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

  app.get('/geocode', async (req, res) => {
    const { calle, numero, ciudad, pais } = req.query
    const direccion = encodeURIComponent(`${calle} ${numero}, ${ciudad}, ${pais}`)
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${direccion}`
    const response = await fetch(url, { headers: { 'Accept-Language': 'es' } })
    const data = await response.json()
    if (data && data.length > 0) {
      res.json({ lat: parseFloat(data[0].lat), long: parseFloat(data[0].lon) })
    } else {
      res.json({ lat: 0, long: 0 })
    }
  })
}
