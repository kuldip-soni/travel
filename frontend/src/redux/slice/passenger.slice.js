import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
    isLoading: false,
    passenger: [],
    error: false

}

export const getpassenger = createAsyncThunk(
    'passenger/getpassenger',
    async () => {
        try {
            console.log("getblogredux");

            const response = await axios.get('http://localhost:4000/passenger/getPassenger');
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);

        }

    }
)


export const addpassenger = createAsyncThunk(
    'passenger/addpassenger',
    async (data) => {

        try {

            console.log(data);

            const formData=new FormData();
            formData.append("bookin_id",data.bookin_id);
            formData.append("name",data.name);
            formData.append("age",data.age);

            const response = await axios.post('http://localhost:4000/passenger/addPassenger');
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);

        }

    }
)


export const putpassenger = createAsyncThunk(
    'passenger/putpassenger',
    async (data) => {

        try {

             const formData=new FormData();
             formData.append("id",data.id);
            formData.append("bookin_id",data.bookin_id);
            formData.append("name",data.name);
            formData.append("age",data.age);

            console.log(data);
            const response = await axios.put(`http://localhost:4000/passenger/putPassenger/${data.id}`);
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);

        }

    }
)



export const delpassenger = createAsyncThunk(
    'passenger/delpassenger',
    async (id) => {
        try {
            console.log(id);
            const response = await axios.delete(`http://localhost:4000/passenger/delPassenger/${id}`);
            console.log(response);
            return id;

        } catch (error) {
            console.log(error);

        }
    }
)


export const blogSlice = createSlice({
    name: 'passenger',
    initialState,
    extraReducers: (builder) => {

        builder.addCase(getpassenger.fulfilled, (state, action) => {
            console.log(action.payload);
            state.passenger = action.payload;

        })

        builder.addCase(addpassenger.fulfilled, (state, action) => {
            state.passenger.push(action.payload)


        })

        builder.addCase(putpassenger.fulfilled, (state, action) => {

             const index = state.passenger.findIndex(v => v.id == action.payload.id);
            state.passenger[index] = action.payload;


        })

        builder.addCase(delpassenger.fulfilled, (state, action) => {

            const index = state.passenger.findIndex(v => v.id === action.payload);
            state.passenger.splice(index, 1);

           


        })
    }

})

export default blogSlice.reducer