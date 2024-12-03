import { configureStore } from '@reduxjs/toolkit';
import loginReducer from "./LoginSlice";
import userReducer from "./UserSlice";

export const store = configureStore({
    reducer: {
        login: loginReducer,
        user: userReducer,
    },
})