import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
    isLoading: false,
    restaurant: [],
    error: false

}

export const getrestaurant = createAsyncThunk(
    'restaurant/getrestaurant',
    async () => {
        try {
            console.log("getrestaurantredux");

            const response = await axios.get('http://localhost:4000/restaurant/getrestaurant');
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {

        }

    }
)

export const addrestaurant = createAsyncThunk(
    'restaurant/addrestaurant',
    async (data) => {
        try {
            console.log("addrestaurant", data);

            const formData = new FormData();
            formData.append("booking_id", data.booking_id);
                        formData.append("location_id", data.location_id);

            formData.append("vendor_id", data.vendor_id);
            formData.append("service_id", data.service_id);
            formData.append("datetime", data.datetime);
            formData.append("meals", data.meals);
            formData.append("passenger", data.passenger);
            formData.append("amount", data.amount);
            
            formData.append("restaurant_img", data.restaurant_img);




            const response = await axios.post('http://localhost:4000/restaurant/addrestaurant', formData);
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {

        }

    }
)

export const putrestaurant = createAsyncThunk(
    'restaurant/putrestaurant',
    async (data) => {

        try {
            console.log("addrestaurant", data);

            const formData = new FormData();

            formData.append("id", data.id);
            formData.append("booking_id", data.booking_id);
            formData.append("location_id", data.location_id);

            formData.append("vendor_id", data.vendor_id);
            formData.append("service_id", data.service_id);
            formData.append("datetime", data.datetime);
            formData.append("meals", data.meals);
        
            formData.append("passenger", data.passenger);
            formData.append("amount", data.amount);
            formData.append("restaurant_img", data.restaurant_img);
            console.log(data);
            const response = await axios.put(`http://localhost:4000/restaurant/putrestaurant/${data.id}`, formData);
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);

        }

    }
)

export const delrestaurant = createAsyncThunk(
    'restaurant/delrestaurant',
    async (id) => {
        try {
            console.log(id);
            const response = await axios.delete(`http://localhost:4000/restaurant/delrestaurant/${id}`);
            console.log(response);
            return id;

        } catch (error) {
            console.log(error);

        }
    }
)


export const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    extraReducers: (builder) => {

        builder.addCase(getrestaurant.fulfilled, (state, action) => {
            console.log(action.payload);
            state.restaurant = action.payload;

        })
        builder.addCase(addrestaurant.fulfilled, (state, action) => {
            state.restaurant.push(action.payload)


        })

        builder.addCase(putrestaurant.fulfilled, (state, action) => {
            // console.log(id);


            const index = state.restaurant.findIndex(v => v.id == action.payload.id);
            state.restaurant[index] = action.payload;


        })

        builder.addCase(delrestaurant.fulfilled, (state, action) => {

            const index = state.restaurant.findIndex(v => v.id === action.payload);
            state.restaurant.splice(index, 1);




        })

    }
})

export default restaurantSlice.reducer