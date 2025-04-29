import { NotificacionController } from '../controllers/notificacion.controller.js'
import express from 'express'

export default function NotificacionRoutes(getController) {
    
    const router = express.Router()

    router.get("/noficacionNoLeida/:userId", (req, res) =>
        getController(NotificacionController).findAllNotRead(req, res)
    )

    router.get("/noficacionLeida/:userId", (req, res) =>
        getController(NotificacionController).findAllRead(req, res)
    )

    router.put("/notificacion/:id", (req, res) =>
        getController(NotificacionController).update(req, res)
    )

    return router
}