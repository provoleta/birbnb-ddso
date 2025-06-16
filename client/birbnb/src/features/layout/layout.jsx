import { Outlet } from 'react-router'
import Navbar from '../../components/navbar/navbar.jsx'
import Footer from '../../components/footer/footer.jsx'

const Layout = () => {
  return (
    <section className="app-container">
      <Navbar />
      <Outlet />
      <Footer />
    </section>
  )
}

export default Layout
