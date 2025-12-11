import React, { useState } from "react";
import { FaTimes } from 'react-icons/fa';

const Marquee = ({ items, speed = 20, className = "", onClose }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = (e) => {
    e.stopPropagation();
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`overflow-hidden whitespace-nowrap w-full bg-yellow-500 text-white py-2 relative ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <button 
        onClick={handleClose}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-gray-200 focus:outline-none z-10"
        aria-label="Close marquee"
      >
        <FaTimes className="w-4 h-4" />
      </button>
      <div
        className="inline-block"
        style={{ 
          animation: `marquee ${speed}s linear infinite`,
          animationPlayState: isPaused ? 'paused' : 'running',
          paddingRight: '0.5rem'
        }}
      >
        {items.map((item, index) => (
          <span key={index} className="mx-6 inline-flex items-center">
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.text}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};

export default Marquee;