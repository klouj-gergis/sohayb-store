import HeroSection from "./components/HeroSection.tsx";
import Navbar from "./components/Navbar"
import About from "./components/About"
import ReviewsCarosel from "./components/ReviewsCarosel"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import Checkout from "./components/Checkout.tsx"
import { StoreProvider } from "./context/StoreContext.tsx"

import Catalog from "./components/Catalog.tsx";
import Cart from "./components/Cart.tsx";
import { useStore } from "./context/StoreContext.tsx";
import {  useCart } from "./context/CartContext.tsx";
import { useState, useEffect } from "react"


function App() {
  const { isCartOpen, setIsCartOpen } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(() => {
    let storedState = localStorage.getItem('isCheckoutOpen')
    return storedState ? JSON.parse(storedState) : false;
  });

  const currency = useStore().store.currency || "EGP";

  useEffect(() => {
    localStorage.setItem('isCheckoutOpen', isCheckoutOpen);
  }, [isCheckoutOpen])
 
  return (
    <StoreProvider>
      
    <div className="relative min-h-screen bg-bg scroll-smooth">
      {isCartOpen && <Cart  currency={currency} openCheckout={setIsCheckoutOpen} />}
      {isCheckoutOpen && <div className="fixed w-full  h-screen top-0 left-0 bg-black/30 z-50 flex justify-center items-center" ><Checkout closeCheckout={setIsCheckoutOpen} /></div>}
      <Navbar openCart={setIsCartOpen} />
      <HeroSection />
      <Catalog/>
      <About/>
      <ReviewsCarosel />
      <Contact />
      <Footer />
    </div>

    </StoreProvider>
  )
}

export default App
