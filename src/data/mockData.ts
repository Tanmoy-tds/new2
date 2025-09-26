export type UserProfile = {
  name: string;
  email: string;
  phone: string;
  country: string;
  passport?: string;
};

export type ItineraryItem = {
  id: string | number;
  title: string;
  time: string;
  notes?: string;
};

export const USER: UserProfile = {
  name: 'Traveler',
  email: 'traveler@example.com',
  phone: '+91 90000 00001',
  country: 'India',
  passport: 'X1234567',
};

export const ITINERARY: ItineraryItem[] = [
  { id: 1, title: 'Arrive Shillong - Check in', time: '2025-06-10 09:00', notes: 'Hotel check-in and orientation' },
  { id: 2, title: 'Visit Elephant Falls', time: '2025-06-10 12:00' },
  { id: 3, title: 'Trek Living Root Bridge', time: '2025-06-11 08:00' },
];

export const EMERGENCY_CONTACTS = [
  { id: 1, label: 'Toll-free Tourist Helpline', number: '1800-11-1363' },
  { id: 2, label: 'Local Police', number: '100' },
  { id: 3, label: 'Ambulance', number: '102' },
];
