import { useStore } from "../context/StoreContext"
export default function About(){
    const storeData = useStore()
    return (
        <section className="w-full flex flex-col lg:flex-row items-center justify-center bg-dark-accent py-10 px-5 rounded-t-4xl lg:rounded-none">
            <div className="w-40 lg:w-3/6 h-40 lg:h-96 rounded-full lg:rounded-none overflow-hidden">
                <img src="/about_candle.png" alt="owner's image" className="w-full" />
            </div>
            <div className="w-full lg:w-3/6 flex flex-col items-center lg:items-start  py-5  gap-5">
                <h3 className="text-xl lg:text-3xl text-center lg:text-left text-bg font-bold w-full">
                    {
                        storeData.about.title
                    }
                </h3>
                <p className="lg:text-xl text-center lg:text-left text-bg/80">
                    {
                        storeData.about.content
                    }
                </p>
                <hr className="text-accent w-full"></hr>
            <a href="#catalog" className="px-10 py-4 rounded-lg bg-bg text-dark-accent hover:bg-accent hover:text-bg duration-300">Shop Now</a>
            </div>
            
        </section>
    )
}