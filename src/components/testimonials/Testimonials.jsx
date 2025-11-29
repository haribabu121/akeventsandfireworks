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

  // Slick settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 5000, // 5 seconds
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };

  return (
    <section id="testimonials" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
        </div>
        
        <Slider {...settings} className="testimonial-slider">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="px-4 py-8">
              <div className="bg-white p-8 rounded-lg shadow-md h-full">
                <div className="text-yellow-400 text-4xl mb-4">"</div>
                <p className="text-gray-600 italic mb-6">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600 mr-4">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.author}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
