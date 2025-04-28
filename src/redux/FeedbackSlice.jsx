import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    fetchFeedbacks,
    submitFeedback,
    deleteFeedback as apiDeleteFeedback,
} from "../api";

// Асинхронные действия
export const loadFeedbacks = createAsyncThunk("feedback/load", async () => {
    const response = await fetchFeedbacks();
    return response.reviews || [];
});

export const addFeedback = createAsyncThunk(
    "feedback/add",
    async (feedbackData) => {
        const response = await submitFeedback(feedbackData);
        return response.review; // Сервер должен возвращать созданный отзыв
    }
);

export const removeFeedback = createAsyncThunk(
    "feedback/delete",
    async (feedbackId) => {
        await apiDeleteFeedback(feedbackId);
        return feedbackId; // Возвращаем ID для удаления из состояния
    }
);

// Создание слайса
const feedbackSlice = createSlice({
    name: "feedback",
    initialState: {
        items: [],
        status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {
        // Синхронные редьюсеры (если нужны)
    },
    extraReducers: (builder) => {
        builder
            // Загрузка отзывов
            .addCase(loadFeedbacks.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loadFeedbacks.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(loadFeedbacks.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // Добавление отзыва
            .addCase(addFeedback.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addFeedback.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items.unshift(action.payload); // Добавляем в начало массива
            })
            .addCase(addFeedback.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // Удаление отзыва
            .addCase(removeFeedback.pending, (state) => {
                state.status = "loading";
            })
            .addCase(removeFeedback.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = state.items.filter(
                    (item) => item.id !== action.payload
                );
            })
            .addCase(removeFeedback.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

// Экспорт редьюсера и селекторов
export default feedbackSlice.reducer;

export const selectAllFeedbacks = (state) => state.feedback.items;
export const selectFeedbackStatus = (state) => state.feedback.status;
export const selectFeedbackError = (state) => state.feedback.error;
