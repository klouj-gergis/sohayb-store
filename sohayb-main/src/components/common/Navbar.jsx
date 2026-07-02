import { ShoppingBag, Menu } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../../store/authStore";

import { Link } from "react-router-dom";


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { i18n } = useTranslation('global');
  const { isAuthenticated } = useAuthStore();

  const lang = i18n.language
  
  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang)
  }

  return (
    <header className="w-full bg-olive-dark text-white px-4 sm:px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl sm:text-3xl text-white font-bold">
          <img src="/images/logo.png" alt="logo" className="w-30" />
        </Link>
        <div className="hidden md:flex gap-5">
        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 text-base items-center">
          <a href="/" className="hover:underline">Home</a>
          <a href="/#products" className="hover:underline">Products</a>
          <a href="/#about" className="hover:underline">About</a>
          <a href="/#contact" className="hover:underline">Contact Us</a>
          {isAuthenticated ? (
            <Link to="/cart" className="flex items-center">
              <ShoppingBag size={20} className="inline-block mr-1" />
            </Link>
          ) : (
            <Link to="/login" className="flex items-center bg-white text-olive px-3 py-1 rounded hover:bg-gray-200 transition-colors">
              <span className="mr-1">Login</span>
            </Link>
          )}
        </nav>

        <div className="flex  border rounded-3xl p-1">
          <button className={` ${lang === 'ar' ? "bg-olive" : ''} p-1 rounded-full text-xs hover:cursor-pointer focus-outline-none`} onClick={() => {
            handleChangeLanguage("ar")
          }}>ar</button>
          <button className={` ${lang === 'en' ? "bg-olive" : ''} p-1 rounded-full text-xs hover:cursor-pointer focus-outline-none`} onClick={() => {
            handleChangeLanguage("en")
          }}>en</button>
        </div>
        </div>
          <div className="md:hidden flex items-center gap-4">
        {/* Mobile Menu Button */}
        {isAuthenticated ? (
          <Link to="/cart" className="flex items-center">
            <ShoppingBag size={20} className="inline-block mr-1" />
          </Link>
        ) : (
          <Link to="/login" className="flex items-center bg-white text-olive px-3 py-1 rounded hover:bg-gray-200 transition-colors">
            <span className="mr-1">Login</span>
          </Link>
        )}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <Menu size={28} />
        </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-3 px-2 text-sm">
          <a href="/" className="block hover:underline">Home</a>
          <a href="/#products" className="block hover:underline">Products</a>
          <a href="/#about" className="block hover:underline">About</a>
          <a href="/#contact" className="block hover:underline">Contact Us</a>
          <div className="flex  border rounded-3xl p-1 w-fit">
          <button className={` ${lang === 'ar' ? "bg-olive" : ''} p-1 rounded-full text-xs hover:cursor-pointer`} onClick={() => {
            handleChangeLanguage("ar")
          }}>ar</button>
          <button className={` ${lang === 'en' ? "bg-olive" : ''} p-1 rounded-full text-xs hover:cursor-pointer`} onClick={() => {
            handleChangeLanguage("en")
          }}>en</button>
        </div>
        </div>
      )}
    </header>
  );
}
