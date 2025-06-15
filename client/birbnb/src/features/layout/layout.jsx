import { Outlet } from 'react-router'
import Navbar from '../../components/navbar/navbar.jsx'

const Layout = () => {
  return (
    <section className="app-container">
      <Navbar></Navbar>
      <Outlet />
      <footer className="pie"> PIJA (footer) </footer>
    </section>
  )
}

export default Layout
