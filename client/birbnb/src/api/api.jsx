import axios from 'axios'

function Api() {
  const instance = axios.create({
    baseURL: 'http://localhost:6969',
  })

  return {
    login: async (email, password) => {
      let tokenUsuario = null
      console.log('Intentando logear')
      await instance
        .post('/usuarios/login', {
          email: email,
          password: password,
        })
        .then((response) => {
          const { token } = response.data
          console.log('me llego', token)
          tokenUsuario = token
        })
        .catch((error) => {
          console.error('Login failed:', error)
          alert('Login failed. Please check your credentials and try again.')
        })
      return tokenUsuario
    },

    register: async (name, email, password) => {
      let tokenUsuario = null
      console.log('Intentando registrar')
      await instance
        .post('/usuarios/signup', {
          name: name,
          email: email,
          password: password,
        })
        .then((response) => {
          const { token } = response.data
          console.log('me llego el token:', token)
          tokenUsuario = token
        })
        .catch((error) => {
          console.error('Registration failed:', error)
          alert('Registration failed. Please check your details and try again.')
        })

      return tokenUsuario
    },

    getProfile: async (token) => {
      console.log('Obteniendo perfil del usuario')
      return await instance
        .get('/usuarios/perfil', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error)
          throw error
        })
    },

    getNotificaciones: async (token, leida) => {
      let notificaciones = null
      console.log('Obteniendo notificaciones del usuario')
      await instance
        .get('/usuarios/notificaciones', {
          headers: {
            Authorization: `Bearer ${token}`,
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
    },

    crearReserva: async (reserva) => {
      console.log('Creando reserva:', reserva)
      return await instance
        .post('/reservas', reserva)
        .then((response) => {
          console.log('Reserva creada con éxito:', response.data)
          return response.data
        })
        .catch((error) => {
          console.error('Error creating reservation:', error)
          throw error
        })
    },

    obtenerAlojamiento: async (id) => {
      return await instance
        .get(`/alojamientos/${id}`)
        .then((response) => {
          console.log('Alojamiento obtenido API:', response.data)
          return response.data
        })
        .catch((error) => {
          console.error('Error fetching accommodation:', error)
          throw error
        })
    },

    obtenerAlojamientosCarousel: async () => {
      return await instance
        .get('/alojamientos?page=1&limit=6')
        .then((response) => {
          console.log('Alojamientos obtenidos para el carousel:', response.data)
          return response.data
        })
        .catch((error) => {
          console.error('Error fetching carousel accommodations:', error)
          throw error
        })
    },

    getReservas: async (token) => {
      console.log('Obteniendo reservas del usuario')
      return await instance
        .get('/usuarios/reservas', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log('Reservas obtenidas:', response.data)
          return response.data
        })
        .catch((error) => {
          console.error('Error fetching reservations:', error)
          throw error
        })
    },
  }
}

export default Api
