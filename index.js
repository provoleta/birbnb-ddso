import 'dotenv/config' // * Cargar las variables de entorno desde el archivo .env

import express from 'express'
import { Server } from './server.js'
import { MongoDBClient } from './BirBnB/config/database.js'

import AlojamientoRepository from './BirBnB/models/repositories/alojamiento-repository.js'
import AlojamientoController from './BirBnB/controllers/alojamiento.controller.js'
import AlojamientoService from './BirBnB/services/alojamiento-service.js'

import ReservaRepository from './BirBnB/models/repositories/reserva-repository.js'
import ReservaController from './BirBnB/controllers/reserva.controller.js'
import ReservaService from './BirBnB/services/reserva-service.js'

import NotificacionRepository from './BirBnB/models/repositories/notificacion-repository.js'
import NotificacionController from './BirBnB/controllers/notificacion.controller.js'
import NotificacionService from './BirBnB/services/notificacion-service.js'

import SaludController from './BirBnB/controllers/health.controller.js'

const app = express()
const port = process.env.PORT || 3000
const server = new Server(app, port) // * Crear una nueva instancia del servidor

MongoDBClient.connect()

// Configuracion de dependencias
const saludController = new SaludController()

const alojamientoRepository = new AlojamientoRepository()
const alojamientoService = new AlojamientoService(alojamientoRepository)
const alojamientoController = new AlojamientoController(alojamientoService)

const reservaRepository = new ReservaRepository()
const reservaService = new ReservaService(reservaRepository, alojamientoRepository)
const reservaController = new ReservaController(reservaService)

const notificacionRepository = new NotificacionRepository()
const notificacionService = new NotificacionService(notificacionRepository)
const notificacionController = new NotificacionController(notificacionService)

// Registro de controladores en el servidor
server.setController(AlojamientoController, alojamientoController)
server.setController(ReservaController, reservaController)
server.setController(NotificacionController, notificacionController)
server.setController(SaludController, saludController)

// Configuracion y lanzamiento del servidor
server.configureRoutes()
server.launch()
