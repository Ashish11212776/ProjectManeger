import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "./mainThunks";

const initialState = {
  isLoading: false,  
  status: "pending",
  data: [],
  error: null 
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    ADD_DATA: (state, action) => {
        console.log("Current state.data:", state.data);
        console.log("Type of state.data:", typeof state.data);
      state.data=[...state.data,action.payload]
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;  
        state.status = "pending";
        state.data = [];
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;  
        state.status = "success"; 
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false;
        state.status = "failed";
        state.error = action.error.message; 
      });
  }
});

export const { ADD_DATA } = mainSlice.actions;
export default mainSlice.reducer;
