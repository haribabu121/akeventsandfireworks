import React from 'react';
import { FaStar, FaFire, FaCalendarAlt } from 'react-icons/fa';

const About = () => {
  return (
    <section id="about-us" className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="group">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 group-hover:text-yellow-500 transition-colors duration-300">About AK Events & Fireworks</h2>
            <div className="group relative">
              <div className="w-24 h-1.5 mx-auto transform origin-left transition-all duration-500 group-hover:scale-x-125 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-size-200 group-hover:bg-pos-0 bg-pos-100"></div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h3 className="text-3xl font-semibold mb-6">Your Premier Event Partner</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              With over 1+ years of experience in the industry, AK Events & Fireworks has been the go-to choice for spectacular firework displays and event management services.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <FaStar className="text-yellow-500 text-xl mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg">Professional Team</h4>
                  <p className="text-gray-600">Certified pyrotechnicians and event professionals</p>
                </div>
              </div>
              <div className="flex items-start">
                <FaFire className="text-red-500 text-xl mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg">Custom Shows</h4>
                  <p className="text-gray-600">Tailored firework displays for any occasion</p>
                </div>
              </div>
              <div className="flex items-start">
                <FaCalendarAlt className="text-blue-500 text-xl mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg">Full Event Planning</h4>
                  <p className="text-gray-600">From concept to execution, we handle it all</p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="https://magarticles.magzter.com/articles/9339/378545/5dafe628542f8/Fireworks-Events.jpg" 
                alt="Fireworks display" 
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-yellow-500 text-black p-6 rounded-lg shadow-lg w-48">
                <span className="block text-4xl font-bold">1+</span>
                <span className="text-lg">Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
