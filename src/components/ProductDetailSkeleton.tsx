import "./ProductDetailSkeleton.css";

const ProductDetailSkeleton = () => {

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <span className="breadcrumb-separator l1">/</span>
          <span className="breadcrumb-current-skeleton l1"></span>
        </nav>

        <div className="product-detail">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <div className="image-placeholder-skeleton">
                <span className="material-icons">image</span>
              </div>
            </div>

            <div className="image-thumbnails">
              {[1, 2, 3].map((i) => (
                <div key={i} className="thumbnail-skeleton">
                  <span className="material-icons"></span>
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-details">
            <div className="product-header">
              <h1 className="product-title-skeleton h2"></h1>
              <p className="product-sku-skeleton p1"></p>
            </div>

            {/* Description */}
            <div className="product-description">
              <h3 className="product-description-title-skeleton p1-medium"></h3>
              <p className="product-description-text-skeleton p1"></p>
            </div>

            {/* Features */}
            <div className="product-features">
              <h3 className="product-features-title-skeleton p1-medium"></h3>
              <ul className="features-list">
                {Array.from({ length: 3 }).map((_, index) => (
                  <li key={index} className="feature-item-skeleton l1">
                    <span className="material-icons"></span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Color Selection */}
            <div className="selection-group">
              <h3 className="selection-title-skeleton p1-medium"></h3>
              <div className="color-options">
                {Array.from({ length: 3 }).map((_, index) => (
                  <button key={index} className={`color-option-skeleton`}>
                    <div className="color-preview-skeleton"></div>
                    <span className="l1"></span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="selection-group">
              <h3 className="selection-title-skeleton p1-medium"></h3>
              <div className="size-options">
                {Array.from({ length: 6 }).map((_, index) => (
                  <button key={index} className={`size-option-skeleton`}>
                    <span className="l1"></span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="product-actions">
              <div className="quantity-selector">
                <label className="quantity-label-skeleton l1"></label>
                <div className="quantity-controls">
                  <button className="quantity-btn-skeleton">
                    <span className="material-icons"></span>
                  </button>
                  <input type="number" className="quantity-input-skeleton" min="1" />
                  <button className="quantity-btn-skeleton">
                    <span className="material-icons"></span>
                  </button>
                </div>
              </div>

              <div className="action-buttons">
                <button className={`btn-skeleton btn btn-primary cta1 `}>
                  <span className="material-icons"></span>
                </button>

                <button className="btn-skeleton btn btn-secondary cta1">
                  <span className="material-icons"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
