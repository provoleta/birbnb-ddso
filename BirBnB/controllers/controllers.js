import { AlojamientoController } from './alojamiento.controller.js'
import { ReservaController } from './reserva.controller.js'
import { NotificacionController } from './notificacion.controller.js'
import { SaludController } from './health.controller.js'

export const controllers = [
  { controller: AlojamientoController, instance: new AlojamientoController() },
  { controller: ReservaController, instance: new ReservaController() },
  { controller: NotificacionController, instance: new NotificacionController() },
  { controller: SaludController, instance: new SaludController() }
]
