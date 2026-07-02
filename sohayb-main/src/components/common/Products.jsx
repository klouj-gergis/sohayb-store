import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard.jsx';
import api from '../../api.js';
import { useProductStore } from '../../store/productStore.js';

export default function Products() {
  const { products , loading, error, getProducts } = useProductStore()
  const productsdefault = [
    {
      id: 1,
      name: { en: "Product 1", ar: "المنتج 1" },
      size: 1000,
      price: 500,
      image: '/images/bottle.jpg'
    },
    {
      id: 2,
      name: { en: "Product 2", ar: "المنتج 1" },
      size: 500,
      price: 250,
      image: '/images/bottle.jpg'
    },
    {
      id: 3,
      name: { en: "Product 3", ar: "المنتج 1" },
      size: 250,
      price: 150,
      image: '/images/bottle.jpg'
    },
  ]

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  if (loading) {
    return (
      <section className="text-black px-4 py-12 bg-white flex flex-col items-center" id="products">
        <h2 className='text-4xl text-olive font-semibold mb-8'>Products</h2>
        <div className="flex items-center justify-center">
          <div className="text-xl text-gray-500">Loading products...</div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="text-black px-4 py-12 bg-white flex flex-col items-center"
      id="products"
    >
      <h2 className='text-4xl text-olive font-semibold mb-8'>Products</h2>
      
      {/* {error && (
        <div className="w-full max-w-4xl mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
          {error}
          <button 
            onClick={getProducts}
            className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Retry
          </button>
        </div>
      )} */}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 w-full place-items-center">
        {/* productsdefault.length > 0 ? ( */
          productsdefault.map((product, index) => (
            <ProductCard 
              key={product.id}  
              id={product.id}
              name={product.name} 
              price={product.price} 
              size={product.size} 
              /* imageUrl={`${import.meta.env.VITE_API_URL}/storage/ ${product.image}`}  */
              imageUrl={product.image}
              index={index}
            />
          ))
        /* ) : (
          !loading && !error && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-xl mb-4">No products available</p>
              <button 
                onClick={getProducts}
                className="px-6 py-3 bg-olive text-white rounded-lg hover:bg-olive-dark transition-colors"
              >
                Refresh Products
              </button>
            </div>
          )
        ) */ }
      </div>
    </section>
  );
}