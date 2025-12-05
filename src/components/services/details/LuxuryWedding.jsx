import React from 'react';
import { GiSparkles } from 'react-icons/gi';
import ServiceDetail from './ServiceDetail';

const LuxuryWedding = () => {
  const features = [
    'Custom theme design and execution',
    'Premium decor and floral arrangements',
    'Luxury furniture and drapery',
    'Custom lighting design',
    'Personalized event styling'
  ];

  const idealFor = [
    {
      title: 'Luxury Weddings',
      description: 'Create your dream wedding with our premium design services'
    },
    {
      title: 'Gala Dinners',
      description: 'Elegant decor for sophisticated corporate events'
    },
    {
      title: 'Milestone Celebrations',
      description: 'Anniversaries, birthdays, and other special occasions'
    },
    {
      title: 'VIP Events',
      description: 'Exclusive designs for high-profile gatherings'
    }
  ];

  return (
    <ServiceDetail
      title="Luxury Wedding & Event Design"
      description="Elevate your special day with our exquisite event design services. We create magical, one-of-a-kind experiences that reflect your unique style and vision."
      features={features}
      idealFor={idealFor}
      icon={GiSparkles}
      iconBgColor="bg-yellow-50"
      iconTextColor="text-yellow-500"
      buttonBgColor="bg-yellow-500"
      buttonHoverColor="hover:bg-yellow-600"
    />
  );
};

export default LuxuryWedding;
