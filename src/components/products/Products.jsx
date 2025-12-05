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

  useEffect(() => {
    localStorage.setItem("bookedEvents", JSON.stringify(events));
  }, [events]);

  const handleBookNow = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowForm(false);
    setShowCalendar(true);
  };

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

    if (window.confirm(`Confirm booking for ${selectedProduct?.name?.replace(/-/g, ' ')} on ${selectedDate.toDateString()}?`)) {
      const newEvent = {
        id: Date.now(),
        title: `Booked: ${selectedProduct?.name}`,
        start: selectedDate,
        end: selectedDate,
        allDay: true,
        product: selectedProduct?.name
      };

      setEvents([...events, newEvent]);

      if (formData.phone) {
        sendEmail(selectedDate);
      }

      showAlert(`Booking confirmed for ${selectedProduct?.name} on ${selectedDate.toDateString()}!`);
      setShowCalendar(false);
    }
  };

  const handleSelectSlot = ({ start }) => {
    processDateSelection(start);
  };

  const sendEmail = (date) => {
    if (!selectedProduct) return;
    const emailData = {
      product: selectedProduct.name,
      name: formData.name,
      phone: formData.phone,
      occasion: formData.occasion,
      booking_date: date.toLocaleDateString()
    };

    emailjs.send("service_80on2il", "template_wflm9wo", emailData, "JSypFwbJbZ8zqx-hf")
      .then(() => console.log("Email sent"))
      .catch(err => console.error("EmailJS Error:", err));
  };

  const products = [
    {
      id: 1,
      name: "sparkcular-machines",
      price: "10,000$",
      rating: 4.8,
      description: "A stunning display of colorful sparks.",
      image: "https://tse4.mm.bing.net/th/id/OIP.i95cp4GA8-t8ZDRlzmkowwHaGS?rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
      id: 2,
      name: "fire-flame-machines",
      price: "6000$",
      rating: 4.9,
      description: "Powerful and loud flame machine.",
      image: "https://image.made-in-china.com/2f0j00vzoUnSiaJTqY/DJ-Party-Show-200W-Colorful-Firing-Machine-Stage-Effect-Fire-Flame-Machine.jpg"
    },
  {
      id: 3,
      name: "co2-jets",
      price: "10000$",
      rating: 4.7,
      description: "Beautiful CO2 jet effect.",
      image: "https://tse4.mm.bing.net/th/id/OIP.H8SO6gvIrkrq3JE7XdKLlgHaHW?rs=1&pid=ImgDetMain&o=7&rm=3"
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


  // Custom dateCellWrapper to make single-tap work on mobile
  const DateCellWrapper = ({ children, value }) => {
    const handleClick = (e) => {
      e.preventDefault();
      processDateSelection(value);
    };

    return (
      <div
        onClick={handleClick}
        onTouchEnd={handleClick}
        style={{ height: "100%", cursor: "pointer", userSelect: "none" }}
      >
        {children}
      </div>
    );
  };

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl text-center font-bold mb-10">Our Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(p => (
            <div key={p.id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl">
              <img src={p.image} className="w-full h-40 object-cover rounded" />
              <h3 className="text-xl font-bold mt-3">{p.name.replace(/-/g, " ")}</h3>
              <p className="text-gray-600 text-sm mt-1">{p.description}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-yellow-600 text-xl font-bold">{p.price}</span>
                <span className="flex items-center">
                  <FaStar className="text-yellow-500" /> {p.rating}
                </span>
              </div>
              <button onClick={() => handleBookNow(p)} className="w-full mt-4 bg-yellow-500 text-white py-2 rounded-md flex items-center justify-center gap-2 hover:bg-yellow-600">
                Book Now <FaArrowRight />
              </button>
            </div>
          ))}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Enter Details</h3>
              <FaTimes className="cursor-pointer" onClick={() => setShowForm(false)} />
            </div>
            <form onSubmit={handleFormSubmit} className="mt-4 space-y-3">
              <input type="text" required placeholder="Your Name" className="w-full border px-3 py-2 rounded" onChange={e => setFormData({ ...formData, name: e.target.value })} />
              <input 
                type="tel" 
                required 
                placeholder="Your Phone Number" 
                className="w-full border px-3 py-2 rounded" 
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                pattern="[0-9]{10}"
                title="Please enter a valid 10-digit phone number"
              />
              <input type="text" required placeholder="Occasion" className="w-full border px-3 py-2 rounded" onChange={e => setFormData({ ...formData, occasion: e.target.value })} />
              <button className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">Submit</button>
            </form>
          </div>
        </div>
      )}

      {showCalendar && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-4xl p-4 rounded-lg shadow-lg">
            <div className="flex justify-between mb-2">
              <h3 className="text-xl font-bold">Select Date</h3>
              <FaTimes className="cursor-pointer" onClick={() => setShowCalendar(false)} />
            </div>
            <Calendar
              date={currentDate}
              onNavigate={date => setCurrentDate(date)}
              localizer={localizer}
              events={events}
              selectable
              startAccessor="start"
              endAccessor="end"
              onSelectSlot={handleSelectSlot}
              components={{
                toolbar: CustomToolbar,
                // Add touch tap handler for better mobile support
                dateCellWrapper: ({ children, value }) => (
                  <div 
                    className="rbc-day-bg" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectSlot({ start: value });
                    }}
                    style={{
                      height: '100%',
                      WebkitTapHighlightColor: 'transparent'
                    }}
                  >
                    {children}
                  </div>
                )
              }}
              defaultView={Views.MONTH}
              views={[Views.MONTH]}
              style={{ 
                height: 'auto',
                minHeight: '300px',
                maxHeight: '80vh',
                touchAction: 'manipulation' // Improves touch responsiveness
              }}
              // Add mobile-specific props
              selectable={true}
              longPressThreshold={100} // Slightly longer press threshold for mobile
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;
