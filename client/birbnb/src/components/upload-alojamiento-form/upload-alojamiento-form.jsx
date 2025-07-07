import AlojamientoTextField from './form-fields/text-field'
import AlojamientoNumberField from './form-fields/number-field'
import AlojamientoMonedaField from './form-fields/moneda-field'
import AlojamientoImageField from './form-fields/image-field'
import api from '../../api/api'
import { useState } from 'react'
import './upload-alojamiento-form.css'

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

    const alojamientoData = {
      nombre,
      descripcion,
      precioPorNoche: Number(precio),
      moneda,
      horarioCheckIn: '12:00',
      horarioCheckOut: '15:00',
      direccion: {
        calle,
        numero: Number(altura),
        ciudad,
        pais,
        lat: 1.8712,
        long: 8.6321,
      },
      cantHuespedesMax: Number(cantHuespedesMax),
      fotos: Array.isArray(imageBase64) ? imageBase64 : [imageBase64],
    }
    await api.subirAlojamiento(alojamientoData)
    console.log(alojamientoData)
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="upload-alojamiento">
        <div className="nombre-container">
          <AlojamientoTextField
            id="nombre"
            label="Nombre del Alojamiento"
            value={nombre}
            onChange={handleChange(setNombre)}
          />
        </div>

        <div className="descripcion-container">
          <AlojamientoTextField
            id="descripcion"
            label="Descipcion"
            value={descripcion}
            onChange={handleChange(setDescripcion)}
          />
        </div>

        <div className="precio-container">
          <AlojamientoMonedaField
            id="moneda"
            label="Moneda"
            value={moneda}
            onChange={handleChange(setMoneda)}
          />
          <AlojamientoNumberField
            id="precio"
            label="Precio por noche"
            value={precio}
            onChange={handleChange(setPrecio)}
          />
          <AlojamientoNumberField
            id="cantidad-huespedes"
            label="Maxima cantidad de huespedes"
            value={cantHuespedesMax}
            onChange={handleChange(setCantHuespedesMax)}
          />
        </div>

        <div className="lugar-container">
          <AlojamientoTextField
            id="ciudad"
            label="Ciudad"
            value={ciudad}
            onChange={handleChange(setCiudad)}
          />
          <AlojamientoTextField
            id="pais"
            label="Pais"
            value={pais}
            onChange={handleChange(setPais)}
          />
        </div>

        <div className="direccion-container">
          <AlojamientoTextField
            id="calle"
            label="Calle"
            value={calle}
            onChange={handleChange(setCalle)}
          />
          <AlojamientoNumberField
            id="altura"
            label="Altura"
            value={altura}
            onChange={handleChange(setAltura)}
          />
        </div>

        <div className="imagen-container">
          {imagePreview.length > 0 && (
            <div className="imagenes-preview-list">
              {imagePreview.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Alojamiento preview ${idx + 1}`}
                  className="imagen-preview"
                  style={{ width: 100, height: 100, objectFit: 'cover', marginRight: 8 }}
                  onClick={handleImageDelete}
                />
              ))}
            </div>
          )}
          <AlojamientoImageField
            id="image"
            label="Imagenes del alojamiento"
            onChange={handleImageChange}
            image={imagePreview}
          />
        </div>

        <button className="submit-button" type="submit">
          Subir Alojamiento
        </button>
      </form>
    </div>
  )
}
