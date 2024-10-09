import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSliice'
const appStore = configureStore({
    reducer:{
        userReducer

    }
})

export default appStore;