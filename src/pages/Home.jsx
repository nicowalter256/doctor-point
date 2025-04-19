/**
 * Home dashboard
 * – Shows welcome message and key summary metrics.
 * – Loads appointment count from localStorage with safe parsing.
 * – Derives doctor metrics via useMemo (doctors list is static import).
 */
import React, { useEffect, useState, useMemo } from 'react';
import { Calendar, Users, Stethoscope, Heart } from 'lucide-react';

import Welcome from '../components/Welcome';
import SummaryCard from '../components/SummaryCard';
import doctors from '../assets/data/doctors';

const Home = () => {
  /* ----------------------------------------------------------------
     State – only the dynamic value: appointment count
  -----------------------------------------------------------------*/
  const [appointmentCount, setAppointmentCount] = useState(0);

  /* Load appointments from localStorage (safely) */
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('appointments') || '[]');
      setAppointmentCount(stored.length);
    } catch {
      setAppointmentCount(0);
    }
  }, []);

  /* ----------------------------------------------------------------
     Derived doctor metrics – memoised (doctors never changes)
  -----------------------------------------------------------------*/
  const doctorMetrics = useMemo(() => {
    const total = doctors.length;
    const available = doctors.filter((d) => d.availability.length > 0).length;
    const specialties = new Set(doctors.map((d) => d.specialty)).size;
    return { total, available, specialties };
  }, []);

  /* ----------------------------------------------------------------
     Render
  -----------------------------------------------------------------*/
  return (
    <div className="min-h-[70vh]">
      <Welcome />

      <div className="grid grid-cols-1 gap-6 mx-auto mt-6 sm:grid-cols-2 lg:grid-cols-3">
        <SummaryCard
          title="Active Appointments"
          number={appointmentCount}
          icon={<Calendar className="w-6 h-6 text-green-600" />}
          iconBgColor="bg-green-100"
        />

        <SummaryCard
          title="Total Doctors"
          number={doctorMetrics.total}
          icon={<Users className="w-6 h-6 text-indigo-600" />}
          iconBgColor="bg-indigo-100"
        />

        <SummaryCard
          title="Available Doctors"
          number={doctorMetrics.available}
          icon={<Stethoscope className="w-6 h-6 text-blue-600" />}
          iconBgColor="bg-blue-100"
        />

        <SummaryCard
          title="Specialties"
          number={doctorMetrics.specialties}
          icon={<Heart className="w-6 h-6 text-purple-600" />}
          iconBgColor="bg-purple-100"
        />
      </div>
    </div>
  );
};

export default Home;
