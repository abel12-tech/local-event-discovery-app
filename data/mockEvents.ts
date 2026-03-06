import { Event } from '@/types';

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Summer Music Festival 2026',
    description:
      'Join us for an unforgettable evening featuring top local and international artists. Experience live performances across multiple stages with food trucks and art installations.',
    category: 'Music',
    date: '2026-03-15',
    time: '18:00',
    location: {
      address: 'Central Park, New York, NY',
      coordinates: {
        latitude: 40.7829,
        longitude: -73.9654,
      },
    },
    imageUrl:
      'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1200',
    price: 45,
    organizer: {
      name: 'Music Events Co.',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    attendees: 342,
    maxAttendees: 500,
  },
  {
    id: '2',
    title: 'Tech Innovators Conference',
    description:
      'Connect with industry leaders and explore cutting-edge technologies. Featuring keynotes, workshops, and networking sessions focused on AI, blockchain, and cloud computing.',
    category: 'Tech',
    date: '2026-03-08',
    time: '09:00',
    location: {
      address: 'Convention Center, San Francisco, CA',
      coordinates: {
        latitude: 37.7749,
        longitude: -122.4194,
      },
    },
    imageUrl:
      'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1200',
    price: 0,
    organizer: {
      name: 'TechHub SF',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    attendees: 89,
    maxAttendees: 200,
  },
  {
    id: '3',
    title: 'Startup Networking Mixer',
    description:
      'Meet fellow entrepreneurs, investors, and innovators in an informal setting. Perfect for making connections and exploring collaboration opportunities.',
    category: 'Business',
    date: '2026-03-07',
    time: '19:00',
    location: {
      address: 'Innovation Hub, Austin, TX',
      coordinates: {
        latitude: 30.2672,
        longitude: -97.7431,
      },
    },
    imageUrl:
      'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1200',
    price: 0,
    organizer: {
      name: 'Startup Austin',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    attendees: 56,
    maxAttendees: 100,
  },
  {
    id: '4',
    title: 'Marathon City Run 2026',
    description:
      'Annual city marathon with routes for all fitness levels. Includes 5K, 10K, and full marathon options with professional timing and medals for all finishers.',
    category: 'Sports',
    date: '2026-03-20',
    time: '07:00',
    location: {
      address: 'Downtown Chicago, IL',
      coordinates: {
        latitude: 41.8781,
        longitude: -87.6298,
      },
    },
    imageUrl:
      'https://images.pexels.com/photos/2524739/pexels-photo-2524739.jpeg?auto=compress&cs=tinysrgb&w=1200',
    price: 35,
    organizer: {
      name: 'Chicago Runners Club',
      avatar: 'https://i.pravatar.cc/150?img=4',
    },
    attendees: 1240,
    maxAttendees: 2000,
  },
  {
    id: '5',
    title: 'Introduction to Machine Learning',
    description:
      'Hands-on workshop covering ML fundamentals, neural networks, and practical applications. Bring your laptop and get ready to code!',
    category: 'Education',
    date: '2026-03-12',
    time: '14:00',
    location: {
      address: 'Tech Academy, Seattle, WA',
      coordinates: {
        latitude: 47.6062,
        longitude: -122.3321,
      },
    },
    imageUrl:
      'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200',
    price: 25,
    organizer: {
      name: 'Code Academy',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    attendees: 45,
    maxAttendees: 50,
  },
  {
    id: '6',
    title: 'Food Truck Festival',
    description:
      'Taste cuisine from around the world at our annual food truck gathering. Live music, craft beer garden, and family-friendly activities all day long.',
    category: 'Food',
    date: '2026-03-14',
    time: '11:00',
    location: {
      address: 'Waterfront Park, Portland, OR',
      coordinates: {
        latitude: 45.5152,
        longitude: -122.6784,
      },
    },
    imageUrl:
      'https://images.pexels.com/photos/1898555/pexels-photo-1898555.jpeg?auto=compress&cs=tinysrgb&w=1200',
    price: 0,
    organizer: {
      name: 'Portland Food Events',
      avatar: 'https://i.pravatar.cc/150?img=6',
    },
    attendees: 567,
    maxAttendees: 1000,
  },
  {
    id: '7',
    title: 'Contemporary Art Exhibition',
    description:
      'Explore works from emerging artists in our curated exhibition. Opening night includes artist talks, wine reception, and guided tours.',
    category: 'Art',
    date: '2026-03-10',
    time: '18:30',
    location: {
      address: 'Modern Art Gallery, Miami, FL',
      coordinates: {
        latitude: 25.7617,
        longitude: -80.1918,
      },
    },
    imageUrl:
      'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=1200',
    price: 15,
    organizer: {
      name: 'Miami Arts Foundation',
      avatar: 'https://i.pravatar.cc/150?img=7',
    },
    attendees: 78,
    maxAttendees: 150,
  },
  {
    id: '8',
    title: 'Community Garden Workshop',
    description:
      'Learn sustainable gardening techniques and meet your neighbors. We will cover composting, seasonal planting, and organic pest control.',
    category: 'Social',
    date: '2026-03-09',
    time: '10:00',
    location: {
      address: 'Community Center, Denver, CO',
      coordinates: {
        latitude: 39.7392,
        longitude: -104.9903,
      },
    },
    imageUrl:
      'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=1200',
    price: 0,
    organizer: {
      name: 'Green Denver',
      avatar: 'https://i.pravatar.cc/150?img=8',
    },
    attendees: 23,
    maxAttendees: 40,
  },
  {
    id: '9',
    title: 'Jazz Night Under the Stars',
    description:
      'Elegant evening of smooth jazz in an intimate outdoor setting. Featuring the city is best jazz quartet with a full bar and light bites available.',
    category: 'Music',
    date: '2026-03-18',
    time: '20:00',
    location: {
      address: 'Rooftop Lounge, New Orleans, LA',
      coordinates: {
        latitude: 29.9511,
        longitude: -90.0715,
      },
    },
    imageUrl:
      'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1200',
    price: 30,
    organizer: {
      name: 'NOLA Jazz Society',
      avatar: 'https://i.pravatar.cc/150?img=9',
    },
    attendees: 67,
    maxAttendees: 100,
  },
  {
    id: '10',
    title: 'Blockchain & Web3 Meetup',
    description:
      'Monthly gathering for blockchain enthusiasts and developers. Presentations on latest projects, followed by open discussion and networking.',
    category: 'Tech',
    date: '2026-03-11',
    time: '18:00',
    location: {
      address: 'Tech Coworking Space, Boston, MA',
      coordinates: {
        latitude: 42.3601,
        longitude: -71.0589,
      },
    },
    imageUrl:
      'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=1200',
    price: 0,
    organizer: {
      name: 'Boston Blockchain',
      avatar: 'https://i.pravatar.cc/150?img=10',
    },
    attendees: 34,
    maxAttendees: 60,
  },
];
