/* eslint-disable react/prop-types */
import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import DoctorCard from './DoctorCard';

/* ------------------------------------------------------------------
   Centralised availability list
-------------------------------------------------------------------*/
const availabilityOptions = [
  { label: 'Any day', value: 'All' },
  { label: 'Monday', value: 'Mon' },
  { label: 'Tuesday', value: 'Tue' },
  { label: 'Wednesday', value: 'Wed' },
  { label: 'Thursday', value: 'Thu' },
  { label: 'Friday', value: 'Fri' },
  { label: 'Saturday', value: 'Sat' },
];

const DoctorsDirectory = ({ doctors, onBookAppointment }) => {
  /* ----------------------------------------------------------------
     Local state
  -----------------------------------------------------------------*/
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState('All');

  /* ----------------------------------------------------------------
     Derived data (memoised)
  -----------------------------------------------------------------*/
  const specialties = useMemo(
    () => ['All', ...new Set(doctors.map(({ specialty }) => specialty))],
    [doctors]
  );

  const filteredDoctors = useMemo(() => {
    return doctors.filter(({ specialty, availability }) => {
      const specialtyMatch = selectedSpecialty === 'All' || specialty === selectedSpecialty;
      const availabilityMatch = selectedAvailability === 'All' || availability.includes(selectedAvailability);
      return specialtyMatch && availabilityMatch;
    });
  }, [doctors, selectedSpecialty, selectedAvailability]);

  /* ----------------------------------------------------------------
     Render
  -----------------------------------------------------------------*/
  return (
    <section aria-labelledby="directory-heading">
      <h1
        id="directory-heading"
        className="mb-4 text-xl font-bold text-gray-800"
      >
        Find a Doctor
      </h1>

      {/* Live region for screen‑reader users */}
      <p aria-live="polite" className="sr-only">
        {filteredDoctors.length} doctors found
      </p>

      {/* Filters --------------------------------------------------- */}
      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
        {/* Specialty */}
        <div>
          <label
            htmlFor="specialty-filter"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Specialty
          </label>
          <select
            id="specialty-filter"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
          >
            {specialties.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Availability */}
        <div>
          <label
            htmlFor="availability-filter"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Availability
          </label>
          <select
            id="availability-filter"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={selectedAvailability}
            onChange={(e) => setSelectedAvailability(e.target.value)}
          >
            {availabilityOptions.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Doctor cards --------------------------------------------- */}
      <div
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filteredDoctors.length ? (
          filteredDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onBookAppointment={onBookAppointment}
            />
          ))
        ) : (
          <p className="py-8 col-span-full text-center text-gray-600">
            No doctors match your selected filters.
          </p>
        )}
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------
   PropTypes – defensive runtime contract
-------------------------------------------------------------------*/
DoctorsDirectory.propTypes = {
  doctors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      specialty: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      photo: PropTypes.string.isRequired,
      availability: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ),
  onBookAppointment: PropTypes.func,
};

DoctorsDirectory.defaultProps = {
  doctors: [],
  onBookAppointment: () => { },
};

export default DoctorsDirectory;
