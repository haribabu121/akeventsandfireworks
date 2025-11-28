import React from 'react';
import { FaCloud, FaCalendarAlt, FaHorse, FaMapMarkerAlt, FaFire, FaMusic, FaPhotoVideo } from 'react-icons/fa';
import { GiFlowers, GiSparkles } from 'react-icons/gi';

const Services = () => {
  const services = [
    {
      id: 'cloud-effects',
      icon: <FaCloud className="text-4xl text-blue-400 mb-4" />,
      title: 'Cloud Effects',
      description: 'Magical Entrances with Dreamy Ambience.'
    },
    {
      id: 'luxury-wedding',
      icon: <GiSparkles className="text-4xl text-yellow-500 mb-4" />,
      title: 'Luxury Wedding & Event Design',
      description: 'Elegant Themes | Premium Decor | Royal Touch.'
    },
    {
      id: 'grand-entry',
      icon: <FaHorse className="text-4xl text-amber-700 mb-4" />,
      title: 'Grand Entry Concepts',
      description: 'Vintage Cars | Horses | LED Dhol | Dry Ice | Flower Shower.'
    },
    {
      id: 'venue-decoration',
      icon: <GiFlowers className="text-4xl text-pink-500 mb-4" />,
      title: 'Venue Decoration',
      description: 'Transform any venue into a magical space with our expert decoration services.'
    },
    {
      id: 'fireworks',
      icon: <FaFire className="text-4xl text-red-500 mb-4" />,
      title: 'High-Impact Fireworks',
      description: 'Sky Shots | Stage Pyro | Cold Pyro | Confetti Blasts.'
    },
    {
      id: 'sound-light',
      icon: <FaMusic className="text-4xl text-purple-500 mb-4" />,
      title: 'Sound, Light & Visual Effects',
      description: 'Immersive Audio-Visual Coordination.'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div id={`service-${service.id}`} key={service.id} className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-center">
                {service.icon}
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
