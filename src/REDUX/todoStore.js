import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice";

const todoStore = configureStore({
    reducer: {
        todoReducer: todoSlice
    }
})
export default todoStore