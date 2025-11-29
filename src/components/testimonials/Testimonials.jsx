import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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

  // Custom arrow components
  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} !right-0 !mr-8 z-10`}
        style={{ ...style, display: 'block', background: 'rgba(0,0,0,0.7)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onClick={onClick}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute">
          <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} !left-0 !ml-8 z-10`}
        style={{ ...style, display: 'block', background: 'rgba(0,0,0,0.7)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onClick={onClick}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute">
          <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    );
  };

  // Slick settings with enhanced mobile responsiveness
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: '40px',
    responsive: [
      {
        breakpoint: 1280, // Large desktops
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: '0',
          dots: true
        }
      },
      {
        breakpoint: 1024, // Tablets (landscape)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '60px',
          dots: true
        }
      },
      {
        breakpoint: 768, // Tablets (portrait)
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '60px',
          dots: true
        }
      },
      {
        breakpoint: 640, // Large mobile
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '40px',
          dots: true
        }
      },
      {
        breakpoint: 480, // Small mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '30px',
          dots: true
        }
      },
      {
        breakpoint: 360, // Very small mobile
        settings: {
          slidesToShow: 0.9,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '20px',
          dots: true
        }
      }
    ]
  };

  return (
    <section id="testimonials" className="py-12 sm:py-16 md:py-20 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">What Our Clients Say</h2>
          <div className="w-16 sm:w-24 h-1 bg-yellow-500 mx-auto"></div>
        </div>
        
        <div className="relative">
          <Slider {...settings} className="testimonial-slider">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="px-2 sm:px-3 py-2">
                <div className="bg-white p-5 sm:p-6 md:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 h-full border border-gray-100">
                  <div className="text-yellow-400 text-3xl sm:text-4xl mb-3 sm:mb-4">"</div>
                  <p className="text-sm sm:text-base text-gray-600 italic mb-4 sm:mb-6 leading-relaxed">{testimonial.quote}</p>
                  <div className="flex items-center mt-4 sm:mt-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-yellow-100 flex items-center justify-center text-lg sm:text-xl font-bold text-yellow-600 mr-3 sm:mr-4 flex-shrink-0">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-gray-800 text-sm sm:text-base truncate">{testimonial.author}</h4>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          
          {/* Custom styles for better mobile experience */}
          <style jsx global>{`
            /* Fix for slick slider dots */
            .slick-dots {
              position: relative;
              bottom: 0;
              margin-top: 1.5rem !important;
            }
            .slick-dots li {
              margin: 0 3px !important;
            }
            .slick-dots li button:before {
              font-size: 10px !important;
              color: #D1D5DB !important;
              opacity: 1 !important;
            }
            .slick-dots li.slick-active button:before {
              color: #F59E0B !important;
            }
            
            /* Adjust slider item spacing */
            .slick-slide > div {
              padding: 0 4px;
            }
            
            /* Better touch targets for mobile */
            @media (max-width: 640px) {
              .slick-arrow {
                width: 36px !important;
                height: 36px !important;
              }
              .slick-prev {
                left: 0 !important;
              }
              .slick-next {
                right: 0 !important;
              }
            }
            
            /* Ensure proper text wrapping */
            .testimonial-slider p {
              word-wrap: break-word;
              overflow-wrap: break-word;
              hyphens: auto;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
