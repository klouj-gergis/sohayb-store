import { useStore } from "../context/StoreContext"
export default function About(){
    const storeData = useStore()
    return (
        <section className="w-full flex flex-col items-center justify-center bg-dark-accent rounded-t-lg">
            <div className="w-[50px] h-[50px] rounded-full">
                <img src="" alt="owner's image" className="w-full" />
            </div>
            <div className="w-full flex flex-col items-center text-center">
                <h3 className="text-2xl text-white">
                    {
                        storeData.about.title
                    }
                </h3>
                <p className="text-xl text-center text-accent/30">
                    {
                        storeData.about.content
                    }
                </p>
            </div>
            <hr className="text-accent"></hr>
            <a href="#catalog" className="px-10 py-4 rounded-lg bg-white text-dark-accent">Shop Now</a>
        </section>
    )
}