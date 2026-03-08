import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaStar, FaUsers, FaFire } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Events = () => {
  const events = [
    {
      id: 'new-year-celebration',
      title: 'New Year Celebration',
      date: 'Dec 31, 2025',
      location: 'Public Grounds, Vijayawada',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      description: 'Ring in the New Year with a spectacular fireworks display and live entertainment.',
      category: 'Celebration',
      attendees: '500+'
    },
    {
      id: 'sankranthi-festival',
      title: 'Sankranthi Festival',
      date: 'Jan 14, 2026',
      location: 'Godavari River Bank',
      image: 'https://i.pinimg.com/736x/ca/b9/f1/cab9f12141267677a4220eeb44af70ca.jpg',
      description: 'Celebrate the harvest festival with traditional rituals and cultural performances.',
      category: 'Cultural',
      attendees: '1000+'
    },
    {
      id: 'wedding-fireworks',
      title: 'Wedding Fireworks',
      date: 'Custom Date',
      location: 'Vijayawada',
      image: 'https://www.sparkfx.com.au/wp-content/uploads/2019/01/3.jpg',
      description: 'Make your special day even more magical with our custom wedding fireworks.',
      category: 'Wedding',
      attendees: '200+'
    },
    {
      id: 'corporate-event',
      title: 'Corporate Event',
      date: 'Flexible Dates',
      location: 'Your Venue',
      image: 'https://images.unsplash.com/photo-1542744173298-981e5f6a4d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      description: 'Professional fireworks and entertainment for corporate celebrations and product launches.',
      category: 'Corporate',
      attendees: '300+'
    }
  ];

  const getEventIcon = (category) => {
    switch(category) {
      case 'Celebration':
        return <FaFire className="text-yellow-500" />;
      case 'Cultural':
        return <FaStar className="text-purple-500" />;
      case 'Wedding':
        return <FaStar className="text-pink-500" />;
      case 'Corporate':
        return <FaUsers className="text-blue-500" />;
      default:
        return <FaCalendarAlt className="text-green-500" />;
    }
  };

  return (
    <section id="events" className="py-20 bg-gradient-to-br from-gray-50 via-white to-yellow-50/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 left-20 w-64 h-64 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-pink-400 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced Section Header */}
        <div className="text-center mb-16">
          <div className="group inline-block">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-yellow-500 group-hover:to-pink-500 group-hover:bg-clip-text transition-all duration-500">
              Upcoming Events
            </h2>
            <div className="relative">
              <div className="w-32 h-2 mx-auto rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 transform origin-left transition-all duration-700 group-hover:scale-x-150"></div>
              <div className="absolute inset-0 w-32 h-2 mx-auto rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 blur-md opacity-50"></div>
            </div>
          </div>
          <p className="mt-8 text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Join us for spectacular events that create unforgettable memories
          </p>
        </div>

        {/* Enhanced Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {events.map((event, index) => (
            <div 
              key={event.id} 
              className="group relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-700 hover:shadow-2xl hover:-translate-y-3 hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              
              {/* Image container */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Floating category icon */}
                <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg transform -translate-x-10 group-hover:translate-x-0 transition-transform duration-500">
                  {getEventIcon(event.category)}
                </div>
                
                {/* Floating date badge */}
                <div className="absolute bottom-4 right-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg transform translate-x-20 group-hover:translate-x-0 transition-transform duration-500">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-sm" />
                    <span>{event.date}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-50 to-white rounded-xl flex items-center justify-center shadow-md">
                    {getEventIcon(event.category)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-yellow-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-500">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <FaUsers className="text-xs" />
                        {event.attendees} Attendees
                      </span>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                        {event.category}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4 text-gray-600">
                  <FaMapMarkerAlt className="text-red-500" />
                  <span className="text-sm">{event.location}</span>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                  {event.description}
                </p>

                <Link 
                  to={`/events/${event.id}`}
                  className="block w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-500 transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/30 flex items-center justify-center gap-2 btn-hover-lift"
                >
                  <span>View Details</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
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
    </section>
  );
};

export default Events;
