import { motion } from 'framer-motion'
import { sendContactEmail } from '../../utils/emailService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Contact() {
  const navigate = useNavigate();
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    message: "",
  })

  function handleContactForm(){
    sendContactEmail(contactInfo).then(navigate('/thank-you'))
  }

  return (
    <section
      id="contact"
      className="p-5 bg-white"
      data-aos="fade-up"
    >
      <motion.div className="bg-white py-10 px-4  md:px-12 max-w-5xl mx-auto mb-20 mt-20 border-2 border-olive hover:border-olive-light p-5"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut'}}
      viewport={{ once: true }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-olive">
        Contact Us
      </h2>

      <div
        className="space-y-6 flex flex-col justify-between gap-2"
      >
        <div className="sm:none md:flex justify-between">
          <div className="md:w-1/2 flex flex-col gap-6 md:border-r border-olive pr-2">
        {/* Name Field */}
        <div>
          <label className="block font-medium mb-1 text-sm sm:text-base text-black">Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full p-2 border border-gray-300 rounded text-sm sm:text-base focus:bg-gray-200 text-black focus:outline-lime-500"
            placeholder="Your Name"
            value={contactInfo.name}
            onChange={(e) => {
              setContactInfo({...contactInfo, name: e.target.value})
            }}
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block font-medium mb-1 text-sm sm:text-base text-black">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full p-2 border border-gray-300 rounded text-sm sm:text-base focus:bg-gray-200 text-black focus:outline-lime-500"
            placeholder="you@example.com"
            value={contactInfo.email}
            onChange={(e) => {
              setContactInfo({...contactInfo, email: e.target.value})
            }}
            />
        </div>
        </div>

        <div className="md:w-1/2 pl-2">
        {/* Message Field */}
        <div>
          <label className="block font-medium mb-1 text-sm sm:text-base text-black">Message</label>
          <textarea
            name="message"
            required
            className="w-full p-2 border border-gray-300 rounded text-sm sm:text-base focus:bg-gray-200 text-black focus:outline-lime-500"
            rows="5"
            placeholder="Your message..."
            value={contactInfo.message}
            onChange={(e) => {
              setContactInfo({...contactInfo, message: e.target.value})
            }}
            ></textarea>
        </div>
        </div>
        </div>
        {/* Submit Button */}
        <button
          type="button"
          onClick={handleContactForm}
          className="w-full sm:w-auto bg-olive text-white px-6 py-2 rounded hover:bg-olive-dark transition text-sm sm:text-base"
          >
          Send Message
        </button>
      </div>
      </motion.div>
      
    </section>
  );
}
