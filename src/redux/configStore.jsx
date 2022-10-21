import { configureStore } from "@reduxjs/toolkit";
import formValidateReducer from "./reducers/formValidateReducer";

export const store = configureStore({
    reducer: {
        formValidateReducer: formValidateReducer
    }
})