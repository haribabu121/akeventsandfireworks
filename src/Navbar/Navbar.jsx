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
  FaWind,
  FaPaperPlane,
  FaBolt,
  FaSnowflake,
  FaSmog
} from "react-icons/fa";
import { GiSparkles, GiFlowers } from "react-icons/gi";

import Logo from './Logo.png';

const Navbar = () => {
  const [showProducts, setShowProducts] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth > 1024);

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
    // Close all dropdowns when toggling menu
    if (menuOpen) {
      setShowAbout(false);
      setShowProducts(false);
      setShowServices(false);
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

  return (
    <>
      {/* Top Navbar */}
      {/* <div className="bg-slate-900 px-6 md:px-10 py-2 text-slate-300 flex justify-end gap-6 text-sm font-medium">
        <button className="flex items-center gap-2 hover:text-white" onClick={handleCurrentOpeningsClick}>
          <FaBriefcase /> Current Openings
        </button>
        <button className="flex items-center gap-2 hover:text-white" onClick={() => window.open("https://byteskillstech.com/internship.html#internship")}>
          <FaUserGraduate /> Enroll Internship
        </button>
        <button className="flex items-center gap-2 hover:text-white" onClick={() => window.open("https://ulearn.pinkmoontech.com/")}>
          <FaGraduationCap /> Enroll Training
        </button>
      </div> */}

      {/* Main Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm border-b border-gray-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src={Logo} 
              alt="Logo" 
              className="h-12 w-auto hover:scale-105 transition-transform" 
              style={{ maxHeight: '60px' }}
            />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {menuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            <ul className="flex items-center space-x-8 text-sm font-medium">
              <li>
                <Link 
                  to="/" 
                  className={`flex items-center gap-2 ${location.pathname === '/' ? 'text-green-600' : 'hover:text-green-600'}`}
                >
                  <FaHome /> Home
                </Link>
              </li>

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
              <li className="p-2 hover:bg-green-100 flex items-center gap-2" onClick={() => scrollToSection("testimonials")}>
                <FaStar /> Customer Reviews
              </li>
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

              <li>
                <Link 
                  to="/contact" 
                  className="flex items-center gap-2 hover:text-green-600"
                >
                  <FaPhoneAlt /> Contact Us
                </Link>
              </li>

              {/* Case Studies - Commented out for now
              <li>
                <Link to="#" className="flex items-center gap-2 hover:text-green-600">
                  <FaBookOpen /> Case Studies
                </Link>
              </li>
              */}
            </ul>
          </div>
          
          {/* Mobile Menu */}
          {menuOpen && (
            <div className="lg:hidden absolute top-16 left-0 right-0 bg-white shadow-lg p-6 z-50">
              <ul className="space-y-4">
                <li>
                  <Link 
                    to="/" 
                    className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md"
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaHome /> Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contact" 
                    className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md"
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaPhoneAlt /> Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
