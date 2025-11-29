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

  // Enhanced arrow components for better touch targets
  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} !right-0 !mr-2 sm:!mr-4 z-10`}
        style={{ 
          ...style, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.7)', 
          borderRadius: '50%', 
          width: '44px', 
          height: '44px',
          WebkitTapHighlightColor: 'transparent',
          transform: 'translateZ(0)',
          willChange: 'transform',
          transition: 'opacity 0.3s ease, transform 0.3s ease'
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
        className={`${className} !left-0 !ml-2 sm:!ml-4 z-10`}
        style={{ 
          ...style, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.7)', 
          borderRadius: '50%', 
          width: '44px', 
          height: '44px',
          WebkitTapHighlightColor: 'transparent',
          transform: 'translateZ(0)',
          willChange: 'transform',
          transition: 'opacity 0.3s ease, transform 0.3s ease'
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

  // Enhanced settings for optimal Android performance
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    swipeToSlide: true,
    centerMode: true,
    centerPadding: isAndroid() ? '20px' : '40px',
    swipe: true,
    touchThreshold: 15,
    touchMove: true,
    useCSS: true,
    useTransform: true,
    cssEase: 'ease-out',
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
          slidesToShow: 2.5,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: isAndroid() ? '20px' : '40px',
          dots: true
        }
      },
      {
        breakpoint: 768, // Tablets (portrait)
        settings: {
          slidesToShow: 1.8,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: isAndroid() ? '15px' : '30px',
          dots: true
        }
      },
      {
        breakpoint: 640, // Large mobile
        settings: {
          slidesToShow: 1.3,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: isAndroid() ? '10px' : '20px',
          dots: true
        }
      },
      {
        breakpoint: 480, // Small mobile
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: isAndroid() ? '5px' : '15px',
          dots: true
        }
      },
      {
        breakpoint: 400, // Very small mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: isAndroid() ? '0' : '10px',
          dots: true
        }
      }
    ]
  };

  return (
    <section 
      id="testimonials" 
      className="py-10 sm:py-14 md:py-16 bg-gray-100"
      style={{
        WebkitTextSizeAdjust: '100%',
        WebkitFontSmoothing: isAndroid() ? 'antialiased' : 'auto',
        MozOsxFontSmoothing: 'grayscale'
      }}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
            What Our Clients Say
          </h2>
          <div className="w-14 sm:w-20 h-0.5 bg-yellow-500 mx-auto"></div>
        </div>
        
        <div className="relative px-1 sm:px-2">
          <div className="testimonial-slider-container">
            <Slider {...settings} className="testimonial-slider">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="px-1 sm:px-2 py-1"
                  style={{
                    outline: 'none',
                    WebkitTapHighlightColor: 'transparent',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                    perspective: 1000,
                    WebkitFontSmoothing: 'subpixel-antialiased'
                  }}
                >
                  <div 
                    className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 h-full border border-gray-100"
                    style={{
                      transform: 'translateZ(0)',
                      WebkitTransform: 'translateZ(0)',
                      willChange: 'transform',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      WebkitFontSmoothing: 'antialiased'
                    }}
                  >
                    <div 
                      className="text-yellow-400 text-2xl sm:text-3xl mb-2 sm:mb-3"
                      style={{
                        lineHeight: 1,
                        transform: 'translateZ(0)'
                      }}
                    >
                      "
                    </div>
                    <p 
                      className="text-sm sm:text-base text-gray-600 italic mb-3 sm:mb-4 leading-relaxed"
                      style={{
                        WebkitHyphens: 'auto',
                        hyphens: 'auto',
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                        textSizeAdjust: '100%',
                        WebkitTextSizeAdjust: '100%',
                        MozTextSizeAdjust: '100%',
                        msTextSizeAdjust: '100%'
                      }}
                    >
                      {testimonial.quote}
                    </p>
                    <div className="flex items-center mt-3 sm:mt-4 md:mt-5">
                      <div 
                        className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-yellow-100 flex items-center justify-center text-base sm:text-lg font-bold text-yellow-600 mr-2 sm:mr-3 flex-shrink-0"
                        style={{
                          flexShrink: 0,
                          WebkitFlexShrink: 0,
                          msFlexNegative: 0
                        }}
                      >
                        {testimonial.author.charAt(0)}
                      </div>
                      <div className="min-w-0" style={{ flex: 1 }}>
                        <h4 
                          className="font-semibold text-gray-800 text-sm sm:text-base truncate"
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {testimonial.author}
                        </h4>
                        <p 
                          className="text-xs sm:text-sm text-gray-500 truncate"
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          
          {/* Enhanced global styles for cross-browser compatibility */}
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
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
