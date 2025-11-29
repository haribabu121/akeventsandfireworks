import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaQuoteLeft } from 'react-icons/fa';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "The firework display was absolutely breathtaking! AK Events made our wedding day truly magical.",
      author: "Sarah & Michael",
      role: "Wedding Couple"
    },
    {
      quote: "Professional service from start to finish. The team went above and beyond to make our corporate event a success.",
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

  // State for window width
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Custom arrow components with better visibility
  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} !right-0 !mr-4 md:!mr-8 z-10`}
        style={{ 
          ...style, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.7)', 
          borderRadius: '50%', 
          width: '36px', 
          height: '36px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
        }}
        onClick={onClick}
        aria-label="Next testimonial"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} !left-0 !ml-4 md:!ml-8 z-10`}
        style={{ 
          ...style, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.7)', 
          borderRadius: '50%', 
          width: '36px', 
          height: '36px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
        }}
        onClick={onClick}
        aria-label="Previous testimonial"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    );
  };

  // Slick settings with enhanced responsiveness
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 6000, // 6 seconds
    pauseOnHover: true,
    centerMode: windowWidth > 1024, // Center mode only on desktop
    centerPadding: '0',
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1280, // xl screens
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: false,
          dots: true
        }
      },
      {
        breakpoint: 1024, // lg screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
          dots: true
        }
      },
      {
        breakpoint: 768, // md screens
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '20px',
          dots: true
        }
      },
      {
        breakpoint: 480, // sm screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '10px',
          dots: true
        }
      }
    ]
  };

  return (
    <section id="testimonials" className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">What Our Clients Say</h2>
          <div className="w-16 sm:w-20 h-1 bg-yellow-500 mx-auto"></div>
        </div>
        
        <div className="relative">
          <Slider {...settings} className="testimonial-slider pb-2">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="px-2 sm:px-3 py-2">
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 h-full border border-gray-100">
                  <div className="flex items-start">
                    <FaQuoteLeft className="text-yellow-400 text-2xl sm:text-3xl mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{testimonial.quote}</p>
                  </div>
                  <div className="flex items-center mt-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-yellow-100 flex items-center justify-center text-lg sm:text-xl font-bold text-yellow-600 mr-3 sm:mr-4">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm sm:text-base">{testimonial.author}</h4>
                      <p className="text-xs sm:text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          
          {/* Custom dots container for better mobile experience */}
          <style jsx global>{`
            .slick-dots {
              position: relative;
              bottom: 0;
              margin-top: 2rem !important;
            }
            .slick-dots li button:before {
              font-size: 10px;
              color: #D1D5DB;
              opacity: 1;
            }
            .slick-dots li.slick-active button:before {
              color: #F59E0B;
            }
            .slick-slide > div {
              padding: 0 4px;
            }
            @media (min-width: 768px) {
              .slick-slide > div {
                padding: 0 8px;
              }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
