import {z} from "zod"

const express = require('express');
const app = express();
const port = 9000 // * Puerto arbitrario para el servidor


const SaludController = require('./controllers/health.controller')

const router = express.Router();

const saludController = new SaludController()

app.use("/", router) // * Se le dice al servidor que use el router para manejar las rutas

router.get('/health', (req, res) => saludController.health(req, res)) // * Se le dice al router que use el controlador de salud para manejar la ruta /health

// TODO: Investigar Zod, como implementarlo en el tp para el tema de las verificaciones

app.listen(port, () => {
    console.log('Servidor escuchando en el puerto ' + port);
    console.log('Endpoint de salud: http://localhost:' + port + '/health');
})

// Quizás sea más útil usar un mismo controller para consultas y que maneje las distinas acciones sobre las consultas

const ReservaController = require('./controllers/reservas.controller')

// const CrearReservaController = require('./controllers/crearReserva.controller')

const crearReservaController = new ReservaController.CrearReserva()

router.put('/crearReserva', (req, res) => crearReservaController.create(req, res))

// const EliminarReservaController = require('./controllers/eliminarReseva.controller')

const eliminarReservaController = new ReservaController.EliminarReserva()

router.delete('/eliminarReserva' + '/:id', (req, res) => eliminarReservaController.delete(req, res)) //El campo id podria ser el nombre del alojamiento, habria que definir eso.

// const ConsultaReservaController = require('./controllers/consultaReserva.controller')

const consultaReservaController = new ReservaController.ConsultaReserva()

// En consultaReserva se debería pasar al usuario por query param para buscar las reservas del mismo.
router.get('/consultaReserva' + '/:user', (req, res) => consultaReservaController.consultar(req, res))

// const ModificarReservaController = require('./controllers/modificarReserva.controller')

const modificarReservaController = new ReservaController.ModificarReserva()


// Se deberia pasar qué atributos modificar y también validar que siga en período donde se pueda modificar la reserva
router.post('/modificarReserva', (req, res) => modificarReservaController.modificar(req, res))

