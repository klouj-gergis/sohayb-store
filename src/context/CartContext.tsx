import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { toast } from 'react-hot-toast';
// Types
export interface CartItem {
  id: number | string;
  name: string;
  price: number;
  salePrice?: number;
  quantity: number;
  image?: string;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (product: CartItem) => void;
  removeItem: (productId: CartItem['id']) => void;
  increaseQty: (productId: CartItem['id']) => void;
  decreaseQty: (productId: CartItem['id']) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};


export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(() => {
    const storedState = localStorage.getItem('isCartOpen');
    return storedState ? JSON.parse(storedState) : false;
  });

  
useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(items));
}, [items]);

useEffect(() => {
  localStorage.setItem(
    'isCartOpen',
    JSON.stringify(isCartOpen)
  );
}, [isCartOpen]);

  // ✅ Renamed to match context value, fixed missing else branch
  const addItem = (product: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }]; // ✅ was missing
      }
      
    });
    toast.success(`${product.name} added to cart!`);
  };

  // ✅ Renamed to match context value
  const removeItem = (productId: CartItem['id']) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== productId));
    toast.success(`Item removed from cart!`);
  };

  // ✅ Renamed to match context value
  const increaseQty = (productId: CartItem['id']) => {
    setItems((prevItems) =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // ✅ Renamed to match context value
  const decreaseQty = (productId: CartItem['id']) => {
    setItems((prevItems) =>
      prevItems.map(item =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const clearCart = () => {setItems([]); toast.success('Cart cleared!')};

  // ✅ Was referencing `items` before it existed (state was named `cartItems`)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = items.reduce((sum, item) => {
    const price = item.salePrice ?? item.price;
    return sum + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{
      items,
      totalItems,
      totalPrice,
      addItem,
      removeItem,
      increaseQty,
      decreaseQty,
      clearCart,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};