import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { products } from '../data/products'
import { Product } from '../types/Product'
import PricingCalculator from '../components/PricingCalculator'
import './ProductDetail.css'
import { useShoppingCart } from '../hooks/shopingCartProvider'
import ProductDetailSkeleton from '../components/ProductDetailSkeleton'
import { colorToEnglish } from '../utils/colorsUtils'
import CotizacionButton from '../components/CotizacionButton'

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [selectedSize, setSelectedSize] = useState<string>('')
  const { addToCart } = useShoppingCart()
  const [quantity, setQuantity] = useState<number>(1)
  const [selectedImage, setSelectedImage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)


/* Simulate API call of 1sec */
  useEffect(() => {
    setTimeout(() => {
      simulateproductFetch();
      setLoading(false);
    }, 1000)
  }, [id])
  
  const simulateproductFetch = () => {
      if (id) {
        const foundProduct = products.find(p => p.id === parseInt(id))
        setProduct(foundProduct || null)
        
        // Set default selections
        if (foundProduct?.colors && foundProduct.colors.length > 0) {
          setSelectedColor(foundProduct.colors[0])
        }
        if (foundProduct?.sizes && foundProduct.sizes.length > 0) {
          setSelectedSize(foundProduct.sizes[0])
        }
      }
  }

  // Handle loading state
  if (!product) {
    if (loading) {
      return <ProductDetailSkeleton />;
    }

     return (
      <div className="container">
        <div className="product-not-found">
          <span className="material-icons">error_outline</span>
          <h2 className="h2">Producto no encontrado</h2>
          <p className="p1">El producto que buscas no existe o ha sido eliminado.</p>
          <Link to="/" className="btn btn-primary cta1">
            <span className="material-icons">arrow_back</span>
            Volver al catálogo
          </Link>
        </div>
      </div>
    ) 
  }

  const productFinalPrice = (product:Product, prodQuantity:number) => {
    if (!product.priceBreaks) {
        return product.basePrice;
    }
    let discount = { minQty: 0, price: product.basePrice };
    product.priceBreaks.map((dis) => {
      if(dis.minQty <= prodQuantity){
        discount = dis;
      }
    } );
    const finalPrice = discount.minQty > 0 ? discount.price : product.basePrice;
    return finalPrice;
  }

  const handleChangeQuantity = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= product.stock) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = (finalPrice: number) => {
    if (canAddToCart) {
      console.log(`Adding ${quantity} of ${product.name} to cart at price ${finalPrice}`);
      addToCart(product, quantity, selectedColor, selectedSize, productFinalPrice(product, quantity))
    }
  }

  // Validate product status
  const canAddToCart = product.status === 'active' && product.stock > 0

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-link l1">Catálogo</Link>
          <span className="breadcrumb-separator l1">/</span>
          <span className="breadcrumb-current l1">{product.name}</span>
        </nav>

        <div className="product-detail">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              {selectedImage && product.image ? (
                <img src={product.image[selectedImage - 1]} alt={product.name} />
              ) : (
                <div className="image-placeholder">
                  <span className="material-icons">image</span>
                </div>
              )
              }
            </div>
            
            <div className="image-thumbnails">
              {[1, 2, 3].map(i => (
                <div key={i} className="thumbnail" onClick={() => setSelectedImage(i )}>
                  {selectedImage && product.image ? <img src={product.image[i - 1]} alt={product.name} /> : <span className="material-icons">image</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-details">
            <div className="product-header">
              <h1 className="product-title h2">{product.name}</h1>
              <p className="product-sku p1">SKU: {product.sku}</p>
              
              {/* Status */}
              <div className="product-status">
                {product.status === 'active' ? (
                  <span className="status-badge status-active l1">✓ Disponible</span>
                ) : product.status === 'pending' ? (
                  <span className="status-badge status-pending l1">⏳ Pendiente</span>
                ) : (
                  <span className="status-badge status-inactive l1">❌ No disponible</span>
                )}
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div className="product-description">
                <h3 className="p1-medium">Descripción</h3>
                <p className="p1">{product.description}</p>
              </div>
            )}

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="product-features">
                <h3 className="p1-medium">Características</h3>
                <ul className="features-list">
                  {product.features.map((feature, index) => (
                    <li key={index} className="feature-item l1">
                      <span className="material-icons">check_circle</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="selection-group">
                <h3 className="selection-title p1-medium">Color disponibles</h3>
                <div className="color-options">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                      onClick={() => setSelectedColor(color)}
                    >
                      <div className="color-preview" style={{ background: colorToEnglish(color) }}></div>
                      <span className="l1">{color}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="selection-group">
                <h3 className="selection-title p1-medium">Tallas disponibles</h3>
                <div className="size-options">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      <span className="l1">{size}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="product-actions">
              <div className="quantity-selector">
                <label className="quantity-label l1">Cantidad:</label>
                <div className="quantity-controls">
                  <button 
                    onClick={() => handleChangeQuantity(Math.max(1, quantity - 1))}
                    className="quantity-btn"
                  >
                    <span className="material-icons">remove</span>
                  </button>
                  <input 
                    type="number" 
                    value={quantity} 
                    onChange={(e) => handleChangeQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="quantity-input"
                    min="1"
                  />
                  <button 
                    onClick={() => handleChangeQuantity(quantity + 1)}
                    className="quantity-btn"
                  >
                    <span className="material-icons">add</span>
                  </button>
                </div>
              </div>

              <div className="action-buttons">
                <button 
                  className={`btn btn-primary cta1 ${!canAddToCart ? 'disabled' : ''}`}
                  disabled={!canAddToCart}
                  onClick={() => addToCart(product, quantity, selectedColor, selectedSize, productFinalPrice(product, quantity))}
                >
                  <span className="material-icons">shopping_cart</span>
                  {canAddToCart ? 'Agregar al carrito' : 'No disponible'}
                </button>
                                
                <CotizacionButton label='Solicitar cotización' componentOption={2} />
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Calculator */}
        <div className="pricing-section">
          <PricingCalculator product={product} quantity={quantity} handleChangeQuantity={handleChangeQuantity} addToCart={handleAddToCart} />
        </div>
      </div>
    </div>
  )
}

export default ProductDetail