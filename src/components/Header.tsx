import { Link } from 'react-router-dom'
import './Header.css'
import { useShoppingCart } from '../hooks/shopingCartProvider';

const Header = () => {
  const { quantityOfItems } = useShoppingCart();
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <div className="logo-icon">
              <span className="material-icons">store</span>
            </div>
            <span className="logo-text p1-medium">SWAG Challenge</span>
          </Link>

          {/* Navigation */}
          <nav className="nav">
            <Link to="/" className="nav-link l1">
              <span className="material-icons">home</span>
              Catálogo
            </Link>
            <button className="nav-link l1" onClick={() => alert('Función de carrito por implementar')}>
              <span className="material-icons">shopping_cart</span>
              Carrito ({quantityOfItems()})
            </button>
          </nav>

          {/* Actions */}
          <div className="header-actions">
            <button className="btn btn-secondary cta1"  onClick={() => alert('Función de iniciar sesion por implementar')}>
              <span className="material-icons">person</span>
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header