import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
    isLoading: false,
    dashboard: [],
    recentBooking: [],
    locWisePayment: [],
    monWisePayment: [],
    error: false

}

export const getdashboard = createAsyncThunk(
    'dashboard/getdashboard',
    async () => {
        try {
            console.log("getdashboardredux");

            const response = await axios.get('http://localhost:4000/dashboard/getDashboard');
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);

        }

    }
)

export const getrecentBooking = createAsyncThunk(
    'dashboard/getrecentBooking',
    async () => {
        try {
            console.log("getrecentBookingredux");

            const response = await axios.get('http://localhost:4000/dashboard/getRecentBooking');
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);

        }

    }
)

export const locationWisePayment = createAsyncThunk(
    'dashboard/locationWisePayment',
    async () => {
        try {
            console.log("locationWisePayment");

            const response = await axios.get('http://localhost:4000/dashboard/locationWisePayment');
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);

        }

    }
)

export const monthWiseRevenue = createAsyncThunk(
    'dashboard/monthWiseRevenue',
    async () => {
        try {
            console.log("monthWiseRevenue");

            const response = await axios.get('http://localhost:4000/dashboard/monthWiseRevenue');
            console.log("sfcsfsd",response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);

        }

    }
)

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    extraReducers: (builder) => {

        builder.addCase(getdashboard.fulfilled, (state, action) => {
            console.log(action.payload);
            state.dashboard = action.payload;

        })

        builder.addCase(getrecentBooking.fulfilled, (state, action) => {
            console.log(action.payload);
            state.recentBooking = action.payload;

        })

        builder.addCase(locationWisePayment.fulfilled, (state, action) => {
            console.log(action.payload);
            state.locWisePayment = action.payload;

        })

        builder.addCase(monthWiseRevenue.fulfilled, (state, action) => {
            console.log(action.payload);
            state.monWisePayment = action.payload;

        })


    }

})



export default dashboardSlice.reducer