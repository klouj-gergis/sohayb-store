// ThankYou.jsx
import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stone text-white font-playfair p-6">
      <h1 className="text-5xl font-bold text-olive mb-6">Thank You!</h1>
      <p className="text-xl mb-6 text-goldleaf">Your message has been successfully received.</p>
      <Link 
        to="/" 
        className="bg-olive text-white px-6 py-3 rounded hover:opacity-90 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
