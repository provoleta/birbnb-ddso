import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import './footer.css'

const Footer = () => {
  return (
    <footer className="pie">
      <div className="contenedor-footer">
        <div className="info-extra">
          <div className="contenedor-info-izquierda">
            <p>Información extra</p>
            <p>Política de privacidad</p>
            <p>Términos y condiciones</p>
            <p>Ayuda</p>
          </div>
          <div className="contenedor-info-centro">
            <p>Contacto</p>
            <p>Soporte técnico</p>
            <p>Atención al cliente</p>
          </div>
          <div className="contenedor-info-derecha">
            <p>Sobre nosotros</p>
            <p>Historia de Birbnb</p>
            <p>Equipo</p>
          </div>
        </div>
        <div className="contenedor-angosto">
          <p>© 2025 Birbnb, Inc.</p>
          <icon className="iconos">
            <InstagramIcon className="ig" />
            <TwitterIcon className="tw" />
            <WhatsAppIcon className="wpp" />
          </icon>
        </div>
      </div>
    </footer>
  )
}

export default Footer
