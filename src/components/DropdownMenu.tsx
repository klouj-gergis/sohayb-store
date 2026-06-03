import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function DropdownMenu({ options }: { options: { name: string, link: string }[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }
  return (
    <div className="relative">
      <button onClick={toggleMenu} type="button" title="menu" className="text-dark-accent cursor-pointer hover:text-accent">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <ul className={`absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg  ${isOpen ? 'block' : 'hidden'} flex flex-col`}  >
      {
        isOpen &&
        options.map((option, index) => (
          <li key={index} className="px-4 py-2 bg-accent/10 hover:bg-accent/20 transition-colors">
          <a  href={option.link} className="block text-dark-accent hover:text-accent transition-colors">
            {option.name}
          </a>
          </li>
        ))
      }
      </ul>
    </div>
  )
}
