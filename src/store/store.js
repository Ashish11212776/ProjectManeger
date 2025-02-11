import { configureStore } from "@reduxjs/toolkit";
import mainReducer from '../feactures/mainSlice.js'
export const store=configureStore({
    reducer:{
        main:mainReducer
    },
});