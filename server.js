// import SaludController from './BirBnB/controllers/health.controller.js'
// import routes from './BirBnB/routes/routes.js'

// const router = express.Router()

// const saludController = new SaludController()

// app.use('/', router) // * Se le dice al servidor que use el router para manejar las rutas

// router.get('/health', (req, res) => saludController.health(req, res)) // * Se le dice al router que use el controlador de salud para manejar la ruta /health

// // TODO: Investigar Zod, como implementarlo en el tp para el tema de las verificaciones

// app.listen(port, () => {
//   console.log('Servidor escuchando en el puerto ' + port)
//   console.log('Endpoint de salud: http://localhost:' + port + '/health')
// })

// configureRoutes() {
//   routes.forEach(r => {
//       app.use(r(this.getController.bind(this)))
//     })
// }

import express from 'express' 

export class Server {
  controllers = {}
  routes = []
  app

  constructor(app, port = 3000) {
    this.app = app
    this.port = port
    this.app.use(express.json()) // * Middleware para parsear el cuerpo de las peticiones como JSON
  }

  get app() {
    return this.app
  }

  setController(controllerClass, controller) {
    this.controllers[controllerClass.name] = controller
  }

  getController(controllerClass) {
    const controller =  this.controllers[controllerClass.name]
    if (!controller) {
      throw new Error(`Controller ${controllerClass.name} not found`)
    }
    return controller
  }

  configureRoutes() {
    this.routes.forEach(r => {
      this.app.use(r(this.getController.bind(this)))
    })
  }

  launch() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`)
    })
  }

  addRoute(route) {
    this.routes.push(route)
  }
}
