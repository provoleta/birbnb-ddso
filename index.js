import 'dotenv/config' // * Cargar las variables de entorno desde el archivo .env

import express from 'express'
import { Server } from './server.js'
import { MongoDBClient } from './BirBnB/config/database.js'

import UsuarioRepository from './BirBnB/models/repositories/usuario-repository.js'
import UsuarioService from './BirBnB/services/usuario-service.js'

import AlojamientoRepository from './BirBnB/models/repositories/alojamiento-repository.js'
import AlojamientoController from './BirBnB/controllers/alojamiento.controller.js'
import AlojamientoService from './BirBnB/services/alojamiento-service.js'

import ReservaRepository from './BirBnB/models/repositories/reserva-repository.js'
import ReservaController from './BirBnB/controllers/reserva.controller.js'
import ReservaService from './BirBnB/services/reserva-service.js'

import NotificacionRepository from './BirBnB/models/repositories/notificacion-repository.js'
import UsuarioController from './BirBnB/controllers/usuario.controller.js'
import NotificacionService from './BirBnB/services/notificacion-service.js'

import SaludController from './BirBnB/controllers/health.controller.js'

import CiudadRepository from './BirBnB/models/repositories/ciudad-repository.js'

const app = express()
const port = process.env.PORT || 6969
const server = new Server(app, port) // * Crear una nueva instancia del servidor

MongoDBClient.connect()

// Configuracion de dependencias
const saludController = new SaludController()

const usuarioRepository = new UsuarioRepository()

const ciudadRepository = new CiudadRepository()
const alojamientoRepository = new AlojamientoRepository()
const alojamientoService = new AlojamientoService(
  alojamientoRepository,
  usuarioRepository,
  ciudadRepository,
)
const usuarioService = new UsuarioService(usuarioRepository, alojamientoRepository)
const alojamientoController = new AlojamientoController(alojamientoService)

const reservaRepository = new ReservaRepository()
const reservaService = new ReservaService(
  reservaRepository,
  alojamientoRepository,
  usuarioRepository,
)
const reservaController = new ReservaController(reservaService)

const notificacionRepository = new NotificacionRepository()
const notificacionService = new NotificacionService(notificacionRepository)
const usuarioController = new UsuarioController(
  notificacionService,
  reservaService,
  usuarioService,
  alojamientoService,
)

// Registro de controladores en el servidor
server.setController(AlojamientoController, alojamientoController)
server.setController(ReservaController, reservaController)
server.setController(UsuarioController, usuarioController)
server.setController(SaludController, saludController)

// Configuracion y lanzamiento del servidor
server.configureRoutes()
server.launch()
