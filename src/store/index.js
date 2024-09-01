import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersSlice from "./users/users.slice";

const rootReducer = combineReducers({
    users:usersSlice
})

export const store = configureStore({
    reducer:rootReducer
})