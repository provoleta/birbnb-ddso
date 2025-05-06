import express from 'express'
import { SaludController } from '../controllers/health.controller.js'

export default function healthRoutes(getController) {
  const router = express.Router()

  router.get('/health', (req, res) => {
    getController(SaludController).health(req, res)
  })

  return router
}
