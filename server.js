import express from 'express'
import { configureRoutes } from './BirBnB/routes/routes.js'
import { errorHandler } from './error-handler.js'

export class Server {
  controllers = {}
  // routes = []
  app

  constructor(app, port = 3000) {
    this.app = app
    this.port = port
    this.app.use(express.json()) // * Middleware para parsear el cuerpo de las peticiones como JSON
  }

  setController(controllerClass, controller) {
    this.controllers[controllerClass.name] = controller
  }

  getController(controllerClass) {
    const controller = this.controllers[controllerClass.name]
    if (!controller) {
      throw new Error(`Controller ${controllerClass.name} not found`)
    }
    return controller
  }

  configureRoutes() {
    configureRoutes(this.app, this.getController.bind(this))

    this.app.use((req, res, _next) => {
      res.status(404).json({
        status: 'fail',
        message: 'La ruta solicitada no existe',
      })
    })

    this.app.use(errorHandler)
  }

  launch() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`)
    })
  }

  /*   addRoute(route) {
    this.routes.push(route)
  } */
}
