import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    loadFeedbacks,
    addFeedback,
    removeFeedback,
    selectAllFeedbacks,
    selectFeedbackStatus,
} from "../../redux/FeedbackSlice";
import FeedbackForm from "./FeedbackForm";
import FeedbackList from "./FeedbackList";

function FeedbackPage() {
    const dispatch = useDispatch();
    const feedbacks = useSelector(selectAllFeedbacks);
    const status = useSelector(selectFeedbackStatus);

    // Загрузка отзывов при монтировании
    useEffect(() => {
        dispatch(loadFeedbacks());
    }, [dispatch]);

    // Обработка отправки нового отзыва
    const handleSubmitFeedback = async (newFeedback) => {
        try {
            await dispatch(
                addFeedback({
                    name: newFeedback.name,
                    email: "user@example.com", // Можно заменить на email из userData
                    message: newFeedback.message,
                    rating: newFeedback.rating || 5,
                    date: new Date().toISOString(),
                })
            ).unwrap();
        } catch (error) {
            console.error("Ошибка при отправке отзыва:", error);
            // Можно добавить уведомление об ошибке
        }
    };

    // Обработка удаления отзыва
    const handleDeleteFeedback = async (id) => {
        try {
            await dispatch(removeFeedback(id)).unwrap();
        } catch (error) {
            console.error("Ошибка при удалении отзыва:", error);
            // Можно добавить уведомление об ошибке
        }
    };

    return (
        <div className="feedback-page-container">
            <h2>Обратная связь</h2>

            {/* Форма добавления отзыва */}
            <FeedbackForm
                onSubmit={handleSubmitFeedback}
                isSubmitting={status === "loading"}
            />

            {/* Список отзывов с обработкой состояний загрузки */}
            {status === "loading" && feedbacks.length === 0 ? (
                <div className="loading-message">Загрузка отзывов...</div>
            ) : status === "failed" ? (
                <div className="error-message">Ошибка загрузки отзывов</div>
            ) : (
                <FeedbackList
                    feedbacks={feedbacks}
                    onDelete={handleDeleteFeedback}
                />
            )}
        </div>
    );
}

export default FeedbackPage;
