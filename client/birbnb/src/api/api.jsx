import axios from 'axios'

class Api {
  constructor() {
    this.tokenAuth = null
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:6969',
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
        console.error('Login failed:', error)
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
        console.error('Error fetching notifications:', error)
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
        console.log(response.data)
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
        console.error('Error fetching reservations:', error)
        throw error
      })
  }
  async cancelarReserva(idReserva) {
    return await this.axiosInstance
      .delete(`/reservas/${idReserva}`, {
        headers: {
          Authorization: `Bearer ${this.tokenAuth}`,
        },
      })
      .then((response) => {
        return response
      })
      .catch((error) => {
        error.status === 410
          ? alert('No se pudo cancelar la reserva ya que se excede el tiempo minimo')
          : console.error('Error en la cancelacion de la reserva: ', error)
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
        console.error('Error fetching alojamientos:', error)
        throw error
      })
  }
}

const api = new Api()
export default api
