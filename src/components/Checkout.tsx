import { useState } from 'react'
import { X } from "lucide-react"
import { useCart } from "../context/CartContext"
import type {CartItem} from "../context/CartContext"
import { toast } from 'react-hot-toast';
import {useStore} from '../context/StoreContext'

export default function Checkout({ closeCheckout }: { closeCheckout: (open: boolean) => void}) {
  const [checkoutData, setCheckoutData] = useState({
    name: '',
    phone: '',
    address: '',
    payment_method: 'cod',
    receiver: '',
    sender: ''
  })
  const { methods: payment_methods } = useStore().payment;
  const storeData  = useStore();
  const vcashreciever = payment_methods.find((method: { value: string }) => method.value === 'vodafone_cash')?.reciever || '';
  const { items, clearCart } = useCart();

  function buildOrderMessage(data: { name: string, phone: string, address: string, payment_method: string, sender: string}, items: CartItem[]){  
    return `Hi,\n\nI would like to order these item, could you please confirm my order?\n\n ${items.map(item => {
      return `Product: ${item.name}\nQuantity: ${item.quantity}\n`
    })}\n My Info: \n\nName: ${data.name}\nPhone: ${data.phone}\nAddress: ${data.address}\n\nPayment method: ${data.payment_method}\n${data.sender ? 'Sender Number: ' + data.sender : ''}`
  }

  const sendmsg = (msg: string) => {
    window.open(`${storeData.store.whatsApp}?text=${encodeURIComponent(msg)}`)
    closeCheckout(false)
    clearCart()
    toast.success('Order placed successfully! We will contact you soon.')
  }

  return (
    <div className="relative w-full lg:w-3/6 h-screen lg:h-fit bg-bg rounded-2xl flex flex-col justify-center items-center text-dark-accent p-5 gap-5" onClick={(e) => e.stopPropagation()}>
      <button type="button" title="close checkout" className="absolute top-3 right-3 hover:text-accent cursor-pointer" onClick={() => closeCheckout(false)}><X /></button>
      <h3 className="text-2xl font-semibold">Checkout</h3>
      <hr className="w-full text-accent" />
      <form onSubmit={() => {
        const msg = buildOrderMessage(checkoutData, items);
        sendmsg(msg)
      }} className="flex flex-wrap justify-center items-center gap-4 px-5">
        <div className="flex flex-col gap-1 w-full lg:w-5/12 ">
          <label>Name:</label>
          <input value={checkoutData.name} onChange={(e) => setCheckoutData({...checkoutData, name: e.target.value})} type="text" title="name" className="border border-accent rounded-md px-2 py-2" placeholder="enter your name" required />
        </div>
        <div className="flex flex-col gap-1 w-full lg:w-5/12">
          <label>Phone Number:</label>
          <input value={checkoutData.phone} onChange={(e) => setCheckoutData({...checkoutData, phone: e.target.value})} type="phone" title="phone number" className="border border-accent rounded-md px-2 py-2" placeholder="01234567891" required />
        </div>
        <div className="flex flex-col gap-1 w-full lg:w-5/12">
          <label>Address:</label>
          <input value={checkoutData.address} onChange={(e) => setCheckoutData({...checkoutData, address: e.target.value})} type="text" title="address" className="border border-accent rounded-md px-2 py-2" placeholder="enter your detailed address" required />
        </div>
        <div className="flex flex-col gap-1 w-full lg:w-5/12">
          <label>Payment Method:</label>
          <select value={checkoutData.payment_method} onChange={(e) => setCheckoutData({...checkoutData, payment_method: e.target.value, receiver: (e.target.options[e.target.selectedIndex].dataset.reciever || '')})} title="payment method" className="border border-accent focus:outline-none p-2 rounded-md">
            { payment_methods.map((method: { enabled: boolean, name: string, value: string, reciever: string}) => method.enabled && (
              <option key={method.name} value={method.value} data-reciever={method.reciever}>
                {method.name}
              </option>
            )) }
          </select>
        </div>
        {
          checkoutData.payment_method !== 'cod' && <div className="w-full mx-11 flex flex-col gap-1">
            <hr />
            <p className="text-sm text-center text-dark-accent">Please send the total payment ammount to this vodafone cash number: <span className="text-lg font-semibold">{checkoutData.receiver}</span> after that you can enter the sender's phone number for Vodafone Cash payment.</p>
            <label >Sender Number:</label>
            <input value={checkoutData.sender} onChange={(e) => setCheckoutData({ ...checkoutData, sender: e.target.value})} type="phone" title="sender's phone number" placeholder="01234567891" className="border p-2 rounded-md" required />
          </div>
        }
        
        <button type='submit' className="w-full lg:mx-11 hover:bg-accent bg-dark-accent py-2 px-3 rounded-md text-bg place-self-end cursor-pointer">Order</button>
      </form>
    </div>
  )
}
