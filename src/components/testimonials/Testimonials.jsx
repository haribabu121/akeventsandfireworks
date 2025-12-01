import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Detect Android device
const isAndroid = () => {
  if (typeof window === 'undefined') return false;
  return /android/i.test(navigator.userAgent);
};

const Testimonials = () => {
  const testimonials = [
    {
      quote: "The firework display was absolutely breathtaking! AK Events made our wedding day truly magical.",
      author: "Sarah & Michael",
      role: "Wedding Couple"
    },
    {
      quote: "Professional service from start to finish the team work's above the dreams. ",
      author: "James Wilson",
      role: "CEO, TechCorp"
    },
    {
      quote: "The best New Year's Eve show we've ever had! The synchronization with music was perfect.",
      author: "City Events Committee",
      role: "Event Organizers"
    },
    {
      quote: "Incredible fireworks display that left everyone in awe. Professional team from start to finish!",
      author: "John Smith",
      role: "Wedding Planner"
    },
    {
      quote: "The highlight of our corporate event. The team's attention to detail was impressive.",
      author: "Sarah Johnson",
      role: "Marketing Director"
    },
    {
      quote: "Our guests couldn't stop talking about the amazing fireworks. Truly a night to remember!",
      author: "Michael Brown",
      role: "Event Coordinator"
    },
    {
      quote: "Exceptional service and stunning visual effects. Will definitely book again!",
      author: "Emily Davis",
      role: "Wedding Client"
    }
  ];

  // Enhanced arrow components for better touch targets
  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} !right-0 !mr-1 sm:!mr-2 md:!mr-3 lg:!mr-4 z-10`}
        style={{ 
          ...style, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.7)', 
          borderRadius: '50%', 
          width: '36px', 
          height: '36px',
          '@media (min-width: 640px)': {
            width: '40px',
            height: '40px'
          },
          '@media (min-width: 1024px)': {
            width: '44px',
            height: '44px'
          },
          WebkitTapHighlightColor: 'transparent',
          transform: 'translateZ(0)',
          willChange: 'transform',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1) translateZ(0)',
            background: 'rgba(0,0,0,0.9)'
          }
        }}
        onClick={onClick}
        aria-label="Next testimonial"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="absolute" style={{
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
          msTransform: 'translateZ(0)'
        }}>
          <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} !left-0 !ml-1 sm:!ml-2 md:!ml-3 lg:!ml-4 z-10`}
        style={{ 
          ...style, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.7)', 
          borderRadius: '50%', 
          width: '36px', 
          height: '36px',
          '@media (min-width: 640px)': {
            width: '40px',
            height: '40px'
          },
          '@media (min-width: 1024px)': {
            width: '44px',
            height: '44px'
          },
          WebkitTapHighlightColor: 'transparent',
          transform: 'translateZ(0)',
          willChange: 'transform',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1) translateZ(0)',
            background: 'rgba(0,0,0,0.9)'
          }
        }}
        onClick={onClick}
        aria-label="Previous testimonial"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="absolute" style={{
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
          msTransform: 'translateZ(0)'
        }}>
          <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    );
  };
  
  // State for tracking window size
  const [windowWidth, setWindowWidth] = useState(0);
  
  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth);
    
    // Handle resize with debounce
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Enhanced settings for optimal responsiveness
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1536, // 2xl screens
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: '0',
          dots: true
        }
      },
      {
        breakpoint: 1280, // xl screens
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: '0',
          dots: true
        }
      },
      {
        breakpoint: 1024, // lg screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: '20px',
          dots: true
        }
      },
      {
        breakpoint: 768, // md screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '15%',
          dots: true
        }
      },
      {
        breakpoint: 640, // sm screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '10%',
          dots: true
        }
      },
      {
        breakpoint: 480, // xs screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '5%',
          dots: true
        }
      }
    ]
  };

  return (
    <section className="testimonial-slider py-10 sm:py-14 md:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-gray-900 px-2">
          What Our Clients Say
        </h2>
        <div className="testimonial-slider-container relative">
          <Slider {...settings} className="px-0 sm:px-1 md:px-2">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="px-1.5 sm:px-2.5 py-2 sm:py-3 md:py-4">
                <div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-md h-full transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col mx-1 sm:mx-1.5 md:mx-2">
                  <div className="flex-grow">
                    <p className="text-gray-600 italic mb-4 text-sm sm:text-[15px] md:text-base leading-relaxed">"{testimonial.quote}"</p>
                  </div>
                  <div className="mt-auto pt-3 border-t border-gray-100">
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.author}</p>
                    <p className="text-xs sm:text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <style jsx global>{`
        /* Base styles for better cross-browser consistency */
        * {
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
          -webkit-text-size-adjust: 100%;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }
        
        /* Fix for slick slider dots */
        .slick-dots {
          position: relative;
          bottom: 0;
          margin-top: 1.25rem !important;
          padding: 0 8px;
          -webkit-overflow-scrolling: touch;
        }
        
        .slick-dots li {
          margin: 0 4px !important;
          width: 10px !important;
          height: 10px !important;
        }
        
        .slick-dots li button {
          width: 10px !important;
          height: 10px !important;
          padding: 0 !important;
        }
        
        .slick-dots li button:before {
          font-size: 10px !important;
          color: #D1D5DB !important;
          opacity: 1 !important;
          width: 10px !important;
          height: 10px !important;
          line-height: 10px !important;
        }
        
        .slick-dots li.slick-active button:before {
          color: #F59E0B !important;
          opacity: 1 !important;
        }
        
        /* Adjust slider item spacing */
        .slick-slide > div {
          padding: 0 4px;
          box-sizing: border-box;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
        }
        
        /* Better touch targets for mobile */
        @media (max-width: 767px) {
          .slick-arrow {
            width: 40px !important;
            height: 40px !important;
            opacity: 0.9 !important;
          }
          
          .slick-prev {
            left: -5px !important;
          }
          
          .slick-next {
            right: -5px !important;
          }
          
          .slick-arrow:active {
            transform: scale(0.95) !important;
            -webkit-transform: scale(0.95) !important;
          }
        }
        
        /* Fix for Android Chrome rendering */
        @media screen and (-webkit-min-device-pixel-ratio: 0) {
          .slick-slide {
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
          }
        }
        
        /* Ensure proper text wrapping and prevent layout shifts */
        .testimonial-slider {
          -webkit-overflow-scrolling: touch;
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000;
          -webkit-font-smoothing: subpixel-antialiased;
        }
        
        .testimonial-slider p, 
        .testimonial-slider h4,
        .testimonial-slider div {
          -webkit-hyphens: auto;
          -moz-hyphens: auto;
          -ms-hyphens: auto;
          hyphens: auto;
          word-break: break-word;
          overflow-wrap: break-word;
          text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
          -moz-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
        
        /* Fix for iOS momentum scrolling */
        .testimonial-slider-container {
          -webkit-overflow-scrolling: touch;
          overflow: hidden;
          position: relative;
          z-index: 1;
        }
        
        /* Prevent content flashing on load */
        .slick-slide {
          outline: none !important;
          -webkit-tap-highlight-color: transparent;
        }
        
        /* Fix for Android Chrome 55+ native pull-to-refresh */
        .slick-initialized {
          overflow-anchor: none;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
