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
    <section id="services" className="py-20 sm:py-24 md:py-32 bg-gradient-to-br from-gray-50 via-white to-yellow-50/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-400 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 sm:mb-20">
          <div className="group inline-block">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-yellow-500 group-hover:to-pink-500 group-hover:bg-clip-text transition-all duration-500">
              Our Services
            </h2>
            <div className="relative">
              <div className="w-32 h-2 mx-auto rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 transform origin-left transition-all duration-700 group-hover:scale-x-150"></div>
              <div className="absolute inset-0 w-32 h-2 mx-auto rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 blur-md opacity-50"></div>
            </div>
          </div>
          <p className="mt-8 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive range of event services designed to make your occasion truly unforgettable.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className="group relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-700 hover:shadow-2xl hover:-translate-y-3 hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              
              {/* Card content */}
              <div className="relative p-8 h-full flex flex-col items-center text-center">
                {/* Icon container with enhanced animation */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mb-8 rounded-3xl bg-gradient-to-br from-gray-50 to-white shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500 group-hover:rotate-3 border border-gray-100">
                  <div className="transform transition-transform duration-500 group-hover:scale-125">
                    {service.icon}
                  </div>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-yellow-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-500">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>
                
                <div className="mt-auto pt-6 w-full border-t border-gray-100 group-hover:border-gray-200 transition-colors duration-500">
                  <Link 
                    to={
                      service.id === 'cloud-effects' ? '/services/cloud-effects' :
                      service.id === 'luxury-wedding' ? '/services/luxury-wedding' :
                      service.id === 'grand-entry' ? '/services/grand-entry' :
                      service.id === 'venue-decoration' ? '/services/venue-decoration' :
                      service.id === 'fireworks' ? '/services/fireworks' :
                      service.id === 'sound-light' ? '/services/sound-light-visual' : '#'
                    }
                    className="inline-flex items-center gap-2 text-base font-semibold text-yellow-600 hover:text-yellow-700 group/link transition-all duration-300"
                  >
                    <span className="relative">
                      Learn more
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-600 group-hover/link:w-full transition-all duration-300"></div>
                    </span>
                    <svg className="w-5 h-5 transform group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
              
              {/* Hover border effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-400/50 rounded-2xl pointer-events-none transition-all duration-500"></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none">
                <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12"></div>
              </div>
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
