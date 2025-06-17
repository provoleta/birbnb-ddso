import './anfitrion-detail.css'

const Anfitrion = ({ alojamiento }) => {
  return (
    <div>
      <h2>Anfitrion</h2>
      <div className="perfil">
        <img className="avatar" src="/images/16480.png" alt="Foto de perfil" />

        <div className="informacion-perfil">
          <h4>{alojamiento.anfitrion.nombre}</h4>
          <p className="email">Contacto: {alojamiento.anfitrion.email}</p>
        </div>
      </div>
    </div>
  )
}

export default Anfitrion
