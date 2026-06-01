import { X, Trash } from "lucide-react";
import { useCart } from "../context/CartContext.tsx";


export default function Cart({ currency }: { currency: string }) {
  const {  items, increaseQty, decreaseQty, setIsCartOpen, removeItem, clearCart } = useCart();
 
 
  return (
    <div className="fixed inset-0 bg-black/30 flex items-start justify-end z-50" onClick={() => setIsCartOpen(false)}>
            <div className="w-4/12 bg-white h-full p-6 rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl text-dark-accent font-extrabold mb-4">Cart</h2>
              <button title="close cart" type="button" onClick={() => setIsCartOpen(false)} className="text-accent text-lg cursor-pointer"><X /></button>
              </div>
              <hr className="w-full text-accent" />
              <div className="mt-4 h-[65vh] overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col gap-4">
                {
                  items.length > 0 ? (
                    items.map((item: any) => (
                      <div key={item.id} className="flex items-center gap-4 h-fit">
                        <div className="w-1/4 h-24 bg-accent/30 rounded-lg overflow-hidden">
                          <img src={item.image} alt={item.name} className="h-full object-cover rounded-lg" />
                        </div>
                        <div className="w-3/4 flex flex-col justify-between gap-5">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg text-dark-accent font-semibold">{item.name}</h3>
                            <button title="remove cart item" onClick={() => removeItem(item.id)} type="button" className="text-sm text-red-500 underline hover:text-accent/70 transition-colors"><Trash /></button>
                          </div>
                          <div className="flex items-center justify-between">
                          <p className="text-md text-dark-accent font-bold">{item.price * item.quantity} {currency}</p>
                            <div className="flex items-center gap-2">
                              <button onClick={() => decreaseQty(item.id)} type="button" className="px-2 py-1 bg-accent/30 text-dark-accent rounded hover:bg-accent/50 cursor-pointer">-</button>
                              <span className="text-md text-dark-accent">{item.quantity}</span>
                              <button onClick={() => increaseQty(item.id)} type="button" className="px-2 py-1 bg-accent/30 text-dark-accent rounded hover:bg-accent/50 cursor-pointer">+</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-md text-dark-accent text-center">Your cart is empty.</p>
                  )
                  
                }
              </div>
              <div>
                <button type="button" title="clear cart" onClick={clearCart} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors disabled:cursor-not-allowed disabled:bg-red-300" disabled={items.length < 1}>Clear Cart</button>
                <div className="mt-6 flex justify-between items-center">
                <button type="button" className="px-4 py-2 bg-gray-300 text-gray-700 rounded cursor-not-allowed" disabled>{`Total: ${items.reduce((total, item) => total + item.price * item.quantity, 0)} ${currency}`}</button>
                <button type="button" className="px-4 py-2 bg-accent text-white rounded hover:bg-accent/90 transition-colors disabled:cursor-not-allowed disabled:bg-accent/50" disabled={items.length < 1}>Checkout</button>
              </div>
              </div>
            </div>
          </div>
  )
}
