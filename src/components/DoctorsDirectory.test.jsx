/* eslint-disable no-undef */
import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DoctorsDirectory from './DoctorsDirectory';

/* ------------------------------------------------------------------
   Mock the child DoctorCard to keep tests focused on directory logic
-------------------------------------------------------------------*/
jest.mock('./DoctorCard', () => {
  const React = require('react');
  const PropTypes = require('prop-types');

  const MockDoctorCard = ({ doctor, onBookAppointment }) => (
    <div data-testid="doctor-card">
      <p>{doctor.name}</p>
      <button onClick={() => onBookAppointment(doctor)}>Book</button>
    </div>
  );

  MockDoctorCard.propTypes = {
    doctor: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
    onBookAppointment: PropTypes.func.isRequired,
  };

  MockDoctorCard.displayName = 'MockDoctorCard';
  return MockDoctorCard;
});

/* ------------------------------------------------------------------
   Test data – satisfies all PropTypes in DoctorsDirectory
-------------------------------------------------------------------*/
const mockDoctors = [
  {
    id: 1,
    name: 'Dr. Alice',
    specialty: 'Dermatology',
    availability: ['Mon', 'Wed'],
    rating: 4.7,
    photo: '/alice.jpg',
    location: 'Kampala',
  },
  {
    id: 2,
    name: 'Dr. Bob',
    specialty: 'Cardiology',
    availability: ['Tue', 'Thu'],
    rating: 4.8,
    photo: '/bob.jpg',
    location: 'Jinja',
  },
  {
    id: 3,
    name: 'Dr. Charlie',
    specialty: 'Cardiology',
    availability: ['Fri'],
    rating: 4.9,
    photo: '/charlie.jpg',
    location: 'Entebbe',
  },
];

/* ------------------------------------------------------------------
   Test suite
-------------------------------------------------------------------*/
describe('DoctorsDirectory', () => {
  test('renders all doctors initially', () => {
    render(<DoctorsDirectory doctors={mockDoctors} onBookAppointment={jest.fn()} />);
    expect(screen.getAllByTestId('doctor-card')).toHaveLength(3);
  });

  test('filters by specialty', async () => {
    render(<DoctorsDirectory doctors={mockDoctors} onBookAppointment={jest.fn()} />);

    const specialtySelect = screen.getByLabelText(/specialty/i);
    await userEvent.selectOptions(specialtySelect, 'Cardiology');

    expect(screen.getAllByTestId('doctor-card')).toHaveLength(2);
    expect(screen.getByText('Dr. Bob')).toBeInTheDocument();
    expect(screen.getByText('Dr. Charlie')).toBeInTheDocument();
  });

  test('filters by availability', async () => {
    render(<DoctorsDirectory doctors={mockDoctors} onBookAppointment={jest.fn()} />);

    const availabilitySelect = screen.getByLabelText(/availability/i);
    await userEvent.selectOptions(availabilitySelect, 'Wed');

    expect(screen.getByText('Dr. Alice')).toBeInTheDocument();
    expect(screen.queryByText('Dr. Bob')).toBeNull();
    expect(screen.queryByText('Dr. Charlie')).toBeNull();
  });

  test('filters by both specialty and availability', async () => {
    render(<DoctorsDirectory doctors={mockDoctors} onBookAppointment={jest.fn()} />);

    await userEvent.selectOptions(screen.getByLabelText(/specialty/i), 'Cardiology');
    await userEvent.selectOptions(screen.getByLabelText(/availability/i), 'Fri');

    expect(screen.getByText('Dr. Charlie')).toBeInTheDocument();
    expect(screen.queryByText('Dr. Bob')).toBeNull();
  });

  test('shows message when no doctors match filters', async () => {
    render(<DoctorsDirectory doctors={mockDoctors} onBookAppointment={jest.fn()} />);

    await userEvent.selectOptions(screen.getByLabelText(/specialty/i), 'Cardiology');
    await userEvent.selectOptions(screen.getByLabelText(/availability/i), 'Wed');

    expect(screen.getByText(/no doctors match your selected filters/i)).toBeInTheDocument();
  });

  test('calls onBookAppointment when button is clicked', async () => {
    const mockHandler = jest.fn();
    render(<DoctorsDirectory doctors={mockDoctors} onBookAppointment={mockHandler} />);

    const firstCard = screen.getAllByTestId('doctor-card')[0];
    const bookButton = within(firstCard).getByRole('button', { name: /book/i });
    await userEvent.click(bookButton);

    expect(mockHandler).toHaveBeenCalledWith(mockDoctors[0]);
  });
});
