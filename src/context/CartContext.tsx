import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
// Types
interface CartItem {
  id: number | string;
  price: number;
  salePrice?: number;
  quantity: number;
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
}

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  });

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
  };

  // ✅ Renamed to match context value
  const removeItem = (productId: CartItem['id']) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== productId));
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

  const clearCart = () => setItems([]);

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
    }}>
      {children}
    </CartContext.Provider>
  );
};