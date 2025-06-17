import axios from 'axios'
//import { alojamientos } from '../features/search-page/alojamientosMockeados'

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
  }
}

export default Api
