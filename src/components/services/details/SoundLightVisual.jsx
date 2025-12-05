import React from 'react';
import { FaMusic, FaLightbulb, FaVideo } from 'react-icons/fa';
import ServiceDetail from './ServiceDetail';

const SoundLightVisual = () => {
  const features = [
    'High-quality sound systems',
    'Professional lighting design',
    'LED walls and video mapping',
    'Projection mapping services',
    'Atmospheric effects and fog machines'
  ];

  const idealFor = [
    {
      title: 'Concerts & Performances',
      description: 'Professional audio-visual support for live shows'
    },
    {
      title: 'Corporate Events',
      description: 'Crystal clear audio and professional lighting for presentations'
    },
    {
      title: 'Wedding Receptions',
      description: 'Create the perfect party atmosphere'
    },
    {
      title: 'Product Launches',
      description: 'Immersive audio-visual experiences that wow'
    }
  ];

  return (
    <ServiceDetail
      title="Sound, Light & Visual Effects"
      description="Create an immersive experience with our professional sound, lighting, and visual effects services. We bring together cutting-edge technology and creative design to make your event truly unforgettable."
      features={features}
      idealFor={idealFor}
      icon={FaLightbulb}
      iconBgColor="bg-purple-50"
      iconTextColor="text-purple-600"
      buttonBgColor="bg-yellow-500"
      buttonHoverColor="hover:bg-yellow-600"
    >
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-purple-100 text-purple-600">
            <FaMusic className="h-6 w-6" />
          </div>
          <div className="ml-4">
            <h4 className="text-lg font-medium text-gray-900">Premium Audio</h4>
            <p className="mt-1 text-gray-600">Crystal clear sound for any venue size</p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-purple-100 text-purple-600">
            <FaLightbulb className="h-6 w-6" />
          </div>
          <div className="ml-4">
            <h4 className="text-lg font-medium text-gray-900">Dynamic Lighting</h4>
            <p className="mt-1 text-gray-600">Set the perfect mood with our lighting</p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-purple-100 text-purple-600">
            <FaVideo className="h-6 w-6" />
          </div>
          <div className="ml-4">
            <h4 className="text-lg font-medium text-gray-900">Visual Effects</h4>
            <p className="mt-1 text-gray-600">Stunning visuals that captivate</p>
          </div>
        </div>
      </div>
    </ServiceDetail>
  );
};

export default SoundLightVisual;
