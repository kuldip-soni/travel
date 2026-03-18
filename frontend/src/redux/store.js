import { configureStore } from '@reduxjs/toolkit'
import locationSlice  from './slice/location.slice'
import  packageSlice    from './slice/package.slice'


export const store = configureStore({
  reducer: {
    location: locationSlice,
    package: packageSlice
  },
})

export default locationSlice.reducer
