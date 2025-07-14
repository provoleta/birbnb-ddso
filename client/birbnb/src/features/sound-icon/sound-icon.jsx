import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function LogoConAudio() {
  const [clicks, setClicks] = useState(0)
  const audioRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2
    }
  }, [])

  const handleLogoClick = () => {
    const nuevosClicks = clicks + 1
    setClicks(nuevosClicks)
    if (nuevosClicks === 15 && audioRef.current) {
      audioRef.current.play()
      setClicks(0) // Reinicia el contador si querés que vuelva a sonar cada 10 clicks
    }
    if (window.location.pathname !== '/') {
      navigate('/') // Redirige a la página principal solo si no estás en ella
    }
  }

  return (
    <div>
      <img
        src="/images/logo.png"
        alt="BirBnB - Inicio. Haga clic para ir a la página principal"
        onClick={handleLogoClick}
        style={{ cursor: 'pointer', width: 'auto', height: '50px' }}
        role="button"
        tabIndex="0"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleLogoClick()
          }
        }}
      />
      <audio ref={audioRef} src="/sounds/doh_r4RZcVw.mp3" />
    </div>
  )
}

export default LogoConAudio
