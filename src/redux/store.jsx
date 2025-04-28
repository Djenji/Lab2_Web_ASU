import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import feedbackReducer from "./FeedbackSlice";
import authReducer from "./authSlice";

const store = configureStore({
    reducer: {
        counter: counterReducer,
        feedback: feedbackReducer,
        auth: authReducer,
    },
});

export default store;