import React from 'react';
import { FaStar, FaFire, FaCalendarAlt } from 'react-icons/fa';

const About = () => {
  return (
    <section id="about-us" className="py-20 bg-gradient-to-br from-white via-gray-50 to-yellow-50/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 right-20 w-64 h-64 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-pink-400 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="group inline-block">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-yellow-500 group-hover:to-pink-500 group-hover:bg-clip-text transition-all duration-500">
              About AK Events & Fireworks
            </h2>
            <div className="relative">
              <div className="w-32 h-2 mx-auto rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 transform origin-left transition-all duration-700 group-hover:scale-x-150"></div>
              <div className="absolute inset-0 w-32 h-2 mx-auto rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 blur-md opacity-50"></div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          <div className="lg:w-1/2">
            <div className="space-y-6">
              <h3 className="text-4xl font-bold text-gray-900 leading-tight">
                Your Premier <span className="text-transparent bg-gradient-to-r from-yellow-500 to-pink-500 bg-clip-text">Event Partner</span>
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed">
                With over 1+ years of experience in the industry, AK Events & Fireworks has been the go-to choice for spectacular firework displays and event management services.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
              <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-yellow-200 transition-colors">
                  <FaStar className="text-yellow-600 text-xl" />
                </div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">Professional Team</h4>
                <p className="text-gray-600 text-sm leading-relaxed">Certified pyrotechnicians and event professionals</p>
              </div>
              
              <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors">
                  <FaFire className="text-red-600 text-xl" />
                </div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">Custom Shows</h4>
                <p className="text-gray-600 text-sm leading-relaxed">Tailored firework displays for any occasion</p>
              </div>
              
              <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <FaCalendarAlt className="text-blue-600 text-xl" />
                </div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">Full Event Planning</h4>
                <p className="text-gray-600 text-sm leading-relaxed">From concept to execution, we handle it all</p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://magarticles.magzter.com/articles/9339/378545/5dafe628542f8/Fireworks-Events.jpg" 
                  alt="Fireworks display" 
                  className="w-full h-auto rounded-2xl transform transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Floating stats card */}
                <div className="absolute -bottom-8 -right-8 bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-8 rounded-2xl shadow-2xl transform rotate-3 hover:rotate-6 transition-transform duration-300 border-2 border-white/20">
                  <div className="flex items-center gap-3">
                    <div className="text-5xl font-black">1+</div>
                    <div className="text-lg font-semibold">Years Experience</div>
                  </div>
                  <div className="mt-2 text-sm opacity-90">Creating magical moments</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
