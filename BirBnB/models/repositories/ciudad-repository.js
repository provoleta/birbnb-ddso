import { CiudadModel } from '../schemas/ciudad-schema.js'

export default class CiudadRepository {
  constructor() {
    this.model = CiudadModel
  }

  async yaExiste(ciudad) {
    const existingCity = await this.model.findOne({
      nombre: ciudad.nombre,
      pais: ciudad.pais,
    })
    return existingCity !== null
  }

  async addCity(ciudad) {
    if (!this.yaExiste(ciudad))
      return await this.model.create({
        nombre: ciudad.nombre,
        pais: ciudad.pais,
      })
  }

  async getCities() {
    return await this.model.find()
  }
}
