import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams, Link } from "react-router-dom";
import {
  FaHome,
  FaBoxOpen,
  FaCog,
  FaInfoCircle,
  FaIndustry,
  FaPhoneAlt,
  FaBookOpen,
  FaCloud,
  FaDatabase,
  FaRobot,
  FaCheckCircle,
  FaTools,
  FaServer,
  FaWarehouse,
  FaUserTie,
  FaGraduationCap,
  FaLightbulb,
  FaUsers,
//   FaBriefcase,
  FaChalkboardTeacher,
  FaStar,
//   FaHandshake,
  FaChevronDown,
  FaShieldAlt,
  FaClock,
  FaUserGraduate,
  FaHorse,
  FaFire,
  FaMusic,
  FaFireAlt,
  FaPaperPlane,
  FaBolt,
  FaSnowflake,
  FaSmog,
  FaWind,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTimes
} from "react-icons/fa";
import { GiSparkles, GiFlowers, GiFireworkRocket } from "react-icons/gi";
import axios from "axios";

import Logo from './Logo.png';

const MarqueeText = () => (
  <div className="bg-yellow-500 text-white py-2 overflow-hidden w-full z-50 relative">
    <div className="whitespace-nowrap w-max">
      <div className="inline-block animate-marquee whitespace-nowrap px-4">
        <span className="mx-4 font-medium"><FaStar className="inline mr-2" />🎉 Special discount on wedding packages this month!</span>
        <span className="mx-4 font-medium"><GiFireworkRocket className="inline mr-2" />✨ Book your event now and get 10% off on all services</span>
        <span className="mx-4 font-medium"><FaFireAlt className="inline mr-2" />🔥 Limited time offer: Free decoration with every booking</span>
      </div>
    </div>
    <style jsx>{`
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-marquee {
        display: inline-block;
        animation: marquee 20s linear infinite;
      }
      @media (max-width: 768px) {
        .animate-marquee {
          animation-duration: 30s;
        }
      }
    `}</style>
  </div>
);

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-40">
      <MarqueeText />
      <NavbarContent />
    </div>
  );
};

const NavbarContent = () => {
  const [showProducts, setShowProducts] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth > 1024);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth > 1024;
      setIsDesktop(desktop);
      if (desktop) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/connect",
        contactFormData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        setSubmitStatus("success");
        setContactFormData({ name: "", email: "", message: "" });
        setTimeout(() => {
          setShowContactForm(false);
          setSubmitStatus(null);
        }, 2000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form submit error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId, closeMenu = true) => {
    const headerOffset = isDesktop ? 140 : 110;
    const performScroll = (attempt = 0) => {
      const element = document.getElementById(sectionId);
      if (element) {
        const elementTop =
          element.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top: elementTop > 0 ? elementTop : 0, behavior: "smooth" });
      } else if (attempt < 5) {
        setTimeout(() => performScroll(attempt + 1), 120);
      }
    };

    if (closeMenu) {
      setShowAbout(false);
      setShowProducts(false);
      setShowServices(false);
      setMenuOpen(false);
    }

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => performScroll(), 360);
    } else {
      performScroll();
    }
  };

  const highlightProductCard = (id) => {
    const card = document.getElementById(`product-${id}`);
    if (!card) return;
    
    // Add highlight effect
    card.classList.add("ring-4", "ring-yellow-500", "ring-opacity-70", "transition-all", "duration-1000", "shadow-lg", "z-10", "relative");
    
    // Scroll to the card with some offset from the top
    const headerOffset = 100;
    const elementPosition = card.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    
    // Remove highlight after some time
    setTimeout(() => {
      card.classList.remove("ring-4", "ring-yellow-500", "ring-opacity-70", "shadow-lg", "z-10", "relative");
    }, 3000);
  };

  const scrollToProductCard = (productId) => {
    // First navigate to the products section
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: productId } });
    } else {
      // If already on home page, just scroll to the product
      const element = document.getElementById(`product-${productId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        highlightProductCard(productId);
      } else {
        // If product card not found, just scroll to products section
        scrollToSection("products");
      }
    }
    
    // Close mobile menu if open
    setMenuOpen(false);
    setShowProducts(false);
  };

  const scrollToServiceCard = (serviceId) => {
    // Close the menu and dropdowns
    setMenuOpen(false);
    setShowServices(false);
    
    // If not on home page, navigate to home first
    if (location.pathname !== "/") {
      navigate("/", { 
        state: { scrollToService: serviceId },
        replace: true
      });
      return;
    }

    // If already on home page, scroll to the service
    const element = document.getElementById(`service-${serviceId}`);
    if (element) {
      const headerOffset = 100; // Adjust this value based on your header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Add highlight effect
      element.classList.add("ring-4", "ring-yellow-500", "ring-opacity-70", "transition-all", "duration-1000", "shadow-lg", "z-10", "relative");
      
      // Remove highlight after some time
      setTimeout(() => {
        element.classList.remove("ring-4", "ring-yellow-500", "ring-opacity-70", "shadow-lg", "z-10", "relative");
      }, 3000);
    } else {
      // If service card not found, just scroll to services section
      scrollToSection("services");
    }
  };

  // Handle scroll to product when component mounts or location state changes
  useEffect(() => {
    if (location.state?.scrollTo) {
      const productId = location.state.scrollTo;
      const scrollToElement = () => {
        const element = document.getElementById(`product-${productId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          highlightProductCard(productId);
          // Clear the state to prevent re-scrolling
          window.history.replaceState({}, document.title);
        } else if (document.readyState === 'complete') {
          // If document is already loaded but element not found, try one more time after a delay
          setTimeout(() => {
            const el = document.getElementById(`product-${productId}`);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
              highlightProductCard(productId);
              window.history.replaceState({}, document.title);
            }
          }, 500);
        }
      };

      // If products section is not loaded yet, wait for it
      if (!document.getElementById('products')) {
        const checkProductsLoaded = setInterval(() => {
          if (document.getElementById('products')) {
            clearInterval(checkProductsLoaded);
            scrollToElement();
          }
        }, 100);
      } else {
        scrollToElement();
      }
    }
  }, [location.state]);

  const handleCurrentOpeningsClick = () => {
    setMenuOpen(false);
    if (location.pathname !== "/careers") navigate("/careers");
  };

  // Handle scroll to service when component mounts or location state changes
  useEffect(() => {
    if (location.state?.scrollToService) {
      const serviceId = location.state.scrollToService;
      const scrollToElement = () => {
        const element = document.getElementById(`service-${serviceId}`);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Add highlight effect
          element.classList.add("ring-4", "ring-yellow-500", "ring-opacity-70", "transition-all", "duration-1000", "shadow-lg", "z-10", "relative");
          
          // Remove highlight after some time
          setTimeout(() => {
            element.classList.remove("ring-4", "ring-yellow-500", "ring-opacity-70", "shadow-lg", "z-10", "relative");
          }, 3000);

          // Clear the state to prevent re-scrolling
          window.history.replaceState({}, document.title);
        } else if (document.readyState === 'complete') {
          // If document is already loaded but element not found, try one more time after a delay
          setTimeout(() => {
            const el = document.getElementById(`service-${serviceId}`);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
              // Add highlight effect
              el.classList.add("ring-4", "ring-yellow-500", "ring-opacity-70", "transition-all", "duration-1000", "shadow-lg", "z-10", "relative");
              // Remove highlight after some time
              setTimeout(() => {
                el.classList.remove("ring-4", "ring-yellow-500", "ring-opacity-70", "shadow-lg", "z-10", "relative");
              }, 3000);
            }
          }, 100);
        }
      };

      // Try scrolling immediately
      scrollToElement();

      // Add event listener for when the component mounts
      window.addEventListener('load', scrollToElement);

      // Cleanup
      return () => {
        window.removeEventListener('load', scrollToElement);
      };
    }
  }, [location.state]);

  return (
    <>
      {/* Top Navbar */}
      {/* <div className="bg-slate-900 px-6 md:px-10 py-2 text-slate-300 flex justify-end gap-6 text-sm font-medium">
        <button className="flex items-center gap-2 hover:text-white" onClick={handleCurrentOpeningsClick}>
          <FaUserTie /> Current Openings
        </button>
        <button className="flex items-center gap-2 hover:text-white" onClick={() => window.open("https://byteskillstech.com/internship.html#internship")}>
          <FaUserGraduate /> Enroll Internship
        </button>
        <button className="flex items-center gap-2 hover:text-white" onClick={() => window.open("https://ulearn.pinkmoontech.com/")}>
          <FaChalkboardTeacher /> ULearn Platform
        </button>
      </div> */}
      <nav className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          {/* Logo */}
          <div className="h-12 flex items-center">
            <Link to="/">
              <img 
                src={Logo} 
                alt="AK Events & Fireworks" 
                className="w-auto hover:scale-105 transition-transform"
                style={{ height: '90px', width: 'auto' }}
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex-1 lg:flex lg:items-center lg:justify-end">
            {/* Navigation items will be here */}
          </div>
          
          {/* Mobile Menu Button - Positioned on the right */}
          <div className="lg:hidden">
            <button 
              onClick={toggleMenu}
              className="text-gray-700 hover:text-green-600 focus:outline-none"
              style={{ fontSize: '1.5rem', lineHeight: '1' }}
              aria-label="Toggle menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>

          {/* Menu */}
          <ul className={`lg:flex lg:items-center lg:gap-8 text-sm font-small transition-all pr-4 z-50
            ${menuOpen ? "flex flex-col absolute left-0 top-16 w-full bg-white shadow-lg p-6 gap-4" : "hidden lg:flex"}`}
            style={{ zIndex: 1001 }}
          >

          {/* Home */}
          <Link 
            to="/" 
            className={`flex items-center gap-2 cursor-pointer ${location.pathname === '/' ? 'text-green-600' : 'hover:text-green-600'}`}
          >
            <FaHome /> Home
          </Link>

          {/* About Us */}
          <li
            onMouseEnter={() => isDesktop && setShowAbout(true)}
            onMouseLeave={() => isDesktop && setShowAbout(false)}
            onClick={() => !isDesktop && setShowAbout(!showAbout)}
            className="relative"
          >
            <div className="flex items-center gap-2 cursor-pointer hover:text-green-600">
              <FaInfoCircle /> About Us
              <FaChevronDown className={`transition ${showAbout ? "rotate-180" : ""}`} />
            </div>

            {/* Dropdown */}
            <ul className={`absolute bg-white shadow-xl rounded-lg p-2 w-56 mt-2 transition-all z-50
              ${showAbout ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-3"}
              lg:absolute lg:left-0`}
              style={{ zIndex: 1002, maxHeight: 'calc(100vh - 80px)', overflowY: 'auto' }}
            >
              <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToSection("about-us")}>
                <FaInfoCircle /> About Us
              </li>
              <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToSection("executive-team")}>
                <FaUsers /> Leadership Team
              </li>
              {/* <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToSection("collaboration")}>
                <FaHandshake /> Collaboration
              </li> */}
              {/* <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToSection("testimonials")}>
                <FaStar /> Customer Reviews
              </li> */}
              <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToSection("faq")}>
                <FaBookOpen /> FAQs
              </li>
            </ul>
          </li>

          {/* Products */}
          <li
            onMouseEnter={() => isDesktop && setShowProducts(true)}
            onMouseLeave={() => isDesktop && setShowProducts(false)}
            onClick={() => !isDesktop && setShowProducts(!showProducts)}
            className="relative"
          >
            <div className="flex items-center gap-2 hover:text-green-600 cursor-pointer">
              <FaBoxOpen /> Products
              <FaChevronDown className={`transition ${showProducts ? "rotate-180" : ""}`} />
            </div>

            {/* Dropdown */}
            <ul className={`absolute bg-white shadow-xl p-2 w-60 rounded-lg mt-2 transition-all z-50
              ${showProducts ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-3"}`}
              style={{ zIndex: 1002, maxHeight: 'calc(100vh - 80px)', overflowY: 'auto' }}
            >
              <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToProductCard("sparkcular-machines")}>
                <FaFireAlt className="text-orange-500" /> sparkcular machines
              </li>
              <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToProductCard("fire-flame-machines")}>
                <FaFire className="text-red-500" /> fire flame machines
              </li>
              <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToProductCard("co2-jets")}>
                <FaWind className="text-blue-300" /> co2 jets & liquid jets
              </li>
              <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToProductCard("smoke-bubble-machines")}>
                <FaCloud className="text-gray-400" /> smoke bubble machines
              </li>
              <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToProductCard("co2-jumbo-paper-machines")}>
                <FaPaperPlane className="text-blue-400" /> Co2 jumbo paper machines
              </li>
              <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToProductCard("co2-jet")}>
                <FaBolt className="text-yellow-400" /> Co2 jet
              </li>
              <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToProductCard("cold-fires")}>
                <FaSnowflake className="text-blue-200" /> cold fires
              </li>
              <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToProductCard("smoke-gun")}>
                <FaSmog className="text-gray-500" /> smoke gun
              </li>
            </ul>
          </li>

          {/* Services */}
          <li
            onMouseEnter={() => isDesktop && setShowServices(true)}
            onMouseLeave={() => isDesktop && setShowServices(false)}
            onClick={() => !isDesktop && setShowServices(!showServices)}
            className="relative"
          >
            <div 
              className="flex items-center gap-2 hover:text-green-600 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                scrollToSection('services');
              }}
            >
              <FaCog /> Services
              <FaChevronDown 
                className={`transition ${showServices ? "rotate-180" : ""}`} 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowServices(!showServices);
                }}
              />
            </div>

            <ul className={`absolute bg-white shadow-xl p-2 w-64 rounded-lg mt-2 transition-all z-50
              ${showServices ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-3"}`}
              style={{ zIndex: 1002, maxHeight: 'calc(100vh - 80px)', overflowY: 'auto' }}
            >
              <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToServiceCard("cloud-effects")}>
                <FaCloud className="text-blue-400" /> Cloud Effects
              </li>
              <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToServiceCard("luxury-wedding")}>
                <GiSparkles className="text-yellow-500" /> Luxury Wedding & Event Design
              </li>
              <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToServiceCard("grand-entry")}>
                <FaHorse className="text-amber-700" /> Grand Entry Concepts
              </li>
              <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToServiceCard("venue-decoration")}>
                <GiFlowers className="text-pink-500" /> Venue Decoration
              </li>
              <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToServiceCard("fireworks")}>
                <FaFire className="text-red-500" /> High-Impact Fireworks
              </li>
              <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToServiceCard("sound-light")}>
                <FaMusic className="text-purple-500" /> Sound, Light & Visual Effects
              </li>
              {/* <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToServiceCard("data-engineering")}>
                <FaDatabase /> Data Engineering
              </li>
              <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToServiceCard("production-support")}>
                <FaTools /> Production Support
              </li>
              <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToServiceCard("software-engineering")}>
                <FaServer /> Software Engineering
              </li> */}
            </ul>
          </li>

          {/* Industries */}
          {/* <li className="flex items-center gap-2 hover:text-green-600 cursor-pointer">
            <FaIndustry /> Industries
          </li> */}

          {/* Contact */}
          <div className="relative">
            <button 
              onClick={() => setShowContactForm(!showContactForm)}
              className="flex items-center gap-2 hover:text-green-600 cursor-pointer"
            >
              <FaPhoneAlt /> Contact Us
            </button>
            
            {/* Beautiful Contact Form Dropdown */}
            {showContactForm && (
              <div className="absolute top-full right-0 mt-2 w-96 card-beautiful bg-white/95 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-2xl z-50">
                {/* Form Header */}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                      <FaEnvelope className="text-white text-xs" />
                    </div>
                    Quick Contact
                  </h3>
                  <button
                    onClick={() => setShowContactForm(false)}
                    className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
                  >
                    <FaTimes className="text-sm" />
                  </button>
                </div>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <div className="mb-4 p-3 bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/50 text-green-300 rounded-xl">
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-400" />
                      <span className="text-sm">Message sent successfully!</span>
                    </div>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-4 p-3 bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/50 text-red-300 rounded-xl">
                    <div className="flex items-center gap-2">
                      <FaTimes className="text-red-400" />
                      <span className="text-sm">Failed to send message. Please try again.</span>
                    </div>
                  </div>
                )}

                {/* Contact Form */}
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={contactFormData.name}
                      onChange={handleContactChange}
                      placeholder="Your Name"
                      className="w-full px-4 py-2 border border-white/20 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white/80 backdrop-blur-sm transition-all duration-300 text-black placeholder-gray-500"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      value={contactFormData.email}
                      onChange={handleContactChange}
                      placeholder="Your Email"
                      className="w-full px-4 py-2 border border-white/20 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white/80 backdrop-blur-sm transition-all duration-300 text-black placeholder-gray-500"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <textarea
                      name="message"
                      value={contactFormData.message}
                      onChange={handleContactChange}
                      placeholder="Your Message"
                      rows="3"
                      className="w-full px-4 py-2 border border-white/20 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white/80 backdrop-blur-sm transition-all duration-300 text-black placeholder-gray-500 resize-none"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-beautiful w-full py-2 px-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="text-sm" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Contact Info */}
                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <FaPhoneAlt className="text-yellow-400 text-xs" />
                      <span>+91 9642617098</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaEnvelope className="text-yellow-400 text-xs" />
                      <span>akeventsandfireworks@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-yellow-400 text-xs" />
                      <span>Chittinagar, Vijayawada</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Case Studies */}
          {/* <li className="flex items-center gap-2 hover:text-green-600 cursor-pointer">
            <FaBookOpen /> Case Studies
          </li> */}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
