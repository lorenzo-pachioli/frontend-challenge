import { Product } from "../types/Product";
import ProductCard from "./ProductCard";
import ProductListSkeleton from "./ProductListSkeleton";

interface IProductListComponentProps {
  filteredProducts: Product[];
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  filterProducts: (category: string, search: string, sort: string, selectedSupplier: string | null, priceRange: { min: number | null; max: number | null }) => void;
  sortBy: string;
  selectedSupplier: string | null;
  loading: boolean;
}

const ProductListComponent = (props: IProductListComponentProps) => {
    const { filteredProducts, setSearchQuery, setSelectedCategory, filterProducts, sortBy, selectedSupplier, loading } = props;

    return (
        <div className="products-section">
          {loading ? (
            <ProductListSkeleton />
          ) :  filteredProducts.length === 0 ? (
            <div className="empty-state">
              <span className="material-icons">search_off</span>
              <h3 className="h2">No hay productos</h3>
              <p className="p1">No se encontraron productos que coincidan con tu búsqueda.</p>
              <button 
                className="btn btn-primary cta1"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                  filterProducts('all', '', sortBy, selectedSupplier, { min: null, max: null })
                }}
              >
                Ver todos los productos
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
    );
};

export default ProductListComponent;