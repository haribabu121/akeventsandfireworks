import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            <p className="text-gray-300 mb-8">
              Ready to light up your next event? Contact us today to discuss your requirements and get a free quote.
            </p>
            <div className="space-y-6">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-yellow-500 text-xl mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Our Location</h4>
                  <p className="text-gray-400">Chittinagar, Onetown, Vijayawada-9</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-yellow-500 text-xl mr-4" />
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p className="text-gray-400">+91 7013355015</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-yellow-500 text-xl mr-4" />
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-gray-400">akeventsandfireworks@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {['Facebook', 'Whatsapp', 'Instagram', 'YouTube'].map((social) => (
                  <a 
                    key={social} 
                    href={`https://www.instagram.com/akeventsandfireworks?igsh=MTBwdnk4djgzMXYxcw%3D%3D${social.toLowerCase()}`}
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-yellow-500 hover:text-black transition-colors"
                    aria-label={social}
                  >
                    {social.charAt(0)}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="How can we help you?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Your Message</label>
                <textarea 
                  id="message" 
                  rows="5" 
                  className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Tell us about your event..."
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-md transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
