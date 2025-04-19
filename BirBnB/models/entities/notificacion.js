class Notificacion {

    #fechaLeida
    constructor(mensaje, usuario, fechaAlta) {
        this.mensaje = mensaje;       // String
        this.usuario = usuario;       // Usuario
        this.fechaAlta = fechaAlta;   // Date
        this.leida = false;           // Boolean
        // this.fechaLeida = fechaLeida; // Date
    }

    marcarComoLeida() {
        // Setter de atributo "leida" 
        this.leida = true
        this.fechaLeida = new Date()
    }

    get fechaLeida() {
        return this.#fechaLeida
    }
}

module.exports = Notificacion