import React from 'react';
import { FaHorse } from 'react-icons/fa';
import ServiceDetail from './ServiceDetail';

const GrandEntry = () => {
  const features = [
    'Vintage and luxury vehicle entries',
    'Elegant horse-drawn carriages',
    'Dynamic LED Dhol performances',
    'Dramatic dry ice effects',
    'Romantic flower showers'
  ];

  const idealFor = [
    {
      title: 'Wedding Entrances',
      description: 'Make a grand entrance on your special day'
    },
    {
      title: 'Birthday Celebrations',
      description: 'Surprise the guest of honor with a spectacular entry'
    },
    {
      title: 'Corporate Launches',
      description: 'Create buzz with an unforgettable product introduction'
    },
    {
      title: 'Cultural Events',
      description: 'Celebrate traditions with dramatic flair'
    }
  ];

  return (
    <ServiceDetail
      title="Grand Entry Concepts"
      description="Make a statement with our spectacular grand entry services. From elegant to extravagant, we'll create an unforgettable entrance that sets the tone for your entire event."
      features={features}
      idealFor={idealFor}
      icon={FaHorse}
      iconBgColor="bg-amber-100"
      iconTextColor="text-amber-700"
      buttonBgColor="bg-yellow-500"
      buttonHoverColor="hover:bg-yellow-600"
    />
  );
};

export default GrandEntry;
