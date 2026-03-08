import React, { useState } from 'react';
import { FaPlus, FaMinus, FaQuestionCircle, FaStar, FaShieldAlt, FaClock, FaRocket } from 'react-icons/fa';

const FeatureSection = [
  {
    question: "What services does AK Events & Fireworks offer?",
    answer: "AK Events & Fireworks provides complete event management solutions, including venue decoration, stage setups, sound and lighting, event coordination, and premium fireworks displays for weddings, corporate events, festivals, and private celebrations.",
    icon: <FaRocket className="text-yellow-500" />
  },
  {
    question: "Are your fireworks safe and legal?",
    answer: "Yes. All fireworks used by AK Events & Fireworks are government-approved and handled by licensed professionals. We follow strict safety protocols and ensure full compliance with local regulations to guarantee a safe and spectacular show.",
    icon: <FaShieldAlt className="text-green-500" />
  },
  {
    question: "How far in advance should I book your services?",
    answer: "We recommend booking our services at least 4-6 weeks in advance, especially for larger events or during peak seasons. This allows us to plan and customize the event according to your preferences and ensure availability.",
    icon: <FaClock className="text-blue-500" />
  },
  {
    question: "Do you customize fireworks and event decorations?",
    answer: "Absolutely! Whether you want a themed decoration setup or a personalized fireworks show synchronized with music, our team customizes every detail according to your event style, theme, and budget.",
    icon: <FaStar className="text-purple-500" />
  },
  {
    question: "What is the pricing for your event and fireworks packages?",
    answer: "Pricing depends on factors such as event type, location, decoration requirements, and the intensity/duration of fireworks display. We offer flexible packages for all budgets. You can request a free quote, and our team will guide you with the best options.",
    icon: <FaQuestionCircle className="text-pink-500" />
  },
];

const FAQItem = ({ faq, index, isOpen, onToggle }) => {
  return (
    <div 
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Gradient border effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
      
      <button
        onClick={() => onToggle(index)}
        className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 relative z-10 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-pink-50 transition-all duration-300"
      >
        <div className="flex items-center gap-4 flex-1">
          <div className="w-12 h-12 bg-gradient-to-br from-gray-50 to-white rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
            {faq.icon}
          </div>
          <span className="font-semibold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-yellow-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300">
            {faq.question}
          </span>
        </div>
        
        <div className="relative">
          <div className={`w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-white transition-all duration-300 transform ${isOpen ? 'rotate-45' : ''}`}>
            {isOpen ? (
              <FaMinus className="text-sm" />
            ) : (
              <FaPlus className="text-sm" />
            )}
          </div>
          <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-20"></div>
        </div>
      </button>

      {/* Answer with smooth animation */}
      <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-6 pb-5 pl-20 bg-gradient-to-r from-gray-50 to-white text-gray-600 leading-relaxed border-t border-gray-100">
          {faq.answer}
        </div>
      </div>
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none">
        <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-12"></div>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-gray-50 via-white to-yellow-50/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 left-20 w-64 h-64 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-pink-400 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced Section Header */}
        <div className="text-center mb-16">
          <div className="group inline-block">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-yellow-500 group-hover:to-pink-500 group-hover:bg-clip-text transition-all duration-500">
              Frequently Asked Questions
            </h2>
            <div className="relative">
              <div className="w-32 h-2 mx-auto rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 transform origin-left transition-all duration-700 group-hover:scale-x-150"></div>
              <div className="absolute inset-0 w-32 h-2 mx-auto rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 blur-md opacity-50"></div>
            </div>
          </div>
          <p className="mt-8 text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Find answers to common questions about our services and learn how we can make your event unforgettable
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="space-y-6">
            {FeatureSection.map((faq, index) => (
              <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <FAQItem 
                  faq={faq} 
                  index={index} 
                  isOpen={openIndex === index}
                  onToggle={toggleFAQ}
                />
              </div>
            ))}
          </div>
          
          {/* Right side illustration */}
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/20 via-pink-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
              <img
                src="https://empmonitor.com/wp-content/uploads/2024/06/Frame-2062.webp"
                alt="FAQ illustration"
                className="relative w-full max-w-md rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
              
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                Got Questions?
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce">
                We're Here!
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
