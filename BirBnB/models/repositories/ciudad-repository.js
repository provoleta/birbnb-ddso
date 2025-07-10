import { CiudadModel } from '../schemas/ciudad-schema.js'

export default class CiudadRepository {
  constructor() {
    this.model = CiudadModel
  }

  async yaExiste(nombreCiudad) {
    const existingCity = await this.model.findOne({
      nombre: nombreCiudad,
    })
    return existingCity !== null
  }

  async addCity(nombreCiudad) {
    if (!(await this.yaExiste(nombreCiudad)))
      return await this.model.create({
        nombre: nombreCiudad,
      })
  }

  async getCities() {
    return await this.model.find()
  }
}
