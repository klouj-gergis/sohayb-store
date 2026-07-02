import { ArrowLeft, Banknote, CreditCard, Truck } from "lucide-react";
import { useState } from "react";
import PaymentOption from "../common/PaymentOption";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { useCartStore } from "../../store/cartStore";


const INITIAL_DATA = {
  shipping_name: '',
  shipping_phone: '',
  shipping_city: '',
  shipping_governate: '',
  shipping_address: '',
  payment_method: 'cod',
  notes: '',
};

export default function Checkout({ setOrder}) {
  const [checkoutData, setcheckoutData] = useState(INITIAL_DATA);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)



  const handlePaymentChange = (method) => {
    setcheckoutData({ ...checkoutData, payment_method: method });
  };

  const handleCheckout = async () => {
    try {
      const res = await api.post('/api/checkout', checkoutData);
      useCartStore.setState({paymentUrl: res.data.payment_url});
    } catch (error) {
      console.log(error); // Laravel error details if APP_DEBUG=true
    }   
    };

  const handleToPaymentClick = async () => {
    setLoading(true)
    if (checkoutData.payment_method === "cod") {
      await handleCheckout();
      navigate("/thank-you");
    } else {
      await handleCheckout();
      navigate("/payment");
    }
    setLoading(false)
  }

  return (
    <div>
      <div className="text-olive flex items-center gap-2 py-5 px-5 sticky top-0 bg-white shadow-xl">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <button onClick={() => navigate(-1)} className="flex hover:text-olive-dark cursor-pointer">
          <ArrowLeft />
          back
        </button>
      </div>

      <div className="w-full bg-olive min-h-64 p-5 flex gap-10">
        {/* Left Side - Shipping Form */}
        <div className="w-3/5 bg-white text-olive p-5 rounded-md flex flex-col gap-3 transition-all duration-500">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Truck size={26} />
            Shipping Information
          </h2>
          <hr />

          <form name="shipping-info" className="grid grid-cols-2 gap-6" >
            <div className="col-span-2">
              <label htmlFor="shipping_name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="shipping_name"
                name="shipping_name"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-olive-dark focus:outline-none"
                placeholder="Enter your full name"
                value={checkoutData.shipping_name}
                onChange={(e) => setcheckoutData({ ...checkoutData, shipping_name: e.target.value })}
                autoFocus 
                required
              />
            </div>

            <div className="col-span-2">
              <label htmlFor="shipping_phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="shipping_phone"
                name="shipping_phone"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-olive-dark focus:outline-none"
                placeholder="Enter your phone number"
                value={checkoutData.shipping_phone}
                onChange={(e) => setcheckoutData({ ...checkoutData, shipping_phone: e.target.value })}
                required
              />
            </div>

            <div className="col-span-1">
              <label htmlFor="shipping_city" className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <input
                type="text"
                id="shipping_city"
                name="shipping_city"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-olive-dark focus:outline-none"
                placeholder="Enter your city"
                value={checkoutData.shipping_city}
                onChange={(e) => setcheckoutData({ ...checkoutData, shipping_city: e.target.value })}
                required
              />
            </div>

            <div className="col-span-1">
              <label htmlFor="shipping_governate" className="block text-sm font-medium text-gray-700 mb-2">
                Governorate *
              </label>
              <input
                type="text"
                id="shipping_governate"
                name="shipping_governate"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-olive-dark focus:outline-none"
                placeholder="Enter your governorate"
                value={checkoutData.shipping_governate}
                onChange={(e) => setcheckoutData({ ...checkoutData, shipping_governate: e.target.value })}
                required
              />
            </div>

            <div className="col-span-2">
              <label htmlFor="shipping_address" className="block text-sm font-medium text-gray-700 mb-2">
                Street Address *
              </label>
              <input
                type="text"
                id="shipping_address"
                name="shipping_address"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-olive-dark focus:outline-none"
                placeholder="Enter your street address"
                value={checkoutData.shipping_address}
                onChange={(e) => setcheckoutData({ ...checkoutData, shipping_address: e.target.value })}
                required
              />
            </div>

            <div className="col-span-2">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Notes <span className="text-gray-500 font-normal ml-1">(Optional)</span>
              </label>
              <textarea
                id="notes"
                name="notes"
                rows="4"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-olive-dark focus:outline-none resize-none"
                placeholder="Any special delivery instructions..."
                value={checkoutData.notes}
                onChange={(e) => setcheckoutData({ ...checkoutData, notes: e.target.value })}
              />
            </div>
          </form>
        
          <hr className={`${checkoutData.payment_method !== 'cod' ? "block" : "hidden"}`}/>
          {/* submit button for all info */}
          <div className="col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-olive py-5 text-white font-semibold cursor-pointer hover:bg-olive-dark rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleToPaymentClick}
            >
              {loading ? "Processing..." : `Continue With ${checkoutData.payment_method === 'cod' ? 'Cash On Delivery' : 'Credit/Debit Card'}`}
            </button>
          </div>
        </div>

        {/* Right Side - Payment Method */}
        <div className="w-2/5 h-fit bg-white text-olive p-5 flex flex-col gap-5 rounded-md sticky top-24">
          <div className="flex items-center justify-center gap-2">
            <CreditCard />
            <h3 className="text-xl font-bold">Payment Information</h3>
          </div>
          <hr className="text-olive" />

          <div className="flex flex-col gap-5 items-center justify-center">
            <PaymentOption
              method="cod"
              icon={CreditCard}
              title="Cash On Delivery"
              description="Pay when the order arrives"
              selected={checkoutData.payment_method}
              onSelect={handlePaymentChange}
            />
            <PaymentOption
              method="online"
              icon={Banknote}
              title="Credit/Debit Card"
              description="Visa, Mastercard"
              selected={checkoutData.payment_method}
              onSelect={handlePaymentChange}
            />
            
          </div>
        </div>
      </div>
    </div>
  );
}
      
    
