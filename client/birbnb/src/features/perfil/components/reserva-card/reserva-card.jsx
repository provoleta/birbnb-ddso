import './reserva-card.css'
import api from '../../../../api/api'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from 'react'
import { VentanaConfirmacion } from '../ventana-confirmacion/ventana-confirmacion.jsx'
import ReservationCalendar from '../../../detail-page/components/calendario-reserva/calendario-reserva.jsx'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PendingIcon from '@mui/icons-material/Pending'
import CancelIcon from '@mui/icons-material/Cancel'
import VentanaFlotanteReserva from '../../../detail-page/components/ventana-flotante/ventanaFlotante.jsx'

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

const ReservaCard = ({
  alojamiento,
  estado,
  fechaAlta,
  rangoFechas,
  idReserva,
  onReservaCancelada,
  reservas,
}) => {
  const [showCancelarReserva, setShowCancelarReserva] = useState(false)
  // const [motivoCancelacion, setMotivoCancelacion] = useState("")
  const [motivo, setMotivo] = useState('')
  const [fechas, setFechas] = useState([null, null])
  const [showCalendario, setShowCalendario] = useState(false)
  const [alojamientoConReserva, setAlojamientoConReserva] = useState(null)
  const [reservasFiltradas, setReservasFiltradas] = useState([])
  const [showConfirmacionCambio, setShowConfirmacionCambio] = useState(false)

  const CancelarReservaHandler = async () => {
    try {
      onReservaCancelada()
      setShowCancelarReserva(false)
      await api.cancelarReserva(idReserva, motivo)
    } catch (error) {
      alert('Error al cancelar la reserva:', error)
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

  const handlerFechas = (nuevasFechas) => {
    setFechas(nuevasFechas)
  }

  const handlerModificarFecha = async () => {
    try {
      const alojamientoNIGA = await api.obtenerAlojamiento(alojamiento._id)
      const reservasSinReservaId = alojamientoNIGA.reservas.filter(
        (reserva) => reserva._id !== idReserva,
      )
      setReservasFiltradas(reservasSinReservaId)
      setShowCalendario(true)
    } catch (error) {
      console.error('Error al obtener las reservas:', error)
    }
  }

  const handlerModificarReserva = async () => {
    const fechasAMandar = {
      fechaInicio: fechas[0],
      fechaFin: fechas[1],
    }
    await api.modificarFechasReserva(idReserva, fechasAMandar)
    setShowConfirmacionCambio(true)
  }

  return (
    <div className="card-container">
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
        startIcon={<DeleteIcon />}
        onClick={handleCancelarReserva}
      >
        Cancelar Reserva
      </Button>

      <Button
        variant="contained"
        style={{
          position: 'relative',
          marginTop: 'auto',
          backgroundColor: '#FFD700',
          color: '#000',
        }}
        startIcon={<CalendarTodayIcon />}
        onClick={handlerModificarFecha}
      >
        Modificar Reserva
      </Button>

      {showCancelarReserva && (
        <VentanaConfirmacion
          mensaje="¿Estás seguro de que deseas cancelar esta reserva?"
          onConfirm={CancelarReservaHandler}
          onCancel={() => setShowCancelarReserva(false)}
          setMotivo={setMotivo}
        />
      )}

      {showCalendario && (
        <div className="calendario-container">
          <ReservationCalendar
            reservas={reservasFiltradas || []}
            onFechas={handlerFechas}
          />
          <div className="calendario-botones">
            <button onClick={() => setShowCalendario(false)}>Cerrar calendario</button>
            <button onClick={handlerModificarReserva} disabled={!fechas[0] || !fechas[1]}>
              Confirmar cambio
            </button>
          </div>
        </div>
      )}

      {showConfirmacionCambio && (
        <VentanaFlotanteReserva
          mensaje="reserva modificada correctamente"
          onClose={() => {
            setShowConfirmacionCambio(false)
            window.location.reload()
          }}
        />
      )}
    </div>
  )
}

export default ReservaCard
