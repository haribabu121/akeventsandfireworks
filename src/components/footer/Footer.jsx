import React, { useState } from 'react';
import { FaInstagram, FaFacebook, FaWhatsapp, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt, FaRocket, FaStar, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Open Instagram in a new tab
    window.open('https://www.instagram.com/akeventsandfireworks', '_blank');
    // Update subscription status to show 'Subscribed'
    setIsSubscribed(true);
    
    // Revert back to 'Subscribe Now' after 3 seconds
    setTimeout(() => {
      setIsSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-300 py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-400 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                <FaRocket className="text-white text-lg" />
              </div>
              <h3 className="text-white text-xl font-bold">AK Events & Fireworks</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Creating magical moments with spectacular firework displays and professional event planning services.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              <a href="https://www.facebook.com/profile.php?id=61584294129668" target="_blank" rel="noopener noreferrer"
                className="group w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all duration-300">
                <FaFacebook className="text-white text-sm group-hover:rotate-12 transition-transform duration-300" />
              </a>
              <a href="https://whatsapp.com/channel/0029VbBCCipHltYDmRN5vN3x" target="_blank" rel="noopener noreferrer"
                className="group w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-green-600 hover:scale-110 transition-all duration-300">
                <FaWhatsapp className="text-white text-sm group-hover:rotate-12 transition-transform duration-300" />
              </a>
              <a href="https://www.instagram.com/akeventsandfireworks" target="_blank" rel="noopener noreferrer"
                className="group w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-pink-600 hover:scale-110 transition-all duration-300">
                <FaInstagram className="text-white text-sm group-hover:rotate-12 transition-transform duration-300" />
              </a>
              <a href="https://www.youtube.com/channel/UCWyyejavZ6iWPAX0MFlgKzw" target="_blank" rel="noopener noreferrer"
                className="group w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-red-600 hover:scale-110 transition-all duration-300">
                <FaYoutube className="text-white text-sm group-hover:rotate-12 transition-transform duration-300" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white text-lg font-bold flex items-center gap-2">
              <FaStar className="text-yellow-500 text-sm" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Services', 'Products', 'Events', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="group flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1"
                  >
                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div className="space-y-6">
            <h4 className="text-white text-lg font-bold flex items-center gap-2">
              <FaStar className="text-yellow-500 text-sm" />
              Our Services
            </h4>
            <ul className="space-y-3">
              {['Firework Displays', 'Event Planning', 'Corporate Events', 'Venue Decoration', 'Special Effects', 'Stage Setup'].map((service) => (
                <li key={service}>
                  <a 
                    href="#services" 
                    className="group flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1"
                  >
                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <h4 className="text-white text-lg font-bold flex items-center gap-2">
              <FaHeart className="text-red-500 text-sm" />
              Get In Touch
            </h4>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-400">
                <FaPhone className="text-yellow-500" />
                <span className="text-sm">+91 9642617098</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <FaEnvelope className="text-yellow-500" />
                <span className="text-sm">akeventsandfireworks@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <FaMapMarkerAlt className="text-yellow-500" />
                <span className="text-sm">Vijayawada, India</span>
              </div>
            </div>

            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="flex items-center gap-2 text-gray-400">
                <FaInstagram className="text-pink-500 text-xl" />
                <span className="text-sm">Follow us for updates</span>
              </div>
              <button 
                type="submit" 
                className={`w-full flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-xl transition-all duration-500 transform hover:scale-105 ${
                  isSubscribed 
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30' 
                    : 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black shadow-lg shadow-yellow-500/30'
                }`}
              >
                {isSubscribed ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Following!</span>
                  </>
                ) : (
                  <>
                    <FaInstagram />
                    <span>Follow on Instagram</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Enhanced Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-gray-400 flex items-center gap-2">
                <span>&copy; {new Date().getFullYear()} AK Events & Fireworks.</span>
                <span className="text-yellow-500">All rights reserved.</span>
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Made with <FaHeart className="text-red-500 inline mx-1" /> for creating unforgettable moments
              </p>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <a href="#privacy" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#terms" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
