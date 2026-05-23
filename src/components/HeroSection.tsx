import { useStore } from "../context/StoreContext";

export default function HeroSection() {
  const storeData = useStore();
  return (
    <div className="w-full h-[80vh] bg-bg flex flex-col-reverse lg:flex-row items-center justify-center">
      <div className="max-w-7xl mx-auto h-full flex flex-col  justify-center items-center gap-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-dark-accent tracking-wide text-center">
          <span className="text-dark-accent">{storeData.hero["title-first"]}.</span>
          <br /> 
          <span className="text-accent font-accent">{storeData.hero["title-second"]}.</span> 
        </h1>
        <p className="mt-4 text-lg md:text-xl text-dark-accent/80 ">{storeData.hero.subtitle}</p>
        <div className="flex items-center gap-4">
          <a href={storeData.hero.ctaLink} className="inline-block px-6 py-3 bg-accent text-white rounded hover:bg-dark-accent transition-colors">{storeData.hero.ctaText}</a>
        <a href={storeData.hero.secondaryCtaLink} className="inline-block px-6 py-3 bg-dark-accent text-white rounded hover:bg-accent transition-colors">{storeData.hero.secondaryCtaText}</a>
        </div>
      </div>
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center">
        <img src="/hero.png" alt="Hero Image" className="w-1/2 h-auto object-cover rounded-md" />
      </div>
    </div>
  )
}
