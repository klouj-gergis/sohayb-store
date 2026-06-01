import HeroSection from "./components/HeroSection.tsx";
import Navbar from "./components/Navbar"
import About from "./components/About"
import ReviewsCarosel from "./components/ReviewsCarosel"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import { StoreProvider } from "./context/StoreContext.tsx"

import Catalog from "./components/Catalog.tsx";
import Cart from "./components/Cart.tsx";
import { useStore } from "./context/StoreContext.tsx";
import {  useCart } from "./context/CartContext.tsx";



function App() {
  const { isCartOpen, setIsCartOpen } = useCart();

  const currency = useStore().store.currency || "EGP";
 
  return (
    <StoreProvider>
      
    <div className=" min-h-screen bg-bg scroll-smooth">
      {isCartOpen && <Cart  currency={currency} />}
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
