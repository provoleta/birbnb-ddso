import { Outlet } from 'react-router'
import Navbar from '../../components/navbar/navbar.jsx'
import Footer from '../../components/footer/footer.jsx'
const Layout = () => {
  return (
    <section className="app-container">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </section>
  )
}

export default Layout
