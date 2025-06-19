class Usuario {
  id
  /**
   *
   * @param {Int} id
   * @param {String} nombre
   * @param {String} email
   * @param {TipoUsuario} tipo
   *
   */
  constructor(nombre, email, tipo) {
    this.nombre = nombre
    this.email = email
    this.tipo = tipo
    this.notificaciones = []
  }

  agregarNotificacion(unaNotificacion) {
    this.notificaciones.push(unaNotificacion)
  }
}

const TipoUsuario = {
  HUESPED: 'HUESPED',
  ANFITRION: 'ANFITRION',
}

export { Usuario, TipoUsuario }
