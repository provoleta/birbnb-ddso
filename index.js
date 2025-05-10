import 'dotenv/config' // * Cargar las variables de entorno desde el archivo .env

import express from 'express'
import { Server } from './server.js'
import { MongoDBClient } from './BirBnB/config/database.js'

import AlojamientoController from './BirBnB/controllers/alojamiento.controller.js'
import AlojamientoService from './BirBnB/services/alojamiento-service.js'

import ReservaController from './BirBnB/controllers/reserva.controller.js'
import ReservaService from './BirBnB/services/reserva-service.js'

import NotificacionController from './BirBnB/controllers/notificacion.controller.js'
import NotificacionService from './BirBnB/services/notificacion-service.js'

const app = express()
const port = process.env.PORT || 3000
const server = new Server(app, port) // * Crear una nueva instancia del servidor

// MongoDBClient.connect()

// Configuracion de dependencias
const alojamientoService = new AlojamientoService(0)
const alojamientoController = new AlojamientoController(alojamientoService)

const reservaService = new ReservaService(0)
const reservaController = new ReservaController(reservaService)

const notificacionService = new NotificacionService(0)
const notificacionController = new NotificacionController(notificacionService)

// Registro de controladores en el servidor
server.setController(AlojamientoController, alojamientoController)
server.setController(ReservaController, reservaController)
server.setController(NotificacionController, notificacionController)

// Configuracion y lanzamiento del servidor
server.configureRoutes()
server.launch()
