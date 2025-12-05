import React from 'react';
import { GiFlowers } from 'react-icons/gi';
import ServiceDetail from './ServiceDetail';

const VenueDecoration = () => {
  const features = [
    'Complete venue transformation',
    'Custom theme development',
    'Premium floral arrangements',
    'Lighting and drapery solutions',
    'Custom backdrops and centerpieces'
  ];

  const idealFor = [
    {
      title: 'Wedding Venues',
      description: 'Transform any space into a romantic setting'
    },
    {
      title: 'Corporate Events',
      description: 'Professional decor that impresses clients and employees'
    },
    {
      title: 'Birthday Parties',
      description: 'Themed decorations that bring the party to life'
    },
    {
      title: 'Community Events',
      description: 'Create memorable experiences for large gatherings'
    }
  ];

  return (
    <ServiceDetail
      title="Venue Decoration"
      description="Transform any space into a magical setting with our expert venue decoration services. We work with you to create a cohesive look that reflects your vision and wows your guests."
      features={features}
      idealFor={idealFor}
      icon={GiFlowers}
      iconBgColor="bg-pink-50"
      iconTextColor="text-pink-500"
      buttonBgColor="bg-yellow-500"
      buttonHoverColor="hover:bg-yellow-600"
    />
  );
};

export default VenueDecoration;
