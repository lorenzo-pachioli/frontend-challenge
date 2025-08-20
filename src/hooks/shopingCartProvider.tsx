
import { createContext, useContext, useCallback, useState, ReactNode } from 'react';

interface ICartItem {
  id: number;
  quantity: number;
}

interface ShoppingCartContextType {
  cartItems: ICartItem[];
  addToCart: (productId: number, quantity: number) => void;
  quantityOfItems: () => number;
}

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined);

export function ShoppingCartProvider({ children, initValue }: { children: ReactNode, initValue: ICartItem[] }) {
    
    const [cartItems, setCartItems] = useState<ICartItem[]>(initValue);

    const addToCart = useCallback((productId: number, quantity: number) => {

        let newList: ICartItem[] = [];
        if (quantity <= 0) return;

        if(cartItems.some(item => item.id === productId)) {
            newList = cartItems.map(item => {
                if (item.id === productId) {
                    return { ...item, quantity: item.quantity + quantity };
                }
                return item;
            });
        } else {
            const newItem = { id: productId, quantity };
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
