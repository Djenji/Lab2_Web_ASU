import FeedbackCard from "./FeedbackCard";
import React from 'react'; 

const FBD = ({
    filteredFeedbacks,
    isDarkTheme,
    showOnlyToday,
    setShowOnlyToday,
}) => {
    return (
        <div>
            <div className="d-flex justify-content-end mb-3">
                <button
                    onClick={() => setShowOnlyToday(!showOnlyToday)}
                    className={`btn btn-sm ${
                        isDarkTheme
                            ? "btn-outline-light"
                            : "btn-outline-secondary"
                    }`}
                >
                    {showOnlyToday ? "Показать все" : "Только сегодня"}
                </button>
            </div>

            <div className="row g-4">
                {filteredFeedbacks.length > 0 ? (
                    filteredFeedbacks.map((feedback) => (
                        <FeedbackCard
                            key={feedback.id}
                            feedback={feedback}
                            isDarkTheme={isDarkTheme}
                        />
                    ))
                ) : (
                    <div className="col-12">
                        <div
                            className={`text-center py-5 ${
                                isDarkTheme ? "bg-dark" : "bg-white"
                            } rounded-3 shadow-sm`}
                        >
                            <i className="bi bi-chat-square-text display-4 mb-3 opacity-50"></i>
                            <h4 className="mb-3">
                                {showOnlyToday
                                    ? "Нет отзывов за сегодня"
                                    : "Нет отзывов для отображения"}
                            </h4>
                            <p
                                className={`${
                                    isDarkTheme
                                        ? "text-light opacity-75"
                                        : "text-muted"
                                }`}
                            >
                                {showOnlyToday
                                    ? "Сегодня еще никто не оставил отзыв"
                                    : "Будьте первым, кто оставит отзыв!"}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FBD;