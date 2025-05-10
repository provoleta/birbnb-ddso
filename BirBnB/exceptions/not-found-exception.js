export default class NotFoundException extends Error {
  constructor(message) {
    super(message)
    this.name = 'No se pudo encontrar el recurso'
  }
}
