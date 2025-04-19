/**
 * Doctors page
 * – Lists all doctors and lets user book an appointment.
 * – Persists appointments in localStorage with basic collision checks
 * – Shows toast notifications for success / duplicate / validation errors
 */
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import DoctorsDirectory from '../components/DoctorsDirectory';
import BookingModal from '../components/BookingModal';
import mockDoctors from '../assets/data/doctors';

/* ------------------------------------------------------------------
   Reusable localStorage helper for appointments
-------------------------------------------------------------------*/
const useAppointments = () => {
  const safeLoad = () => {
    try {
      return JSON.parse(localStorage.getItem('appointments') || '[]');
    } catch {
      return [];
    }
  };

  const isSlotBooked = (doctorId, dateISO, time) => {
    return safeLoad().some(
      (a) => a.doctorId === doctorId && a.date === dateISO && a.time === time
    );
  };

  const save = (appointment) => {
    const stored = safeLoad();
    localStorage.setItem('appointments', JSON.stringify([...stored, appointment]));
  };

  return { load: safeLoad, save, isSlotBooked };
};

const Doctors = () => {
  const { save, isSlotBooked } = useAppointments();

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  /* ---------- Handlers -------------------------------------------------- */

  const resetModal = () => {
    setSelectedDoctor(null);
    setSelectedTimeSlot('');
  };

  const handleBookAppointment = (doctor) => setSelectedDoctor(doctor);

  const handleConfirmBooking = () => {
    if (!selectedTimeSlot) {
      toast.error('Please pick a time slot first.');
      return;
    }

    const dateISO = new Date().toISOString().split('T')[0]; // yyyy‑mm‑dd

    // duplicate check
    if (isSlotBooked(selectedDoctor.id, dateISO, selectedTimeSlot)) {
      toast.warning('That time slot is already booked.');
      return;
    }

    const appointment = {
      id: crypto.randomUUID?.() || Date.now().toString(),
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      location: selectedDoctor.location,
      photo: selectedDoctor.photo,
      rating: selectedDoctor.rating,
      time: selectedTimeSlot,
      date: dateISO,
    };

    save(appointment);
    toast.success('Appointment booked successfully!');
    resetModal();
  };

  /* ---------- Render ---------------------------------------------------- */
  return (
    <div className="min-h-[72vh]">
      {/* Doctors Directory */}
      <DoctorsDirectory
        doctors={mockDoctors}
        onBookAppointment={handleBookAppointment}
      />

      {/* Booking Modal */}
      {selectedDoctor && (
        <BookingModal
          doctor={selectedDoctor}
          selectedTimeSlot={selectedTimeSlot}
          onSelectTimeSlot={setSelectedTimeSlot}
          onClose={resetModal}
          onConfirm={handleConfirmBooking}
        />
      )}
    </div>
  );
};

export default Doctors;
