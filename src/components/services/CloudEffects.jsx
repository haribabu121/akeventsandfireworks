import React from 'react';
import { FaCloud, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CloudEffects = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-yellow-600 hover:text-yellow-700 transition-colors duration-300 mb-6"
          >
            <FaArrowLeft className="mr-2" /> Back to Home
          </Link>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0 md:w-1/3 bg-gradient-to-br from-blue-50 to-blue-100 p-8 flex items-center justify-center">
                <FaCloud className="text-8xl text-blue-400" />
              </div>
              
              <div className="p-8 md:p-12">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Cloud Effects</h1>
                <p className="text-lg text-gray-600 mb-6">Create an ethereal and magical atmosphere with our stunning cloud effects.</p>
                
                <div className="prose max-w-none text-gray-600">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Service Details</h3>
                  <p className="mb-4">Our cloud effects transform any venue into a dreamy, otherworldly space perfect for weddings, parties, and special events. The gentle, flowing clouds create a sense of magic and wonder that will leave your guests in awe.</p>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Features</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Safe, non-toxic fog effects</li>
                    <li>Customizable density and flow patterns</li>
                    <li>LED lighting integration for colorful displays</li>
                    <li>Perfect for entrances, dance floors, and photo backdrops</li>
                    <li>Works well with our lighting and sound effects</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Ideal For</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-800">Weddings</h4>
                      <p className="text-sm text-gray-600">Create a dreamy atmosphere for your first dance or ceremony entrance</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-800">Parties</h4>
                      <p className="text-sm text-gray-600">Add a magical touch to birthdays and celebrations</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-800">Corporate Events</h4>
                      <p className="text-sm text-gray-600">Make product launches and galas unforgettable</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-800">Photo Shoots</h4>
                      <p className="text-sm text-gray-600">Create stunning visual effects for photography</p>
                    </div>
                  </div>
                  
                  <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <p className="text-yellow-700">
                      <span className="font-semibold">Note:</span> Our cloud effects are completely safe and use non-toxic, water-based solutions that are harmless to people and the environment.
                    </p>
                  </div>
                </div>
                
                <div className="mt-10">
                  <Link
                    to="/contact"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 transition-colors duration-300"
                  >
                    Book This Service
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloudEffects;
