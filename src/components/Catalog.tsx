import { useStore } from "../context/StoreContext"
import ProductCard from "./ProductCard"
import { useState } from "react"

export default function Catalog(){
    const storeData = useStore();
    const [isInViewAllMode, setIsInViewAllMode] = useState(false);
    const products = storeData.products || [];
    return (
        <section id="catalog" className="w-full min-h-screen flex flex-col items-center justify-start py-20">
          <h2 className="text-3xl font-bold font-playfairDisplay w-full px-5 text-dark-accent">The Collection</h2>
          <span className="font-body w-full px-5 flex justify-between"><p className="text-accent/70">Curated scents for every mood</p><button className="underline lg:hover:underline cursor-pointer text-accent" onClick={() => setIsInViewAllMode(!isInViewAllMode)}>{isInViewAllMode ? 'View less' : 'View all'}</button></span>
          <div className="w-full h-full px-5 mt-10 flex flex-col gap-5  lg:flex-row lg:justify-center lg:gap-6">
            {
              products.length > 0 && products.map((product) => {
                if(!isInViewAllMode && product.id > 4) return null;
                return <ProductCard key={product.id} productData={product} currency={storeData.store.currency} />
              })
            }
          </div>
        </section>
    )
}