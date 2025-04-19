/**
 * Mock doctor dataset with stronger typing hints and normalized time‑slot
 * structure (ISO 24‑hour times). Image URLs can be swapped for local assets.
 *
 * @typedef {Object} TimeSlot
 * @property {string} day   Three‑letter day code (Mon – Sun)
 * @property {string} start Start time (HH:mm, 24‑h)
 * @property {string} end   End   time (HH:mm, 24‑h)
 *
 * @typedef {Object} Doctor
 * @property {string}   id
 * @property {string}   name
 * @property {string}   specialty
 * @property {number}   rating
 * @property {string[]} availability  // e.g. ['Mon','Wed']
 * @property {string}   location
 * @property {string}   photo
 * @property {TimeSlot[]} timeSlots
 */

/** @type {Doctor[]} */
const mockDoctors = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    rating: 4.8,
    availability: ['Mon', 'Wed', 'Fri'],
    location: 'Downtown Medical Center, New York NY',
    photo: 'https://randomuser.me/api/portraits/women/65.jpg',
    timeSlots: [
      { day: 'Mon', start: '09:00', end: '10:00' },
      { day: 'Wed', start: '11:00', end: '12:00' },
      { day: 'Fri', start: '14:00', end: '15:00' },
    ],
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Pediatrics',
    rating: 4.9,
    availability: ['Tue', 'Thu', 'Sat'],
    location: 'Sunnyvale Clinic, Boston MA',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    timeSlots: [
      { day: 'Tue', start: '10:00', end: '11:00' },
      { day: 'Thu', start: '13:00', end: '14:00' },
      { day: 'Sat', start: '15:00', end: '16:00' },
    ],
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Dermatology',
    rating: 4.7,
    availability: ['Mon', 'Thu', 'Fri'],
    location: 'Westside Health, Chicago IL',
    photo: 'https://randomuser.me/api/portraits/women/45.jpg',
    timeSlots: [
      { day: 'Mon', start: '08:30', end: '09:30' },
      { day: 'Thu', start: '12:00', end: '13:00' },
      { day: 'Fri', start: '16:00', end: '17:00' },
    ],
  },
  {
    id: '4',
    name: 'Dr. James Patel',
    specialty: 'Orthopedics',
    rating: 4.6,
    availability: ['Wed', 'Fri', 'Sat'],
    location: 'City Ortho Care, Los Angeles CA',
    photo: 'https://randomuser.me/api/portraits/men/78.jpg',
    timeSlots: [
      { day: 'Wed', start: '09:30', end: '10:30' },
      { day: 'Fri', start: '11:30', end: '12:30' },
      { day: 'Sat', start: '14:30', end: '15:30' },
    ],
  },
  {
    id: '5',
    name: 'Dr. Aisha Khan',
    specialty: 'Neurology',
    rating: 4.9,
    availability: ['Mon', 'Tue', 'Thu'],
    location: 'NeuroHealth Institute, Seattle WA',
    photo: 'https://randomuser.me/api/portraits/women/23.jpg',
    timeSlots: [
      { day: 'Mon', start: '10:30', end: '11:30' },
      { day: 'Tue', start: '13:30', end: '14:30' },
      { day: 'Thu', start: '15:30', end: '16:30' },
    ],
  },
  {
    id: '6',
    name: 'Dr. Robert Kim',
    specialty: 'Gastroenterology',
    rating: 4.5,
    availability: ['Tue', 'Wed', 'Fri'],
    location: 'Metro Health, Miami FL',
    photo: 'https://randomuser.me/api/portraits/men/19.jpg',
    timeSlots: [
      { day: 'Tue', start: '09:00', end: '10:00' },
      { day: 'Wed', start: '12:30', end: '13:30' },
      { day: 'Fri', start: '15:00', end: '16:00' },
    ],
  },
  {
    id: '7',
    name: 'Dr. Linda Martinez',
    specialty: 'Endocrinology',
    rating: 4.8,
    availability: ['Mon', 'Thu', 'Sat'],
    location: 'HealthPlus Clinic, Houston TX',
    photo: 'https://randomuser.me/api/portraits/women/88.jpg',
    timeSlots: [
      { day: 'Mon', start: '08:00', end: '09:00' },
      { day: 'Thu', start: '11:00', end: '12:00' },
      { day: 'Sat', start: '14:00', end: '15:00' },
    ],
  },
  {
    id: '8',
    name: 'Dr. David Okoye',
    specialty: 'Oncology',
    rating: 4.7,
    availability: ['Wed', 'Fri', 'Sat'],
    location: 'Cancer Care Center, Atlanta GA',
    photo: 'https://randomuser.me/api/portraits/men/56.jpg',
    timeSlots: [
      { day: 'Wed', start: '10:00', end: '11:00' },
      { day: 'Fri', start: '13:00', end: '14:00' },
      { day: 'Sat', start: '16:00', end: '17:00' },
    ],
  },
];

export default mockDoctors;
