import { useStore} from "../context/StoreContext";
import { useRef } from "react";
import { FaQuoteLeft } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { ChevronRight, ChevronLeft } from "lucide-react";


export default function ReviewsCarosel() {
  const reviews = useStore().reviews || [];
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if(ref.current) {
      const scrollAmount = direction === "left"  ? -window.innerWidth : window.innerWidth;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <button type='button' title="scroll button" onClick={() => scroll("left")} className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-accent text-white p-2 rounded-full z-10"><ChevronLeft /></button>
      <button type='button' title="scroll button" onClick={() => scroll("right")} className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-accent text-white p-2 rounded-full z-10"><ChevronRight /></button>
    <div ref={ref} className=" overflow-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory">
      
      <div className="flex w-fit">
       {
        reviews.map((review, index) => (
          <div key={index} className="bg-accent/40 w-screen lg:h-screen p-10 flex flex-col items-center justify-center gap-4 snap-start snap-always">
            <FaQuoteLeft className="text-accent text-9xl"/>
            <p className="text-center text-lg lg:text-2xl max-w-4/6 text-dark-accent">{review.comment}</p>
            {
              review.rating && (
                <div className="flex gap-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <FaStar key={i} className="text-dark-accent text-2xl" />
                  ))}
                </div>
              )
            }
            <h3 className="text-3xl font-bold text-accent">--{review.name}</h3>

          </div>
        ))
       }
       </div>
    </div>
    </div>
  )
}
