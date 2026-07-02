import { create } from 'zustand';
import api from '../api';

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: '',

  getProducts: async () => {
    const products = get().products;
    if(products.length > 0){
      return
    }else {
      try {
      set({ loading: true, error: '' });
      
      const response = await api.get(`/api/products`);
      console.log(response.data);
      
      // Handle different API response structures
      const productsData = response.data.data || response.data.products || response.data || [];
      set({ products: Array.isArray(productsData) ? productsData : [] });
      
    } catch (error) {
      console.error("Error fetching products:", error);
      
      if (error.response?.status === 404) {
        set({error: "Products not found." });
      } else if (error.response?.data?.message) {
        set({error: error.response.data.message });
      } else {
        set({error: "Failed to fetch products. Please try again later." });
      }
    } finally {
      set({ loading: false });
    }
    }
  }

}))