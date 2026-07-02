import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home.jsx";
import Checkout from "./components/pages/Checkout.jsx";
import ThankYou from "./components/pages/ThankYou.jsx";
import Login from "./components/pages/Login.jsx";
import Signup from "./components/pages/Signup.jsx";
import Cart from "./components/pages/Cart.jsx";
import { useState } from "react";
import Payment from "./components/pages/Payment.jsx";
import { Toaster } from "react-hot-toast";



function App() {
    
  return (
    <Router>
      <Toaster position="top-right" />
      <div className="bg-stone text-white font-playfair min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />

          {/* Protected Routes Group */}
          
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
