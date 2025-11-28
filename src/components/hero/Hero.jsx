import React from 'react';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <video autoPlay muted loop className="w-full h-full object-cover">
          <source src="https://assets.mixkit.co/videos/preview/mixkit-fireworks-display-in-the-night-sky-1244-large.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="container mx-auto px-6 z-10 text-center">
        <h1 className="text-5xl md:text-4.5xl font-bold mb-6 animate-fade-in">
          <span className="text-yellow-400">AK</span> Events & Fireworks
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Creating Unforgettable Moments with Breathtaking Fireworks and Event Planning
        </p>
        <div className="flex flex-wrap justify-center gap-4">
  <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
    Book Now
  </button>

  <button className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 cursor-pointer">
    Our Services
  </button>
</div>

      </div>
      <div className="absolute bottom-22 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
