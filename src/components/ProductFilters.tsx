import { categories, pricesRange, suppliers } from '../data/products'
import './ProductFilters.css'

interface ProductFiltersProps {
  selectedCategory: string
  searchQuery: string
  sortBy: string
  selectedSupplier: string | null
  priceRange: { min: number | null; max: number | null }
  onCategoryChange: (category: string) => void
  onSearchChange: (search: string) => void
  onSortChange: (sort: string) => void
  onSupplierChange: (supplierId: string | null) => void
  onPriceRangeChange: (min: number | null, max: number | null) => void
}

const ProductFilters = ({
  selectedCategory,
  searchQuery,
  sortBy,
  selectedSupplier,
  priceRange,
  onCategoryChange,
  onSearchChange,
  onSortChange,
  onSupplierChange,
  onPriceRangeChange
}: ProductFiltersProps) => {
  return (
    <div className="product-filters">
      <div className="filters-card">
        {/* Search Bar */}
        <div className="search-section">
          <div className="search-box">
            <span className="material-icons">search</span>
            <input
              type="text"
              placeholder="Buscar productos, SKU..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input p1"
            />
            {searchQuery && (
              <button 
                className="clear-search"
                onClick={() => onSearchChange('')}
              >
                <span className="material-icons">close</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="filter-section">
          <h3 className="filter-title p1-medium">Categorías</h3>
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => onCategoryChange(category.id)}
              >
                <span className="material-icons">{category.icon}</span>
                <span className="category-name l1">{category.name}</span>
                <span className="category-count l1">({category.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div className="filter-section">
          <h3 className="filter-title p1-medium">Ordenar por</h3>
          <select 
            value={sortBy} 
            onChange={(e) => onSortChange(e.target.value)}
            className="sort-select p1"
          >
            <option value="name">Nombre A-Z</option>
            <option value="price">Precio</option>
            <option value="stock">Stock disponible</option>
          </select>
        </div>


        {/* Price Range */}
        <div className="filter-section">
          <h3 className="filter-title p1-medium">Rango de precios</h3>
          <div className="supplier-list">
            {pricesRange.map(price => (
              <div key={price.min} className={`supplier-item ${priceRange.min === price.min && priceRange.max === price.max ? 'active' : ''}`} onClick={() => onPriceRangeChange(price.min, price.max)}>
                <span className="supplier-name l1">{price.min} - {price.max}</span>
              </div>
            ))}
          </div>
        </div>
          
        

        {/* Quick Stats - Bug: hardcoded values instead of dynamic */}
        <div className="filter-section">
          <h3 className="filter-title p1-medium">Proveedores</h3>
          <div className="supplier-list">
              {suppliers.map(supplier => (
                <div key={supplier.id} className={`supplier-item ${selectedSupplier === supplier.id ? 'active' : ''}`} onClick={() => onSupplierChange(supplier.id)}>
                  <span className="supplier-name l1">{supplier.name}</span>
                  <span className="supplier-count l1">{supplier.products}</span>
                </div>
              ))}
          </div>
        </div>

        <div className="clean-section">
          <button 
            className="btn btn-primary cta1"
            onClick={() => {
              onSearchChange('')
              onCategoryChange('all')
              onSupplierChange(null)
              onPriceRangeChange(null, null)
            }}
          >
            Limpiar filtros
          </button>
        </div>
        </div>
    </div>
  )
}

export default ProductFilters