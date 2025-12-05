import React from 'react';
import { FaCloud } from 'react-icons/fa';
import ServiceDetail from './ServiceDetail';

const CloudEffects = () => {
  const features = [
    'Safe, non-toxic fog effects',
    'Customizable density and flow patterns',
    'LED lighting integration for colorful displays',
    'Perfect for entrances, dance floors, and photo backdrops',
    'Works well with our lighting and sound effects'
  ];

  const idealFor = [
    {
      title: 'Weddings',
      description: 'Create a dreamy atmosphere for your first dance or ceremony entrance'
    },
    {
      title: 'Parties',
      description: 'Add a magical touch to birthdays and celebrations'
    },
    {
      title: 'Corporate Events',
      description: 'Make product launches and galas unforgettable'
    },
    {
      title: 'Photo Shoots',
      description: 'Create stunning visual effects for photography'
    }
  ];

  return (
    <ServiceDetail
      title="Cloud Effects"
      description="Transform your event into a dreamy, ethereal experience with our stunning cloud effects. Perfect for creating magical entrances, photo opportunities, and immersive environments."
      features={features}
      idealFor={idealFor}
      icon={FaCloud}
      iconBgColor="bg-blue-100"
      iconTextColor="text-blue-600"
      buttonBgColor="bg-yellow-500"
      buttonHoverColor="hover:bg-yellow-600"
    />
  );
};

export default CloudEffects;
