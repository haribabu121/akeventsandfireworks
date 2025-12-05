import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Events = () => {
  const events = [
    {
      id: 'new-year-celebration',
      title: 'New Year Celebration',
      date: 'Dec 31, 2025',
      location: 'Public Grounds, Vijayawada',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      description: 'Ring in the New Year with a spectacular fireworks display and live entertainment.'
    },
    {
      id: 'sankranthi-festival',
      title: 'Sankranthi Festival',
      date: 'Jan 14, 2026',
      location: 'Godavari River Bank',
      image: 'https://i.pinimg.com/736x/ca/b9/f1/cab9f12141267677a4220eeb44af70ca.jpg',
      description: 'Celebrate the harvest festival with traditional rituals and cultural performances.'
    },
    {
      id: 'wedding-fireworks',
      title: 'Wedding Fireworks',
      date: 'Custom Date',
      location: 'Vijayawada',
      image: 'https://www.sparkfx.com.au/wp-content/uploads/2019/01/3.jpg',
      description: 'Make your special day even more magical with our custom wedding fireworks.'
    }
  ];

  return (
    <section id="events" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="group">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 group-hover:text-yellow-500 transition-colors duration-300">Upcoming Events</h2>
            <div className="group relative">
              <div className="w-24 h-1.5 mx-auto transform origin-left transition-all duration-500 group-hover:scale-x-125 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-size-200 group-hover:bg-pos-0 bg-pos-100"></div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <span className="bg-yellow-500 text-black px-3 py-1 text-sm font-semibold rounded-full">
                    {event.date}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <FaMapMarkerAlt className="mr-2 text-red-500" />
                  <span>{event.location}</span>
                </div>
                <Link 
                  to={`/events/${event.id}`}
                  className="block w-full text-center bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
