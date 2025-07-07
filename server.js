import express from 'express'
import { configureRoutes } from './BirBnB/routes/routes.js'
import { errorHandler } from './error-handler.js'
import cors from 'cors'

export class Server {
  controllers = {}
  // routes = []
  app

  constructor(app, port = 6969) {
    this.app = app
    this.port = port
    this.app.use(express.json({ limit: '50mb' })) // * Middleware para parsear el cuerpo de las peticiones como JSON
    this.app.use(express.urlencoded({ limit: '50mb' }))
    this.app.use(cors()) // * Middleware para permitir CORS
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
