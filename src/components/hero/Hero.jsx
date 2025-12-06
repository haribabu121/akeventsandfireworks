import React, { useEffect, useRef, useState } from 'react';
import heroVideo from './hero.mp4';
import BookingForm from '../booking/BookingForm';

const Hero = () => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const videoRef = useRef(null);

  // Ensure video plays properly on mobile devices
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      video.playsInline = true;
      
      // Try to play the video (muted autoplay with promise)
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Auto-play was prevented
          video.muted = true;
          video.play();
        });
      }
    }
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover brightness-100 contrast-105"
          style={{
            objectFit: 'cover',
            minHeight: '100vh',
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <source 
            src={heroVideo} 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
        {/* Lighter Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-6 z-10 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-fade-in">
  <span className="text-yellow-400">AK</span> Events & Fireworks
</h1>

        <p className="text-xl md:text-2xl lg:text-2xl mb-10 max-w-3xl mx-auto font-light">
          Igniting Your Special Moments with Spectacular Fireworks & Unforgettable Events
        </p>
        
        <div className="flex flex-wrap justify-center gap-6">
          <button 
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-yellow-500/30"
            onClick={(e) => {
              e.preventDefault();
              setShowBookingForm(true);
            }}
          >
            Book Now
          </button>
          
          <button 
            className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-white/20"
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Our Services
          </button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
        onClick={() => document.getElementById('about-us')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <svg 
          className="w-10 h-10 text-white hover:text-yellow-400 transition-colors" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowBookingForm(false)}
          ></div>
          <div className="relative z-10 w-full max-w-md mx-4">
            <BookingForm onClose={() => setShowBookingForm(false)} />
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
