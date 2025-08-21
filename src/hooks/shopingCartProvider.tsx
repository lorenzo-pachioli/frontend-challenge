
import { createContext, useContext, useCallback, useState, ReactNode } from 'react';
import { CartItem, Product } from '../types/Product';


interface ShoppingCartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number, selectedColor: string, selectedSize: string, unitPrice: number) => void;
  quantityOfItems: () => number;
}

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined);

export function ShoppingCartProvider({ children, initValue }: { children: ReactNode, initValue: CartItem[] }) {

    const [cartItems, setCartItems] = useState<CartItem[]>(initValue);

    const addToCart = useCallback((product: Product, quantity: number, selectedColor: string, selectedSize: string, unitPrice: number ) => {

        let newList: CartItem[] = [];
        if (quantity <= 0) return;

        if(cartItems.some(item => item.id === product.id && item.selectedColor === selectedColor && item.selectedSize === selectedSize )) {
            newList = cartItems.map(item => {
                if (item.id === product.id) {
                    return { ...item, quantity: item.quantity + quantity, unitPrice, totalPrice: unitPrice * (item.quantity + quantity) };
                }
                return item;
            });
        } else {
            const newItem = { 
              ...product,
              quantity,
              selectedColor,
              selectedSize,
              unitPrice,
              totalPrice: unitPrice * quantity
            };
            newList = [...cartItems, newItem];
        }

        localStorage.setItem('cartItems', JSON.stringify(newList));
        setCartItems(newList);
    }, [cartItems]);


    const quantityOfItems = () => {
      const itemAmount = cartItems.map(item => item.quantity).reduce((acc, curr) => acc + curr, 0);
      return itemAmount;
    };

  const value = {
    cartItems,
    addToCart,
    quantityOfItems
  };

  return <ShoppingCartContext.Provider value={value}>{children}</ShoppingCartContext.Provider>;
}

// Hook personalizado para usar el contexto
export function useShoppingCart() {
  const context = useContext(ShoppingCartContext);

  if (context === undefined) {
    throw new Error('useShoppingCart must be used within a ShoppingCartProvider');
  }

  return context;
}
