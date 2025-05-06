import 'dotenv/config' // * Cargar las variables de entorno desde el archivo .env

import express from 'express'
import { Server } from './server.js'
import routes from './BirBnB/routes/routes.js'
import { controllers } from './BirBnB/controllers/controllers.js'

const app = express()
const port = process.env.PORT || 9000
const server = new Server(app, port) // * Crear una nueva instancia del servidor

// TODO: Configurar dependencias
// import { AlojamientoController } from './BirBnB/controllers/alojamiento-controller.js'
// import { ReservaController } from './BirBnB/controllers/reserva-controller.js'
// import { NotificacionController } from './BirBnB/controllers/notificacion-controller.js'
// import { SaludController } from './BirBnB/controllers/health.controller.js'

// import { AlojamientoService } from './BirBnB/services/alojamiento-service.js'
// import { ReservaService } from './BirBnB/services/reserva-service.js'
// import { NotificacionService } from './BirBnB/services/notificacion-service.js'

// const alojamientoController = new AlojamientoController(alojamientoService)
// const alojamientoService = new AlojamientoService()

/*
 ///Configuración de dependencias
const productRepo = new ProductRepository();
const productService = new ProductService(productRepo);
const productController = new ProductController(productService);

 ///Registro del controlador en el servidor
server.setController(ProductController, productController);
*/

controllers.forEach((c) => {
  server.setController(c.controller, c.instance) // * Registrar el controlador en el servidor
})

routes.forEach((r) => {
  server.addRoute(r)
})
server.configureRoutes()
server.launch()
