import NotificacionController from '../controllers/notificacion.controller.js'

// TODO: revisar endpoint noficacionNoLeida y noficacionLeida
export default function registerNotificacionRoutes(app, getController) {
  // app.get('/notificacionNoLeida/:userId', (req, res, next) =>
  //   getController(NotificacionController).findAllNotRead(req, res, next),
  // )

  // app.get('/notificacionLeida/:userId', (req, res, next) =>
  //   getController(NotificacionController).findAllRead(req, res, next),
  // )

  app.get('/notificacion/', (req, res, next) =>
    getController(NotificacionController).findAll(req, res, next),
  )

  app.put('/notificacion/', (req, res, next) =>
    getController(NotificacionController).update(req, res, next),
  )
}
