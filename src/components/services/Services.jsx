import React from 'react';
import { FaCloud, FaHorse, FaFire, FaMusic } from 'react-icons/fa';
import { GiFlowers, GiSparkles } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      id: 'cloud-effects',
      icon: <FaCloud className="text-5xl sm:text-6xl text-blue-400 mb-6 transition-all duration-300 group-hover:scale-110" />,
      title: 'Cloud Effects',
      description: 'Magical Entrances with Dreamy Ambience.'
    },
    {
      id: 'luxury-wedding',
      icon: <GiSparkles className="text-5xl sm:text-6xl text-yellow-500 mb-6 transition-all duration-300 group-hover:scale-110" />,
      title: 'Luxury Wedding & Event Design',
      description: 'Elegant Themes | Premium Decor | Royal Touch.'
    },
    {
      id: 'grand-entry',
      icon: <FaHorse className="text-5xl sm:text-6xl text-amber-700 mb-6 transition-all duration-300 group-hover:scale-110" />,
      title: 'Grand Entry Concepts',
      description: 'Vintage Cars | Horses | LED Dhol | Dry Ice | Flower Shower.'
    },
    {
      id: 'venue-decoration',
      icon: <GiFlowers className="text-5xl sm:text-6xl text-pink-500 mb-6 transition-all duration-300 group-hover:scale-110" />,
      title: 'Venue Decoration',
      description: 'Transform any venue into a magical space with our expert decoration services.'
    },
    {
      id: 'fireworks',
      icon: <FaFire className="text-5xl sm:text-6xl text-red-500 mb-6 transition-all duration-300 group-hover:scale-110" />,
      title: 'High-Impact Fireworks',
      description: 'Sky Shots | Stage Pyro | Cold Pyro | Confetti Blasts.'
    },
    {
      id: 'sound-light',
      icon: <FaMusic className="text-5xl sm:text-6xl text-purple-500 mb-6 transition-all duration-300 group-hover:scale-110" />,
      title: 'Sound, Light & Visual Effects',
      description: 'Immersive Audio-Visual Coordination.'
    }
  ];

  return (
    <section id="services" className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="group">
            <h2 className="text-4xl font-bold text-gray-900 mb-3 group-hover:text-yellow-500 transition-colors duration-300">Our Services</h2>
            <div className="group relative">
              <div className="w-24 h-1.5 mx-auto rounded-full transform origin-left transition-all duration-500 group-hover:scale-x-125 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-size-200 group-hover:bg-pos-0 bg-pos-100"></div>
            </div>
          </div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Discover our comprehensive range of event services designed to make your occasion truly unforgettable.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => (
            <div 
              key={service.id}
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative p-8 h-full flex flex-col items-center text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mb-6 rounded-2xl bg-white shadow-md group-hover:shadow-lg transition-all duration-500">
                  {service.icon}
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                  {service.description}
                </p>
                
                <div className="mt-auto pt-4 w-full border-t border-gray-100 group-hover:border-gray-200 transition-colors duration-300">
                  <Link 
                    to={
                      service.id === 'cloud-effects' ? '/services/cloud-effects' :
                      service.id === 'luxury-wedding' ? '/services/luxury-wedding' :
                      service.id === 'grand-entry' ? '/services/grand-entry' :
                      service.id === 'venue-decoration' ? '/services/venue-decoration' :
                      service.id === 'fireworks' ? '/services/fireworks' :
                      service.id === 'sound-light' ? '/services/sound-light-visual' : '#'
                    }
                    className="inline-flex items-center text-sm font-medium text-yellow-600 hover:text-yellow-700 transition-colors duration-300"
                  >
                    Learn more
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
              
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-400 rounded-xl pointer-events-none transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx global>{`
        /* Smooth scrolling for the entire page */
        html {
          scroll-behavior: smooth;
        }
        
        /* Card hover effect */
        .group:hover .group-hover\:scale-110 {
          transform: scale(1.1);
        }
        
        /* Smooth transitions for all elements */
        * {
          transition: all 0.3s ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default Services;
