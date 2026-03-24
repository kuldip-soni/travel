import { configureStore } from '@reduxjs/toolkit'
import locationSlice  from './slice/location.slice'
import  packageSlice    from './slice/package.slice'
import  itinearySlice  from './slice/itineary.slice'
import  blogSlice  from './slice/blog.slice'
import  transportSlice  from './slice/transport.slice'
import  vendorSlice  from './slice/vendor.slice'
import  serviceSlice  from './slice/service.slice'
import  roomSlice  from './slice/room.slice'
import hotelSlice from './slice/hotel.slice'
import restaurantSlice  from './slice/restaurant.slice'
import contectSlice  from './slice/contect.slice'



export const store = configureStore({
  reducer: {
    location: locationSlice,
    package: packageSlice,
    itineary:itinearySlice,
    blog:blogSlice,
    transport:transportSlice,
    vendor:vendorSlice,
    service:serviceSlice,
    room:roomSlice,
    hotel:hotelSlice,
    restaurant:restaurantSlice,
    contect:contectSlice

  },
})

export default locationSlice.reducer
