import React, { useState, useEffect } from 'react';
import AppointmentsList from '../components/AppointmentsLists';
import { toast } from 'react-toastify';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('appointments') || '[]');
    setAppointments(stored);
  }, []);

  const handleCancelAppointment = (appointmentId) => {
    const updatedAppointments = appointments.filter((a) => a.id !== appointmentId);
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    toast.error('Appointment cancelled successfully!');
  };

  return (
    <div className="min-h-[72vh]">
      <AppointmentsList
        appointments={appointments}
        onCancelAppointment={handleCancelAppointment}
      />
    </div>
  );
};

export default Appointments;