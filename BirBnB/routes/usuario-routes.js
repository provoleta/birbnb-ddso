import UsuarioController from '../controllers/usuario.controller.js'

export default function registerUsuarioRoutes(app, getController) {
  app.get('usuarios/notificaciones/', (req, res) =>
    getController(UsuarioController).findAll(req, res),
  )

  app.put('usuarios/notificaciones/', (req, res) =>
    getController(UsuarioController).update(req, res),
  )

  app.get('usuarios/reservas', (req, res) =>
    getController(UsuarioController).findReservas(req, res),
  )
}
