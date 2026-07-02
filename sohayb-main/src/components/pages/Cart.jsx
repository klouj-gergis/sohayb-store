import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ArrowLeft, Trash, ImageIcon, ShoppingCart, ShoppingCartIcon } from 'lucide-react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import { shallow } from 'zustand/shallow';
import { useTranslation } from 'react-i18next';

export default function Cart() {
  const { t, i18n } = useTranslation('global');
  const lang = i18n.language;
  const navigate = useNavigate();
  

  const cartItems = useCartStore((state) => state.cart);
  const Total = useCartStore((state) => state.total);
  const tax = useCartStore((state) => state.tax);
  const getCartItems = useCartStore((state) => state.getCartItems);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const loading = useCartStore((state) => state.loading);
  const error = useCartStore((state) => state.error);
  const pendingChanges = useCartStore((state) => state.pendingChanges);
  const syncCart = useCartStore(state => state.syncCart);
  const clearCart = useCartStore(state => state.clearCart);

  const { loading: authLoading, } = useAuthStore();
    

useEffect(() => {
    getCartItems();
}, []);

const handleToCheckoutClilck = async () => {
  if(pendingChanges.length > 1){
    navigate('/checkout');
  }else{
    await syncCart();
    navigate('/checkout');
  }
}


const handleReturnToShop = async () => {
  if(cartItems.length === 0)
    {
      await clearCart();
      navigate('/');
    }
    navigate('/');
    return;
}

  if (authLoading || loading) {
    return (
      <div className="w-full flex items-center justify-center min-h-screen bg-stone text-olive">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Loading your cart...</h1>
        </div>
      </div>
    );
  }

  if(!loading || !authLoading  && cartItems.length === 0) {
    return (
      <div className="w-full flex items-center justify-center min-h-screen bg-stone text-olive">
        <div className="text-center flex flex-col items-center gap-2">
          <ShoppingCartIcon size={24} />
          <h1 className="text-2xl font-bold">{t('cart.empty')}</h1>
          <p className="mt-4">Add some products to your cart to get started!</p>
          <button 
            onClick={handleReturnToShop}
            className="mt-6 px-4 py-2 bg-olive text-white rounded hover:bg-olive-dark transition-colors">Return to Shop</button>
        </div>
      </div>
    );
  }

  if(error) {
    return (
      <div className="w-full flex items-center justify-center min-h-screen bg-stone text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Error</h1>
          <p className="mt-4">{error}</p>
          <button 
            onClick={getCartItems}
            className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
    <div className='w-full min-h-screen bg-gray-100 p-8 flex flex-col gap-5'>
      <div className='flex gap-1 items-center justify-start mb-8 text-olive'>
        <h1 className='text-2xl font-bold flex items-center gap-2'>
          <ShoppingCart size={24} className="inline-block bg-olive text-white p-1 rounded-md" />
          Cart {`(${cartItems.length || 0})`}
        </h1>
        <button className='flex hover:bg-gray-300 py-1 px-2 rounded-md cursor-pointer items-center' onClick={() => navigate(-1)}>
          <ArrowLeft />
          back
        </button>
      </div>
        <div className='w-full bg-white p-6 rounded-lg shadow-md flex flex-col gap-4'>
          {
            cartItems.map(item => {
              return (
                <div className='flex items-center justify-between border border-gray-300 p-2 pr-4 rounded-md gap-2' key={item.product.id}>
                  <div className='flex items-center gap-2'>
                    {item.product.image ? (
                      <img className='h-24' src={`${import.meta.env.VITE_API_URL}/storage/${item.product.image}`} alt={item.product.name.en} />
                    ) : (
                      <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded-md">
                        <ImageIcon size={50} className="text-gray-300" />
                      </div>
                    )}
                    
                    <div>
                      <h2 className='text-lg text-olive font-semibold'>{lang === 'en' ? item.product.name.en : item.product.name.ar}</h2>
                      <p className='text-olive'>Price: EGP {item.product.price}</p>
                      <p className='text-olive'>Size: {item.product.size || "unknown"} ml</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-2'>
                      <button onClick={() => {updateQuantity(item.id, item.quantity - 1)}} className={`text-olive font-semibold text-2xl border border-olive h-9 w-9 flex items-center justify-center rounded-md  ${item.quantity === 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`}>-</button>
                      <span className='w-9 h-9 bg-gray-300 rounded-md text-olive flex items-center justify-center'>{item.quantity}</span>
                      <button onClick={() => {updateQuantity(item.id, item.quantity + 1)}} className='text-olive font-semibold text-2xl border border-olive h-9 w-9 flex items-center justify-center rounded-md cursor-pointer'>+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-600 p-1 rounded-md bg-white border border-red-500 hover:bg-red-50 transition-colors cursor-pointer">
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
              )
            })
          }
          <hr className='text-olive'/>
          <div className='flex justify-between text-olive'>
             {lang === 'en' ? (<>
              <span className='font-bold text-2xl'>Subtotal</span>
            <span className='font-bold text-2xl'>EGP {Total || '0.00'}</span>
            </>) : (<>
              <span className='font-bold text-2xl'>EGP {Total || '0.00'}</span>
              <span className='font-bold text-2xl'>المجموع</span>
            </>)}
          </div>
          <hr className='text-gray-300' />
          <div className='flex justify-between text-olive'>
            {lang === 'en' ? (<>
              <span className='font-bold text-2xl'>Tax Rate</span>
            <span className='font-bold text-2xl'>%{tax || '0.00'}</span>
            </>) : (<>
              <span className='font-bold text-2xl'>%{tax || '0.00'}</span>
              <span className='font-bold text-2xl'>النسبة الضريبية</span>
            </>)}
          </div>
        </div>
        <button onClick={handleToCheckoutClilck} className='text-white bg-olive py-2 px-7 rounded-md hover:bg-olive-dark cursor-pointer'>Checkout</button>
    </div>
    <Footer />
    </div>
  );
}

