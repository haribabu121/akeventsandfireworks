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
    <section id="products" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <div className="group">
            <h1 className="text-4xl font-bold text-center mb-4 group-hover:text-yellow-500 transition-colors duration-300">Our Products</h1>
            <div className="group relative">
              <div className="w-24 h-1.5 mx-auto transform origin-left transition-all duration-500 group-hover:scale-x-125 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-size-200 group-hover:bg-pos-0 bg-pos-100"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {products.map((p) => (
            <div key={p.id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl">
              <img src={p.image} className="w-full h-40 object-cover rounded" />

              <h3 className="text-xl font-bold mt-3">
                {p.name.replace(/-/g, " ")}
              </h3>

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

      {/* FORM POPUP */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Enter Details</h3>
              <FaTimes className="cursor-pointer" onClick={() => setShowForm(false)} />
            </div>

            <form onSubmit={handleFormSubmit} className="mt-4 space-y-3">
              <input
                type="text"
                required
                placeholder="Your Name"
                className="w-full border px-3 py-2 rounded"
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="tel"
                required
                placeholder="Phone Number (10 digits)"
                className="w-full border px-3 py-2 rounded"
                pattern="[0-9]{10}"
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
              />
              <input
                type="text"
                required
                placeholder="Occasion"
                className="w-full border px-3 py-2 rounded"
                onChange={e => setFormData({ ...formData, occasion: e.target.value })}
              />

              <button className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CALENDAR POPUP */}
      {showCalendar && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-4xl p-4 rounded-lg shadow-lg">
            <div className="flex justify-between mb-2">
              <h3 className="text-xl font-bold">Select Date</h3>
              <FaTimes className="cursor-pointer" onClick={() => setShowCalendar(false)} />
            </div>

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
              style={{ minHeight: "300px", maxHeight: "80vh" }}
            />
          </div>
        </div>
      )}

    </section>
  );
};

export default Products;
