import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
    isLoading: false,
    user: null,
    error: false

}


export const register = createAsyncThunk(
    'vendor/register',
    async (data) => {
        try {

            const response = await axios.post('http://localhost:4000/user/register', data);
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);

        }

    }
)
export const login = createAsyncThunk(
    'vendor/login',
    async (data) => {
        try {

            const response = await axios.post('http://localhost:4000/user/login', data);
            console.log(response.data.data);

            localStorage.setItem("user_id", response.data.data.id)

            if(!response.data.data){
                alert(response.data.message);
            }

            return response.data.data;
        } catch (error) {
            console.log(error);

        }

    }
)


export const logout = createAsyncThunk(
    'vendor/logout',
    async (data) => {
        try {

            return null;

        } catch (error) {
            console.log(error);

        }

    }
)


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {

        builder.addCase(register.fulfilled, (state, action) => {
            console.log(action.payload);
            state.user = action.payload;

        });

        builder.addCase(login.fulfilled, (state, action) => {
            console.log(action.payload);
            state.user = action.payload;

        })

         builder.addCase(logout.fulfilled, (state, action) => {
            console.log(action.payload);
            state.user = action.payload;

        })
    }

})

export default authSlice.reducer