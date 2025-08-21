import { lazy, Suspense, useEffect, useState } from 'react'
import ProductFilters from '../components/ProductFilters'
import { products as allProducts } from '../data/products'
import { Product } from '../types/Product'
import './ProductList.css'
import ProductListSkeleton from '../components/ProductListSkeleton'

const ProductListComponent = lazy(() => import('../components/ProductListComponent'))

const ProductList = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<{ min: number | null; max: number | null }>({ min: null, max: null })
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call to show loading skeleton
    setTimeout(() => {
      setFilteredProducts(allProducts);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and sort products based on criteria
  const filterProducts = (category: string, search: string, sort: string, selectedSupplier: string | null, priceRange: { min: number | null; max: number | null }) => {
    let filtered = [...allProducts]

    // Category filter
    if (category !== 'all') {
      filtered = filtered.filter(product => product.category === category)
    }

    // Search filter
    if (search) {
      filtered = filtered.filter(product => {
        const normalizeCaseName = product.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const normalizeCaseSearch = search.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const normalizeCaseSku = product.sku.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

        return (
          normalizeCaseName.includes(normalizeCaseSearch) ||
          normalizeCaseSku.includes(normalizeCaseSearch)
        );
      });
    }

    if (selectedSupplier) {
      filtered = filtered.filter(product => product.supplier === selectedSupplier);
    }

    if (priceRange.min !== null || priceRange.max !== null) {
      filtered = filtered.filter(product => {
        const isWithinMin = priceRange.min !== null ? product.basePrice >= priceRange.min : true;
        const isWithinMax = priceRange.max !== null ? product.basePrice <= priceRange.max : true;
        return isWithinMin && isWithinMax;
      });
    }

    // Sorting logic
    switch (sort) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'price':
        filtered.sort((a, b) => a.basePrice - b.basePrice)
        break
      case 'stock':
        filtered.sort((a, b) => b.stock - a.stock)
        break
      default:
        break
    }

    setFilteredProducts(filtered)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    console.log("Selected category: ", category);
    filterProducts(category, searchQuery, sortBy, selectedSupplier, priceRange);
  }

  const handleSearchChange = (search: string) => {
    setSearchQuery(search)
    console.log("Search query: ", search);
    filterProducts(selectedCategory, search, sortBy, selectedSupplier, priceRange);
  }

  const handleSortChange = (sort: string) => {
    setSortBy(sort)
    console.log("Sort by: ", sort);
    filterProducts(selectedCategory, searchQuery, sort, selectedSupplier, priceRange);
  }

  const handleSupplierChange = (supplierId: string | null) => {
    if(supplierId === selectedSupplier) setSelectedSupplier(null);
    else if(supplierId === null) setSelectedSupplier(null);
    else setSelectedSupplier(supplierId);

    filterProducts(selectedCategory, searchQuery, sortBy, supplierId, priceRange);
  }

  const handlePriceRangeChange = (min: number | null, max: number | null) => {
    if (min === priceRange.min && max === priceRange.max) {
      setPriceRange({ min: null, max: null });
      filterProducts(selectedCategory, searchQuery, sortBy, selectedSupplier, { min: null, max: null });
      return;
    }

    setPriceRange({ min, max });
    filterProducts(selectedCategory, searchQuery, sortBy, selectedSupplier, { min, max });
  }

  return (
    <div className="product-list-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <div className="page-info">
            <h1 className="page-title h2">Catálogo de Productos</h1>
            <p className="page-subtitle p1">
              Descubre nuestra selección de productos promocionales premium
            </p>
          </div>
          
          <div className="page-stats">
            <div className="stat-item">
              <span className="stat-value p1-medium">{filteredProducts.length}</span>
              <span className="stat-label l1">productos</span>
            </div>
            <div className="stat-item">
              <span className="stat-value p1-medium">6</span>
              <span className="stat-label l1">categorías</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <ProductFilters
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          sortBy={sortBy}
          selectedSupplier={selectedSupplier}
          priceRange={priceRange}
          onCategoryChange={handleCategoryChange}
          onSearchChange={handleSearchChange}
          onSortChange={handleSortChange}
          onSupplierChange={handleSupplierChange}
          onPriceRangeChange={handlePriceRangeChange}
        />
        
        {/* Products Grid */}
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductListComponent
            filteredProducts={filteredProducts}
            setSearchQuery={setSearchQuery}
            setSelectedCategory={setSelectedCategory}
            filterProducts={filterProducts}
            sortBy={sortBy}
            selectedSupplier={selectedSupplier}
            loading={loading}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default ProductList