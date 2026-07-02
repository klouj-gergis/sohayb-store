import { FaInstagram, FaWhatsapp, FaTiktok   } from "react-icons/fa";
import storeData from "../data/store.json";

export default function Contact() {
  return (
    <section id="contact" className="pt-16 px-4 flex flex-col items-center gap-10">
      <h2 className="text-2xl font-bold text-center text-dark-accent font-playfairDisplay">{storeData.store.name}</h2>
      <p className="text-xl font-body text-accent text-center -mt-8">Made in Egypt</p>
      <div className="flex items-center gap-8">
        <a href="https://www.instagram.com/angels_for_candles?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="p-5 rounded-full bg-accent/30"><FaInstagram className="text-xl text-accent" /></a>
        <a href="https://wa.me/201012425386" className="p-5 rounded-full bg-accent/30"><FaWhatsapp className="text-xl text-accent" /></a>
        <a href="https://l.instagram.com/?u=https%3A%2F%2Fwww.tiktok.com%2F%40angels.for.candles%3F_t%3DZS-8zWnAmntLp1%26_r%3D1%26fbclid%3DPAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGnL02B6C_kibb7WvPQGMUVbf72jb8q0zSXFKdHSUfzsoJpo-f0zsUl0ha1DDA_aem_44mv1bXd2p0dBjRVMWdlWg&e=AUBrWlxL8Z7UB4RxJ1zIgOFJqKX9OQPOvcjTTevoAzUCns3jrifloOIpOezBfV_cfZcZ-bCqP9Joc38b9H4plgQI3FLwSOKnEd4AD7tGJ6_efbgvn-lfWc3nGHy_4G4OzoLMLXc" className="p-5 rounded-full bg-accent/30"><FaTiktok className="text-xl text-accent" /></a>
      </div>
      <hr className="w-full text-accent"/>
    </section>
  )
}
