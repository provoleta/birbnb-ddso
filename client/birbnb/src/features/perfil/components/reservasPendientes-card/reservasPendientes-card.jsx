import Api from '../../../../api/api'
import Button from '@mui/material/Button'
import { useState } from 'react'
import {
  VentanaConfirmacion,
  VentanaConfirmarReserva,
} from '../ventana-confirmacion/ventana-confirmacion.jsx'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PendingIcon from '@mui/icons-material/Pending'
import CancelIcon from '@mui/icons-material/Cancel'
import DoneIcon from '@mui/icons-material/Done'
import ClearIcon from '@mui/icons-material/Clear'
import Loader from '../../../../components/loader/loader.jsx'

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

const ReservasPendientesCard = ({
  alojamiento,
  estado,
  fechaAlta,
  rangoFechas,
  idReserva,
  onReservaCancelada,
  onReservaConfirmada,
}) => {
  const [showCancelarReserva, setShowCancelarReserva] = useState(false)
  const [showConfirmarReserva, setShowConfirmarReserva] = useState(false)
  // const [motivoCancelacion, setMotivoCancelacion] = useState("")
  const [motivo, setMotivo] = useState('')
  const [loader, setLoader] = useState(false)

  const CancelarReservaHandler = async () => {
    try {
      setShowCancelarReserva(false)
      setLoader(true)
      await Api.modificarEstadoReserva(idReserva, motivo, 'CANCELADA')
      onReservaCancelada()
    } catch (error) {
      alert('Error al cancelar la reserva:', error)
      setLoader(false)
    }
  }

  const ConfirmarReservaHandler = async () => {
    try {
      setShowConfirmarReserva(false)
      setLoader(true)
      await Api.modificarEstadoReserva(idReserva, motivo, 'CONFIRMADA')
      onReservaConfirmada()
    } catch (error) {
      alert('Error al confirmar la reserva:', error)
      setLoader(false)
    }
  }

  const iconoSegunEstado = (estado) => {
    switch (estado) {
      case 'CONFIRMADA':
        return <CheckCircleIcon style={{ color: '#4CAF50' }} />
      case 'PENDIENTE':
        return <PendingIcon style={{ color: '#FF9800' }} />
      case 'CANCELADA':
        return <CancelIcon style={{ color: '#F44336' }} />
      default:
        return <PendingIcon style={{ color: '#FF9800' }} />
    }
  }

  const handleCancelarReserva = () => {
    setShowCancelarReserva(true)
  }

  const handleConfirmarReserva = () => {
    setShowConfirmarReserva(true)
  }

  return (
    <div className="card-container">
      {loader ? (
        <Loader />
      ) : (
        <>
          <div>
            <img
              className="imagen-reserva"
              src={`data:image/jpeg;base64,${alojamiento.fotos[0]?.path}`}
              alt={alojamiento.nombre}
            />
          </div>
          <div className="reserva-content">
            <h3>{alojamiento.nombre}</h3>
            <div className="reserva-info">
              {iconoSegunEstado(estado)}
              <h3>Estado: {estado}</h3>
            </div>

            <div className="reserva-info">
              <CalendarTodayIcon style={{ color: '#666' }} />
              <h3>Fecha Alta: {formatDate(fechaAlta)}</h3>
            </div>

            <div className="reserva-info">
              <LoginIcon style={{ color: '#4CAF50' }} />
              <h3>Fecha Check-in: {formatDate(rangoFechas.fechaInicio)}</h3>
            </div>

            <div className="reserva-info">
              <LogoutIcon style={{ color: '#F44336' }} />
              <h3>Fecha Check-out: {formatDate(rangoFechas.fechaFin)}</h3>
            </div>
          </div>
          <Button
            variant="contained"
            style={{
              position: 'relative',
              marginTop: 'auto',
              backgroundColor: '#FFD700',
              color: '#000',
            }}
            startIcon={<DoneIcon />}
            onClick={handleConfirmarReserva}
          >
            Confirmar reserva
          </Button>
          <Button
            variant="contained"
            style={{
              position: 'relative',
              marginTop: 'auto',
              backgroundColor: '#FFD700',
              color: '#000',
            }}
            startIcon={<ClearIcon />}
            onClick={handleCancelarReserva}
          >
            Rechazar reserva
          </Button>
        </>
      )}

      {showConfirmarReserva && (
        <VentanaConfirmarReserva
          mensaje="¿Estás seguro de que deseas cancelar esta negro?"
          onConfirm={ConfirmarReservaHandler}
          onCancel={() => setShowConfirmarReserva(false)}
          setMotivo={setMotivo}
        />
      )}
      {showCancelarReserva && (
        <VentanaConfirmacion
          mensaje="¿Estás seguro de que deseas cancelar esta reserva?"
          onConfirm={CancelarReservaHandler}
          onCancel={() => setShowCancelarReserva(false)}
          setMotivo={setMotivo}
        />
      )}
    </div>
  )
}

export default ReservasPendientesCard
