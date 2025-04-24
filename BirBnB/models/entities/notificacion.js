class Notificacion {

    #fechaLeida

    constructor(mensaje, usuario, fechaAlta) {
        this.mensaje = mensaje;       // Mensaje (MensajeCpnUsuario || MensajePlano)
        this.usuario = usuario;       // Usuario
        this.fechaAlta = fechaAlta;   // Date
        this.leida = false;           // Boolean

            
    }

    // Setter de atributo "leida" 
    marcarComoLeida() {
        this.leida = true
        this.fechaLeida = new Date()
    }

    get fechaLeida() {
        return this.#fechaLeida
    }
}

