import registerAlojamientoRoutes from './alojamiento-routes.js'
import registerReservaRoutes from './reserva-routes.js'
import registerNotificacionRoutes from './notificacion-routes.js'
import registerHealthRoutes from './health-routes.js'

export function configureRoutes(app, getController) {
  registerAlojamientoRoutes(app, getController)
  registerReservaRoutes(app, getController)
  registerNotificacionRoutes(app, getController)
  registerHealthRoutes(app, getController)
}
