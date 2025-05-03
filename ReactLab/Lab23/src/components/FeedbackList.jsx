import PropTypes from "prop-types";
import { useState } from "react";
import FeedbackCard from "./FeedbackCard";
import FBD from "./FBD";
import React from "react";

const FeedbackList = ({ feedbacks, isDarkTheme }) => {
    const [showOnlyToday, setShowOnlyToday] = useState(false);

    // Функция для проверки, является ли дата сегодняшней
    const isToday = (dateString) => {
        const today = new Date();
        const date = new Date(dateString);

        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    };

    // Фильтруем отзывы по текущему состоянию
    const filteredFeedbacks = showOnlyToday
        ? feedbacks.filter((feedback) => isToday(feedback.date))
        : feedbacks;

    return (
        <FBD
            filteredFeedbacks={filteredFeedbacks}
            isDarkTheme={isDarkTheme}
            showOnlyToday={showOnlyToday}
            setShowOnlyToday={setShowOnlyToday}
        />
    );
};

FeedbackList.propTypes = {
    feedbacks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
            name: PropTypes.string.isRequired,
            feedback: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
        })
    ).isRequired,
    isDarkTheme: PropTypes.bool.isRequired,
};

export default FeedbackList;
