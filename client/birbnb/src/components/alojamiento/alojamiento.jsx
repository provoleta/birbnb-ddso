import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import { useNavigate } from 'react-router'
import './alojamiento.css'

export default function Alojamiento({ alojamiento }) {
  const navigate = useNavigate()
  const irAlAlojamiento = () => {
    navigate(`/alojamientos/${alojamiento.id}`)
  }

  return (
    <Card className="alojamiento-item">
      <img
        className="alojamiento-foto"
        src={alojamiento.fotos[0].path}
        alt={alojamiento.nombre}
      />
      <div className="alojamiento-footer">
        <div className="alojamiento-footer-data">
          <h3>{alojamiento.nombre}</h3>
          <p>{alojamiento.descripcion}</p>
        </div>
        <div className="alojamiento-footer-actions">
          <Button
            variant="contained"
            aria-label="Basic button group"
            size="large"
            onClick={irAlAlojamiento}
            style={{
              display: 'block', // Asegura que sea visible
              marginTop: '10px', // Espacio superior
              marginBottom: '5px', // Espacio inferior
              padding: '8px 16px', // Padding interno
              backgroundColor: '#A62DFD', // Color principal de tu app
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            Ver mas
          </Button>
        </div>
      </div>
    </Card>
  )
}
