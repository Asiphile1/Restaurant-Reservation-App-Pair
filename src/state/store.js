// import { configureStore } from '@reduxjs/toolkit';
// import authSlice from './slices/authSlice';
// import reservationSlice from './slices/reservationSlice';

// export const store = configureStore({
//   reducer: {
//     auth: authSlice,
//     reservations: reservationSlice,
//   },
// });


// src/state/store.js
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import reservationSlice from './slices/reservationSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    reservations: reservationSlice,
  },
});

export default store; // Ensure you export `store` correctly
