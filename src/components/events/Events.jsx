import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Events = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

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

  // Auto-rotate events
  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [events.length, isHovered]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
  };

  // Calculate visible events for the slider
  const getVisibleEvents = () => {
    const totalEvents = events.length;
    const prevIndex = (currentIndex - 1 + totalEvents) % totalEvents;
    const nextIndex = (currentIndex + 1) % totalEvents;
    
    return [
      { ...events[prevIndex], position: 'left' },
      { ...events[currentIndex], position: 'center' },
      { ...events[nextIndex], position: 'right' }
    ];
  };

  return (
    <section id="events" className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="group">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 group-hover:text-yellow-500 transition-colors duration-300">
              Upcoming Events
            </h2>
            <div className="group relative">
              <div className="w-24 h-1.5 mx-auto transform origin-left transition-all duration-500 group-hover:scale-x-125 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500"></div>
            </div>
          </div>
        </div>

        {/* Slider Container */}
        <div 
          className="relative h-[600px] flex items-center justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 z-10 p-3 bg-black/30 text-white rounded-full hover:bg-black/50 transition-colors duration-300 focus:outline-none"
            aria-label="Previous event"
          >
            <FaChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-4 z-10 p-3 bg-black/30 text-white rounded-full hover:bg-black/50 transition-colors duration-300 focus:outline-none"
            aria-label="Next event"
          >
            <FaChevronRight className="w-6 h-6" />
          </button>

          {/* Event Cards */}
          <div className="relative w-full h-full max-w-5xl mx-auto flex items-center justify-center">
            {getVisibleEvents().map((event, index) => (
              <div 
                key={`${event.id}-${index}`}
                className={`absolute transition-all duration-500 ease-in-out ${
                  event.position === 'left' 
                    ? '-translate-x-1/2 opacity-60 scale-90' 
                    : event.position === 'right' 
                      ? 'translate-x-1/2 opacity-60 scale-90' 
                      : 'z-10 opacity-100 scale-100'
                } w-full max-w-2xl`}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-300 hover:shadow-2xl">
                  <div className="relative h-80 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <span className="bg-yellow-500 text-black px-4 py-1.5 text-sm font-semibold rounded-full inline-block mb-2">
                        {event.date}
                      </span>
                      <h3 className="text-2xl font-bold mb-1">{event.title}</h3>
                      <div className="flex items-center text-white/90">
                        <FaMapMarkerAlt className="mr-2 text-yellow-400" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-6 line-clamp-3">{event.description}</p>
                    <Link 
                      to={`/events/${event.id}`}
                      className="inline-flex items-center justify-center w-full px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300 font-medium"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-yellow-500 w-8' : 'bg-gray-300'
              }`}
              aria-label={`Go to event ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
