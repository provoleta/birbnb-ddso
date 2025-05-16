import NotificacionController from '../controllers/notificacion.controller.js'

// TODO: revisar endpoint noficacionNoLeida y noficacionLeida
export default function registerNotificacionRoutes(app, getController) {
  app.get('/noficacionNoLeida/:userId', (req, res) =>
    getController(NotificacionController).findAllNotRead(req, res),
  )

  app.get('/noficacionLeida/:userId', (req, res) =>
    getController(NotificacionController).findAllRead(req, res),
  )

  app.put('/notificacion/', (req, res) =>
    getController(NotificacionController).update(req, res),
  )
}
