import './ProductListSkeleton.css'

const ProductListSkeleton = () => {
  return (
    <div className="products-section ">
      <div className="products-grid">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="product-card skeleton-card">
            <div className="product-image" />
            <div className="product-info">
              <div className="product-header">
                <h3 className="product-name p1-medium"></h3>
                <p className="product-sku l1"></p>
              </div>

              <div className="product-details">
                <div className="product-category">
                  <span className="material-icons"></span>
                  <span className="l1"></span>
                </div>
              </div>
              <div className="product-features">
                <div className="product-category" />
              </div>
              <div className="product-features">
                {Array.from({ length: 6 }).map((_, featureIndex) => (
                  <span key={featureIndex} className="feature-tag l1" />
                ))}
              </div>

              <div className="product-colors">
                <span className="colors-label l1">
                </span>
                <div className="colors-preview">
                  {Array.from({ length: 3 }).map((_, colorIndex) => (
                    <div key={colorIndex} className='color-preview-skeleton'></div>
                  ))}
                    <span className="more-colors l1">
                    </span>
                </div>
              </div>
              <div className="product-price" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListSkeleton;
