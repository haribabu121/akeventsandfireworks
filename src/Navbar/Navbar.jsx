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
  FaWind
} from "react-icons/fa";
import { GiSparkles, GiFlowers, GiFireworkRocket } from "react-icons/gi";

import Logo from './Logo.png';

const MarqueeText = () => (
  <div className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-500 text-white py-3 w-full z-50 relative shadow-lg">
    <div className="whitespace-nowrap w-max overflow-hidden">
      <div className="inline-block animate-marquee whitespace-nowrap px-4">
        <span className="mx-6 font-semibold flex items-center gap-2">
          <FaStar className="text-yellow-200 animate-pulse" /> 
          🎉 Special discount on wedding packages this month!
        </span>
        <span className="mx-6 font-semibold flex items-center gap-2">
          <GiFireworkRocket className="text-yellow-200 animate-bounce" /> 
          ✨ Book your event now and get 10% off on all services
        </span>
        <span className="mx-6 font-semibold flex items-center gap-2">
          <FaFireAlt className="text-yellow-200 animate-pulse" /> 
          🔥 Limited time offer: Free decoration with every booking
        </span>
      </div>
    </div>
    <style jsx>{`
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-marquee {
        display: inline-block;
        animation: marquee 25s linear infinite;
      }
      @media (max-width: 768px) {
        .animate-marquee {
          animation-duration: 35s;
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
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth > 1024;
      setIsDesktop(desktop);
      if (desktop) setMenuOpen(false);
    };
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 py-2 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
          : 'bg-white shadow-sm border-b border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          {/* Enhanced Logo */}
          <div className="h-12 flex items-center">
            <Link to="/" className="group">
              <img 
                src={Logo} 
                alt="AK Events & Fireworks" 
                className="w-auto hover:scale-105 transition-all duration-300 group-hover:drop-shadow-lg"
                style={{ height: '90px', width: 'auto' }}
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex-1 lg:flex lg:items-center lg:justify-end">
            {/* Navigation items will be here */}
          </div>
          
          {/* Enhanced Mobile Menu Button */}
          <div className="lg:hidden">
            <button 
              onClick={toggleMenu}
              className={`relative w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 ${
                scrolled 
                  ? 'text-gray-700 hover:text-yellow-600 hover:bg-yellow-50' 
                  : 'text-gray-700 hover:text-yellow-600 hover:bg-yellow-50'
              } focus:outline-none focus:ring-2 focus:ring-yellow-500`}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-center">
                <span className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ${
                  menuOpen ? 'top-2 rotate-45' : 'top-0'
                }`}></span>
                <span className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ${
                  menuOpen ? 'opacity-0' : 'top-2'
                }`}></span>
                <span className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ${
                  menuOpen ? 'top-2 -rotate-45' : 'top-4'
                }`}></span>
              </div>
            </button>
          </div>

          {/* Enhanced Menu */}
          <ul className={`lg:flex lg:items-center lg:gap-8 text-sm font-medium transition-all pr-4 z-50
            ${menuOpen ? "flex flex-col absolute left-0 top-16 w-full bg-white/95 backdrop-blur-md shadow-xl p-6 gap-4 border-t border-gray-100" : "hidden lg:flex"}`}
            style={{ zIndex: 1001 }}
          >

          {/* Home */}
          <Link 
            to="/" 
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
              location.pathname === '/' 
                ? 'text-yellow-600 bg-yellow-50 font-semibold' 
                : 'text-gray-700 hover:text-yellow-600 hover:bg-yellow-50'
            }`}
          >
            <FaHome className="text-lg" /> 
            <span>Home</span>
          </Link>

          {/* About Us */}
          <li
            onMouseEnter={() => isDesktop && setShowAbout(true)}
            onMouseLeave={() => isDesktop && setShowAbout(false)}
            onClick={() => !isDesktop && setShowAbout(!showAbout)}
            className="relative"
          >
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-300 ${
              location.pathname.includes('about') || showAbout
                ? 'text-yellow-600 bg-yellow-50 font-semibold' 
                : 'text-gray-700 hover:text-yellow-600 hover:bg-yellow-50'
            }`}>
              <FaInfoCircle className="text-lg" /> 
              <span>About Us</span>
              <FaChevronDown className={`transition-transform duration-300 text-sm ${showAbout ? "rotate-180" : ""}`} />
            </div>

            {/* Enhanced Dropdown */}
            <ul className={`absolute bg-white/95 backdrop-blur-md shadow-2xl rounded-xl p-3 w-64 mt-2 transition-all duration-300 z-50 border border-gray-100
              ${showAbout ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}
              style={{ zIndex: 1002, maxHeight: 'calc(100vh - 80px)', overflowY: 'auto' }}
            >
              <li className="p-3 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-yellow-100 rounded-lg flex items-center gap-3 transition-all duration-300 cursor-pointer group" onClick={() => scrollToSection("about-us")}>
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                  <FaInfoCircle className="text-yellow-600 text-sm" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">About Us</div>
                  <div className="text-xs text-gray-500">Our story & mission</div>
                </div>
              </li>
              <li className="p-3 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-yellow-100 rounded-lg flex items-center gap-3 transition-all duration-300 cursor-pointer group" onClick={() => scrollToSection("executive-team")}>
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <FaUsers className="text-purple-600 text-sm" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Leadership Team</div>
                  <div className="text-xs text-gray-500">Meet our experts</div>
                </div>
              </li>
              <li className="p-3 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-yellow-100 rounded-lg flex items-center gap-3 transition-all duration-300 cursor-pointer group" onClick={() => scrollToSection("faq")}>
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <FaBookOpen className="text-blue-600 text-sm" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">FAQs</div>
                  <div className="text-xs text-gray-500">Common questions</div>
                </div>
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
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-300 ${
              location.pathname.includes('products') || showProducts
                ? 'text-yellow-600 bg-yellow-50 font-semibold' 
                : 'text-gray-700 hover:text-yellow-600 hover:bg-yellow-50'
            }`}>
              <FaBoxOpen className="text-lg" /> 
              <span>Products</span>
              <FaChevronDown className={`transition-transform duration-300 text-sm ${showProducts ? "rotate-180" : ""}`} />
            </div>

            {/* Enhanced Products Dropdown */}
            <ul className={`absolute bg-white/95 backdrop-blur-md shadow-2xl rounded-xl p-3 w-72 mt-2 transition-all duration-300 z-50 border border-gray-100
              ${showProducts ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}
              style={{ zIndex: 1002, maxHeight: 'calc(100vh - 80px)', overflowY: 'auto' }}
            >
              <li className="p-3 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 rounded-lg flex items-center gap-3 transition-all duration-300 cursor-pointer group" onClick={() => scrollToProductCard("sparkcular-machines")}>
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                  <FaFireAlt className="text-orange-600 text-sm" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Sparkcular Machines</div>
                  <div className="text-xs text-gray-500">Indoor fireworks effects</div>
                </div>
              </li>
              <li className="p-3 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 rounded-lg flex items-center gap-3 transition-all duration-300 cursor-pointer group" onClick={() => scrollToProductCard("fire-flame-machines")}>
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                  <FaFire className="text-red-600 text-sm" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Fire Flame Machines</div>
                  <div className="text-xs text-gray-500">Realistic flame effects</div>
                </div>
              </li>
              <li className="p-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 rounded-lg flex items-center gap-3 transition-all duration-300 cursor-pointer group" onClick={() => scrollToProductCard("co2-jets")}>
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <FaWind className="text-blue-600 text-sm" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">CO2 Jets & Liquid Jets</div>
                  <div className="text-xs text-gray-500">Dramatic jet effects</div>
                </div>
              </li>
              <li className="p-3 hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 rounded-lg flex items-center gap-3 transition-all duration-300 cursor-pointer group" onClick={() => scrollToProductCard("smoke-bubble-machines")}>
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  <FaCloud className="text-gray-600 text-sm" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Smoke Bubble Machines</div>
                  <div className="text-xs text-gray-500">Atmospheric effects</div>
                </div>
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
              className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-300 ${
                location.pathname.includes('services') || showServices
                  ? 'text-yellow-600 bg-yellow-50 font-semibold' 
                  : 'text-gray-700 hover:text-yellow-600 hover:bg-yellow-50'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                scrollToSection('services');
              }}
            >
              <FaCog className="text-lg" /> 
              <span>Services</span>
              <FaChevronDown 
                className={`transition-transform duration-300 text-sm ${showServices ? "rotate-180" : ""}`} 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowServices(!showServices);
                }}
              />
            </div>

            {/* Enhanced Services Dropdown */}
            <ul className={`absolute bg-white/95 backdrop-blur-md shadow-2xl rounded-xl p-3 w-80 mt-2 transition-all duration-300 z-50 border border-gray-100
              ${showServices ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}
              style={{ zIndex: 1002, maxHeight: 'calc(100vh - 80px)', overflowY: 'auto' }}
            >
              <li className="p-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 rounded-lg flex items-center gap-3 transition-all duration-300 cursor-pointer group" onClick={() => scrollToServiceCard("cloud-effects")}>
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <FaCloud className="text-blue-600 text-sm" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Cloud Effects</div>
                  <div className="text-xs text-gray-500">Magical entrances & ambience</div>
                </div>
              </li>
              <li className="p-3 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-amber-50 rounded-lg flex items-center gap-3 transition-all duration-300 cursor-pointer group" onClick={() => scrollToServiceCard("luxury-wedding")}>
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                  <GiSparkles className="text-yellow-600 text-sm" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Luxury Wedding & Event Design</div>
                  <div className="text-xs text-gray-500">Elegant themes & premium decor</div>
                </div>
              </li>
              <li className="p-3 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 rounded-lg flex items-center gap-3 transition-all duration-300 cursor-pointer group" onClick={() => scrollToServiceCard("grand-entry")}>
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                  <FaHorse className="text-amber-700 text-sm" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Grand Entry Concepts</div>
                  <div className="text-xs text-gray-500">Vintage cars, horses & more</div>
                </div>
              </li>
              <li className="p-3 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 rounded-lg flex items-center gap-3 transition-all duration-300 cursor-pointer group" onClick={() => scrollToServiceCard("venue-decoration")}>
                <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center group-hover:bg-pink-200 transition-colors">
                  <GiFlowers className="text-pink-600 text-sm" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Venue Decoration</div>
                  <div className="text-xs text-gray-500">Transform any space</div>
                </div>
              </li>
              <li className="p-3 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 rounded-lg flex items-center gap-3 transition-all duration-300 cursor-pointer group" onClick={() => scrollToServiceCard("fireworks")}>
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                  <FaFire className="text-red-600 text-sm" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">High-Impact Fireworks</div>
                  <div className="text-xs text-gray-500">Sky shots & stage pyro</div>
                </div>
              </li>
              <li className="p-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-violet-50 rounded-lg flex items-center gap-3 transition-all duration-300 cursor-pointer group" onClick={() => scrollToServiceCard("sound-light")}>
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <FaMusic className="text-purple-600 text-sm" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Sound, Light & Visual Effects</div>
                  <div className="text-xs text-gray-500">Immersive audio-visual</div>
                </div>
              </li>
            </ul>
          </li>

          {/* Contact */}
          <Link to="/contact" className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
            location.pathname === '/contact'
              ? 'text-yellow-600 bg-yellow-50 font-semibold' 
              : 'text-gray-700 hover:text-yellow-600 hover:bg-yellow-50'
          }`}>
            <FaPhoneAlt className="text-lg" /> 
            <span>Contact Us</span>
          </Link>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
