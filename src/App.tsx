import HeroSection from "./components/HeroSection.tsx";
import Navbar from "./components/Navbar"
import About from "./components/About"
import { StoreProvider } from "./context/StoreContext.tsx"
import { useState } from "react"



function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <StoreProvider>
    <div className="min-h-screen bg-bg">
      {
        isCartOpen && (
          <div className="fixed inset-0 bg-black/30 flex items-start justify-end z-50" onClick={() => setIsCartOpen(false)}>
            <div className="bg-white h-full p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Cart</h2>
              <p>Your cart is currently empty.</p>
              <button onClick={() => setIsCartOpen(false)} className="mt-4 px-4 py-2 bg-accent text-white rounded hover:bg-dark-accent transition-colors">Close</button>
            </div>
          </div>
        )
      }
      <Navbar openCart={setIsCartOpen}/>
      <HeroSection />
      <About/>
    </div>
    </StoreProvider>
  )
}

export default App
