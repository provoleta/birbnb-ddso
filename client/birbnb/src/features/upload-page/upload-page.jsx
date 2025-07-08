import UploadAlojamientoForm from '../../components/upload-alojamiento-form/upload-alojamiento-form.jsx'
import './upload-page.css'

export default function UploadPage() {
  return (
    <div>
      <div className="upload-header">
        <h1> ¡Subi tu alojamiento para que los huespedes puedan reservar! </h1>
      </div>
      <UploadAlojamientoForm />
    </div>
  )
}
