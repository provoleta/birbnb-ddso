import axios from 'axios'
import { data } from 'react-router'
import qs from 'qs'

class Api {
  constructor() {
    this.tokenAuth = null
    this.axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_IP_BACK || 'http://localhost:6969',
    })
  }

  async login(email, password) {
    await this.axiosInstance
      .post('/usuarios/login', {
        email: email,
        password: password,
      })
      .then((response) => {
        const { token } = response.data

        this.tokenAuth = token
      })
      .catch((error) => {
        throw error
      })
    return this.tokenAuth
  }

  async register(name, email, password, profileImage) {
    await this.axiosInstance
      .post('/usuarios/signup', {
        name: name,
        email: email,
        password: password,
        profileImage: profileImage,
      })
      .then((response) => {
        const { token } = response.data

        this.tokenAuth = token
      })
      .catch((error) => {
        console.error('Registration failed:', error)
        alert('Registration failed. Please check your details and try again.')
      })

    return this.tokenAuth
  }

  async registerAnfitrion(name, email, password, biografia, profileImage) {
    await this.axiosInstance
      .post('/usuarios/signup-anfitrion', {
        name: name,
        email: email,
        password: password,
        biografia: biografia,
        profileImage: profileImage,
      })
      .then((response) => {
        const { token } = response.data

        this.tokenAuth = token
      })
      .catch((error) => {
        console.error('Registration failed:', error)
        alert('Registration failed. Please check your details and try again.')
      })

    return this.tokenAuth
  }

  async getProfile() {
    return await this.axiosInstance
      .get('/usuarios/perfil', {
        headers: {
          Authorization: `Bearer ${this.tokenAuth}`,
        },
      })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error)
        throw error
      })
  }

  async getNotificaciones(leida) {
    let notificaciones = null

    await this.axiosInstance
      .get('/usuarios/notificaciones', {
        headers: {
          Authorization: `Bearer ${this.tokenAuth}`,
        },
        params: {
          leida: leida,
        },
      })
      .then((response) => {
        notificaciones = response.data
      })
      .catch((error) => {
        console.error('Error fetching notifications:', error.message)
      })
    return notificaciones
  }

  async crearReserva(reserva) {
    return await this.axiosInstance
      .post('/reservas', reserva, {
        headers: {
          Authorization: `Bearer ${this.tokenAuth}`,
        },
      })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.error('Error creating reservation:', error)
        throw error
      })
  }

  async obtenerAlojamiento(id) {
    return await this.axiosInstance
      .get(`/alojamientos/${id}`)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.error('Error fetching accommodation:', error)
        throw error
      })
  }

  async obtenerAlojamientos(filters) {
    return await this.axiosInstance
      .get('/alojamientos', {
        params: filters,
        paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
      })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.error('Error al buscar alojamientos:', error)
        throw error
      })
  }

  async obtenerAlojamientosCarousel() {
    return await this.axiosInstance
      .get('/alojamientos?page=1&limit=6')
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.error('Error fetching carousel accommodations:', error)
        throw error
      })
  }

  async getReservas() {
    return await this.axiosInstance
      .get('/usuarios/reservas', {
        headers: {
          Authorization: `Bearer ${this.tokenAuth}`,
        },
      })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.error('Error fetching reservations:', error.message)
        throw error
      })
  }
  async cancelarReserva(idReserva, motivo) {
    return await this.axiosInstance
      .delete(`/reservas/${idReserva}`, {
        headers: {
          Authorization: `Bearer ${this.tokenAuth}`,
        },
        data: {
          motivo: motivo,
        },
      })
      .then((response) => {
        return response
      })
      .catch((error) => {
        error.status === 410
          ? alert('No se pudo cancelar la reserva ya que se excede el tiempo minimo')
          : console.error('Error en la cancelacion de la reserva: ', error.message)
      })
  }
  async marcarComoLeida(idNotificacion) {
    return await this.axiosInstance
      .put(`/usuarios/notificaciones/${idNotificacion}`, null, {
        headers: {
          Authorization: `Bearer ${this.tokenAuth}`,
        },
      })
      .then((response) => {
        return response.data
      })
  }

  async getAlojamientosAnfitrion(idAnfitrion) {
    return await this.axiosInstance
      .get(`/usuarios/alojamientos`, {
        headers: {
          Authorization: `Bearer ${this.tokenAuth}`,
        },
      })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.error('Error fetching alojamientos:', error.message)
        throw error
      })
  }

  async subirAlojamiento(alojamiento) {
    return await this.axiosInstance
      .post('/alojamientos', alojamiento, {
        headers: {
          Authorization: `Bearer ${this.tokenAuth}`,
        },
      })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.error('Error fetching alojamientos:', error)
        throw error
      })
  }

  async obtenerCoordenadas(direccion) {
    return await this.axiosInstance
      .get('/geocode', {
        params: {
          calle: direccion.calle,
          numero: direccion.numero,
          ciudad: direccion.ciudad,
          pais: direccion.pais,
        },
      })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.error('Error fetching coordinates:', error)
        throw error
      })
  }

  async modificarEstadoReserva(reservaId, motivo, estado) {
    return await this.axiosInstance
      .patch(
        `/reservas/${reservaId}`,
        {
          motivo: motivo,
          estado: estado,
        },
        {
          headers: {
            Authorization: `Bearer ${this.tokenAuth}`,
          },
        },
      )
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.error('Error actualizando estado reservas:', error)
        throw error
      })
  }

  async modificarFechasReserva(reservaId, rangoFechas) {
    return await this.axiosInstance
      .patch(
        `/reservas/${reservaId}`,
        {
          rangoFechas: rangoFechas,
        },
        {
          headers: {
            Authorization: `Bearer ${this.tokenAuth}`,
          },
        },
      )
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.error('Error actualizando fechas de reserva: ', error)
        throw error
      })
  }

  async obtenerCiudades() {
    return await this.axiosInstance
      .get('/ciudades')
      .then((response) => {
        console.log('Response:', response)
        return response.data
      })
      .catch((error) => {
        console.error('Error fetching cities:', error)
        throw error
      })
  }
}

const api = new Api()
export default api
