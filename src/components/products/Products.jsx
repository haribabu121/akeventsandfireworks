import React, { useState, useEffect } from "react";
import { FaStar, FaArrowRight, FaTimes } from "react-icons/fa";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import emailjs from "emailjs-com";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales: { "en-US": enUS },
});

const CustomToolbar = ({ label, onNavigate }) => (
  <div className="rbc-toolbar flex items-center justify-between mb-3">
    <button className="rbc-btn" onClick={() => onNavigate("TODAY")}>Today</button>
    <div className="flex items-center gap-4">
      <button className="rbc-btn" onClick={() => onNavigate("PREV")}>Back</button>
      <span>{label}</span>
      <button className="rbc-btn" onClick={() => onNavigate("NEXT")}>Next</button>
    </div>
  </div>
);

const showAlert = (message) => alert(message);

const Products = () => {
  const [showForm, setShowForm] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [formData, setFormData] = useState({ name: "", phone: "", occasion: "" });
  const [events, setEvents] = useState([]);
  const [emailSent, setEmailSent] = useState(false); // <-- NEW: prevent duplicate email

  // Load saved bookings
  useEffect(() => {
    const savedEvents = localStorage.getItem("bookedEvents");
    if (savedEvents) {
      const parsed = JSON.parse(savedEvents).map(ev => ({
        ...ev,
        start: new Date(ev.start),
        end: new Date(ev.end)
      }));
      setEvents(parsed);
    }
  }, []);

  // Save bookings
  useEffect(() => {
    localStorage.setItem("bookedEvents", JSON.stringify(events));
  }, [events]);

  const handleBookNow = (product) => {
    setSelectedProduct(product);
    setEmailSent(false); // reset email flag for new booking
    setShowForm(true);
  };

  /** -------------------------
   * FORM SUBMIT
   * ------------------------- */
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Success alert
    alert("Form details submitted successfully!");

    // Close form popup
    setShowForm(false);

    // Open calendar
    setShowCalendar(true);
  };

  /** -------------------------
   * DATE SELECTION / BOOKING
   * ------------------------- */
  const processDateSelection = (date) => {
    const selectedDate = new Date(date);
    selectedDate.setHours(12, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      showAlert("Cannot book past dates.");
      return;
    }

    const alreadyBooked = events.some(ev => {
      const eventDate = new Date(ev.start);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate.getTime() === selectedDate.getTime();
    });

    if (alreadyBooked) {
      showAlert("This date is already booked!");
      return;
    }

    if (window.confirm(`Confirm booking for ${selectedProduct?.name.replace(/-/g, " ")} on ${selectedDate.toDateString()}?`)) {
      const newEvent = {
        id: Date.now(),
        title: `Booked: ${selectedProduct?.name}`,
        start: selectedDate,
        end: selectedDate,
        allDay: true,
      };

      setEvents(prev => [...prev, newEvent]);

      // Send email only once
      sendEmail(selectedDate);

      showAlert(`Booking confirmed for ${selectedProduct?.name} on ${selectedDate.toDateString()}!`);
      setShowCalendar(false);
    }
  };

  const handleSelectSlot = ({ start }) => {
    processDateSelection(start);
  };

  /** ---------------------------
   * EMAIL SEND (ONLY ONCE)
   * --------------------------- */
  const sendEmail = (date) => {
    if (emailSent || !selectedProduct) return; // <-- prevent duplicates

    const emailData = {
      product: selectedProduct.name,
      name: formData.name,
      phone: formData.phone,
      occasion: formData.occasion,
      booking_date: date.toLocaleDateString(),
    };

    emailjs
      .send("service_80on2il", "template_wflm9wo", emailData, "JSypFwbJbZ8zqx-hf")
      .then(() => {
        console.log("Email sent successfully");
        setEmailSent(true); // <-- mark as sent
      })
      .catch(err => console.error("EmailJS Error:", err));
  };

  /** ---------------------------
   * PRODUCTS LIST
   * --------------------------- */
  const products = [
    {
      id: 1,
      name: "sparkcular-machines",
      price: "7500",
      rating: 4.8,
      description: "A stunning display of colorful sparks.",
      image: "https://tse4.mm.bing.net/th/id/OIP.i95cp4GA8-t8ZDRlzmkowwHaGS"
    },
    {
      id: 2,
      name: "fire-flame-machines",
      price: "6000",
      rating: 4.9,
      description: "Powerful flame machine with strong visuals.",
      image: "https://image.made-in-china.com/2f0j00vzoUnSiaJTqY/DJ-Party-Show-200W-Colorful-Firing-Machine-Stage-Effect-Fire-Flame-Machine.jpg"
    },
    {
      id: 3,
      name: "co2-jets",
      price: "10000",
      rating: 4.7,
      description: "Beautiful CO2 jet effect.",
      image: "https://tse4.mm.bing.net/th/id/OIP.H8SO6gvIrkrq3JE7XdKLlgHaHW"
    },
    {
      id: 4,
      name: "smoke-bubble-machines",
      price: "5000",
      rating: 4.7,
      description: "Perfect for weddings and events.",
      image: "https://m.media-amazon.com/images/I/71XRUGq9bBL.jpg"
    },
    {
      id: 5,
      name: 'co2-jumbo-paper-machines',
      price: '12000',
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
      name: 'co2 paper gun',
      price: '10000',
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
      price: '800',
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
      name: 'Dry ice smoke machine ',
      price: '4000',
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
    {
      id: 9,
      name: 'fan-wheel Rotator',
      price: '6000',
      rating: 4.7,
      description: 'Beautiful golden sparks that fall like rain, creating a magical and romantic atmosphere.',
      image: 'https://i.ytimg.com/vi/80ZQrOqjoOE/hqdefault.jpg?sqp=-oaymwEmCOADEOgC8quKqQMa8AEB-AGoA4AC8AGKAgwIABABGGUgWChXMA8=&rs=AOn4CLBW6hrjvR1xjDCYqBHPas2_ip_KVA',
      features: [
        'Elegant golden display',
        'shots:5',
        'Creates a romantic ambiance',
        'Perfect for Entry concepts'
      ]
    },
     {
      id: 10,
      name: 'Ballon blast Entry',
      price: '6000',
      rating: 4.7,
      description: 'Beautiful golden sparks that fall like rain, creating a magical and romantic atmosphere.',
      image: 'https://storage.googleapis.com/shy-pub/337348/SKU-1710_0-1731843277374.jpg',
      features: [
        'Elegant golden display',
        'shots:5',
        'Creates a romantic ambiance',
        'Perfect for Entry concepts'
      ]
    },
     {
      id: 11,
      name: 'stage rotating machine',
      price: '4500',
      rating: 4.7,
      description: 'Beautiful golden sparks that fall like rain, creating a magical and romantic atmosphere.',
      image: 'https://tse3.mm.bing.net/th/id/OIP.2rj5NKIT5nt6NLcEI0SXcQHaHa?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3',
      features: [
        'Elegant golden display',
        'shots:5',
        'Creates a romantic ambiance',
        'Perfect for Entry concepts'
      ]
    },
     {
      id: 12,
      name: '360 degree silfy booth',
      price: '12000',
      rating: 4.7,
      description: 'Beautiful golden sparks that fall like rain, creating a magical and romantic atmosphere.',
      image: 'https://image.made-in-china.com/2f0j00EqfVLzvtuMGh/Magic-RGB-Lights-Mirror-Glass-Camera-Props-Selfie-Photo-Booth-360.jpg',
      features: [
        'Elegant golden display',
        'shots:5',
        'Creates a romantic ambiance',
        'Perfect for Entry concepts'
      ]
    },
     {
      id: 13,
      name: 'stadium short',
      price: '6000',
      rating: 4.7,
      description: 'Beautiful golden sparks that fall like rain, creating a magical and romantic atmosphere.',
      image: 'https://static.vecteezy.com/system/resources/previews/027/297/290/non_2x/football-soccer-field-stadium-at-night-and-fireworks-ai-generate-photo.jpg',
      features: [
        'Elegant golden display',
        'shots:5',
        'Creates a romantic ambiance',
        'Perfect for Entry concepts'
      ]
    },
     {
      id: 14,
      name: 'Pot smoke Entry',
      price: '5000',
      rating: 4.7,
      description: 'Beautiful golden sparks that fall like rain, creating a magical and romantic atmosphere.',
      image: 'https://i.ytimg.com/vi/gTnvo1PGKxI/hqdefault.jpg',
      features: [
        'Elegant golden display',
        'shots:5',
        'Creates a romantic ambiance',
        'Perfect for Entry concepts'
      ]
    },
     {
      id: 15,
      name: 'paper-blower',
      price: '5000/10000',
      rating: 4.7,
      description: 'Beautiful golden sparks that fall like rain, creating a magical and romantic atmosphere.',
      image: 'https://image.made-in-china.com/2f0j00iDrUgMntseoa/Easy-Hand-Control-Party-Strong-CO2-Confetti-Machine-Weding-Paper-Blaster-Blower-with-Flight-Case.jpg',
      features: [
        'Elegant golden display',
        'shots:5',
        'Creates a romantic ambiance',
        'Perfect for Entry concepts'
      ]
    },
     {
      id: 16,
      name: 'Heart-shape rotating',
      price: '2500',
      rating: 4.7,
      description: 'Beautiful golden sparks that fall like rain, creating a magical and romantic atmosphere.',
      image: 'https://img.freepik.com/premium-photo/heart-shaped-fireworks-with-heart-shape-made-fireworks_147933-4235.jpg?w=2000',
      features: [
        'Elegant golden display',
        'shots:5',
        'Creates a romantic ambiance',
        'Perfect for Entry concepts'
      ]
    },
     {
      id: 17,
      name: 'Dancing machine',
      price: '1500',
      rating: 4.7,
      description: 'Beautiful golden sparks that fall like rain, creating a magical and romantic atmosphere.',
      image: 'https://i.ytimg.com/vi/80ZQrOqjoOE/hqdefault.jpg?sqp=-oaymwEmCOADEOgC8quKqQMa8AEB-AGoA4AC8AGKAgwIABABGGUgWChXMA8=&rs=AOn4CLBW6hrjvR1xjDCYqBHPas2_ip_KVA',
      features: [
        'Elegant golden display',
        'shots:5',
        'Creates a romantic ambiance',
        'Perfect for Entry concepts'
      ]
    },
     {
      id: 18,
      name: 'Entry ',
      price: 'start from 10000',
      rating: 4.7,
      description: 'Beautiful golden sparks that fall like rain, creating a magical and romantic atmosphere.',
      image: 'https://cdn0.weddingwire.in/article/2376/original/1280/jpg/76732-couple-entry-ideas-dream-diaries-fireworks.jpeg',
      features: [
        'Elegant golden display',
        'shots:5',
        'Creates a romantic ambiance',
        'Perfect for Entry concepts'
      ]
    },
     {
      id: 19,
      name: 'Birthday car Entry',
      price: '4500',
      rating: 4.7,
      description: 'Beautiful golden sparks that fall like rain, creating a magical and romantic atmosphere.',
      image: 'https://i.ytimg.com/vi/5KBa9YkROuw/maxresdefault.jpg',
      features: [
        'Elegant golden display',
        'shots:5',
        'Creates a romantic ambiance',
        'Perfect for Entry concepts'
      ]
    },
     {
      id: 20,
      name: 'food stall popkon stall',
      price: '5000',
      rating: 4.7,
      description: 'Beautiful golden sparks that fall like rain, creating a magical and romantic atmosphere.',
      image: 'https://img.freepik.com/premium-photo/popcorn-stand-commercial-stall-preparing-selling-popcorn-snack_1061358-255768.jpg?w=2000',
      features: [
        'Elegant golden display',
        'shots:5',
        'Creates a romantic ambiance',
        'Perfect for Entry concepts'
      ]
    },
     {
      id: 21,
      name: 'chocolate fountain',
      price: '5000',
      rating: 4.7,
      description: 'Beautiful golden sparks that fall like rain, creating a magical and romantic atmosphere.',
      image: 'https://img.freepik.com/premium-photo/chocolate-fountain-with-chocolate-sauce-dripping-down-center_922940-1036.jpg',
      features: [
        'Elegant golden display',
        'shots:5',
        'Creates a romantic ambiance',
        'Perfect for Entry concepts'
      ]
    },
     {
      id: 22,
      name: 'sugar candy',
      price: '5000',
      rating: 4.7,
      description: 'Beautiful golden sparks that fall like rain, creating a magical and romantic atmosphere.',
      image: 'https://img.freepik.com/premium-photo/watercolor-illustration-fireworks-playful-bursts-candy-cane-red-mint-green_759095-172229.jpg',
      features: [
        'Elegant golden display',
        'shots:5',
        'Creates a romantic ambiance',
        'Perfect for Entry concepts'
      ]
    },
     {
      id: 23,
      name: '288 skyshot',
      price: '2500',
      rating: 4.7,
      description: 'Beautiful golden sparks that fall like rain, creating a magical and romantic atmosphere.',
      image: 'https://i.ytimg.com/vi/ovRMf-L4E_w/hqdefault.jpg?sqp=-oaymwEoCOADEOgC8quKqQMcGADwAQH4AbYIgAKAD4oCDAgAEAEYVCBlKEwwDw==&rs=AOn4CLCMYndEr7TXJZGEgBHbHOIJu-YhQw',
      features: [
        'Elegant golden display',
        'shots:5',
        'Creates a romantic ambiance',
        'Perfect for Entry concepts'
      ]
    },
    {
      id: 24,
      name: 'vintage cars',
      price: '15000',
      rating: 4.7,
      description: 'Beautiful golden sparks that fall like rain, creating a magical and romantic atmosphere.',
      image: 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAzL3JtNjM0LWEtZWxlbWVudHNncm91cC10b24tMTktMDAxYy5qcGc.jpg',
      features: [
        'Elegant golden display',
        'shots:5',
        'Creates a romantic ambiance',
        'Perfect for Entry concepts'
      ]
    },
    {
      id: 25,
      name: 'fireworks',
      price: '15000',
      rating: 4.7,
      description: 'Beautiful golden sparks that fall like rain, creating a magical and romantic atmosphere.',
      image: 'https://cdn.pixabay.com/photo/2022/11/11/22/32/fireworks-7585928_1280.jpg',
      features: [
        'Elegant golden display',
        'shots:5',
        'Creates a romantic ambiance',
        'Perfect for Entry concepts'
      ]
    },
  ];

  return (
    <section id="products" className="py-20 bg-gradient-to-br from-gray-50 via-white to-yellow-50/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 left-20 w-64 h-64 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-pink-400 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="group inline-block">
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-yellow-500 group-hover:to-pink-500 group-hover:bg-clip-text transition-all duration-500">
              Our Products
            </h1>
            <div className="relative">
              <div className="w-32 h-2 mx-auto rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 transform origin-left transition-all duration-700 group-hover:scale-x-150"></div>
              <div className="absolute inset-0 w-32 h-2 mx-auto rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 blur-md opacity-50"></div>
            </div>
          </div>
          <p className="mt-8 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our premium range of event products designed to create unforgettable moments
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((p, index) => (
            <div 
              key={p.id} 
              className="group relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-700 hover:shadow-2xl hover:-translate-y-3 hover:scale-105"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              
              {/* Image container */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={p.image} 
                  alt={p.name.replace(/-/g, " ")}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Floating price badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg transform translate-x-20 group-hover:translate-x-0 transition-transform duration-500">
                  ₹{p.price}
                </div>
              </div>

              {/* Content */}
              <div className="relative p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-yellow-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-500 line-clamp-2">
                  {p.name.replace(/-/g, " ")}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                  {p.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={`text-sm ${i < Math.floor(p.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{p.rating}</span>
                </div>

                {/* Features */}
                {p.features && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {p.features.slice(0, 2).map((feature, idx) => (
                        <span 
                          key={idx}
                          className="inline-block bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                      {p.features.length > 2 && (
                        <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                          +{p.features.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Book Now Button */}
                <button
                  onClick={() => handleBookNow(p)}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-500 transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/30 flex items-center justify-center gap-2 btn-hover-lift"
                >
                  <span>Book Now</span>
                  <FaArrowRight className="transform group-hover:translate-x-1 transition-transform duration-300" />
                </button>
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

      {/* Enhanced FORM POPUP */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl transform animate-scale-up border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Enter Details</h3>
              <button 
                onClick={() => setShowForm(false)}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <FaTimes className="text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit phone number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
                  pattern="[0-9]{10}"
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Occasion</label>
                <input
                  type="text"
                  required
                  placeholder="Wedding, Birthday, Corporate Event..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
                  onChange={e => setFormData({ ...formData, occasion: e.target.value })}
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-500 transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/30 btn-hover-lift"
              >
                Submit Details
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Enhanced CALENDAR POPUP */}
      {showCalendar && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-5xl p-6 rounded-2xl shadow-2xl transform animate-scale-up border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Select Booking Date</h3>
              <button 
                onClick={() => setShowCalendar(false)}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <FaTimes className="text-gray-600" />
              </button>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <Calendar
                date={currentDate}
                onNavigate={(date) => setCurrentDate(date)}
                localizer={localizer}
                events={events}
                selectable
                startAccessor="start"
                endAccessor="end"
                onSelectSlot={handleSelectSlot}
                components={{ toolbar: CustomToolbar }}
                defaultView={Views.MONTH}
                views={[Views.MONTH]}
                style={{ minHeight: "400px", maxHeight: "70vh" }}
                className="rounded-lg"
              />
            </div>
            
            <div className="mt-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Click on any available date to book your {selectedProduct?.name?.replace(/-/g, " ")}.
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default Products;
