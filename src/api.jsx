import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:1337",
});

export const updateUserProfile = createAsyncThunk(
    "auth/updateProfile",
    async ({ id, username, email }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/api/user/${id}`, {
                username,
                email,
            });
            return response.data;
        } catch (error) {
            if (error.response?.status === 404) {
                return rejectWithValue("Пользователь не найден");
            }
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const registerUser = async (userData) => {
    try {
        const response = await api.post("/api/register", userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await api.post("/api/login", userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const fetchFeedbacks = async () => {
    try {
        const response = await api.get("/api/feedback");
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const submitFeedback = async (feedbackData) => {
    try {
        const response = await api.post("/api/feedback", feedbackData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getFeedback = async () => {
    try {
        const response = await api.get("/api/feedback");
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteFeedback = async (id) => {
    try {
        const response = await api.delete(`/api/feedback/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getUserProfile = async (userId) => {
    try {
        const response = await api.get(`/api/user/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
