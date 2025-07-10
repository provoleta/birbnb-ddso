import './anfitrion-detail.css'
import AvatarIcon from '@mui/icons-material/AccountCircle'

const Anfitrion = ({ alojamiento }) => {
  const getImageSrc = (base64String) => {
    if (!base64String) return null
    if (base64String.startsWith('data:')) return base64String
    return `data:image/jpeg;base64,${base64String}`
  }

  return (
    <div className="anfitrion">
      <h2>Anfitrion</h2>
      <div className="perfil">
        {getImageSrc(alojamiento.anfitrion.profileImage) ? (
          <img
            className="avatar"
            src={getImageSrc(alojamiento.anfitrion.profileImage)}
            alt="Avatar del anfitrión"
          />
        ) : (
          <AvatarIcon className="avatar" sx={{ fontSize: 60 }} />
        )}

        <div className="informacion-perfil">
          <h4>{alojamiento.anfitrion.nombre}</h4>
          <p className="biografia">{alojamiento.anfitrion.biografia}</p>
        </div>
      </div>
    </div>
  )
}

export default Anfitrion
