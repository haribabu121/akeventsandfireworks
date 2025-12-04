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

/* ----------------------- FIXED CUSTOM TOOLBAR ----------------------- */
const CustomToolbar = ({ label, onNavigate }) => {
  return (
    <div className="rbc-toolbar flex items-center justify-between mb-3">

      <button className="rbc-btn" onClick={() => onNavigate("TODAY")}>
        Today
      </button>

      <div className="flex items-center gap-4">
        <button className="rbc-btn" onClick={() => onNavigate("PREV")}>
          Back
        </button>

        <span>{label}</span>

        <button className="rbc-btn" onClick={() => onNavigate("NEXT")}>
          Next
        </button>
      </div>

    </div>
  );
};

const Products = () => {
  const [showForm, setShowForm] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [currentDate, setCurrentDate] = useState(new Date()); // <<< FIX
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    occasion: ""
  });

  const [events, setEvents] = useState([]);

  /* Load saved bookings */
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

  const handleSelectSlot = (slotInfo) => {
    const start = slotInfo.start || slotInfo;
    const selectedDate = new Date(start);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(12, 0, 0, 0);

    if (selectedDate < today) {
      alert("Cannot book past dates.");
      return;
    }

    const booked = events.some(event => {
      const eventDate = new Date(event.start);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate.getTime() === selectedDate.getTime();
    });

    if (booked) {
      alert("This date is already booked!");
      return;
    }

    const newEvent = {
      id: Date.now(),
      title: `Booking for ${formData.name}`,
      start: selectedDate,
      end: new Date(selectedDate),
      allDay: true,
      product: selectedProduct.name
    };

    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem("bookedEvents", JSON.stringify(updatedEvents));

    sendEmail(selectedDate);

    alert(`Booking confirmed for ${selectedProduct.name} on ${selectedDate.toDateString()}!`);

    setShowCalendar(false);
    setShowForm(false);
  };

  const sendEmail = (date) => {
    const emailData = {
      product: selectedProduct.name,
      name: formData.name,
      email: formData.email,
      occasion: formData.occasion,
      booking_date: date.toLocaleDateString()
    };

    emailjs
      .send("service_80on2il", "template_wflm9wo", emailData, "JSypFwbJbZ8zqx-hf")
      .then(() => console.log("Email Sent"))
      .catch((err) => console.error("EmailJS Error:", err));
  };

  /* Product list */
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
    }
  ];

  return (
    <section id="products" className="py-20 bg-gray-50">

      <div className="container mx-auto px-6">
        <h1 className="text-4xl text-center font-bold mb-10">Our Products</h1>

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

      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">

            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Enter Details</h3>
              <FaTimes className="cursor-pointer" onClick={() => setShowForm(false)} />
            </div>

            <form onSubmit={handleFormSubmit} className="mt-4 space-y-3">
              <input type="text" required placeholder="Your Name"
                className="w-full border px-3 py-2 rounded"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

              <input type="email" required placeholder="Your Email"
                className="w-full border px-3 py-2 rounded"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

              <input type="text" required placeholder="Occasion"
                className="w-full border px-3 py-2 rounded"
                onChange={(e) => setFormData({ ...formData, occasion: e.target.value })} />

              <button className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">
                Submit
              </button>
            </form>

          </div>
        </div>
      )}

      {/* CALENDAR MODAL */}
      {showCalendar && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">

          <div className="bg-white w-full max-w-4xl p-4 rounded-lg shadow-lg">

            <div className="flex justify-between">
              <h3 className="text-xl font-bold">Select Date</h3>
              <FaTimes className="cursor-pointer" onClick={() => setShowCalendar(false)} />
            </div>

            <Calendar
              key={currentDate.toString()}   // <<< FORCE RE-RENDER TO FIX NAVIGATION
              date={currentDate}
              onNavigate={(newDate) => setCurrentDate(newDate)}
              localizer={localizer}
              events={events}
              selectable
              startAccessor="start"
              endAccessor="end"
              onSelectSlot={handleSelectSlot}
              components={{ toolbar: CustomToolbar }}
              defaultView="month"
              views={["month"]}
              style={{ height: 500, margin: "10px 0" }}
            />

          </div>
        </div>
      )}

    </section>
  );
};

export default Products;
