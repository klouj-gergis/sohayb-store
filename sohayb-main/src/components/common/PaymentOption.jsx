// components/PaymentOption.jsx
import { Check } from "lucide-react";

export default function PaymentOption({ method, icon: Icon, title, description, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(method)}
      className={`flex items-center justify-between border-2 cursor-pointer ${
        selected === method ? 'border-olive text-olive' : 'border-bgs'
      } py-5 px-4 w-full rounded`}
    >
      <div className="flex gap-3 items-center">
        <div
          className={`flex items-center justify-center p-3 rounded-md ${
            selected === method ? 'bg-olive-dark text-white' : 'bg-bgs text-olive'
          }`}
        >
          <Icon />
        </div>
        <div>
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p>{description}</p>
        </div>
      </div>
      <div
        className={`border w-fit h-fit rounded-full p-1 ${
          selected === method ? 'bg-olive border-olive' : 'bg-white border-bgs'
        }`}
      >
        <Check size={16} className="text-white" />
      </div>
    </button>
  );
}
