// import { z } from "zod"

const express = require('express')
const app = express()
const port = 9000 // * Puerto arbitrario para el servidor

const SaludController = require('./controllers/health.controller')

const router = express.Router()

const saludController = new SaludController()

app.use('/', router) // * Se le dice al servidor que use el router para manejar las rutas

router.get('/health', (req, res) => saludController.health(req, res)) // * Se le dice al router que use el controlador de salud para manejar la ruta /health

// TODO: Investigar Zod, como implementarlo en el tp para el tema de las verificaciones

app.listen(port, () => {
  console.log('Servidor escuchando en el puerto ' + port)
  console.log('Endpoint de salud: http://localhost:' + port + '/health')
})
