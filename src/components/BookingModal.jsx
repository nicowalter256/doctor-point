/**
 * BookingModal (v2)
 * – Now works with the new structured timeSlot objects:
 *     { day: 'Mon', start: '09:00', end: '10:00' }
 */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/* ------------------------------------------------------------------
   Helpers
-------------------------------------------------------------------*/
const slotToLabel = (slot) => `${slot.day} ${slot.start} – ${slot.end}`;
const slotKey = (slot) => `${slot.day}-${slot.start}-${slot.end}`;

const BookingModal = ({
  doctor,
  selectedTimeSlot,
  onSelectTimeSlot,
  onClose,
  onConfirm,
}) => {
  if (!doctor) return null;

  const dialogRef = useRef(null);
  const selectRef = useRef(null);

  /* Focus trap & ESC close (unchanged) */
  useEffect(() => {
    selectRef.current?.focus();
    const onKeyDown = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  /* Confirm then close */
  const handleConfirm = async () => {
    await onConfirm(selectedTimeSlot); // passes the slot object
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
      aria-label="Booking modal"
    >
      <div ref={dialogRef} className="w-full max-w-md p-6 bg-white rounded-lg">
        <h2 className="mb-4 text-2xl font-semibold">
          Book Appointment with {doctor.name}
        </h2>
        <p className="mb-4 text-gray-600">Specialty: {doctor.specialty}</p>

        {/* Time slot picker */}
        <label htmlFor="time-slot" className="block mb-2 text-gray-700">
          Select Time Slot
        </label>
        <select
          id="time-slot"
          ref={selectRef}
          value={selectedTimeSlot ? slotKey(selectedTimeSlot) : ''}
          onChange={(e) => {
            const slot = doctor.timeSlots.find(
              (s) => slotKey(s) === e.target.value
            );
            onSelectTimeSlot(slot || null);
          }}
          className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          aria-describedby="time-slot-description"
        >
          <option value="">Select a time</option>
          {doctor.timeSlots.map((slot) => (
            <option key={slotKey(slot)} value={slotKey(slot)}>
              {slotToLabel(slot)}
            </option>
          ))}
        </select>
        <p id="time-slot-description" className="sr-only">
          Choose an available time slot for your appointment
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
            aria-label="Cancel booking"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!selectedTimeSlot}
            className="px-4 py-2 text-white bg-green-600 rounded-md disabled:bg-gray-400 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label="Confirm appointment"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------
   PropTypes
-------------------------------------------------------------------*/
BookingModal.propTypes = {
  doctor: PropTypes.shape({
    name: PropTypes.string.isRequired,
    specialty: PropTypes.string.isRequired,
    timeSlots: PropTypes.arrayOf(
      PropTypes.shape({
        day: PropTypes.string.isRequired,
        start: PropTypes.string.isRequired,
        end: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
  selectedTimeSlot: PropTypes.shape({
    day: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string,
  }),
  onSelectTimeSlot: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

BookingModal.defaultProps = {
  selectedTimeSlot: null,
};

export default BookingModal;
