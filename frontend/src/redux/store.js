import { configureStore } from '@reduxjs/toolkit'
import locationSlice  from './slice/location.slice'
import  packageSlice    from './slice/package.slice'
import  itinearySlice  from './slice/itineary.slice'
import  blogSlice  from './slice/blog.slice'


export const store = configureStore({
  reducer: {
    location: locationSlice,
    package: packageSlice,
    itineary:itinearySlice,
    blog:blogSlice
  },
})

export default locationSlice.reducer
