import { Heart, Plus } from "lucide-react"

export default function ProductCard({ productData, currency }: { productData: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
}, currency: string }) {
  return (
    <div className="bg-bg h-56 rounded-lg shadow-shadow p-4 flex items-center gap-5">
      <div className="w-1/3 h-full bg-accent/30 rounded-lg overflow-hidden p-5">
        <img src={productData.image} alt={productData.name} className="h-full  object-cover rounded-lg" />
      </div>
      <div className="w-2/3 h-full flex flex-col justify-between py-5">
        <h3 className="flex justify-between w-full items-center text-dark-accent"><span className="text-lg font-semibold">{productData.name }</span></h3>
      <p className="text-md text-accent -mt-10">{productData.description}</p>
      <span className="flex justify-between items-center mt-4">
        <p className="text-2xl font-bold text-dark-accent">{currency} {productData.price}</p>
        <button title="add to cart" type="button" className="p-2 bg-accent/30 text-dark-accent rounded-full hover:bg-accent/50 cursor-pointer transition-colors"><Plus /></button>
      </span>
      </div>
    </div>
  )
}
