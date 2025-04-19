// /* eslint-disable no-undef */
// import React from 'react';
// import { render, screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import BookingModal from './BookingModal';

// /**
//  * Helper to build the key string that BookingModal uses as each <option>'s value
//  */
// const slotKey = ({ day, start, end }) => `${day}-${start}-${end}`;

// /**
//  * Mock doctor with structured timeSlots
//  */
// const mockDoctor = {
//   name: 'Dr. John Doe',
//   specialty: 'Cardiology',
//   timeSlots: [
//     { day: 'Mon', start: '09:00', end: '10:00' },
//     { day: 'Tue', start: '10:00', end: '11:00' },
//     { day: 'Wed', start: '11:00', end: '12:00' },
//   ],
// };

// /**
//  * Renders the modal and returns user & spies
//  */
// const renderModal = (selectedTimeSlot = null) => {
//   const user = userEvent.setup();
//   const onSelectTimeSlot = jest.fn();
//   const onClose = jest.fn();
//   const onConfirm = jest.fn();

//   render(
//     <BookingModal
//       doctor={mockDoctor}
//       selectedTimeSlot={selectedTimeSlot}
//       onSelectTimeSlot={onSelectTimeSlot}
//       onClose={onClose}
//       onConfirm={onConfirm}
//     />
//   );

//   return { user, onSelectTimeSlot, onClose, onConfirm };
// };

// describe('BookingModal (v2)', () => {
//   test('Confirm button is disabled when no time is selected', () => {
//     renderModal();
//     expect(
//       screen.getByRole('button', { name: /confirm appointment/i })
//     ).toBeDisabled();
//   });

//   test('Selecting a slot triggers onSelectTimeSlot with the slot object', async () => {
//     const { user, onSelectTimeSlot } = renderModal();

//     const select = screen.getByLabelText(/select time slot/i);
//     // choose the first slot based on its visible label
//     const label = 'Mon 09:00 – 10:00';
//     await user.selectOptions(select, label);

//     expect(onSelectTimeSlot).toHaveBeenCalledWith(
//       mockDoctor.timeSlots[0]
//     );
//   });

//   test('Confirm button enables after selecting a time and calls onConfirm with slot object', async () => {
//     const { user, onConfirm } = renderModal();

//     const select = screen.getByLabelText(/select time slot/i);
//     const label = 'Tue 10:00 – 11:00';
//     await user.selectOptions(select, label);

//     const confirmBtn = screen.getByRole('button', {
//       name: /confirm appointment/i,
//     });
//     expect(confirmBtn).toBeEnabled();

//     await user.click(confirmBtn);

//     expect(onConfirm).toHaveBeenCalledWith(
//       mockDoctor.timeSlots[1]
//     );
//   });

//   test('Cancel button invokes onClose', async () => {
//     const { user, onClose } = renderModal(mockDoctor.timeSlots[2]);

//     const cancelBtn = screen.getByRole('button', { name: /cancel booking/i });
//     await user.click(cancelBtn);

//     expect(onClose).toHaveBeenCalled();
//   });

//   test('Confirm then close sequence', async () => {
//     const { user, onConfirm, onClose } = renderModal(mockDoctor.timeSlots[2]);

//     const confirmBtn = screen.getByRole('button', {
//       name: /confirm appointment/i,
//     });
//     await user.click(confirmBtn);

//     expect(onConfirm).toHaveBeenCalledWith(
//       mockDoctor.timeSlots[2]
//     );
//     expect(onClose).toHaveBeenCalled();
//   });

//   test('Focus trap cycles within modal (Tab)', async () => {
//     const { user } = renderModal(mockDoctor.timeSlots[0]);

//     // initial focus is on the select
//     const select = screen.getByLabelText(/select time slot/i);
//     expect(select).toHaveFocus();

//     // Tab → Cancel
//     await user.tab();
//     const cancelBtn = screen.getByRole('button', { name: /cancel booking/i });
//     expect(cancelBtn).toHaveFocus();

//     // Tab → Confirm
//     await user.tab();
//     const confirmBtn = screen.getByRole('button', {
//       name: /confirm appointment/i,
//     });
//     expect(confirmBtn).toHaveFocus();

//     // Tab → cycles back to select
//     await user.tab();
//     expect(select).toHaveFocus();
//   });

//   test('Escape key closes modal via onClose', async () => {
//     const { user, onClose } = renderModal(mockDoctor.timeSlots[1]);

//     await user.keyboard('{Escape}');
//     await waitFor(() => expect(onClose).toHaveBeenCalled());
//   });
// });
