import React, { useState, useEffect } from "react";
import {
  FaStar,
  FaArrowRight,
  FaTimes
} from "react-icons/fa";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import emailjs from "emailjs-com";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Setup calendar localizer
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales: { "en-US": enUS }
});

// Custom calendar toolbar
const CustomToolbar = ({ onNavigate, label }) => (
  <div className="rbc-toolbar">
    <span className="rbc-btn-group">
      <button onClick={() => onNavigate("TODAY")}>Today</button>
      <button onClick={() => onNavigate("PREV")}>Back</button>
      <button onClick={() => onNavigate("NEXT")}>Next</button>
    </span>
    <span className="rbc-toolbar-label">{label}</span>
  </div>
);

const Products = () => {
  const [showForm, setShowForm] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    occasion: ""
  });

  const [events, setEvents] = useState([]);

  // Load saved bookings
  useEffect(() => {
    const saved = localStorage.getItem("bookedEvents");
    if (saved) {
      setEvents(
        JSON.parse(saved).map((ev) => ({
          ...ev,
          start: new Date(ev.start),
          end: new Date(ev.end)
        }))
      );
    }
  }, []);

  // Save booking changes
  useEffect(() => {
    localStorage.setItem("bookedEvents", JSON.stringify(events));
  }, [events]);

  // When clicking Book Now → open form
  const handleBookNow = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  // Submit booking form → open calendar
  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
    setShowForm(false);
    setShowCalendar(true);
  };

  // When user selects date on calendar
  const handleSelectSlot = ({ start }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      alert("Cannot book past dates.");
      return;
    }

    const newEvent = {
      title: `Booking for ${formData.name}`,
      start,
      end: start,
      allDay: true
    };

    setEvents([...events, newEvent]);
    sendEmail(start);

    alert("Booking confirmed & email sent!");
    setShowCalendar(false);
  };

  // Sends email using EmailJS
  const sendEmail = (date) => {
    const emailData = {
      product: selectedProduct.name,
      name: formData.name,
      email: formData.email,
      occasion: formData.occasion,
      booking_date: date.toLocaleDateString()
    };

    emailjs
      .send(
        "service_80on2il",     // YOUR SERVICE ID
        "template_wflm9wo",    // YOUR TEMPLATE ID
        emailData,
        "JSypFwbJbZ8zqx-hf"    // YOUR PUBLIC KEY
      )
      .then(() => console.log("Email Sent"))
      .catch((err) => console.error("EmailJS Error:", err));
  };

  // Product list
  const products = [
    {
      id: 1,
      name: 'sparkcular-machines',
      price: '10,000$',
      rating: 4.8,
      description: 'A stunning display of colorful sparks.',
      image: 'https://tse4.mm.bing.net/th/id/OIP.i95cp4GA8-t8ZDRlzmkowwHaGS?rs=1&pid=ImgDetMain&o=7&rm=3',
      features: ['Duration: 5 minutes', 'Up to 3m height']
    },
    {
      id: 2,
      name: 'fire-flame-machines',
      price: '6000$',
      rating: 4.9,
      description: 'Powerful and loud flame machine.',
      image: 'https://image.made-in-china.com/2f0j00vzoUnSiaJTqY/DJ-Party-Show-200W-Colorful-Firing-Machine-Stage-Effect-Fire-Flame-Machine.jpg',
      features: ['Loud', 'Up to 5m height']
    },
    {
      id: 3,
      name: 'co2-jets',
      price: '10000$',
      rating: 4.7,
      description: 'Beautiful CO2 jet effect.',
      image: 'https://tse4.mm.bing.net/th/id/OIP.H8SO6gvIrkrq3JE7XdKLlgHaHW?rs=1&pid=ImgDetMain&o=7&rm=3',
      features: ['Elegant display']
    }
  ];

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl text-center font-bold mb-10">Our Products</h1>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p) => (
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

              <button
                onClick={() => handleBookNow(p)}
                className="w-full mt-4 bg-yellow-500 text-white py-2 rounded-md flex items-center justify-center gap-2 hover:bg-yellow-600"
              >
                Book Now <FaArrowRight />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ------- FORM MODAL ------- */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Enter Details</h3>
              <FaTimes className="cursor-pointer" onClick={() => setShowForm(false)} />
            </div>

            <form onSubmit={handleFormSubmit} className="mt-4 space-y-3">
              <input
                required
                type="text"
                placeholder="Your Name"
                className="w-full border px-3 py-2 rounded"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                required
                type="email"
                placeholder="Your Email"
                className="w-full border px-3 py-2 rounded"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <input
                required
                type="text"
                placeholder="Occasion"
                className="w-full border px-3 py-2 rounded"
                onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
              />

              <button className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ------- CALENDAR MODAL ------- */}
      {showCalendar && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-4xl p-4 rounded-lg shadow-lg">
            <div className="flex justify-between">
              <h3 className="text-xl font-bold">Select Date</h3>
              <FaTimes className="cursor-pointer" onClick={() => setShowCalendar(false)} />
            </div>

            <Calendar
              localizer={localizer}
              events={events}
              selectable
              startAccessor="start"
              endAccessor="end"
              onSelectSlot={handleSelectSlot}
              components={{ toolbar: CustomToolbar }}
              style={{ height: 500 }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;
