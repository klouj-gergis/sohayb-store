import { create } from 'zustand';
import api from '../api';
import toast from 'react-hot-toast';

export const useCartStore = create((set, get) => ({
  cart: [],
  total: 0.0,
  tax: 0,
  loading: false,
  error: '',
  pendingChanges: [],
  paymentUrl: '',
  cartFetched: false, // <--- NEW

  getCartItems: async (force = false) => {
    set({ loading: true, error: '' });
    const { cartFetched } = get();
    if (cartFetched && !force){ 
      set({ loading: false , error: '' })
      return;
    }

    

    try { 
      
      const response = await api.get('/api/cart');
      set({
        cart: response.data.items || [],
        total: response.data.total ?? 0,
        tax: response.data.tax ?? 0,
        loading: false,
        error: '',
        cartFetched: true,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
        cart: [],
        cartFetched: true,
      });
      if (error.response?.status === 401) {
        toast.error('Authentication expired, please log in again');
        // Redirect to login page
        location.href = '/login';
      }
    }
  },

  addToCart: async (item) => {
    set({ loading: true });
    try {

      const response = await api.post('/api/cart', item);
      set((state) => ({
        cart: [...state.cart, response.data],
        loading: false,
      }));
      toast.success('Item added to cart');
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
    }
  },

  updateQuantity: (itemId, newQuantity) => {
    if(newQuantity < 1){
      set((state) => ({cart: [...state.cart.filter(item => item.id !== itemId)]}));
      get().calculateTotal();
      set((state) => ({
        pendingChanges: [
          ...state.pendingChanges.filter(item => item.id !== itemId),
          {id: itemId, delete: true}
        ]
      }));
      return;
    }

    set((state) => ({
      cart: [...state.cart.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item)],
      pendingChanges: [...state.pendingChanges.filter(item => item.id !== itemId), { id: itemId, quantity: newQuantity}]
    }))
    get().calculateTotal();
  },

  removeFromCart: (itemId) => {
    set((state) => ({
      cart: [...state.cart.filter(item => item.id !== itemId)],
      pendingChanges: [...state.pendingChanges.filter(item => item.id !== itemId), { id: itemId, delete: true}]
    }))
    get().calculateTotal();
  },

  syncCart: async () => {
    const { pendingChanges } = get();
    
    if(pendingChanges.length > 0){
      try {
        
        const response = await api.post('/api/sync-cart', {
          updates: pendingChanges
        });
        
        if(response.status === 200){
          set({ pendingChanges: []});
          return { success: true };
        }
      } catch (error) {
        set({ error: error.response?.data?.message || error.message });
        console.log('error syncing cart:', error.response || error);
        throw error; // Let component handle the error
      }
    } else {
      return { success: true };
    }
  },

  // Clear cart state 
  clearCart: async () => {
  try {
    const response = await api.post('/api/cart/clear');
    set({ cart: [], total: 0.00, tax: 0, pendingChanges: [] });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to clear cart');
  }
},


  calculateTotal: () => {
    const items = get().cart
    let total = 0;
    items.map(item => total += (item.quantity * item.product.price))
    set({ total: parseFloat(total.toFixed(2)) })
  }
}));
    
   
   
