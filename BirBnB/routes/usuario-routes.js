import UsuarioController from '../controllers/usuario.controller.js'
import { verifyToken } from '../controllers/utils.js'

export default function registerUsuarioRoutes(app, getController) {
  app.get('/usuarios/notificaciones/', verifyToken, (req, res) =>
    getController(UsuarioController).findAll(req, res),
  )

  app.put('/usuarios/notificaciones/:id', verifyToken, (req, res) =>
    getController(UsuarioController).update(req, res),
  )

  app.get('/usuarios/reservas', verifyToken, (req, res) =>
    getController(UsuarioController).findReservas(req, res),
  )

  app.post('/usuarios/signup', (req, res) =>
    getController(UsuarioController).signup(req, res),
  )

  app.post('/usuarios/login', (req, res) =>
    getController(UsuarioController).login(req, res),
  )

  app.get('/usuarios/perfil', verifyToken, (req, res) =>
    getController(UsuarioController).getProfile(req, res),
  )
}
