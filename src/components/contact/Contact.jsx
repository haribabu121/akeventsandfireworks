import React, { useState } from 'react';
import { 
  FaMapMarkerAlt, FaPhone, FaEnvelope, 
  FaFacebook, FaWhatsapp, FaInstagram, FaYoutube 
} from 'react-icons/fa';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/connect",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form submit error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Enhanced Background decoration - Responsive */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 sm:top-40 left-10 sm:left-20 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-yellow-400 rounded-full blur-2xl sm:blur-3xl animate-beautiful-float"></div>
        <div className="absolute bottom-20 sm:bottom-40 right-10 sm:right-20 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-pink-400 rounded-full blur-2xl sm:blur-3xl animate-beautiful-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-40 sm:top-60 right-20 sm:right-40 w-24 sm:w-36 md:w-48 h-24 sm:h-36 md:h-48 bg-purple-400 rounded-full blur-2xl sm:blur-3xl animate-beautiful-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 sm:bottom-60 left-20 sm:left-40 w-28 sm:w-42 md:w-56 h-28 sm:h-42 md:h-56 bg-blue-400 rounded-full blur-2xl sm:blur-3xl animate-beautiful-float" style={{ animationDelay: '3s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Enhanced Header - Responsive */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="group inline-block">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-yellow-500 group-hover:to-pink-500 group-hover:bg-clip-text transition-all duration-500">
              Get In Touch
            </h2>
            <div className="relative">
              <div className="w-24 sm:w-32 h-2 mx-auto rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 transform origin-left transition-all duration-700 group-hover:scale-x-150"></div>
              <div className="absolute inset-0 w-24 sm:w-32 h-2 mx-auto rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 blur-md opacity-50"></div>
            </div>
          </div>
          <p className="mt-6 sm:mt-8 text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
            Ready to light up your next event? Contact us today and let's create something magical together
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Enhanced Contact Info - Responsive */}
          <div className="space-y-6 sm:space-y-8">
            <div className="card-beautiful bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-3">
                <div className="w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center animate-beautiful-float">
                  <FaMapMarkerAlt className="text-white text-xs sm:text-sm" />
                </div>
                Contact Information
              </h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="card-beautiful bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover-beautiful">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-xl flex items-center justify-center beautiful-shimmer flex-shrink-0">
                      <FaMapMarkerAlt className="text-yellow-400 text-sm sm:text-lg" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-white mb-1 text-sm sm:text-base">Our Location</h4>
                      <p className="text-gray-300 text-xs sm:text-sm break-words">Chittinagar, Onetown, Vijayawada-9</p>
                    </div>
                  </div>
                </div>

                <div className="card-beautiful bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover-beautiful">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl flex items-center justify-center beautiful-shimmer flex-shrink-0">
                      <FaPhone className="text-green-400 text-sm sm:text-lg" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-white mb-1 text-sm sm:text-base">Phone</h4>
                      <p className="text-gray-300 text-xs sm:text-sm break-words">+91 9642617098</p>
                    </div>
                  </div>
                </div>

                <div className="card-beautiful bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover-beautiful">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl flex items-center justify-center beautiful-shimmer flex-shrink-0">
                      <FaEnvelope className="text-blue-400 text-sm sm:text-lg" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-white mb-1 text-sm sm:text-base">Email</h4>
                      <p className="text-gray-300 text-xs sm:text-sm break-words">akeventsandfireworks@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Map Section - Responsive */}
              <div className="mt-6 sm:mt-8">
                <h4 className="font-bold text-white mb-4 sm:mb-6 text-base sm:text-lg flex items-center gap-2">
                  <div className="w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center animate-beautiful-float">
                    <FaMapMarkerAlt className="text-white text-xs sm:text-sm" />
                  </div>
                  Find Us On Map
                </h4>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 via-pink-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative overflow-hidden rounded-2xl border-2 border-white/20 shadow-2xl">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3824.9069920310785!2d80.59610377492733!3d16.53079248421758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35efe9761af58d%3A0xb1167beec62bfab5!2sAK%20Events%20and%20Fireworks!5e0!3m2!1sen!2sin!4v1772948767929!5m2!1sen!2sin" 
                      width="100%" 
                      height="300" 
                      style={{ border: '0' }} 
                      allowFullScreen="" 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-64 sm:h-80 lg:h-96 lg:h-[400px] rounded-2xl"
                      title="AK Events & Fireworks Location"
                    />
                    
                    {/* Enhanced Map overlay with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none rounded-2xl"></div>
                    
                    {/* Enhanced Floating location badge */}
                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4 card-beautiful bg-white/95 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-2 rounded-full shadow-lg border border-yellow-400/50 animate-beautiful-float">
                      <div className="flex items-center gap-2">
                        <div className="w-2 sm:w-3 h-2 sm:h-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full animate-pulse"></div>
                        <span className="text-xs sm:text-sm font-semibold text-gray-900">Live Location</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced Map action buttons - Responsive */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
                    <button 
                      onClick={() => {
                        const directionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=AK+Events+and+Fireworks+Chittinagar+Vijayawada';
                        window.open(directionsUrl, '_blank');
                      }}
                      className="btn-beautiful flex items-center justify-center gap-2 text-white font-medium py-2 px-3 sm:px-4 rounded-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                    >
                      <svg className="w-3 sm:w-4 h-3 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 2m6 0v14a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h2" />
                      </svg>
                      <span>Get Directions</span>
                    </button>
                    
                    <button 
                      onClick={() => {
                        const mapUrl = 'https://www.google.com/maps/place/Chittinagar,+Vijayawada/@16.53079248421758,80.59610377492733,17z/data=!3m1%4b1!1m3!1m2!1s0x3a35efe9761af58d:0xb1167beec62bfab5!2sAK%20Events%20and%20Fireworks!5e0!3m2!1sen!2sin!4v1772948767929!5m2!1sen%2sin';
                        window.open(mapUrl, '_blank');
                      }}
                      className="btn-beautiful flex items-center justify-center gap-2 text-black font-medium py-2 px-3 sm:px-4 rounded-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                    >
                      <svg className="w-3 sm:w-4 h-3 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span>View Larger Map</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Enhanced Social Links - Responsive */}
              <div className="mt-6 sm:mt-8">
                <h4 className="font-bold text-white mb-4 sm:mb-6 text-base sm:text-lg flex items-center gap-2">
                  <div className="w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center animate-beautiful-float" style={{ animationDelay: '1s' }}>
                    <svg className="w-3 sm:w-4 h-3 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  Follow Us
                </h4>
                <div className="flex gap-3 sm:gap-4">
                  <a href="https://www.facebook.com/profile.php?id=61584294129668" target="_blank" rel="noopener noreferrer"
                    className="card-beautiful group w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-blue-500/50">
                    <FaFacebook className="text-white text-lg sm:text-xl group-hover:rotate-12 transition-transform duration-300" />
                  </a>

                  <a href="https://whatsapp.com/channel/0029VbBCCipHltYDmRN5vN3x" target="_blank" rel="noopener noreferrer"
                    className="card-beautiful group w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-green-500/50">
                    <FaWhatsapp className="text-white text-lg sm:text-xl group-hover:rotate-12 transition-transform duration-300" />
                  </a>

                  <a href="https://www.instagram.com/akeventsandfireworks" target="_blank" rel="noopener noreferrer"
                    className="card-beautiful group w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-pink-500/50">
                    <FaInstagram className="text-white text-lg sm:text-xl group-hover:rotate-12 transition-transform duration-300" />
                  </a>

                  <a href="https://www.youtube.com/channel/UCWyyejavZ6iWPAX0MFlgKzw" target="_blank" rel="noopener noreferrer"
                    className="card-beautiful group w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-red-500/50">
                    <FaYoutube className="text-white text-lg sm:text-xl group-hover:rotate-12 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Form - Responsive */}
          <div className="card-beautiful bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl">
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white inline-flex items-center gap-3">
                <div className="w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center animate-beautiful-float">
                  <svg className="w-3 sm:w-4 h-3 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 011.998 0l6.565-4.244A2 2 0 0119.128 0l-7.89 5.26a2 2 0 01-1.998 0L3 8z" />
                  </svg>
                </div>
                Send Us a Message
              </h3>
            </div>
            
            {/* Status Messages - Responsive */}
            {submitStatus === "success" && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/50 text-green-300 rounded-xl animate-slide-up">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-6 sm:w-8 h-6 sm:h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 sm:w-4 h-3 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-medium text-sm sm:text-base">Thank you! We'll get back to you soon.</span>
                </div>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/50 text-red-300 rounded-xl animate-slide-up">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-6 sm:w-8 h-6 sm:h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 sm:w-4 h-3 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span className="font-medium text-sm sm:text-base">Error sending message. Please try again.</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    required
                    value={formData.name} 
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-sm sm:text-base"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    value={formData.email} 
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-sm sm:text-base"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  required
                  value={formData.subject} 
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-sm sm:text-base"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Your Message</label>
                <textarea 
                  id="message" 
                  required 
                  rows="4 sm:rows-5"
                  value={formData.message} 
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 resize-none text-sm sm:text-base"
                  placeholder="Tell us about your event..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn-beautiful w-full py-3 sm:py-4 px-6 sm:px-8 rounded-xl font-bold transition-all duration-500 transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 sm:w-5 h-4 sm:h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <svg className="w-4 sm:w-5 h-4 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
