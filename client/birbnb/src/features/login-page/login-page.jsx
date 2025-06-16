import './login-page.css'
import { useAuthContext } from '../../store/auth-context'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function LoginPage() {
  const { setToken } = useAuthContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [nuevoRegistro, setNuevoRegistro] = useState(false)
  const [titulo, setTitulo] = useState('Iniciar Sesion - Birbnb')
  const [cambio, setCambio] = useState('Crear Cuenta')

  const navigate = useNavigate()

  useEffect(() => {
    if (nuevoRegistro) {
      setTitulo('Crear Cuenta - Birbnb')
      setCambio('¿Ya tenes cuenta? Inicia sesion')
    } else {
      setTitulo('Iniciar Sesion - Birbnb')
      setCambio('Crear Cuenta')
    }
  }, [nuevoRegistro])

  const handleLogin = async (e) => {
    e.preventDefault()
    if (email && password) {
      await axios
        .post(
          '/usuarios/login',
          {
            email: email,
            password: password,
          },
          { baseURL: 'http://localhost:6969' },
        )
        .then((response) => {
          const { token } = response.data
          setToken(token)
          navigate('/')
        })
        .catch((error) => {
          console.error('Login failed:', error)
          alert('Login failed. Please check your credentials and try again.')
        })
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    if (email && password && name) {
      await axios
        .post(
          '/usuarios/signup',
          {
            name: name,
            email: email,
            password: password,
          },
          { baseURL: 'http://localhost:6969' },
        )
        .then((response) => {
          const { token } = response.data
          setToken(token)
          navigate('/')
        })
        .catch((error) => {
          console.error('Registration failed:', error)
          alert('Registration failed. Please check your details and try again.')
        })
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>{titulo}</h2>
        <form className="login-form">
          {nuevoRegistro && (
            <div className="input-container">
              <label htmlFor="name">Nombre completo:</label>
              <input
                className="login-input"
                type="text"
                id="name"
                name="name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <div className="input-container">
            <label htmlFor="email">Email:</label>
            <input
              className="login-input"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password:</label>
            <input
              className="login-input"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" onClick={handleLogin} className="login-button">
            Login
          </button>

          <div className="login-toggle" onClick={() => setNuevoRegistro(!nuevoRegistro)}>
            {cambio}
          </div>
        </form>
      </div>
    </div>
  )
}
