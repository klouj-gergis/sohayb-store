import { useState } from 'react'
import { X } from "lucide-react"
import { useCart } from "../context/CartContext"
import type {CartItem} from "../context/CartContext"

export default function Checkout({ closeCheckout }: { closeCheckout: (open: boolean) => void}) {
  const [checkoutData, setCheckoutData] = useState({
    name: '',
    phone: '',
    address: '',
    payment_method: 'cod',
    sender: ''
  })

  const { items, clearCart } = useCart();

  function buildOrderMessage(data: { name: string, phone: string, address: string, payment_method: string, sender: string}, items: CartItem[]){  
    return `Hi,\nI would like to order these items, ${items.map(item => {
      return `name: ${item.name}\n quantity: ${item.quantity}\n`
    })}\n My Info: \nName: ${data.name}\n Phone: ${data.phone}\n Payment method: ${data.payment_method}\n ${data.sender ? 'sender: ' + data.sender : ''}\n Address: ${data.address}`
  }

  const sendmsg = (msg: string) => {
    window.open(`https://wa.me/201012425386?text=${encodeURIComponent(msg)}`)
    clearCart()
    closeCart(false)
  }

  return (
    <div className="relative w-full lg:w-3/6 h-screen lg:h-fit bg-bg rounded-2xl flex flex-col justify-center items-center text-dark-accent p-5 gap-5">
      <button type="button" title="close checkout" className="absolute top-3 right-3 hover:text-accent cursor-pointer" onClick={() => closeCheckout(false)}><X /></button>
      <h3 className="text-2xl font-semibold">Checkout</h3>
      <hr className="w-full text-accent" />
      <form onSubmit={() => {
        const msg = buildOrderMessage(checkoutData, items);
        sendmsg(msg)
      }} className="flex flex-wrap justify-center items-center gap-4">
        <div className="flex flex-col gap-1 w-5/12 ">
          <label>Name:</label>
          <input value={checkoutData.name} onChange={(e) => setCheckoutData({...checkoutData, name: e.target.value})} type="text" title="name" className="border border-accent rounded-md px-2 py-2" placeholder="enter your name" required />
        </div>
        <div className="flex flex-col gap-1 w-5/12">
          <label>Phone Number:</label>
          <input value={checkoutData.phone} onChange={(e) => setCheckoutData({...checkoutData, phone: e.target.value})} type="phone" title="phone number" className="border border-accent rounded-md px-2 py-2" placeholder="01234567891" required />
        </div>
        <div className="flex flex-col gap-1 w-5/12">
          <label>Address:</label>
          <input value={checkoutData.address} onChange={(e) => setCheckoutData({...checkoutData, address: e.target.value})} type="text" title="address" className="border border-accent rounded-md px-2 py-2" placeholder="enter your detailed address" required />
        </div>
        <div className="flex flex-col gap-1 w-5/12">
          <label>Payment Method:</label>
          <select value={checkoutData.payment_method} onChange={(e) => setCheckoutData({...checkoutData, payment_method: e.target.value})} title="payment method" className="border border-accent focus:outline-none p-2 rounded-md">
            <option value="cod" className="">Cash on deleviry</option>
            <option value="vodafone_cash">Vodafone Cash</option>
          </select>
        </div>
        {
          checkoutData.payment_method === 'vodafone_cash' && <div className="w-full flex flex-col gap-1">
            <hr />
            <label >vodafone cash sender</label>
            <input value={checkoutData.sender} onChange={(e) => setCheckoutData({ ...checkoutData, sender: e.target.value})} type="phone" title="vodafone cash sender's phone number" placeholder="01234567891" className="border p-2 rounded-md" required />
          </div>
        }
        <button type='submit' className="bg-dark-accent py-2 px-3 rounded-md text-bg place-self-end cursor-pointer">Order</button>
      </form>
    </div>
  )
}
