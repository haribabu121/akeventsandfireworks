import React from "react";

const Marquee = ({ items, speed = 20 }) => {
  return (
    <div className="overflow-hidden whitespace-nowrap w-full bg-yellow-500 text-white py-2 relative">
      <div
        className="inline-block animate-marquee"
        style={{ animationDuration: `${speed}s` }}
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
        .animate-marquee {
          display: inline-block;
          animation: marquee linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Marquee;
