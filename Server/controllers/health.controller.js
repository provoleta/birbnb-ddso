class SaludController {
    health(req, res) {
        res.send('Servidor en funcionamiento');
    }
}

module.exports = SaludController;