import { FaInstagram, FaWhatsapp, FaTiktok, FaFacebook   } from "react-icons/fa";
import storeData from "../data/store.json";

export default function Contact() {
  return (
    <section id="contact" className="pt-16 px-4 flex flex-col items-center gap-10">
      <h2 className="text-2xl font-bold text-center text-dark-accent font-playfairDisplay">{storeData.store.name}</h2>
      <p className="text-xl font-body text-accent text-center -mt-8">Made in Egypt</p>
      <div className="flex items-center gap-8">
        {
          storeData.store.instagram && (
            <a href={storeData.store.instagram} className="p-5 rounded-full bg-accent/30"><FaInstagram className="text-xl text-accent" /></a>
        )
        }
        {
          storeData.store.whatsApp && (
            <a href={storeData.store.whatsApp} className="p-5 rounded-full bg-accent/30"><FaWhatsapp className="text-xl text-accent" /></a>
        )
        }
        {
          storeData.store.tiktok && (
            <a href={storeData.store.tiktok} className="p-5 rounded-full bg-accent/30"><FaTiktok className="text-xl text-accent" /></a>
        )
        }
        { storeData.store.facebook && (
          <a href={storeData.store.facebook} className="p-5 rounded-full bg-accent/30"><FaFacebook className="text-xl text-accent" /></a>
        )}
      </div>
      <hr className="w-full text-accent"/>
    </section>
  )
}
