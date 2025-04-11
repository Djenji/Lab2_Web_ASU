import React, { useState, useCallback } from "react";
import FeedbackForm from "./FeedbackForm";
import FeedbackList from "./FeedbackList";
import '../../App.css';

function FeedbackPage() {
    const [feedbacks, setFeedbacks] = useState(() => {
        const savedFeedbacks = localStorage.getItem("feedbacks");
        return savedFeedbacks ? JSON.parse(savedFeedbacks) : [];
    });

    const handleSubmitFeedback = useCallback((newFeedback) => {
        setFeedbacks((prevFeedbacks) => {
            const updatedFeedbacks = [newFeedback, ...prevFeedbacks];
            localStorage.setItem("feedbacks", JSON.stringify(updatedFeedbacks));
            return updatedFeedbacks;
        });
    }, []);

    const handleDeleteFeedback = useCallback((id) => {
        setFeedbacks((prevFeedbacks) => {
            const updatedFeedbacks = prevFeedbacks.filter(fb => fb.id !== id);
            localStorage.setItem("feedbacks", JSON.stringify(updatedFeedbacks));
            return updatedFeedbacks;
        });
    }, []);

    return (
        <div className="feedback-page-container">
            <h2>Обратная связь</h2>
            <FeedbackForm onSubmit={handleSubmitFeedback} />
            <FeedbackList feedbacks={feedbacks} onDelete={handleDeleteFeedback} />
        </div>
    );
}

export default FeedbackPage;