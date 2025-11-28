import React, { useState, useEffect } from 'react';
import { FaFire, FaStar, FaShoppingCart, FaArrowRight, FaTimes } from 'react-icons/fa';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Setup the localizer by providing the required date-fns functions
const locales = {
  'en-US': enUS
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales: { 'en-US': enUS },
});

// Custom toolbar component to simplify the header
const CustomToolbar = ({ onNavigate, label }) => (
  <div className="rbc-toolbar">
    <span className="rbc-btn-group">
      <button type="button" onClick={() => onNavigate('TODAY')} className="rbc-btn">Today</button>
      <button type="button" onClick={() => onNavigate('PREV')} className="rbc-btn">Back</button>
      <button type="button" onClick={() => onNavigate('NEXT')} className="rbc-btn">Next</button>
    </span>
    <span className="rbc-toolbar-label">{label}</span>
  </div>
);

const Products = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(() => {
    // Load events from localStorage on initial render
    const savedEvents = typeof window !== 'undefined' ? localStorage.getItem('bookedEvents') : null;
    if (savedEvents) {
      // Parse the saved events and convert date strings back to Date objects
      return JSON.parse(savedEvents).map(event => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end)
      }));
    }
    // Default events if none are saved
    return [
      {
        title: 'Booked',
        start: new Date(2025, 11, 25),
        end: new Date(2025, 11, 25),
        allDay: true
      },
      {
        title: 'Booked',
        start: new Date(2025, 11, 30),
        end: new Date(2025, 11, 30),
        allDay: true
      }
    ];
  });

  // Save events to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('bookedEvents', JSON.stringify(events));
    }
  }, [events]);

  const handleNavigate = (newDate) => {
    setCurrentDate(newDate);
  };

  const handleSelectSlot = ({ start }) => {
    // Check if the selected date is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (start < today) {
      alert('Cannot book a date in the past.');
      return;
    }

    // Check if the selected date is already booked
    const isBooked = events.some(event => 
      event.start.getDate() === start.getDate() &&
      event.start.getMonth() === start.getMonth() &&
      event.start.getFullYear() === start.getFullYear()
    );

    if (!isBooked) {
      const newEvent = {
        title: 'Booked',
        start,
        end: start,
        allDay: true
      };
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('bookedEvents', JSON.stringify(updatedEvents));
      }
      
      alert(`Booking confirmed for ${selectedProduct.name} on ${start.toLocaleDateString()}`);
      setShowCalendar(false);
    } else {
      alert('This date is already booked. Please select another date.');
    }
  };

  // Clear all bookings (for testing purposes)
  const clearAllBookings = () => {
    if (window.confirm('Are you sure you want to clear all bookings? This cannot be undone.')) {
      setEvents([]);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('bookedEvents');
      }
    }
  };

  const handleBookNow = (product, e) => {
    e.stopPropagation();
    setSelectedProduct(product);
    setShowCalendar(true);
  };

  const products = [
    {
      id: 1,
      name: 'sparkcular-machines',
      price: '10,000$',
      rating: 4.8,
      description: 'A stunning display of colorful sparks that light up the night sky with vibrant colors and patterns.',
      image: 'https://tse4.mm.bing.net/th/id/OIP.i95cp4GA8-t8ZDRlzmkowwHaGS?rs=1&pid=ImgDetMain&o=7&rm=3',
      features: [
        'Duration: 5 minutes',
        'Up to 3m height',
        'sparkle effect',
        'Perfect for weddings'
      ]
    },
    {
      id: 2,
      name: 'fire-flame-machines',
      price: '6000$',
      rating: 4.9,
      description: 'Powerful and loud, this firework creates a thunderous display that will leave your audience in awe.',
      image: 'https://image.made-in-china.com/2f0j00vzoUnSiaJTqY/DJ-Party-Show-200W-Colorful-Firing-Machine-Stage-Effect-Fire-Flame-Machine.jpg',
      features: [
        'Loud and powerful',
        'shots: 10',
        'Up to 5m height',
        'Ideal for large events'
      ]
    },
    {
      id: 3,
      name: 'co2-jets',
      price: '10000$',
      rating: 4.7,
      description: 'Beautiful golden sparks that fall like rain, creating a magical and romantic atmosphere.',
      image: 'https://tse4.mm.bing.net/th/id/OIP.H8SO6gvIrkrq3JE7XdKLlgHaHW?rs=1&pid=ImgDetMain&o=7&rm=3',
      features: [
        'Elegant golden display',
        'shots:10 ',
        'Creates a romantic ambiance',
        'Perfect for weddings'
      ]
    },
    {
      id: 4,
      name: 'smoke-bubble-machines',
      price: '4000$',
      rating: 4.7,
      description: 'Beautiful golden sparks that fall like rain, creating a magical and romantic atmosphere.',
      image: 'https://m.media-amazon.com/images/I/71XRUGq9bBL._AC_SL1500_.jpg',
      features: [
        'Elegant golden display',
        'Duration: 5 minutes',
        'Creates a romantic ambiance',
        'Perfect for weddings'
      ]
    },
    {
      id: 5,
      name: 'co2-jumbo-paper-machines',
      price: '12000$',
      rating: 4.7,
      description: 'Beautiful golden sparks that fall like rain, creating a magical and romantic atmosphere.',
      image: 'https://5.imimg.com/data5/SELLER/Default/2022/10/KO/CL/NP/102604979/1663308629h06942b37ce214c7fb7de4af487c07ef5e-1000x1000.jpg',
      features: [
        'Elegant golden display',
        'shots: 10',
        'Creates a romantic ambiance',
        'Perfect for Entry concepts'
      ]
    },
    {
      id: 6,
      name: 'co2-jet',
      price: '8000$',
      rating: 4.7,
      description: 'Beautiful golden sparks that fall like rain, creating a magical and romantic atmosphere.',
      image: 'https://tse3.mm.bing.net/th/id/OIP.4lLFDzNx3k0jSkkIeeQlDwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
      features: [
        'Elegant golden display',
        'shots:6 to 8 ',
        'Creates a romantic ambiance',
        'Perfect for stage programs'
      ]
    },
    {
      id: 7,
      name: 'cold-fires',
      price: '800$',
      rating: 4.7,
      description: 'Beautiful golden sparks that fall like rain, creating a magical and romantic atmosphere.',
      image: 'https://i.ytimg.com/vi/sykuhysgetY/maxresdefault.jpg',
      features: [
        'Elegant golden display',
        'Duration: 30seconds',
        'Creates a romantic ambiance',
        'Perfect for weddings'
      ]
    },
    {
      id: 8,
      name: 'smoke-gun',
      price: '6000$',
      rating: 4.7,
      description: 'Beautiful golden sparks that fall like rain, creating a magical and romantic atmosphere.',
      image: 'https://tse1.mm.bing.net/th/id/OIP.Loh9p4wds6L7ifFmwQu2uwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
      features: [
        'Elegant golden display',
        'shots:5',
        'Creates a romantic ambiance',
        'Perfect for Entry concepts'
      ]
    },
  ];

  const handleCardHover = (id, isHovering) => {
    setHoveredCard(isHovering ? id : null);
  };

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Explore our premium collection of fireworks and event products designed to make your celebrations unforgettable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            // Create a URL-friendly ID for each product
            const productId = product.name.toLowerCase().replace(/\s+/g, '-');
            return (
              <div 
                key={product.id}
                id={`product-${productId}`}
                className={`flip-card h-96 cursor-pointer transition-all duration-300 ${
                  hoveredCard === product.id ? 'flipped' : ''
                }`}
                onMouseEnter={() => handleCardHover(product.id, true)}
                onMouseLeave={() => handleCardHover(product.id, false)}
              >
                <div className="flip-card-inner">
                  {/* Front of the card */}
                  <div className="flip-card-front">
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg h-full flex flex-col">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-0 right-0 bg-yellow-500 text-black px-3 py-1 text-sm font-bold">
                          {product.price}
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                        <div className="flex items-center mb-3">
                          {[...Array(5)].map((_, i) => (
                            <FaStar 
                              key={i} 
                              className={`${i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'} text-sm`} 
                            />
                          ))}
                          <span className="text-sm text-gray-500 ml-2">({product.rating})</span>
                        </div>
                        <p className="text-gray-600 mb-4 flex-1">{product.description}</p>
                        <div className="flex justify-center items-center pt-2">
                          <span className="text-sm text-blue-500">Click for details</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Back of the card */}
                  <div 
                    className="flip-card-back bg-gray-900 text-white rounded-lg overflow-hidden shadow-lg h-full p-6"
                  >
                    <div className="h-full flex flex-col">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold">Product Details</h3>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setFlippedCard(null);
                          }}
                          className="text-gray-400 hover:text-white p-2 -mr-2"
                        >
                          ✕
                        </button>
                      </div>
                      <h4 className="text-yellow-500 text-lg font-semibold mb-3">{product.name}</h4>
                      <ul className="space-y-2 mb-6">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <FaFire className="text-yellow-500 mt-1 mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto">
                        <button
                          type="button"
                          className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded flex items-center justify-center transition-colors duration-200"
                          onClick={(e) => handleBookNow(product, e)}
                        >
                          Book Now <FaArrowRight className="ml-2" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Calendar Modal */}
      {showCalendar && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-bold text-gray-900">
                Book {selectedProduct.name}
              </h3>
              <button 
                onClick={() => setShowCalendar(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-auto">
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">Selected Package:</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-bold">{selectedProduct.name}</h5>
                      <p className="text-gray-600">{selectedProduct.price}</p>
                    </div>
                    <div className="flex items-center">
                      <FaStar className="text-yellow-500 mr-1" />
                      <span>{selectedProduct.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-[500px] mb-6">
                <div className="h-full w-full">
                  <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    defaultView="month"
                    date={currentDate}
                    onNavigate={handleNavigate}
                    selectable={true}
                    onSelectSlot={handleSelectSlot}
                    onSelectEvent={() => {}}
                    components={{
                      toolbar: CustomToolbar
                    }}
                    style={{ height: '100%', minHeight: '500px' }}
                    eventPropGetter={() => ({
                      style: {
                        backgroundColor: '#F59E0B',
                        borderRadius: '4px',
                        color: 'white',
                        border: 'none',
                      },
                    })}
                    dayPropGetter={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      
                      // Style for past dates
                      if (date < today) {
                        return {
                          className: 'rbc-off-range-bg',
                          style: {
                            backgroundColor: '#f8f9fa',
                            color: '#6c757d',
                            cursor: 'not-allowed',
                          },
                        };
                      }
                      return {};
                    }}
                    selectableStartAccessor={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return date >= today;
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={clearAllBookings}
                  className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
                  title="Clear all bookings"
                >
                  Clear All Bookings
                </button>
                <div className="space-x-4">
                  <button
                    onClick={() => setShowCalendar(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      alert(`Booking confirmed for ${selectedProduct.name}!`);
                      setShowCalendar(false);
                    }}
                    className="px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-400"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;