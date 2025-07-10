import AlojamientoCaracteristicasField from './components/caracteristicas-field/caracteristicas-field'
import AlojamientoTextField from './components/text-field/text-field'
import AlojamientoNumberField from './components/number-field/number-field'
import AlojamientoMonedaField from './components/moneda-field/moneda-field'
import AlojamientoImageField from './components/image-field/image-field'
import api from '../../api/api'
import { useState } from 'react'
import { handleHorarioChange, handleHorarioBlur } from './utils'
import './upload-alojamiento-form.css'
import VentanaFlotante from './components/ventana-flotante-alojamiento/ventanaFlotante'
import Loader from '../loader/loader'

export default function UploadAlojamientoForm() {
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [moneda, setMoneda] = useState('PESO_ARG')
  const [precio, setPrecio] = useState('')
  const [ciudad, setCiudad] = useState('')
  const [pais, setPais] = useState('')
  const [calle, setCalle] = useState('')
  const [altura, setAltura] = useState('')
  const [cantHuespedesMax, setCantHuespedesMax] = useState(1)
  const [alojamientoImage, setAlojamientoImage] = useState(null)
  const [imagePreview, setImagesPreview] = useState([])
  const [imageBase64, setImagesBase64] = useState([])
  const [horarioCheckIn, setHorarioCheckIn] = useState('')
  const [horarioCheckOut, setHorarioCheckOut] = useState('')
  const [caracteristicas, setCaracteristicas] = useState({
    WIFI: false,
    MASCOTAS_PERMITIDAS: false,
    PISCINA: false,
    ESTACIONAMIENTO: false,
  })
  const [showConfirmacionAlojamiento, setConfirmacionAlojamiento] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleCaracteristicas = (e) => {
    const { name, checked } = e.target
    setCaracteristicas((prev) => ({ ...prev, [name]: checked }))
  }

  const handleChange = (setter) => (e) => {
    setter(e.target.value)
  }

  const handleImageDelete = (e) => {
    const imgSrc = e.target.src
    setImagesPreview((prev) => prev.filter((img) => img !== imgSrc))
    setImagesBase64((prev) => prev.filter((img) => img !== imgSrc.split(',')[1]))
    setAlojamientoImage(null)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAlojamientoImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagesPreview((prev) => [...prev, reader.result])
        setImagesBase64((prev) => [...prev, reader.result.split(',')[1]])
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { lat, long } = await api.obtenerCoordenadas({
        calle,
        numero: altura,
        ciudad,
        pais,
      })

      const alojamientoData = {
        nombre,
        descripcion,
        precioPorNoche: Number(precio),
        moneda,
        horarioCheckIn: horarioCheckIn || '12:00',
        horarioCheckOut: horarioCheckOut || '12:00',
        direccion: {
          calle,
          numero: Number(altura),
          ciudad,
          pais,
          lat,
          long,
        },
        caracteristicas: Object.keys(caracteristicas).filter(
          (key) => caracteristicas[key],
        ),
        cantHuespedesMax: Number(cantHuespedesMax),
        fotos: Array.isArray(imageBase64) ? imageBase64 : [imageBase64],
      }
      await api.subirAlojamiento(alojamientoData)
      setConfirmacionAlojamiento(true)
    } catch (error) {
      console.error('Error al subir alojamiento:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="upload-alojamiento">
        <div className="input-container-upload">
          <AlojamientoTextField
            id="nombre"
            label="Nombre del Alojamiento"
            value={nombre}
            onChange={handleChange(setNombre)}
            required
          />
        </div>

        <div className="input-container-upload">
          <AlojamientoTextField
            id="descripcion"
            label="Descripcion"
            value={descripcion}
            onChange={handleChange(setDescripcion)}
            required
          />
        </div>

        <div className="input-container-upload">
          <AlojamientoMonedaField
            id="moneda"
            label="Moneda"
            value={moneda}
            onChange={handleChange(setMoneda)}
            required
          />
          <AlojamientoNumberField
            id="precio"
            label="Precio por noche"
            value={precio}
            onChange={handleChange(setPrecio)}
            required
          />
          <AlojamientoNumberField
            id="cantidad-huespedes"
            label="Maxima cantidad de huespedes"
            value={cantHuespedesMax}
            onChange={handleChange(setCantHuespedesMax)}
            required
          />
        </div>

        <div className="input-container-upload">
          <AlojamientoTextField
            id="ciudad"
            label="Ciudad"
            value={ciudad}
            onChange={handleChange(setCiudad)}
            required
          />
          <AlojamientoTextField
            id="pais"
            label="Pais"
            value={pais}
            onChange={handleChange(setPais)}
            required
          />
        </div>

        <div className="input-container-upload">
          <AlojamientoTextField
            id="calle"
            label="Calle"
            value={calle}
            onChange={handleChange(setCalle)}
            required
          />
          <AlojamientoNumberField
            id="altura"
            label="Altura"
            value={altura}
            min={1}
            onChange={handleChange(setAltura)}
            required
          />
        </div>

        <div className="input-container-upload">
          <AlojamientoTextField
            id="horario-check-in"
            label="Horario Check In"
            value={horarioCheckIn}
            placeholder="HH:MM"
            maxLength={5}
            onChange={handleHorarioChange(setHorarioCheckIn)}
            onBlur={handleHorarioBlur(setHorarioCheckIn)}
            required
          />
          <AlojamientoTextField
            id="horario-check-out"
            label="Horario Check Out"
            value={horarioCheckOut}
            placeholder="HH:MM"
            maxLength={5}
            onChange={handleHorarioChange(setHorarioCheckOut)}
            onBlur={handleHorarioBlur(setHorarioCheckOut)}
            required
          />
        </div>

        <div className="image-container">
          {imagePreview.length > 0 && (
            <div className="imagenes-preview-list">
              {imagePreview.map((img, idx) => (
                <div className="imagen-preview-container">
                  <img
                    key={idx}
                    src={img}
                    alt={`Alojamiento preview ${idx + 1}`}
                    className="imagen-preview"
                    style={{
                      width: 100,
                      height: 100,
                      objectFit: 'cover',
                    }}
                    onClick={handleImageDelete}
                  />
                  <button
                    className="delete-icon"
                    onClick={() => handleImageDelete({ target: { src: img } })}
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
          <AlojamientoImageField
            id="image"
            label="Imagenes del alojamiento"
            onChange={handleImageChange}
            image={imagePreview}
            required
          />
        </div>
        <div className="input-container-upload">
          <AlojamientoCaracteristicasField
            caracteristicas={caracteristicas}
            onChange={handleCaracteristicas}
          />
        </div>

        <button
          className="submit-button"
          type="submit"
          disabled={loading}
          style={{
            opacity: loading ? 0.7 : 1,
            cursor: loading ? 'not-allowed' : 'pointer',
            position: 'relative',
          }}
        >
          {loading ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '14px',
              }}
            >
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid transparent',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }}
              ></div>
              <span>Subiendo...</span>
            </div>
          ) : (
            'Subir Alojamiento'
          )}
        </button>
        {showConfirmacionAlojamiento && (
          <div>
            <VentanaFlotante
              mensaje={'¡Alojamiento registrado con éxito!'}
              onClose={() => {
                setConfirmacionAlojamiento(false)
                window.location.reload()
              }}
            />
          </div>
        )}
      </form>
    </div>
  )
}
