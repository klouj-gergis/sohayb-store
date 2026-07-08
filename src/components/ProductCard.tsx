import {  Plus } from "lucide-react"
import { useCart } from "../context/CartContext.tsx";

export default function ProductCard({ productData, currency }: { productData: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
}, currency: string }) {
  const { addItem: addToCart } = useCart();
  const handleAddToCart = () => {
    addToCart({
      id: productData.id,
      name: productData.name,
      image: productData.image,
      price: productData.price,
      quantity: 1,
    });
  };
  return (
    <div className="bg-bg h-48 lg:h-[70vh]  min-w-1/3 rounded-lg shadow-shadow p-0 flex lg:flex-col items-center gap-3">
      <div className="h-full lg:h-2/3 w-1/3 lg:w-fit bg-accent/30 rounded-l-lg overflow-hidden">
        <img src={productData.image} alt={productData.name} className="w-full h-full lg:h-full mx-auto object-cover rounded-l-lg" />
      </div>
      <div className="w-2/3 lg:w-full h-full lg:h-1/3 flex flex-col justify-between  p-4 px-0 pr-3">
        <span className="flex flex-col gap-1">
          <h3 className="text-md text-dark-accent font-semibold">{productData.name }</h3>
      <p className="text-xs text-accent">{productData.description}</p>
        </span>
      <span className="flex justify-between items-center">
        <p className="text-2xl font-bold text-dark-accent"> {productData.price} {currency}</p>
        <button onClick={handleAddToCart} title="add to cart" type="button" className="p-2 bg-accent/30 text-dark-accent rounded-full hover:bg-accent/50 cursor-pointer transition-colors"><Plus /></button>
      </span>
      </div>
    </div>
  )
}
