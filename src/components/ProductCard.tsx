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
    <div className="bg-bg h-48 lg:h-[70vh] rounded-lg shadow-shadow p-4 flex lg:flex-col items-center gap-5">
      <div className="h-2/3 w-fit bg-accent/30 rounded-lg overflow-hidden">
        <img src={productData.image} alt={productData.name} className="h-full mx-auto object-cover rounded-lg" />
      </div>
      <div className="w-full h-1/3 flex flex-col justify-between  pt-3 px-2">
        <span className="flex flex-col gap-1">
          <h3 className="text-md text-dark-accent font-semibold">{productData.name }</h3>
      <p className="text-md text-accent">{productData.description}</p>
        </span>
      <span className="flex justify-between items-center">
        <p className="text-2xl font-bold text-dark-accent">{currency} {productData.price}</p>
        <button onClick={handleAddToCart} title="add to cart" type="button" className="p-2 bg-accent/30 text-dark-accent rounded-full hover:bg-accent/50 cursor-pointer transition-colors"><Plus /></button>
      </span>
      </div>
    </div>
  )
}
