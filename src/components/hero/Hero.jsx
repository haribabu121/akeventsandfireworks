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
      {/* Animated Background */}
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
        
        {/* Enhanced Gradient Overlay with Animation */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-pink-900/20 animate-pulse"></div>
        
        {/* Floating Particles Effect */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float rounded-full bg-yellow-400/20 blur-xl"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${8 + i * 2}s`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      {/* Enhanced Content */}
      <div className="container mx-auto px-6 z-10 text-center">
        <div className="animate-slide-up">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 tracking-tight">
            <span className="inline-block animate-shimmer bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent">
              AK
            </span>
            <span className="block text-white mt-2">Events & Fireworks</span>
          </h1>

          <p className="text-xl md:text-2xl lg:text-3xl mb-12 max-w-4xl mx-auto font-light leading-relaxed animate-fade-in-delay">
            <span className="inline-block">Igniting Your Special Moments</span>
            <br className="hidden md:block" />
            <span className="inline-block text-yellow-300 font-semibold">with Spectacular Fireworks & Unforgettable Events</span>
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 animate-fade-in-delay-2">
            <button 
              className="group relative bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-5 px-12 rounded-full text-xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/50 overflow-hidden"
              onClick={(e) => {
                e.preventDefault();
                setShowBookingForm(true);
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Book Now
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
            
            <button 
              className="group relative bg-white/10 backdrop-blur-md border-2 border-white/50 hover:bg-white/20 hover:border-white hover:text-white text-white font-bold py-5 px-12 rounded-full text-xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-white/20 overflow-hidden"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative z-10 flex items-center gap-2">
                Our Services
                <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Enhanced Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowBookingForm(false)}
          ></div>
          <div className="relative z-10 w-full max-w-md animate-scale-up">
            <BookingForm onClose={() => setShowBookingForm(false)} />
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;

// Add custom animations
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-20px) rotate(120deg); }
    66% { transform: translateY(-10px) rotate(240deg); }
  }
  
  @keyframes slide-up {
    from { 
      opacity: 0; 
      transform: translateY(50px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }
  
  @keyframes fade-in-delay {
    from { 
      opacity: 0; 
      transform: translateY(30px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }
  
  @keyframes fade-in-delay-2 {
    from { 
      opacity: 0; 
      transform: translateY(30px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }
  
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  
  @keyframes scale-up {
    from { 
      opacity: 0; 
      transform: scale(0.9); 
    }
    to { 
      opacity: 1; 
      transform: scale(1); 
    }
  }
  
  .animate-float {
    animation: float 20s ease-in-out infinite;
  }
  
  .animate-slide-up {
    animation: slide-up 1s ease-out forwards;
  }
  
  .animate-fade-in-delay {
    animation: fade-in-delay 1.2s ease-out forwards;
    opacity: 0;
  }
  
  .animate-fade-in-delay-2 {
    animation: fade-in-delay-2 1.4s ease-out forwards;
    opacity: 0;
  }
  
  .animate-shimmer {
    background-size: 200% auto;
    animation: shimmer 3s linear infinite;
  }
  
  .animate-scale-up {
    animation: scale-up 0.3s ease-out forwards;
  }
`;
document.head.appendChild(style);
