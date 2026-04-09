// import { configureStore } from '@reduxjs/toolkit'
// import locationSlice  from './slice/location.slice'
// import  packageSlice    from './slice/package.slice'
// import  itinearySlice  from './slice/itineary.slice'
// import  blogSlice  from './slice/blog.slice'
// import  transportSlice  from './slice/transport.slice'
// import  vendorSlice  from './slice/vendor.slice'
// import  serviceSlice  from './slice/service.slice'
// import  roomSlice  from './slice/room.slice'
// import hotelSlice from './slice/hotel.slice'
// import restaurantSlice  from './slice/restaurant.slice'
// import contectSlice  from './slice/contect.slice'
// import authSlice from './slice/auth.slice'
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web




// export const store = configureStore({
//   reducer: {
//     location: locationSlice,
//     package: packageSlice,
//     itineary:itinearySlice,
//     blog:blogSlice,
//     transport:transportSlice,
//     vendor:vendorSlice,
//     service:serviceSlice,
//     room:roomSlice,
//     hotel:hotelSlice,
//     restaurant:restaurantSlice,
//     contect:contectSlice,
//     auth: authSlice

//   },
// })

// export default locationSlice.reducer


// // Source - https://stackoverflow.com/a/63818121
// // Posted by Manuj Kathuria
// // Retrieved 2026-03-26, License - CC BY-SA 4.0

import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import { combineReducers } from "redux";
import { persistReducer, persistStore } from 'redux-persist'
import { thunk } from 'redux-thunk'
import locationSlice from './slice/location.slice'
import packageSlice from './slice/package.slice'
import itinearySlice from './slice/itineary.slice'
import blogSlice from './slice/blog.slice'
import transportSlice from './slice/transport.slice'
import vendorSlice from './slice/vendor.slice'
import serviceSlice from './slice/service.slice'
import roomSlice from './slice/room.slice'
import hotelSlice from './slice/hotel.slice'
import restaurantSlice from './slice/restaurant.slice'
import contectSlice from './slice/contect.slice'
import authSlice from './slice/auth.slice'
import bookingSlice from './slice/bookpackage.slice'
import paymentSlice  from './slice/payment.slice'
import passengerSlice  from './slice/passenger.slice'



const reducers = combineReducers({
  location: locationSlice,
  package: packageSlice,
  itineary: itinearySlice,
  blog: blogSlice,
  transport: transportSlice,
  vendor: vendorSlice,
  service: serviceSlice,
  room: roomSlice,
  hotel: hotelSlice,
  restaurant: restaurantSlice,
  contect: contectSlice,
  auth: authSlice,
  bookpackage:bookingSlice,
  payment:paymentSlice,
  passenger:passengerSlice 
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, reducers);


const store = configureStore(
  {
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });

export let persistor = persistStore(store)


export default store;
