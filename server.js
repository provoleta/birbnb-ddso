import express from 'express'

export class Server {
  controllers = {}
  routes = []
  app

  constructor (app, port = 3000) {
    this.app = app
    this.port = port
    this.app.use(express.json()) // * Middleware para parsear el cuerpo de las peticiones como JSON
  }

  setController (controllerClass, controller) {
    this.controllers[controllerClass.name] = controller
  }

  getController (controllerClass) {
    const controller = this.controllers[controllerClass.name]
    if (!controller) {
      throw new Error(`Controller ${controllerClass.name} not found`)
    }
    return controller
  }

  configureRoutes () {
    this.routes.forEach(r => {
      this.app.use(r(this.getController.bind(this)))
    })
  }

  launch () {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`)
    })
  }

  addRoute (route) {
    this.routes.push(route)
  }
}
