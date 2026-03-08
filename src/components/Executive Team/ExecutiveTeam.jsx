import React, { useState } from 'react';
// import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import './ExecutiveTeam.css';
import dpImage from "./dp.jpg";
const teamMembers = [
  {
    name: "Ankam Durga ",
    title: "Founder & Managing Director",
    image: dpImage,
    linkedin: "#",
  },
  {
    name: "Ankam Haribabu",
    title: "Operations Director",
    image: "https://img.freepik.com/premium-vector/beautiful-professional-man-character-vector-illustration_1287271-88114.jpg?w=2000",
    linkedin: "#",
  },
  {
    name: "Devi",
    title: "Event Manager",
    image: "https://static.vecteezy.com/system/resources/previews/034/488/032/large_2x/3d-cute-cartoon-woman-character-cartoon-businesswoman-wearing-red-suit-on-transparent-background-png.png",
    linkedin: "#",
  },
  {
    name: "Chaitanya",
    title: "Production & Logistics Manager",
    image: "https://png.pngtree.com/png-vector/20241113/ourlarge/pngtree-professional-woman-using-laptop-png-image_14418003.png",
    linkedin: "#",
  },
  {
    name: "Ankam Jhansi",
    title: "Creative & Design Manager",
    image: "https://www.kindpng.com/picc/m/140-1403886_office-girl-cartoon-png-transparent-png.png",
    linkedin: "#",
  },
];

const FALLBACK_IMAGE = "https://via.placeholder.com/200x200.png?text=Team+Member";

const TeamMember = ({ member }) => {
  const [hovered, setHovered] = useState(false);
  const { image, name, title, linkedin } = member;

  return (
    <div className="group relative text-center p-6">
      {/* Enhanced Photo Container */}
      <div className="relative w-48 h-48 mx-auto mb-6 overflow-hidden rounded-3xl group-hover:shadow-2xl transition-all duration-500 border-4 border-white shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
        <img
          src={image || FALLBACK_IMAGE}
          alt={name}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            hovered ? "scale-110" : ""
          }`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        />
        
        {/* Floating social icons on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl flex items-center justify-center">
          <div className="flex gap-3">
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Name with gradient effect */}
      <div className="relative inline-block mb-3">
        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-yellow-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-500">
          {name}
        </h3>
        <div className="h-1 w-16 bg-gradient-to-r from-yellow-400 to-pink-500 mx-auto mt-3 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
      </div>

      {/* Enhanced Title */}
      <p className="text-gray-600 text-base font-medium leading-relaxed">{title}</p>
      
      {/* Hover effect decoration */}
      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 via-pink-500/20 to-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
    </div>
  );
};

const ExecutiveTeam = () => {
  return (
    <section id="executive-team" className="py-20 bg-gradient-to-br from-gray-50 via-white to-yellow-50/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 right-20 w-64 h-64 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-pink-400 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced Section Header */}
        <div className="text-center mb-20">
          <div className="group inline-block">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-yellow-500 group-hover:to-pink-500 group-hover:bg-clip-text transition-all duration-500">
              Executive Team
            </h2>
            <div className="relative">
              <div className="w-32 h-2 mx-auto rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 transform origin-left transition-all duration-700 group-hover:scale-x-150"></div>
              <div className="absolute inset-0 w-32 h-2 mx-auto rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 blur-md opacity-50"></div>
            </div>
          </div>
          <p className="mt-8 text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Meet our talented team of event professionals who bring creativity, expertise, and passion to every celebration
          </p>
        </div>

        {/* Enhanced Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-12 max-w-7xl mx-auto">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="transform animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <TeamMember member={member} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExecutiveTeam;
