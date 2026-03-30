import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
    isLoading: false,
    payment: null,
    error: false

}

export const getPayment = createAsyncThunk(
    'payment/getPayment',
    async () => {
        try {
            console.log("getPaymentredux");

            const response = await axios.get('http://localhost:4000/payment/getPayment');
            console.log("getPaymentredux",response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);

        }

    }
)

export const addPayment = createAsyncThunk(
    'payment/addPayment',
    async (data) => {
        try {
            
            const response = await axios.post('http://localhost:4000/payment/addPayment', data);
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);

        }

    }
)

export const putPayment = createAsyncThunk(
    'payment/putPayment',
    async (data) => {
        try {
            
            const response = await axios.put('http://localhost:4000/payment/putPayment/'+data.id, data);
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);

        }

    }
)

export const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    extraReducers: (builder) => {

        builder.addCase(getPayment.fulfilled, (state, action) => {
            console.log(action.payload);
            state.payment = action.payload;

        });

        builder.addCase(addPayment.fulfilled, (state, action) => {
            console.log(action.payload);
            state.payment = action.payload;

        });


         builder.addCase(putPayment.fulfilled, (state, action) => {
        
                    const index = state.payment.findIndex(v => v.id == action.payload.id);
                    state.payment[index] = action.payload;
        
        
                })
        
    }

})

export default paymentSlice.reducer