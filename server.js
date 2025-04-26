// import { z } from "zod"
import 'dotenv/config' // * Cargar las variables de entorno desde el archivo .env

import express from 'express'
const app = express()
const port = process.env.PORT || 9000 // * Puerto arbitrario para el servidor

import SaludController from './BirBnB/controllers/health.controller.js'

const router = express.Router()

const saludController = new SaludController()

app.use('/', router) // * Se le dice al servidor que use el router para manejar las rutas

router.get('/health', (req, res) => saludController.health(req, res)) // * Se le dice al router que use el controlador de salud para manejar la ruta /health

// TODO: Investigar Zod, como implementarlo en el tp para el tema de las verificaciones

app.listen(port, () => {
  console.log('Servidor escuchando en el puerto ' + port)
  console.log('Endpoint de salud: http://localhost:' + port + '/health')
})
