import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import './footer.css'

const Footer = () => {
  return (
    <footer className="pie">
      <p>© 2025 Birbnb, Inc.</p>
      <icon className="iconos">
        <InstagramIcon className="ig" />
        <TwitterIcon className="tw" />
        <WhatsAppIcon className="wpp" />
      </icon>
    </footer>
  )
}

export default Footer
