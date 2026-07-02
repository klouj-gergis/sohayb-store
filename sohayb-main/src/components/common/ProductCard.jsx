import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useCartStore } from "../../store/cartStore";

export default function ProductCard({ id, name, size, price, imageUrl, index }) {
  const { t, i18n } = useTranslation('global');
  const navigate = useNavigate();
  const lang = i18n.language;
  const [loading, setLoading] = useState(false);
  const { checkAuth } = useAuthStore();
  const { addToCart } = useCartStore();

  

  const handleAddToCart = async () => {
    setLoading(true);
  try {
    const item = {
      product_id: id,
      quantity: 1
    };

    await addToCart(item);
    setLoading(false);
  } catch (error) {
    if (error.response?.status === 401) {
      console.log("Authentication expired, redirecting to login");
      setLoading(false);
      navigate("/login");
    } else {
      console.error("Error adding to cart:", error);
      setLoading(false);
    }
  }
};

  return (
    <motion.div 
      layout
      style={{ willChange: 'transform, opacity' }}
      className="bg-white border-2 border-olive rounded-2xl shadow-md p-4 hover:shadow-lg transition duration-300 w-72 text-center flex flex-col items-center hover:border-olive-light"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: index * 0.2 }}
      viewport={{ once: true }}
    >
      <img
        src={imageUrl}
        alt={lang === 'en' ? name.en : name.ar} // Use actual product name
        className="w-full h-48 object-contain mb-4 rounded-md"
      />
      <h2 className="text-lg font-semibold text-olive mb-1">{lang === 'en' ? name.en : name.ar}</h2>
      <p className="text text-gray-600 mb-1 font-semibold">{size}ml</p>
      <p className="text-base font-bold text-olive-dark mb-4">{price} EGP</p>
      <button 
        onClick={handleAddToCart} 
        disabled={loading}
        className="mt-auto bg-olive text-white px-4 py-2 rounded-lg hover:bg-olive-dark hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Adding...' : 'Add To Cart'}
      </button>
    </motion.div>
  );
}