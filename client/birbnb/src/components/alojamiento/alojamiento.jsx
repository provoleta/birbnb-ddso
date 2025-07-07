import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import { useNavigate } from 'react-router'
import './alojamiento.css'

export default function Alojamiento({ alojamiento }) {
  const navigate = useNavigate()
  const irAlAlojamiento = () => {
    navigate(`/alojamientos/${alojamiento.idAlojamiento}`)
  }

  const getImageSrc = (base64String) => {
    if (!base64String) return null
    if (base64String.startsWith('data:')) return base64String
    return `data:image/jpeg;base64,${base64String}`
  }

  return (
    <Card className="alojamiento-item">
      <img
        className="alojamiento-foto"
        src={getImageSrc(alojamiento.fotos?.[0]?.path)}
        alt={alojamiento.nombre}
        onClick={irAlAlojamiento}
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
              display: 'block', // visible
              marginTop: '10px', // Espacio superior
              marginBottom: '5px', // Espacio inferior
              padding: '8px 16px', // Padding interno
              backgroundColor: '#A62DFD',
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
