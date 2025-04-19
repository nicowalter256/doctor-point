/* eslint-disable react/prop-types */   /* Keep ONLY this rule disabled */
/**
 * DoctorCard – reusable display + CTA for a single doctor
 */
import React from 'react';
import PropTypes from 'prop-types';

const DoctorCard = ({ doctor, onBookAppointment }) => {
  const {
    id,
    name,
    photo,
    specialty,
    rating,
    location,
    availability,
  } = doctor;

  return (
    /* ARTICLE → better landmark semantics; role="listitem" aids SRs in a list/grid */
    <article
      role="listitem"
      tabIndex={0}
      aria-labelledby={`doctor-${id}-name`}
      className="flex flex-col h-full overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md focus-within:shadow-lg hover:shadow-lg"
    >
      {/* Content wrapper flex‑grows to push button to bottom */}
      <div className="flex flex-col flex-grow p-4">

        {/* Header */}
        <header className="flex items-center mb-4">
          <img
            src={photo}
            alt={`Portrait of Dr. ${name}`}
            className="object-cover w-16 h-16 mr-4 rounded-full"
            width={64}
            height={64}
            loading="lazy"
          />

          <div>
            <h2 id={`doctor-${id}-name`} className="text-lg font-semibold text-gray-800">
              {name}
            </h2>
            <p className="text-gray-600">{specialty}</p>

            {/* Accessible rating */}
            <div
              className="flex items-center mt-1"
              aria-label={`Rating ${rating} out of 5`}
            >
              <span aria-hidden="true" className="text-yellow-500">★</span>
              <span className="ml-1 text-gray-700">{rating}</span>
            </div>
          </div>
        </header>

        {/* Details */}
        <section className="mb-4 text-gray-700">
          <p className="mb-1">
            <span className="font-medium">Location:</span> {location}
          </p>
          <p>
            <span className="font-medium">Available:</span> {availability.join(', ')}
          </p>
        </section>

        {/* Spacer pushes CTA down when content is short */}
        <div className="mt-auto" />

        {/* CTA */}
        <button
          type="button"
          onClick={() => onBookAppointment(doctor)}
          className="w-full px-4 py-2 text-white transition-colors duration-300 bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          aria-label={`Book appointment with Dr. ${name}`}
        >
          Book Appointment
        </button>
      </div>
    </article>
  );
};

/* -----------------------------------------------------------------
   PropTypes – defensive runtime contract (dev / test environments)
------------------------------------------------------------------*/
DoctorCard.propTypes = {
  doctor: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    specialty: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
    availability: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onBookAppointment: PropTypes.func,  // optional → we default‑noop
};

DoctorCard.defaultProps = {
  onBookAppointment: () => { },
};

export default DoctorCard;
