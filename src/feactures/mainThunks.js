import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk("fetchData", async () => {
  const response = await fetch("/data.json");  
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
 
  return await response.json();
});