import React from 'react';
import { useParams } from 'react-router-dom';
import EventDetail from './details/EventDetail';

// Sample event data - in a real app, this would come from an API
const EVENTS_DATA = [
  {
    id: 'new-year-celebration',
    title: 'New Year Celebration',
    date: 'December 31, 2025',
    time: '08:00 PM - 01:00 AM',
    location: 'Public Grounds, Vijayawada',
    address: 'Benz Circle, Vijayawada, Andhra Pradesh 520008',
    mapLink: 'https://goo.gl/maps/example',
    ticketPrice: 'Starting at ₹999',
    ticketLink: '#',
    description: 'Ring in the New Year with a spectacular fireworks display and live entertainment. Join thousands of people as we countdown to 2026 with music, food, and an unforgettable fireworks show.',
    highlights: [
      'Midnight fireworks extravaganza',
      'Live music performances',
      'Food stalls with local delicacies',
      'Family-friendly activities',
      'VIP lounge with premium views'
    ],
    schedule: [
      {
        time: '08:00 PM',
        title: 'Gates Open',
        description: 'Arrive early to get the best spots'
      },
      {
        time: '09:00 PM',
        title: 'Live Music Begins',
        description: 'Local bands and performers take the stage'
      },
      {
        time: '11:30 PM',
        title: 'Countdown Show',
        description: 'Special performances leading up to midnight'
      },
      {
        time: '12:00 AM',
        title: 'Fireworks Display',
        description: 'Spectacular fireworks to welcome the new year'
      },
      {
        time: '12:30 AM',
        title: 'After Party',
        description: 'Continue the celebration with DJ and dancing'
      }
    ],
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    galleryImage1: 'https://c8.alamy.com/comp/2MPC9JP/visitors-watch-the-fireworks-display-during-a-new-year-celebration-event-at-the-hakkeijima-sea-paradise-aquarium-amusement-park-complex-in-yokohama-southwest-of-tokyo-monday-jan-1-2018-ap-photoshizuo-kambayashi-2MPC9JP.jpg',
    galleryImage2: 'https://i.pinimg.com/originals/31/8e/74/318e7476fa76984b0685d3cde7511a39.jpg'
  },
  {
    id: 'sankranthi-festival',
    title: 'Sankranthi Festival',
    date: 'January 14, 2026',
    time: '06:00 AM - 10:00 PM',
    location: 'Godavari River Bank',
    address: 'Rajahmundry, Andhra Pradesh',
    mapLink: 'https://goo.gl/maps/example2',
    ticketPrice: 'Free Entry',
    description: 'Celebrate the harvest festival with traditional rituals, cultural performances, and a grand fireworks display over the Godavari river.',
    highlights: [
      'Traditional puja and rituals',
      'Cultural performances',
      'Kite flying competition',
      'Rangoli competition',
      'Evening fireworks over the river'
    ],
    image: 'https://i.pinimg.com/736x/ca/b9/f1/cab9f12141267677a4220eeb44af70ca.jpg',
    galleryImage1: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    galleryImage2: 'https://i.pinimg.com/originals/73/29/05/7329054145993e70de302920b4b11500.jpg'
  },
  {
    id: 'wedding-fireworks',
    title: 'Wedding Fireworks',
    date: 'Custom Date',
    description: 'Make your special day even more magical with our custom wedding fireworks. We create personalized displays to match your wedding theme and music.',
    highlights: [
      'Custom-designed fireworks show',
      'Synchronized to your wedding music',
      'Variety of effects and colors',
      'Eco-friendly options available',
      'Professional setup and cleanup'
    ],
    image: 'https://www.sparkfx.com.au/wp-content/uploads/2019/01/3.jpg',
    galleryImage1: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    galleryImage2: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  }
];

const EventsPage = () => {
  const { eventId } = useParams();
  const event = EVENTS_DATA.find(e => e.id === eventId);

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-6">The event you're looking for doesn't exist or has been moved.</p>
          <a 
            href="/" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 transition-colors duration-300"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return <EventDetail event={event} />;
};

export default EventsPage;
