import React from 'react';
import PropTypes from 'prop-types';

/**
 * Formats a structured time‑slot object `{ day, start, end }`
 * into a user‑friendly string  →  “Mon 09:00 – 10:00”.
 */
const formatSlot = (slot) =>
  slot && typeof slot === 'object'
    ? `${slot.day} ${slot.start} – ${slot.end}`
    : slot; // fallback for legacy string

/**
 * AppointmentsList — lists upcoming appointments.
 *
 * Props
 * -------
 * appointments: Array<Appointment>
 * onCancelAppointment: (id: string | number) => void
 *
 * Where Appointment = {
 *   id, doctorName, specialty, date, time (string | TimeSlot),
 *   location, rating, photo
 * }
 */
const AppointmentsList = ({ appointments, onCancelAppointment }) => (
  <div>
    <h1 className="mb-6 text-lg font-bold text-gray-800">My Appointments</h1>

    {/* Empty‑state */}
    {appointments.length === 0 && (
      <div className="py-8 text-center">
        <p className="text-gray-600">You don’t have any upcoming appointments.</p>
      </div>
    )}

    {/* Appointments */}
    {appointments.length > 0 && (
      <div
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {appointments.map((appt) => (
          <article
            key={appt.id}
            role="listitem"
            tabIndex={0}
            aria-labelledby={`appt-${appt.id}-heading`}
            className="flex flex-col overflow-hidden bg-white rounded-lg shadow-md focus-within:shadow-lg hover:shadow-lg"
          >
            <div className="flex flex-col flex-grow p-4">
              {/* Header */}
              <header className="flex items-center mb-4">
                <img
                  src={appt.photo}
                  alt={`Portrait of Dr. ${appt.doctorName}`}
                  className="object-cover w-16 h-16 mr-4 rounded-full"
                  width={64}
                  height={64}
                  loading="lazy"
                />
                <div>
                  <h2
                    id={`appt-${appt.id}-heading`}
                    className="text-lg font-semibold text-gray-800"
                  >
                    {appt.doctorName}
                  </h2>
                  <p className="text-gray-600">{appt.specialty}</p>

                  {/* Accessible rating */}
                  <div
                    className="flex items-center mt-1"
                    aria-label={`Rating ${appt.rating} out of 5`}
                  >
                    <span aria-hidden="true" className="text-yellow-500">★</span>
                    <span className="ml-1 text-gray-700">{appt.rating}</span>
                  </div>
                </div>
              </header>

              {/* Details */}
              <section className="mb-4 text-gray-700">
                <p className="mb-1">
                  <span className="font-medium">Date:</span> {appt.date}
                </p>
                <p className="mb-1">
                  <span className="font-medium">Time:</span>{' '}
                  {formatSlot(appt.time)}
                </p>
                <p>
                  <span className="font-medium">Location:</span> {appt.location}
                </p>
              </section>

              {/* Spacer pushes CTA to bottom */}
              <div className="mt-auto" />

              {/* Cancel button */}
              <button
                type="button"
                onClick={() => onCancelAppointment(appt.id)}
                className="w-full px-4 py-2 text-gray-800 transition-colors duration-300 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                aria-label={`Cancel appointment with Dr. ${appt.doctorName}`}
              >
                Cancel Appointment
              </button>
            </div>
          </article>
        ))}
      </div>
    )}
  </div>
);

/* ------------------------------------------------------------------
   PropTypes – runtime contract
-------------------------------------------------------------------*/
AppointmentsList.propTypes = {
  appointments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      doctorName: PropTypes.string.isRequired,
      specialty: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      time: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          day: PropTypes.string.isRequired,
          start: PropTypes.string.isRequired,
          end: PropTypes.string.isRequired,
        }),
      ]).isRequired,
      location: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      photo: PropTypes.string.isRequired,
    })
  ),
  onCancelAppointment: PropTypes.func,
};

AppointmentsList.defaultProps = {
  appointments: [],
  onCancelAppointment: () => { },
};

export default AppointmentsList;
