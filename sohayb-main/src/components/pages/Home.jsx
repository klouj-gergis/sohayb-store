

import Navbar from '../common/Navbar.jsx'
import Hero from '../common/Hero.jsx';
import About from '../common/About.jsx';
import Products from '../common/Products.jsx';
import Contact from '../common/Contact.jsx';
import Footer from '../common/Footer.jsx';
import WhyChoseUs from '../common/WhyChosseUs.jsx';
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";



export default function Home() {

  const location = useLocation();
  const navigate = useNavigate();

 

  useEffect(() => {
  if (location.state?.showToast) {
    toast.success(location.state.showToast);
    navigate(location.pathname, { replace: true, state: {} }); // ✅ reset state after showing toast
  }
}, [location, navigate]);

  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Products />
      <WhyChoseUs />
      <Contact />
      <Footer />
    </div>
  );
} 
