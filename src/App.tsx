import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import './App.css'
import { ShoppingCartProvider } from './hooks/shopingCartProvider'

function App() {

  return (
    <div className="App">
      <ShoppingCartProvider initValue={localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')!) : []}>
        <Header />
        <main>
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
        </main>
      </ShoppingCartProvider>
    </div>
  )
}

export default App