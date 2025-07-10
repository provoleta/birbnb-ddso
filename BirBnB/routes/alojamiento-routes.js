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

  //TODO EMPROLIJAR ESTA NEGRADA
  app.get('/geocode', async (req, res) => {
    try {
      const { calle, numero, ciudad, pais } = req.query

      // Validar que tenemos los parámetros necesarios
      if (!calle || !numero || !ciudad || !pais) {
        return res.status(400).json({
          error: 'Faltan parámetros requeridos: calle, numero, ciudad, pais',
          lat: 0,
          long: 0,
        })
      }

      const direccion = encodeURIComponent(`${calle} ${numero}, ${ciudad}, ${pais}`)
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${direccion}`

      const response = await fetch(url, {
        headers: {
          'Accept-Language': 'es',
          'User-Agent': 'BirBnB-App',
        },
      })

      if (!response.ok) {
        console.error('Geocoding service error:', response.status, response.statusText)
        return res.json({ lat: 0, long: 0 })
      }

      const data = await response.json()

      if (data && data.length > 0) {
        res.json({ lat: parseFloat(data[0].lat), long: parseFloat(data[0].lon) })
      } else {
        console.log('No geocoding results found for:', direccion)
        res.json({ lat: 0, long: 0 })
      }
    } catch (error) {
      console.error('Error in geocode endpoint:', error)
      res.status(500).json({
        error: 'Error interno del servidor en geocodificación',
        lat: 0,
        long: 0,
      })
    }
  })
}
