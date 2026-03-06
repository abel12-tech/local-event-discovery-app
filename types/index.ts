export interface Event {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  date: string;
  time: string;
  location: {
    address: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  imageUrl: string;
  price: number;
  organizer: {
    name: string;
    avatar: string;
  };
  attendees: number;
  maxAttendees: number;
}

export type EventCategory =
  | 'Music'
  | 'Tech'
  | 'Business'
  | 'Sports'
  | 'Education'
  | 'Food'
  | 'Art'
  | 'Social';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Filter {
  category: EventCategory | 'All';
  dateRange: 'All' | 'Today' | 'This Week' | 'This Month';
  priceType: 'All' | 'Free' | 'Paid';
}
