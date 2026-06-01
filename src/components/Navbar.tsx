import { ShoppingBag } from "lucide-react"
import { useStore } from "../context/StoreContext"
import DropdownMenu from './DropdownMenu';
import { useCart } from "../context/CartContext";

export default function Navbar({openCart}: {openCart: (open: boolean) => void}) {
    const storeData = useStore();
    const navLinks = storeData.pages || [];
    const cartCount = useCart().totalItems;
  return (
    <>
    <nav className="hidden w-full lg:flex items-center justify-between py-4 px-6 ">
      <h1 className="text-3xl font-extrabold text-dark-accent font-accent tracking-wide">{storeData.store.name}</h1>

      {
        navLinks.length > 0 && (
          <ul className="flex items-center gap-6 font-body">
            {navLinks.map((link, index) => (
              <li key={index}>
                <a href={link.link} className="text-dark-accent hover:text-accent transition-colors">{link.name}</a>
              </li>
            ))}
          </ul>
        )
      }

      <div className="flex items-center gap-4">
        
        <button type="button" onClick={() => openCart(true)} title="cart" className="text-dark-accent cursor-pointer hover:text-accent relative">
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{cartCount}</span>
            )}
            <ShoppingBag />
          </button>
      </div>

    </nav>
    <nav className="lg:hidden flex itmes-center justify-between px-4 py-5" >
      <div className="flex items-center gap-2">
        <DropdownMenu options={storeData.pages} />
        <h1 className="text-2xl font-extrabold text-dark-accent font-accent tracking-wide">{storeData.store.name}</h1>
      </div>
      <div className="flex items-center gap-4">
          <button type="button" title="cart" onClick={() => openCart(true)} className="text-dark-accent cursor-pointer hover:text-accent"><ShoppingBag /></button>
      </div>
    </nav>

  </>
  )
}
