class SaludController {
  health (req, res) {
    res.send('Servidor en funcionamiento\n')
  }
}

module.exports = SaludController
