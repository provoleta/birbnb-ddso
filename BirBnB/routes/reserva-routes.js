import { ReservaController } from '../controllers/reserva.controller.js'
import express from 'express'

export default function ReservaRoutes(getController) {
    const router = express.Router() 

    router.post("/reserva", (req, res) =>
        getController(ReservaController).create(req, res)
    );

    router.delete("/reserva/:id", (req, res) =>
        getController(ReservaController).delete(req, res)
    );
    
    router.get("/reserva/:userId", (req, res) => 
        getController(ReservaController).findByUserId(req, res)
    );

    router.put("/reserva", (req, res) =>
        getController(ReservaController).update(req, res)
    );
    
    return router
}