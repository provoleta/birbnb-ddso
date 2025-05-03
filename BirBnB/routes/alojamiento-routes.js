import { AlojamientoController } from '../controllers/alojamiento.controller.js'
import express from 'express'

export default function AlojamientoRoutes (getController) {
  const router = express.Router()

  router.get('/alojamiento', async (req, res) =>
    getController(AlojamientoController).findAll(req, res)
  )

  return router
}
