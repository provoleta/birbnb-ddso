import ReservaCard from '../reserva-card/reserva-card'
import api from '../../../../api/api'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../../store/auth-context'
import Loader from '../../../../components/loader/loader'
import '../../perfil.css'

const MostrarReservas = () => {
  const [reservas, setReservas] = useState([])
  const [reservasAlojamiento, setReservasAlojamiento] = useState([])
  const [loading, setLoading] = useState(true)
  const { logueado, loadingAuth } = useAuthContext()
  const navigate = useNavigate()

  const fetchReservas = async () => {
    try {
      setLoading(true)
      const response = await api.getReservas()
      setReservas(response)
    } catch (error) {
      console.error('Error al obtener las reservas:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!loadingAuth && logueado) {
      fetchReservas()
    }
  }, [loadingAuth, logueado])

  useEffect(() => {
    if (!logueado && !loadingAuth) {
      navigate('/')
    }
  }, [logueado, navigate, loadingAuth])

  return (
    <>
      <h2>Tus reservas</h2>
      {loading ? (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '55%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
          }}
        >
          <Loader />
        </div>
      ) : (
        <>
          {reservas.length > 0 && (
            <div className="fondo-gris">
              {reservas.map((result) => (
                <ReservaCard
                  key={result.idReserva}
                  alojamiento={result.alojamiento}
                  estado={result.estado}
                  fechaAlta={result.fechaAlta}
                  rangoFechas={result.rangoFechas}
                  idReserva={result._id}
                  onReservaCancelada={fetchReservas}
                  reservas={reservas}
                />
              ))}
            </div>
          )}
          {reservas.length === 0 && <p>Todavia no se realizaron reservas.</p>}
        </>
      )}
    </>
  )
}

export default MostrarReservas
